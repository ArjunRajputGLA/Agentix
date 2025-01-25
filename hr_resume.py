import os
import streamlit as st
import pandas as pd
import PyPDF2
import json
import re
from dotenv import load_dotenv
from typing import List, Dict, Any

# AI Processing Libraries
from groq import Groq
from llama_parse import LlamaParse
from llama_index.core import SimpleDirectoryReader

class ResumeMatchingApp:
    def __init__(self):
        # Load environment variables
        load_dotenv()

        # Initialize Groq client
        try:
            self.groq_client = Groq(api_key="your_groq_api")
        except Exception as e:
            st.error(f"Groq API Key Error: {e}")
            self.groq_client = None

        # Initialize Llama Parse
        try:
            self.llama_parser = LlamaParse(
                result_type="markdown",
                api_key="your_llama_parse_api"
            )
        except Exception as e:
            st.error(f"Llama Parse API Key Error: {e}")
            self.llama_parser = None

    def validate_pdf(self, file_path: str) -> bool:
        """
        Enhanced PDF validation
        """
        try:
            with open(file_path, 'rb') as f:
                pdf_reader = PyPDF2.PdfReader(f)
                # Check if the PDF has at least one page with some text
                if len(pdf_reader.pages) > 0:
                    text = pdf_reader.pages[0].extract_text()
                    return len(text.strip()) > 50  # Ensure some meaningful content
            return False
        except Exception as e:
            st.warning(f"PDF validation error: {e}")
            return False

    def extract_text_from_pdf(self, file_path: str) -> str:
        """
        Extract text from PDF with multiple fallback methods
        """
        try:
            with open(file_path, 'rb') as f:
                pdf_reader = PyPDF2.PdfReader(f)
                
                # Combine text from all pages
                full_text = " ".join([page.extract_text() for page in pdf_reader.pages])
                
                # Clean and filter text
                full_text = re.sub(r'\s+', ' ', full_text).strip()
                
                if not full_text:
                    st.warning(f"No text extracted from {file_path}")
                    return ""
                
                return full_text
        except Exception as e:
            st.error(f"Text extraction error for {file_path}: {e}")
            return ""

    def parse_resumes(self, resume_paths: List[str]) -> List[str]:
        """
        Parse multiple resumes with enhanced error handling
        """
        parsed_resumes = []
        for path in resume_paths:
            # Validate PDF first
            if not self.validate_pdf(path):
                st.warning(f"Skipping invalid PDF: {path}")
                continue

            # Try text extraction
            resume_text = self.extract_text_from_pdf(path)
            
            if not resume_text:
                st.warning(f"No extractable text from {path}")
                continue

            parsed_resumes.append(resume_text)
        
        return parsed_resumes

    def extract_resume_details(self, resume_text: str) -> Dict[str, Any]:
        """
        Extract structured details from resume using Groq with stricter prompt
        """
        if not self.groq_client:
            st.error("Groq client is not initialized")
            return {}

        try:
            response = self.groq_client.chat.completions.create(
                model="mixtral-8x7b-32768",
                response_format={"type": "json_object"},
                temperature=0.0,  # Lower temperature for more consistent output
                messages=[
                    {
                        "role": "system", 
                        "content": """You are a precise and methodical HR recruiter parsing resumes. 
                        Follow these strict guidelines:
                        - Be extremely accurate and consistent
                        - Extract only verifiable information
                        - If information is unclear, use 'N/A'
                        - Ensure JSON structure is always consistent
                        - Do not invent or assume any details"""
                    },
                    {
                        "role": "user", 
                        "content": f"""STRICTLY EXTRACT the following details from this resume:
                        - Mandatory Extraction: Full legal name (exactly as written)
                        - Mandatory Extraction: Verified contact email (if present)
                        - Mandatory Extraction: Verified phone number format (if present)
                        - TOP 5 Technical Skills (only include if clearly mentioned)
                        - TOP 3 Soft Skills (only include if clearly mentioned)
                        - Concise Work Experience Summary (maximum 2 sentences)
                        - Highest Education Summary (institution and degree only)
                        - Total Verifiable Years of Professional Experience

                        RESUME TEXT:\n{resume_text}

                        CRITICAL INSTRUCTIONS:
                        - Use 'N/A' for any missing or unverifiable information
                        - Be extremely precise
                        - Do not guess or fabricate details"""
                    }
                ]
            )
            
            # Parse the JSON response
            details = json.loads(response.choices[0].message.content)
            return details
        except Exception as e:
            st.error(f"Error extracting resume details: {e}")
            return {}

    def match_job_description(self, resume_details: Dict[str, Any], job_description: str) -> Dict[str, Any]:
        """
        Advanced Resume-Job Description Matching with Deep Context Analysis
        """
        if not self.groq_client:
            st.error("Groq client is not initialized")
            return self._get_default_match_result()

        try:
            response = self.groq_client.chat.completions.create(
                model="mixtral-8x7b-32768",
                response_format={"type": "json_object"},
                temperature=0.1,
                messages=[
                    {
                        "role": "system", 
                        "content": """ADVANCED JOB MATCHING PROTOCOL:
                        - Perform DEEP CONTEXTUAL ANALYSIS
                        - Evaluate candidate against PRECISE job requirements
                        - QUANTIFY match with EXTREME PRECISION
                        - Identify NUANCED skill gaps
                        - Provide ACTIONABLE development recommendations

                        MANDATORY JSON OUTPUT SCHEMA:
                        {
                            "Match_Percentage": number,
                            "Matching_Skills": [string],
                            "Missing_Critical_Skills": [string],
                            "Skill_Gap_Score": number,
                            "Precise_Fit_Assessment": string,
                            "Recommended_Next_Steps": [string],
                            "Domain_Alignment": number,
                            "Potential_Growth_Score": number
                        }"""
                    },
                    {
                        "role": "user", 
                        "content": f"""COMPREHENSIVE RESUME-JOB MATCHING ANALYSIS:

                        DETAILED EVALUATION PARAMETERS:
                        - Perform MULTI-DIMENSIONAL skill matching
                        - Assess TECHNICAL and SOFT skill alignment
                        - Evaluate DOMAIN-SPECIFIC expertise
                        - Consider CAREER TRAJECTORY and POTENTIAL

                        CANDIDATE PROFILE:
                        Technical Skills: {json.dumps(resume_details.get('top_5_technical_skills', []))}
                        Soft Skills: {json.dumps(resume_details.get('top_3_soft_skills', []))}
                        Work Experience: {resume_details.get('work_experience_summary', 'N/A')}
                        Education: {resume_details.get('highest_education_summary', 'N/A')}
                        Total Experience: {resume_details.get('total_verifiable_years_of_experience', 0)} years

                        JOB DESCRIPTION CONTEXT:
                        {job_description}

                        ANALYSIS REQUIREMENTS:
                        - PRECISE match percentage calculation
                        - Identify EXACT skill overlaps
                        - Highlight CRITICAL skill gaps
                        - Estimate POTENTIAL for growth
                        - Provide STRATEGIC development recommendations"""
                    }
                ]
            )

            # Parse response with comprehensive validation
            match_details = self._validate_match_details(
                json.loads(response.choices[0].message.content)
            )

            return match_details

        except Exception as e:
            st.error(f"ADVANCED MATCHING PROCESS FAILURE: {e}")
            return self._get_default_match_result()
    
    def _validate_match_details(self, match_details: Dict[str, Any]) -> Dict[str, Any]:
        """
        Validate and normalize match details with comprehensive checks
        """
        # Mandatory keys with default fallback values
        mandatory_keys = {
            'Match_Percentage': (lambda x: max(0, min(100, x)), 0),
            'Matching_Skills': (lambda x: x if isinstance(x, list) else [], []),
            'Missing_Critical_Skills': (lambda x: x if isinstance(x, list) else [], []),
            'Skill_Gap_Score': (lambda x: max(0, min(100, x)), 100),
            'Precise_Fit_Assessment': (lambda x: str(x)[:200], "No Clear Assessment"),
            'Recommended_Next_Steps': (lambda x: x[:3] if isinstance(x, list) else [], ["Develop relevant skills"]),
            'Domain_Alignment': (lambda x: max(0, min(100, x)), 0),
            'Potential_Growth_Score': (lambda x: max(0, min(100, x)), 0)
        }
    
        validated_details = {}
        for key, (validator, default) in mandatory_keys.items():
            try:
                validated_details[key] = validator(match_details.get(key, default))
            except Exception:
                validated_details[key] = default
    
        return validated_details

    def _get_default_match_result(self) -> Dict[str, Any]:
        """
        Generate a comprehensive default match result
        """
        return {
            "Match_Percentage": 0,
            "Matching_Skills": [],
            "Missing_Critical_Skills": [],
            "Skill_Gap_Score": 100,
            "Precise_Fit_Assessment": "Insufficient information for comprehensive match",
            "Recommended_Next_Steps": ["Conduct detailed skills assessment"],
            "Domain_Alignment": 0,
            "Potential_Growth_Score": 0
        }
    
    def process_resumes(self, resume_paths: List[str], job_description: str) -> List[Dict[str, Any]]:
        """
        Process all resumes and create a comprehensive report
        """
        results = []
        parsed_resumes = self.parse_resumes(resume_paths)

        for resume_text in parsed_resumes:
            resume_details = self.extract_resume_details(resume_text)
            job_match = self.match_job_description(resume_details, job_description)
            
            results.append({
                'Resume Details': resume_details,
                'Job Match': job_match
            })
        
        return results

