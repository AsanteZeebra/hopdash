/* eslint-disable react/jsx-pascal-case */
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import { Branch_Layout,User_layout } from "./Layout/Layout";
import { Branch } from "./Dashbaord";
import { User } from "./Dashbaord";
import Dashboard from "./Dashbaord";
import Overview from "./Components/Overview";
import Signup from "./Components/authentication/signup";
 import Login from "./Components/authentication/login"; 
import RequestReset from "./Components/authentication/request_reset";
import ResetPassword from "./Components/authentication/Reset_Password";
import ProtectedRoute from "./Components/authentication/protect_route";
import AddBranch from "./Components/Branches/Add_Branch";
import { ViewBranch,BranchActivity,EditBranch } from "./Components/Branches/Add_Branch";
import { AddPastor,EditPastor,PastorProfile,Transfer,MakeTransfer } from "./Components/Pastors/Pastors";
import ViewPastors from "./Components/Pastors/Pastors";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} /> 
        <Route path="/request-reset" element={<RequestReset />} />
        <Route path="/password-reset/:token" element={<ResetPassword />} />
        <Route path="/overview" element={<Layout><Overview/></Layout>} />
        <Route path="/user" element={<User_layout><User/></User_layout>} />
        <Route path="/branch" element={<Branch_Layout><Branch/></Branch_Layout>}/>
        <Route path="/dashboard" element={<Layout><Dashboard/></Layout>} />
        <Route path="/add-branch" element={<Layout><AddBranch/></Layout>} />
        <Route path="/view-branch" element={<Layout><ViewBranch/></Layout>} />
        <Route path="/branch-activity" element={<Layout><BranchActivity/></Layout>} />
        <Route path="/view-pastors" element={<Layout><ViewPastors/></Layout>} />
        <Route path="/add-pastors" element={<Layout><AddPastor/></Layout>} />
        <Route path="/edit-branch" element={<Layout><EditBranch/></Layout>} />
         <Route path="/edit-pastor" element={<Layout><EditPastor/></Layout>} />
        <Route path="/pastor-profile" element={<Layout><PastorProfile/></Layout>} />
        <Route path="/transfer" element={<Layout><Transfer/></Layout>} />
        <Route path="/make-transfer" element={<Layout><MakeTransfer/></Layout>} />


        
        {/* Protected Routes */}
        
        
       <Route path="*" element={<Navigate to="/login" replace />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;