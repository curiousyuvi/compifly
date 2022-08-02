import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MobileNavbar from "./MobileNavbar";

const LandingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="w-[calc(100%)] min-h-screen flex justify-center">
        <div className="w-full h-full flex justify-center items-center">
          {children}
        </div>
      </div>
      <MobileNavbar />
      <Footer />
    </>
  );
};

export default LandingLayout;
