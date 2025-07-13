/* eslint-disable react/jsx-pascal-case */
import react from "react";
import Sidebar from "../Partials/Sidebar";
import Navbar from "../Partials/Navbar";
import Footer from "../Partials/Footer";
import { Branch_Sidebar } from "../Partials/Sidebar";
import { User_Sidebar } from "../Partials/Sidebar";
import { Branch_Navbar } from "../Partials/Navbar";


const Layout = ({ children }) => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export const Branch_Layout = (children) => {
  return (
     <div className="page-wrapper">
      <Branch_Navbar/>
      <div className="main-container">
        <Branch_Sidebar/>
        {children}
      </div>
      <Footer />
    </div>
  );
}


export const User_layout = (children) => {
  return (
     <div className="page-wrapper">
      <Navbar />
      <div className="main-container">
        <User_Sidebar/>
        {children}
      </div>
      <Footer />
    </div>
  );
}
export default Layout;