def main():
    st.set_page_config(
        page_title="Resume Matching AI",
        page_icon="📋",
        layout="wide"
    )

    st.title("🤖 AI-Powered Resume Matching & Ranking")

    # Sidebar Configuration
    with st.sidebar:
        st.header("📤 Resume Upload")
        
        # Resume Upload
        uploaded_files = st.file_uploader(
            "Upload PDF Resumes", 
            type=['pdf'], 
            accept_multiple_files=True
        )

        st.header("📝 Job Description")
        job_description = st.text_area(
            "Paste Complete Job Description", 
            height=300
        )

        process_button = st.button("🚀 Process Resumes", use_container_width=True)

    # Main Content Area
    if process_button:
        # Validate inputs
        if not uploaded_files:
            st.error("Please upload at least one resume!")
            return
        
        if not job_description:
            st.error("Please provide a job description!")
            return

        # Temporary file storage
        resume_paths = []
        try:
            for uploaded_file in uploaded_files:
                temp_path = os.path.join("temp", uploaded_file.name)
                os.makedirs("temp", exist_ok=True)
                
                with open(temp_path, "wb") as f:
                    f.write(uploaded_file.getbuffer())
                resume_paths.append(temp_path)

            # Initialize and run the app
            app = ResumeMatchingApp()
            results = app.process_resumes(resume_paths, job_description)

            # Display Results
            st.header("🏆 Resume Matching Results")
            
            # Sort results by match percentage
            sorted_results = sorted(
                results, 
                key=lambda x: x.get('Job Match', {}).get('Match Percentage', 0), 
                reverse=True
            )

            for idx, result in enumerate(sorted_results, 1):
                with st.expander(f"Candidate {idx} - {result['Resume Details'].get('Full Name', 'Unknown')}", expanded=True):
                    col1, col2 = st.columns(2)
                    
                    with col1:
                        st.subheader("📋 Candidate Details")
                        st.json(result['Resume Details'])
                    
                    with col2:
                        st.subheader("🎯 Job Match Analysis")
                        st.json(result['Job Match'])

            # Export to Excel
            if st.button("💾 Export Detailed Report"):
                export_path = "resume_matching_report.xlsx"
                
                # Prepare DataFrame for export
                export_data = []
                for result in sorted_results:
                    row = {
                        **result['Resume Details'],
                        **{f"Match_{k}": v for k, v in result['Job Match'].items()}
                    }
                    export_data.append(row)
                
                df = pd.DataFrame(export_data)
                df.to_excel(export_path, index=False)
                st.success(f"Report exported to {export_path}")

        except Exception as e:
            st.error(f"Processing error: {e}")
        
        finally:
            # Clean up temporary files
            for path in resume_paths:
                try:
                    os.remove(path)
                except Exception:
                    pass

if __name__ == "__main__":
    main()