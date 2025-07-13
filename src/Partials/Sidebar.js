import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    // Track which treeview menus are open
    const [openMenus, setOpenMenus] = useState({});

    // Helper to check if a route is active
    const isActive = (path) => location.pathname === path;

    // Helper for treeview menu to check if any child is active
    const isTreeActive = (paths) => paths.some(path => location.pathname === path);

    // Toggle treeview open/close
    const handleTreeToggle = (key) => {
        setOpenMenus((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <>
            <nav id="sidebar" className="sidebar-wrapper">
                <div className="shop-profile">
                    <p className="mb-1 fw-bold text-primary">Walmart</p>
                    <p className="m-0">Los Angeles, California</p>
                </div>
                <div className="sidebarMenuScroll">
                    <ul className="sidebar-menu">
                        <li className={isActive("/dashboard") ? "active current-page" : ""}>
                            <Link to="/dashboard">
                                <i className="bi bi-pie-chart"></i>
                                <span className="menu-text">Dashboard</span>
                            </Link>
                        </li>
                        <li className={isActive("/overview") ? "active current-page" : ""}>
                            <Link to="/overview">
                                <i className="bi bi-bar-chart-line"></i>
                                <span className="menu-text">Overview</span>
                            </Link>
                        </li>

                        {/* Branches */}
                        <li className={`treeview${isTreeActive(["/accordions.html", "/alerts.html", "/buttons.html"]) ? " active current-page" : ""}${openMenus["branches"] ? " open" : ""}`}>
                            <a href="#branches" onClick={e => { e.preventDefault(); handleTreeToggle("branches"); }}>
                                <i className="bi bi-stickies"></i>
                                <span className="menu-text">Branches</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["branches"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/accordions.html">All branches</Link>
                                </li>
                                <li>
                                    <Link to="/alerts.html">Add New Branch</Link>
                                </li>
                                <li>
                                    <Link to="/buttons.html">View Branch Activities</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Pastors */}
                        <li className={`treeview${isTreeActive([
                            "/form-inputs.html",
                            "/form-checkbox-radio.html",
                            "/form-file-input.html",
                            "/form-validations.html"
                        ]) ? " active current-page" : ""}${openMenus["pastors"] ? " open" : ""}`}>
                            <a href="#pastors" onClick={e => { e.preventDefault(); handleTreeToggle("pastors"); }}>
                                <i className="bi bi-ui-checks-grid"></i>
                                <span className="menu-text">Pastors</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["pastors"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/form-inputs.html">All Pastors</Link>
                                </li>
                                <li>
                                    <Link to="/form-checkbox-radio.html">Add Pastor &amp; Radio</Link>
                                </li>
                                <li>
                                    <Link to="/form-file-input.html">Transfer Pastor</Link>
                                </li>
                                <li>
                                    <Link to="/form-validations.html">Remove/Suspend</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Members */}
                        <li className={`treeview${isTreeActive([
                            "/create-invoice.html",
                            "/view-invoice.html"
                        ]) ? " active current-page" : ""}${openMenus["members"] ? " open" : ""}`}>
                            <a href="#members" onClick={e => { e.preventDefault(); handleTreeToggle("members"); }}>
                                <i className="bi bi-window-sidebar"></i>
                                <span className="menu-text">Members</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["members"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/create-invoice.html">View All</Link>
                                </li>
                                <li>
                                    <Link to="/view-invoice.html">Add Member</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Attendance */}
                        <li className={`treeview${isTreeActive([
                            "/attendance-national",
                            "/attendance-branch"
                        ]) ? " active current-page" : ""}${openMenus["attendance"] ? " open" : ""}`}>
                            <a href="#attendance" onClick={e => { e.preventDefault(); handleTreeToggle("attendance"); }}>
                                <i className="bi bi-window-sidebar"></i>
                                <span className="menu-text">Attendance</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["attendance"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/attendance-national">National View</Link>
                                </li>
                                <li>
                                    <Link to="/attendance-branch">Per Branch View</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Dues & Payments */}
                        <li className={`treeview${isTreeActive([
                            "/dues-all",
                            "/dues-summary"
                        ]) ? " active current-page" : ""}${openMenus["dues"] ? " open" : ""}`}>
                            <a href="#dues" onClick={e => { e.preventDefault(); handleTreeToggle("dues"); }}>
                                <i className="bi bi-window-sidebar"></i>
                                <span className="menu-text">Dues & Payments</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["dues"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/dues-all">All Dues</Link>
                                </li>
                                <li>
                                    <Link to="/dues-summary">Payment Summary</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Events */}
                        <li className={`treeview${isTreeActive([
                            "/events-national",
                            "/events-branch"
                        ]) ? " active current-page" : ""}${openMenus["events"] ? " open" : ""}`}>
                            <a href="#events" onClick={e => { e.preventDefault(); handleTreeToggle("events"); }}>
                                <i className="bi bi-window-sidebar"></i>
                                <span className="menu-text">Events</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["events"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/events-national">National Calendar</Link>
                                </li>
                                <li>
                                    <Link to="/events-branch">Branch Events</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Reports */}
                        <li className={`treeview${isTreeActive([
                            "/reports-branch",
                            "/reports-attendance",
                            "/reports-payments"
                        ]) ? " active current-page" : ""}${openMenus["reports"] ? " open" : ""}`}>
                            <a href="#reports" onClick={e => { e.preventDefault(); handleTreeToggle("reports"); }}>
                                <i className="bi bi-window-sidebar"></i>
                                <span className="menu-text">Reports</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["reports"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/reports-branch">Branch Reports</Link>
                                </li>
                                <li>
                                    <Link to="/reports-attendance">Attendance Summary</Link>
                                </li>
                                <li>
                                    <Link to="/reports-payments">Payment Logs</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Authentication */}
                        <li className={`treeview${isTreeActive([
                            "/cards.html"
                        ]) ? " active current-page" : ""}${openMenus["auth"] ? " open" : ""}`}>
                            <a href="#auth" onClick={e => { e.preventDefault(); handleTreeToggle("auth"); }}>
                                <i className="bi bi-code-square"></i>
                                <span className="menu-text">Authentication</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["auth"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/cards.html">User Roles</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};




/* Branch Sidebar */
export const Branch_Sidebar = () => {
    const location = useLocation();

    // Track which treeview menus are open
    const [openMenus, setOpenMenus] = useState({});

    // Helper to check if a route is active
    const isActive = (path) => location.pathname === path;

    // Helper for treeview menu to check if any child is active
    const isTreeActive = (paths) => paths.some(path => location.pathname === path);

    // Toggle treeview open/close
    const handleTreeToggle = (key) => {
        setOpenMenus((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <>
            <nav id="sidebar" className="sidebar-wrapper">
                <div className="shop-profile">
                    <p className="mb-1 fw-bold text-primary">Walmart</p>
                    <p className="m-0">Los Angeles, California</p>
                </div>
                <div className="sidebarMenuScroll">
                    <ul className="sidebar-menu">
                        <li className={isActive("/dashboard") ? "active current-page" : ""}>
                            <Link to="/dashboard">
                                <i className="bi bi-pie-chart"></i>
                                <span className="menu-text">Dashboard</span>
                            </Link>
                        </li>
                        <li className={isActive("/overview") ? "active current-page" : ""}>
                            <Link to="/overview">
                                <i className="bi bi-bar-chart-line"></i>
                                <span className="menu-text">Overview</span>
                            </Link>
                        </li>

                        {/* Branches */}
                        <li className={`treeview${isTreeActive(["/accordions.html", "/alerts.html", "/buttons.html"]) ? " active current-page" : ""}${openMenus["branches"] ? " open" : ""}`}>
                            <a href="#branches" onClick={e => { e.preventDefault(); handleTreeToggle("branches"); }}>
                                <i className="bi bi-stickies"></i>
                                <span className="menu-text">Members</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["branches"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/accordions.html">All Members</Link>
                                </li>
                                <li>
                                    <Link to="/alerts.html">Add Members</Link>
                                </li>
                                <li>
                                    <Link to="/buttons.html">Members Profile</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Pastors */}
                        <li className={`treeview${isTreeActive([
                            "/form-inputs.html",
                            "/form-checkbox-radio.html",
                            "/form-file-input.html",
                            "/form-validations.html"
                        ]) ? " active current-page" : ""}${openMenus["pastors"] ? " open" : ""}`}>
                            <a href="#pastors" onClick={e => { e.preventDefault(); handleTreeToggle("pastors"); }}>
                                <i className="bi bi-ui-checks-grid"></i>
                                <span className="menu-text">Attendance</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["pastors"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/form-inputs.html">Mark Attendance</Link>
                                </li>
                                <li>
                                    <Link to="/form-checkbox-radio.html">View Attendance</Link>
                                </li>
                                <li>
                                    <Link to="/form-file-input.html">Attendance Report</Link>
                                </li>
                                <li>
                                    <Link to="/form-validations.html">Remove/Suspend</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Members */}
                        <li className={`treeview${isTreeActive([
                            "/create-invoice.html",
                            "/view-invoice.html"
                        ]) ? " active current-page" : ""}${openMenus["members"] ? " open" : ""}`}>
                            <a href="#members" onClick={e => { e.preventDefault(); handleTreeToggle("members"); }}>
                                <i className="bi bi-window-sidebar"></i>
                                <span className="menu-text">Dues & Payments</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["members"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/create-invoice.html">All Dues</Link>
                                </li>
                                <li>
                                    <Link to="/view-invoice.html">Assign Dues</Link>
                                </li>
                                 <li>
                                    <Link to="/view-invoice.html">Payment History</Link>
                                </li>
                                 <li>
                                    <Link to="/view-invoice.html">Outstanding Dues</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Attendance */}
                        <li className={`treeview${isTreeActive([
                            "/attendance-national",
                            "/attendance-branch"
                        ]) ? " active current-page" : ""}${openMenus["attendance"] ? " open" : ""}`}>
                            <a href="#attendance" onClick={e => { e.preventDefault(); handleTreeToggle("attendance"); }}>
                                <i className="bi bi-window-sidebar"></i>
                                <span className="menu-text">Events</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["attendance"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/attendance-national">Upcoming Events</Link>
                                </li>
                                <li>
                                    <Link to="/attendance-branch">Create Event</Link>
                                </li>
                                 <li>
                                    <Link to="/attendance-branch">Past Events</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Dues & Payments */}
                        <li className={`treeview${isTreeActive([
                            "/dues-all",
                            "/dues-summary"
                        ]) ? " active current-page" : ""}${openMenus["dues"] ? " open" : ""}`}>
                            <a href="#dues" onClick={e => { e.preventDefault(); handleTreeToggle("dues"); }}>
                                <i className="bi bi-window-sidebar"></i>
                                <span className="menu-text">Dues & Payments</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["dues"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/dues-all">All Dues</Link>
                                </li>
                                <li>
                                    <Link to="/dues-summary">Payment Summary</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Events */}
                        <li className={`treeview${isTreeActive([
                            "/events-national",
                            "/events-branch"
                        ]) ? " active current-page" : ""}${openMenus["events"] ? " open" : ""}`}>
                            <a href="#events" onClick={e => { e.preventDefault(); handleTreeToggle("events"); }}>
                                <i className="bi bi-window-sidebar"></i>
                                <span className="menu-text">Reports</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["events"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/events-national">Dues Report</Link>
                                </li>
                                <li>
                                    <Link to="/events-branch">Attendance Report</Link>
                                </li>
                                 <li>
                                    <Link to="/events-branch">Event Report</Link>
                                </li>
                                 <li>
                                    <Link to="/events-branch">Branch Report</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Reports */}
                        <li className={`treeview${isTreeActive([
                            "/reports-branch",
                            "/reports-attendance",
                            "/reports-payments"
                        ]) ? " active current-page" : ""}${openMenus["reports"] ? " open" : ""}`}>
                            <a href="#reports" onClick={e => { e.preventDefault(); handleTreeToggle("reports"); }}>
                                <i className="bi bi-window-sidebar"></i>
                                <span className="menu-text">Settings</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["reports"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/reports-branch">Profile Settings</Link>
                                </li>
                                <li>
                                    <Link to="/reports-attendance">Notification Settings</Link>
                                </li>
                                <li>
                                    <Link to="/reports-payments">System Configuration</Link>
                                </li>
                            </ul>
                        </li>

                       <li className={isActive("/overview") ? "active current-page" : ""}>
                            <Link to="/overview">
                                <i className="bi bi-bar-chart-line"></i>
                                <span className="menu-text">Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export const User_Sidebar = () => {
    const location = useLocation();

    // Track which treeview menus are open
    const [openMenus, setOpenMenus] = useState({});

    // Helper to check if a route is active
    const isActive = (path) => location.pathname === path;

    // Helper for treeview menu to check if any child is active
    const isTreeActive = (paths) => paths.some(path => location.pathname === path);

    // Toggle treeview open/close
    const handleTreeToggle = (key) => {
        setOpenMenus((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <>
            <nav id="sidebar" className="sidebar-wrapper">
                <div className="shop-profile">
                    <p className="mb-1 fw-bold text-primary">Walmart</p>
                    <p className="m-0">Los Angeles, California</p>
                </div>
                <div className="sidebarMenuScroll">
                    <ul className="sidebar-menu">
                        <li className={isActive("/dashboard") ? "active current-page" : ""}>
                            <Link to="/dashboard">
                                <i className="bi bi-pie-chart"></i>
                                <span className="menu-text">Dashboard</span>
                            </Link>
                        </li>
                        <li className={isActive("/overview") ? "active current-page" : ""}>
                            <Link to="/overview">
                                <i className="bi bi-bar-chart-line"></i>
                                <span className="menu-text">Overview</span>
                            </Link>
                        </li>

                        {/* Branches */}
                        <li className={`treeview${isTreeActive(["/accordions.html", "/alerts.html", "/buttons.html"]) ? " active current-page" : ""}${openMenus["branches"] ? " open" : ""}`}>
                            <a href="#branches" onClick={e => { e.preventDefault(); handleTreeToggle("branches"); }}>
                                <i className="bi bi-stickies"></i>
                                <span className="menu-text">Members</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["branches"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/accordions.html">All Members</Link>
                                </li>
                                <li>
                                    <Link to="/alerts.html">Add Members</Link>
                                </li>
                                <li>
                                    <Link to="/buttons.html">Members Profile</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Pastors */}
                        <li className={`treeview${isTreeActive([
                            "/form-inputs.html",
                            "/form-checkbox-radio.html",
                            "/form-file-input.html",
                            "/form-validations.html"
                        ]) ? " active current-page" : ""}${openMenus["pastors"] ? " open" : ""}`}>
                            <a href="#pastors" onClick={e => { e.preventDefault(); handleTreeToggle("pastors"); }}>
                                <i className="bi bi-ui-checks-grid"></i>
                                <span className="menu-text">Attendance</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["pastors"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/form-inputs.html">Mark Attendance</Link>
                                </li>
                                <li>
                                    <Link to="/form-checkbox-radio.html">View Attendance</Link>
                                </li>
                                <li>
                                    <Link to="/form-file-input.html">Attendance Report</Link>
                                </li>
                                <li>
                                    <Link to="/form-validations.html">Remove/Suspend</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Members */}
                        <li className={`treeview${isTreeActive([
                            "/create-invoice.html",
                            "/view-invoice.html"
                        ]) ? " active current-page" : ""}${openMenus["members"] ? " open" : ""}`}>
                            <a href="#members" onClick={e => { e.preventDefault(); handleTreeToggle("members"); }}>
                                <i className="bi bi-window-sidebar"></i>
                                <span className="menu-text">Dues & Payments</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["members"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/create-invoice.html">All Dues</Link>
                                </li>
                                <li>
                                    <Link to="/view-invoice.html">Assign Dues</Link>
                                </li>
                                 <li>
                                    <Link to="/view-invoice.html">Payment History</Link>
                                </li>
                                 <li>
                                    <Link to="/view-invoice.html">Outstanding Dues</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Attendance */}
                        <li className={`treeview${isTreeActive([
                            "/attendance-national",
                            "/attendance-branch"
                        ]) ? " active current-page" : ""}${openMenus["attendance"] ? " open" : ""}`}>
                            <a href="#attendance" onClick={e => { e.preventDefault(); handleTreeToggle("attendance"); }}>
                                <i className="bi bi-window-sidebar"></i>
                                <span className="menu-text">Events</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["attendance"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/attendance-national">Upcoming Events</Link>
                                </li>
                                <li>
                                    <Link to="/attendance-branch">Create Event</Link>
                                </li>
                                 <li>
                                    <Link to="/attendance-branch">Past Events</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Dues & Payments */}
                        <li className={`treeview${isTreeActive([
                            "/dues-all",
                            "/dues-summary"
                        ]) ? " active current-page" : ""}${openMenus["dues"] ? " open" : ""}`}>
                            <a href="#dues" onClick={e => { e.preventDefault(); handleTreeToggle("dues"); }}>
                                <i className="bi bi-window-sidebar"></i>
                                <span className="menu-text">Dues & Payments</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["dues"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/dues-all">All Dues</Link>
                                </li>
                                <li>
                                    <Link to="/dues-summary">Payment Summary</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Events */}
                        <li className={`treeview${isTreeActive([
                            "/events-national",
                            "/events-branch"
                        ]) ? " active current-page" : ""}${openMenus["events"] ? " open" : ""}`}>
                            <a href="#events" onClick={e => { e.preventDefault(); handleTreeToggle("events"); }}>
                                <i className="bi bi-window-sidebar"></i>
                                <span className="menu-text">Reports</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["events"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/events-national">Dues Report</Link>
                                </li>
                                <li>
                                    <Link to="/events-branch">Attendance Report</Link>
                                </li>
                                 <li>
                                    <Link to="/events-branch">Event Report</Link>
                                </li>
                                 <li>
                                    <Link to="/events-branch">Branch Report</Link>
                                </li>
                            </ul>
                        </li>

                        {/* Reports */}
                        <li className={`treeview${isTreeActive([
                            "/reports-branch",
                            "/reports-attendance",
                            "/reports-payments"
                        ]) ? " active current-page" : ""}${openMenus["reports"] ? " open" : ""}`}>
                            <a href="#reports" onClick={e => { e.preventDefault(); handleTreeToggle("reports"); }}>
                                <i className="bi bi-window-sidebar"></i>
                                <span className="menu-text">Settings</span>
                                {/* Removed duplicate chevron */}
                            </a>
                            <ul className="treeview-menu" style={{ display: openMenus["reports"] ? "block" : "none" }}>
                                <li>
                                    <Link to="/reports-branch">Profile Settings</Link>
                                </li>
                                <li>
                                    <Link to="/reports-attendance">Notification Settings</Link>
                                </li>
                                <li>
                                    <Link to="/reports-payments">System Configuration</Link>
                                </li>
                            </ul>
                        </li>

                       <li className={isActive("/overview") ? "active current-page" : ""}>
                            <Link to="/overview">
                                <i className="bi bi-bar-chart-line"></i>
                                <span className="menu-text">Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};


export default Sidebar;