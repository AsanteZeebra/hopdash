/* eslint-disable react/jsx-pascal-case */
import Sidebar from "../Partials/Sidebar";
import Navbar from "../Partials/Navbar";
import Footer from "../Partials/Footer";
import { Branch_Sidebar,User_Sidebar } from "../Partials/Sidebar";

import { Branch_Navbar,User_Navbar } from "../Partials/Navbar";
import "../Components/Members/AddMember.css"; // Importing the CSS for fade-in effect


const Layout = ({ children }) => {
  return (
    <div className="page-wrapper page-fade">
      <Navbar />
      <div className="main-container page-fade">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export const Branch_Layout = ({ children }) => {
  return (
    <div className="page-wrapper page-fade">
      <Branch_Navbar />
      <div className="main-container page-fade">
        <Branch_Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export const User_layout = ({ children }) => {
  return (
    <div className="page-wrapper">
      <User_Navbar />
      <div className="main-container">
        <User_Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
};




export default Layout;
