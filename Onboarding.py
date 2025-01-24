import streamlit as st
import pandas as pd
from textwrap import dedent
from phi.assistant import Assistant
from phi.llm.groq import Groq
import os
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication

# Load environment variables from .env file
load_dotenv()

# Set up the Streamlit app
st.title("Bulk Onboarding Email Generator 🎉")
st.caption("Upload a CSV or XLSX file to send welcome emails to multiple candidates automatically.")

# Get Groq API key from environment
groq_api_key = os.getenv('GROQ_API_KEY')

# Hardcoded sender details
SENDER_EMAIL = "dhansetufinance@gmail.com"
SENDER_PASSWORD = "hsoitdsfyeoonvtd"
COMPANY_NAME = "Dhansetu Finance"
HR_REP_NAME = "HR Team"

def send_email_with_attachments(recipient_email, subject, body, attachments=None):
    """
    Send an email with optional attachments
    """
    try:
        # Create a multipart message
        message = MIMEMultipart()
        message['From'] = SENDER_EMAIL
        message['To'] = recipient_email
        message['Subject'] = subject

        # Attach the body of the email
        message.attach(MIMEText(body, 'plain'))

        # Attach files
        if attachments:
            for attachment in attachments:
                if hasattr(attachment, 'read'):
                    # Handle UploadedFile objects
                    part = MIMEApplication(attachment.read(), Name=attachment.name)
                    part['Content-Disposition'] = f'attachment; filename="{attachment.name}"'
                    message.attach(part)
                elif isinstance(attachment, str):
                    # Handle file paths
                    with open(attachment, "rb") as file:
                        part = MIMEApplication(file.read(), Name=os.path.basename(attachment))
                        part['Content-Disposition'] = f'attachment; filename="{os.path.basename(attachment)}"'
                        message.attach(part)

        # Create SMTP session
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            # Start TLS for security
            server.starttls()
            # Login to the sender's email
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            # Send email
            server.send_message(message)
        
        return True, None
    except Exception as e:
        return False, str(e)

def create_personalized_email(candidate_details, attachments):
    """
    Generate personalized email content for a candidate
    """
    email_writer = Assistant(
        name="Onboarding Email Writer",
        role="Generates a warm and concise welcome email",
        llm=Groq(id="llama-3.3-70b-versatile"),
        description=dedent(
            """\
        You are an HR professional creating a brief, welcoming email for a new employee.
        Keep the message short, warm, and encouraging.
        """
        ),
        instructions=[
            "Write a concise welcome email",
            "Congratulate the candidate on joining the company",
            "Keep the tone warm and positive",
            "Limit the email to 4-5 short paragraphs",
            "Avoid excessive details about first-day logistics"
        ],
        add_datetime_to_instructions=True,
    )

    email_context = f"""
    Candidate Details:
    - Name: {candidate_details['Name']}
    - Position: {candidate_details['Designation']}
    - Company: {COMPANY_NAME}
    """

    welcome_email = email_writer.run(
        f"Create a warm and concise welcome email with the following context:\n\n{email_context}",
        stream=False
    )

    # Replace [Your Name] with the actual HR representative name
    welcome_email = welcome_email.replace("[Your Name]", HR_REP_NAME)

    return welcome_email, attachments

if groq_api_key:
    # File Upload
    st.subheader("Upload Candidate Data")
    uploaded_file = st.file_uploader("Choose a CSV or XLSX file", type=["csv", "xlsx"])
    attachments = st.file_uploader("Choose any additional attachments", accept_multiple_files=True)

    # Send Emails Button
    if st.button("Generate and Send Welcome Emails"):
        if uploaded_file is not None:
            try:
                # Read the file
                if uploaded_file.name.endswith(".csv"):
                    candidates_data = pd.read_csv(uploaded_file)
                else:
                    candidates_data = pd.read_excel(uploaded_file)
                
                # Validate file columns
                required_columns = ['Name', 'Designation', 'Email']
                if not all(col in candidates_data.columns for col in required_columns):
                    st.error(f"File must contain columns: {', '.join(required_columns)}")
                else:
                    # Prepare for sending
                    with st.spinner("Sending emails..."):
                        # Tracking for results
                        send_results = []

                        for _, candidate in candidates_data.iterrows():
                            # Create personalized email content
                            welcome_email, attachments = create_personalized_email(candidate, attachments)

                            # Send email
                            email_subject = f"Welcome to {COMPANY_NAME}, {candidate['Name']}!"
                            send_result, error_msg = send_email_with_attachments(
                                candidate['Email'], 
                                email_subject, 
                                welcome_email,
                                attachments
                            )

                            # Track results
                            send_results.append({
                                'Name': candidate['Name'],
                                'Email': candidate['Email'],
                                'Designation': candidate['Designation'],
                                'Status': 'Sent Successfully' if send_result else 'Failed',
                                'Error': error_msg if not send_result else None
                            })

                        # Display send results
                        results_df = pd.DataFrame(send_results)
                        st.write("### Email Send Results:")
                        st.dataframe(results_df)

                        # Highlight any failures
                        failed_sends = results_df[results_df['Status'] != 'Sent Successfully']
                        if not failed_sends.empty:
                            st.error("Some emails failed to send:")
                            st.dataframe(failed_sends)
                        else:
                            st.balloons()
                            st.success("All emails sent successfully!")

            except Exception as e:
                st.error(f"Error processing file: {e}")
        else:
            st.error("Please upload a CSV or XLSX file.")

else:
    st.error("Groq API key not found. Please check your .env file.")

# Add a note about file format requirements
st.sidebar.info("""
📋 File Format Requirements:
- CSV or XLSX (Excel) file
- Must have columns: Name, Designation, Email
- Example:
  Name,Designation,Email
  John Doe,Software Engineer,john@example.com
  Jane Smith,Product Manager,jane@example.com
""")