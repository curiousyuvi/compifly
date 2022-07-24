import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="w-[calc(100%)] h-screen pt-24 flex justify-center">
        <div className="w-full h-full max-w-6xl">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
