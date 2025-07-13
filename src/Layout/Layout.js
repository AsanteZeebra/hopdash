import react from "react";
import Sidebar from "../Partials/Sidebar";
import Navbar from "../Partials/Navbar";
import Footer from "../Partials/Footer";
import { Branch_Sidebar } from "../Partials/Sidebar";
import { User_Sidebar } from "../Partials/Sidebar";


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

export const Branch = (children) => {
  return (
     <div className="page-wrapper">
      <Navbar />
      <div className="main-container">
        <Branch_Sidebar/>
        {children}
      </div>
      <Footer />
    </div>
  );
}


export const User = (children) => {
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
