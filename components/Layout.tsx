import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MobileNavbar from "./MobileNavbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="w-[calc(100%)] min-h-screen py-24 flex justify-center">
        <div className="w-full h-full max-w-6xl flex justify-center items-center p-2">
          {children}
        </div>
      </div>
      <MobileNavbar />
      <Footer />
    </>
  );
};

export default Layout;
