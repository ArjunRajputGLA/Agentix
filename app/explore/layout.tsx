// app/layout.tsx
import { Navbar } from "@/components/header/Navbar";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header>
        {/* <Navbar />  */}
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
