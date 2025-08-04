import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthValidation from "./Components/authentication/auth_validate";



// Spline area chart options and series
const areaChartOptions = {
  chart: {
    type: "area",
    height: 160,
    toolbar: { show: false }
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: "smooth",
    width: 2
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  colors: ["#0d6efd"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 90, 100]
    }
  },
  grid: { show: false },
  legend: { show: false }
};
const areaChartSeries = [
  {
    name: "Tasks",
    data: [5, 8, 6, 10, 7, 12, 9]
  }
];

// Stacked area chart options and series
const stackedAreaChartOptions = {
  chart: {
    type: "area",
    stacked: true,
    height: 200,
    toolbar: { show: false }
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: "smooth",
    width: 2
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
  },
  colors: ["#0d6efd", "#ffc107", "#dc3545"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 90, 100]
    }
  },
  legend: { position: "top" },
  grid: { show: false }
};
const stackedAreaChartSeries = [
  {
    name: "Income",
    data: [44, 55, 41, 67, 22, 43, 21]
  },
  {
    name: "Expenses",
    data: [13, 23, 20, 8, 13, 27, 33]
  },
  {
    name: "Profit",
    data: [11, 17, 15, 15, 21, 14, 15]
  }
];

const Dashboard = () => {


  const { token, handleLogout } = useAuthValidation();




  const chartOptions = {
    chart: {
      id: "basic-bar",
      stacked: true // Enable stacked chart
    },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false
      }
    }
  };
  const chartSeries = [
    { name: "Adult", data: [30, 55, 75, 80, 60] },
    { name: "Youth", data: [0, 30, 35, 40, 50] },
    { name: "Children", data: [10, 20, 25, 30, 40] },
  ];

  // Initialize line chart options and series
  const lineChartOptions = {
    chart: {
      id: "sales-line",
      type: "line",
      toolbar: { show: false },
    },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },
    stroke: { curve: "smooth",width: 2 },
    markers: { size: 5 },
    colors: ["#0d6efd"]
  };
  const lineChartSeries = [
    {
      name: "Sales",
      data: [10, 30, 45, 60, 80]
    }
  ];


   const [countData, SetCountData] = useState({
    total_members: 0,
    total_branches: 0,
  });
  const [error, setError] = useState("");;

   useEffect(() => {
    const fetchcount = async () => {
      try {
        const response = await axios.get(
          "http://api.fremikeconsult.com/api/count-dashboard",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
          }
        );

        if (response.data.status === "success") {
          SetCountData({
            total_members: response.data.members,
            total_branches: response.data.branches,
          });
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Error fetching members data. Please try again.");
      }
    };

    fetchcount(); // Call the function on component mount
  }, []); 



  return (
    <>
      <div className="app-container">
        <div className="app-hero-header d-flex align-items-center">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <i className="bi bi-house lh-1 pe-3 me-3 border-end border-dark"></i>
              <Link to="/dashboard" className="text-decoration-none">Home</Link>
            </li>
            <li className="breadcrumb-item text-secondary" aria-current="page">
              Dashboard
            </li>
          </ol>
        </div>
        <div className="app-body">
          <div className="row gx-3">
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card mb-3">
                <div className="card-body">
                   <div className="arrow-label">+24%</div>
                  <div className="mb-2">
                    <i className="bi bi-bar-chart fs-1 text-primary lh-1"></i>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="m-0 text-secondary fw-normal">Members</h5>
                    {countData ? (
                       
                         <h3 className="m-0 text-primary">{countData.total_members}</h3>
                      ) : (
                        <p>No case data available.</p>
                      )}

                   
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card mb-3">
                <div className="card-body">
                   <div className="arrow-label">+24%</div>
                  <div className="mb-2">
                    <i className="bi bi-cash-stack fs-1 text-primary lh-1"></i>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="m-0 text-secondary fw-normal">Revenue</h5>
                    <h3 className="m-0 text-primary">2900</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="arrow-label">+18%</div>
                  <div className="mb-2">
                    <i className="bi bi-buildings fs-1 text-primary lh-1"></i>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="m-0 text-secondary fw-normal">Branches</h5>
                    {countData ? (
                       
                         <h3 className="m-0 text-primary">{countData.total_branches}</h3>
                      ) : (
                        <p>No case data available.</p>
                      )}

                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="arrow-label">+24%</div>
                  <div className="mb-2">
                    <i className="bi bi-person-rolodex fs-1 text-primary lh-1"></i>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="m-0 text-secondary fw-normal">Pastors</h5>
                    <h3 className="m-0 text-primary">7200</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row gx-3">
            <div className="col-xxl-12">
              <div className="card mb-3">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="card-title">Overview</h5>
                  <button className="btn btn-outline-primary btn-sm ms-auto">
                    Download
                  </button>
                </div>
                <div className="card-body">
                  <div className="row gx-3">
                    <div className="col-lg-5 col-sm-12 col-12">
                      <h6 className="text-center mb-3">Members 2025</h6>
                      <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="bar"
                        width="100%"
                        height={250}
                      />
                      <div className="my-3 text-center">
                        <div className="badge bg-danger bg-opacity-10 text-danger">
                          10% higher than last month
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-12 col-12">
                      <div className="border px-2 py-4 rounded-5 h-100 text-center">
                        <h6 className="mt-3 mb-5">Monthly Average</h6>
                        <div className="mb-5">
                          <h2 className="text-primary">9600</h2>
                          <h6 className="text-secondary fw-light">Visitors</h6>
                        </div>
                        <div className="mb-4">
                          <h2 className="text-danger">$450<sup>k</sup></h2>
                          <h6 className="text-secondary fw-light">Sales</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-sm-12 col-12">
                      <h6 className="text-center mb-3">Sales</h6>
                      {/* Render the line chart here */}
                      <Chart
                        options={lineChartOptions}
                        series={lineChartSeries}
                        type="line"
                        width="100%"
                        height={250}
                      />
                      <div className="my-3 text-center">
                        <div className="badge bg-primary bg-opacity-10 text-primary">
                          12% higher than last month
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row gx-3">
            <div className="col-xl-8 col-lg-12">
              <div className="card mb-3">
                <div className="card-header">
                  <h5 className="card-title">Team Activity</h5>
                </div>
                <div className="card-body">
                  <ul className="m-0 p-0">
                    <li className="team-activity d-flex flex-wrap">
                      <div className="activity-time py-2 me-3">
                        <p className="m-0">10:30AM</p>
                        <span className="badge bg-primary">New</span>
                      </div>
                      <div className="d-flex flex-column py-2">
                        <h6>Earth - Admin Dashboard</h6>
                        <p className="m-0 text-secondary">by Elnathan Lois</p>
                      </div>
                      <div className="ms-auto mt-4">
                        <div className="progress small mb-1">
                          <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25"
                              aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <p className="text-secondary">(225 of 700gb)</p>
                      </div>
                    </li>
                    <li className="team-activity d-flex flex-wrap">
                      <div className="activity-time py-2 me-3">
                        <p className="m-0">11:30AM</p>
                        <span className="badge bg-primary">Task</span>
                      </div>
                      <div className="d-flex flex-column py-2">
                        <h6>Bootstrap Gallery Admin Templates</h6>
                        <p className="m-0 text-secondary">by Patrobus Nicole</p>
                      </div>
                      <div className="ms-auto mt-4">
                        <div className="progress small mb-1">
                          <div className="progress-bar" role="progressbar" style={{width: "90%"}} aria-valuenow="90"
                              aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <p className="text-secondary">90% completed</p>
                      </div>
                    </li>
                    <li className="team-activity d-flex flex-wrap">
                      <div className="activity-time py-2 me-3">
                        <p className="m-0">12:50PM</p>
                        <span className="badge bg-danger">Closed</span>
                      </div>
                      <div className="d-flex flex-column py-2">
                        <h6>Bootstrap Admin Themes</h6>
                        <p className="m-0 text-secondary">by Abilene Omega</p>
                      </div>
                      <div className="ms-auto mt-3">
                        <div id="sparkline1"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-12">
              <div className="card mb-3">
                <div className="card-header">
                  <h5 className="card-title">Tasks</h5>
                </div>
                <div className="card-body">
                  <div className="auto-align-graph">
                    <div id="tasks"></div>
                    {/* Spline Area Chart rendered here (line 241) */}
                    <Chart
                      options={areaChartOptions}
                      series={areaChartSeries}
                      type="area"
                      width="100%"
                      height={160}
                    />
                  </div>
                  <div className="grid text-center">
                    <div className="g-col-4">
                      <i className="bi bi-triangle text-warning"></i>
                      <h3 className="m-0 mt-1">7</h3>
                      <p className="text-secondary m-0">Ongoing</p>
                    </div>
                    <div className="g-col-4">
                      <i className="bi bi-triangle text-primary"></i>
                      <h3 className="m-0 mt-1 fw-bolder">9</h3>
                      <p className="text-secondary m-0">Pending</p>
                    </div>
                    <div className="g-col-4">
                      <i className="bi bi-triangle text-danger"></i>
                      <h3 className="m-0 mt-1">12</h3>
                      <p className="text-secondary m-0">Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row gx-3">
            <div className="col-xl-4 col-sm-6">
              <div className="card mb-3">
                <div className="card-header">
                  <h5 className="card-title">Events</h5>
                </div>
                <div className="card-body">
                  <div className="bg-light px-3 py-2 d-flex justify-content-between align-items-center">
                    <div id="todays-date" className="fw-semibold"></div>
                    <div className="badge rounded-pill bg-primary fs-6">
                      <span>21</span> Events
                    </div>
                  </div>
                  <div className="event-list mt-3">
                    <div className="d-flex align-items-center mb-4">
                      <img src="assets/images/checked.svg" alt="Bootstrap Gallery" className="img-2x" />
                      <div className="ms-3">
                        <h6 className="text-primary mb-1 fw-bold">11:30AM</h6>
                        <h6 className="m-0 text-secondary fw-normal">
                          Product Launch
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-4">
                      <img src="assets/images/checked.svg" alt="Bootstrap Gallery" className="img-2x" />
                      <div className="ms-3">
                        <h6 className="text-primary mb-1 fw-bold">2:30PM</h6>
                        <h6 className="m-0 text-secondary fw-normal">
                          Code review
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <img src="assets/images/not-checked.svg" alt="Bootstrap Gallery" className="img-2x" />
                      <div className="ms-3">
                        <h6 className="text-primary mb-1 fw-bold">03:30PM</h6>
                        <h6 className="m-0 text-secondary fw-normal">
                          Product meeting with dev team
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6">
              <div className="card mb-3">
                <div className="card-header">
                  <h5 className="card-title">Income</h5>
                </div>
                <div className="card-body p-0">
                  <div id="income"></div>
                  <div className="p-3 mt-n3">
                    <div className="d-flex gap-3">
                      <div className="">
                        <h4 className="fw-semibold mb-1">1600k</h4>
                        <p className="text-secondary m-0">
                          <span className="bi bi-record-fill text-primary me-1"></span>Overall Income
                        </p>
                      </div>

                      <div className="">
                        <h4 className="fw-semibold mb-1">1200k</h4>
                        <p className="text-secondary m-0">
                          <span className="bi bi-record-fill text-danger me-1"></span>Overall Expenses
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Stacked Area Chart rendered here (line 359) */}
                  <div className="mt-4">
                    <Chart
                      options={stackedAreaChartOptions}
                      series={stackedAreaChartSeries}
                      type="area"
                      width="100%"
                      height={200}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-12">
              <div className="card mb-3">
                <div className="card-header">
                  <h5 className="card-title">Activity</h5>
                </div>
                <div className="card-body">
                  <div className="my-2 d-flex flex-column gap-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="m-0 fw-normal">Server down</h6>
                      <div className="badge bg-danger">High</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="m-0 fw-normal">Notification from bank</h6>
                      <div className="badge bg-primary">Low</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="m-0 fw-normal">Transaction success alert</h6>
                      <div className="badge bg-primary">Low</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="m-0 fw-normal">Critical issue</h6>
                      <div className="badge bg-danger">High</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="m-0 fw-normal">Bug fix</h6>
                      <div className="badge bg-danger">High</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="m-0 fw-normal">OS update</h6>
                      <div className="badge bg-primary">Low</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer/>
        </div>
      </div>
    </>
  );
};
export default Dashboard;



export const Branch =()=>{

  
  const { token, handleLogout } = useAuthValidation();



 // Sparkline chart options and series
 const sparklineOptions = {
   chart: {
     type: "line",
     sparkline: { enabled: true }
   },
   stroke: {
     curve: "smooth",
     width: 2
   },
   colors: ["#0d6efd"],
   tooltip: {
     enabled: false
   }
 };
 const sparklineSeries = [
   {
     data: [10, 25, 15, 30, 20, 35, 25]
   }
 ];
 
 
  const chartOptions = {
     chart: {
       id: "basic-bar",
       stacked: true // Enable stacked chart
     },
     xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"] },
     plotOptions: {
       bar: {
         borderRadius: 8,
         horizontal: false
       }
     }
   };
   const chartSeries = [
     { name: "Visitors", data: [30, 55, 75, 80, 60] },
     { name: "Sales", data: [0, 30, 35, 40, 50] },
     { name: "Orders", data: [10, 20, 25, 30, 40] },
   ];
 
   // Spline area chart options and series
 const areaChartOptions = {
   chart: {
     type: "area",
     height: 160,
     toolbar: { show: false }
   },
   dataLabels: { enabled: false },
   stroke: {
     curve: "smooth",
     width: 2
   },
   xaxis: {
     categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
   },
   colors: ["#0d6efd"],
   fill: {
     type: "gradient",
     gradient: {
       shadeIntensity: 1,
       opacityFrom: 0.5,
       opacityTo: 0.1,
       stops: [0, 90, 100]
     }
   },
   grid: { show: false },
   legend: { show: false }
 };
 const areaChartSeries = [
   {
     name: "Tasks",
     data: [5, 8, 6, 10, 7, 12, 9],
     
   },
    {
     name: "Tasks",
     data: [15, 44, 61, 65, 17, 50, 19],
     
   }
 ];
 
 
 // Stacked area chart options and series
 const stackedAreaChartOptions = {
   chart: {
     type: "area",
     stacked: true,
     height: 200,
     toolbar: { show: false }
   },
   dataLabels: { enabled: false },
   stroke: {
     curve: "smooth",
     width: 2
   },
   xaxis: {
     categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
   },
   colors: ["#0d6efd", "#ffc107", "#dc3545"],
   fill: {
     type: "gradient",
     gradient: {
       shadeIntensity: 1,
       opacityFrom: 0.5,
       opacityTo: 0.1,
       stops: [0, 90, 100]
     }
   },
   legend: { position: "top" },
   grid: { show: false }
 };
 const stackedAreaChartSeries = [
   {
     name: "Income",
     data: [44, 55, 41, 67, 22, 43, 21]
   },
   {
     name: "Expenses",
     data: [13, 23, 20, 8, 13, 27, 33]
   },
   {
     name: "Profit",
     data: [11, 17, 15, 15, 21, 14, 15]
   }
 ];
 
 
 
   return (
    <>
        <div className="app-container">
 
                 
                     <div className="app-hero-header d-flex align-items-start">
 
                         
                         <ol className="breadcrumb">
                             <li className="breadcrumb-item">
                                 <i className="bi bi-house lh-1"></i>
                                 <a to="index.html" className="text-decoration-none">Home</a>
                             </li>
                             <li className="breadcrumb-item" aria-current="page">Analytics</li>
                         </ol>
                         
                         
 
                     </div>
                     
                     <div className="app-body">
 
                     
                         <div className="row gx-3">
                             <div className="col-xl-7 col-12">
                                 <div className="card mb-3">
                                     <div className="card-header">
                                         <h5 className="card-title">Statistics</h5>
                                     </div>
                                     <div className="card-body">
                                         <Chart
                                                                 options={chartOptions}
                                                                 series={chartSeries}
                                                                 type="bar"
                                                                 width="100%"
                                                                 height={250}
                                                               />
                                     </div>
                                 </div>
                             </div>
                             <div className="col-xl-5 col-12">
                                 <div className="card mb-3">
                                     <div className="card-header">
                                         <h5 className="card-title">Active Users</h5>
                                     </div>
                                     <div className="card-body">
                                         <Chart
                                                              options={areaChartOptions}
                                                              series={areaChartSeries}
                                                              type="area"
                                                              width="100%"
                                                              height={160}
                                                            />
                                         
                                         <div className="row g-2">
                                             <div className="col-sm-4 col-4 v-curve-seperator">
                                                 <div className="border p-2 rounded-2 text-center">
                                                     <h3 className="m-0 text-primary">900</h3>
                                                     <p className="m-0">Likes</p>
                                                 </div>
                                             </div>
                                             <div className="col-sm-4 col-4 v-curve-seperator">
                                                 <div className="border p-2 rounded-2 text-center">
                                                     <h3 className="m-0 text-primary">600</h3>
                                                     <p className="m-0">Shares</p>
                                                 </div>
                                             </div>
                                             <div className="col-sm-4 col-4 ">
                                                 <div className="border p-2 rounded-2 text-center">
                                                     <h3 className="m-0 text-primary">400</h3>
                                                     <p className="m-0">Clicks</p>
                                                 </div>
                                             </div>
                                         </div>
                                         
                                     </div>
                                 </div>
                             </div>
                         </div>
                         
                         <div className="row gx-3">
                             <div className="col-xl-3 col-sm-6 col-12">
                                 <div className="card mb-3">
                                     <div className="card-body">
                                         <div className="d-flex align-items-center flex-row">
                                             <div className="d-flex align-items-center">
                                                 <div className="border border-primary grd-primary-light rounded-4 p-3">
                                                     <i className="bi bi-check-circle text-primary fs-3 lh-1"></i>
                                                 </div>
                                                 <div className="mx-3">
                                                     <h3 className="m-0">1800</h3>
                                                     <p className="m-0 text-secondary">Likes</p>
                                                 </div>
                                             </div>
                                             {/* Sparkline chart rendered here (line 184) */}
                                             <div className="ms-auto" style={{ width: 80, height: 32 }}>
                                                 <Chart
                                                   options={sparklineOptions}
                                                   series={sparklineSeries}
                                                   type="line"
                                                   width={80}
                                                   height={32}
                                                 />
                                               </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="col-xl-3 col-sm-6 col-12">
                                 <div className="card mb-3">
                                     <div className="card-body">
                                         <div className="d-flex align-items-center flex-row">
                                             <div className="d-flex align-items-center">
                                                 <div className="border border-primary grd-primary-light rounded-4 p-3">
                                                     <i className="bi bi-check-circle text-primary fs-3 lh-1"></i>
                                                 </div>
                                                 <div className="mx-3">
                                                     <h3 className="m-0">4500</h3>
                                                     <p className="m-0 text-secondary">Views</p>
                                                 </div>
                                             </div>
                                             <div id="sparklineLine2" className="ms-auto"></div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="col-xl-3 col-sm-6 col-12">
                                 <div className="card mb-3">
                                     <div className="card-body">
                                         <div className="d-flex align-items-center flex-row">
                                             <div className="d-flex align-items-center">
                                                 <div className="border border-primary grd-primary-light rounded-4 p-3">
                                                     <i className="bi bi-check-circle text-primary fs-3 lh-1"></i>
                                                 </div>
                                                 <div className="mx-3">
                                                     <h3 className="m-0">3200</h3>
                                                     <p className="m-0 text-secondary">Users</p>
                                                 </div>
                                             </div>
                                             <div id="sparklineLine3" className="ms-auto"></div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="col-xl-3 col-sm-6 col-12">
                                 <div className="card mb-3">
                                     <div className="card-body">
                                         <div className="d-flex align-items-center flex-row">
                                             <div className="d-flex align-items-center">
                                                 <div className="border border-danger grd-danger-light rounded-4 p-3">
                                                     <i className="bi bi-check-circle text-danger fs-3 lh-1"></i>
                                                 </div>
                                                 <div className="mx-3">
                                                     <h3 className="m-0">9700</h3>
                                                     <p className="m-0 text-secondary">Sales</p>
                                                 </div>
                                             </div>
                                             <div id="sparklineLine4" className="ms-auto"></div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         
                         <div className="row gx-3">
                             <div className="col-xl-12">
                                 <div className="card mb-3">
                                     <div className="card-header">
                                         <h5 className="card-title">Visitors</h5>
                                     </div>
                                     <div className="card-body">
                                         <Chart
                                                              options={stackedAreaChartOptions}
                                                              series={stackedAreaChartSeries}
                                                              type="area"
                                                              width="100%"
                                                              height={200}
                                                            />
                                     </div>
                                 </div>
                             </div>
                             <div className="col-xl-4 col-12"></div>
                         </div>
                         
                       
                         <div className="row gx-3">
                             <div className="col-xl-4 col-sm-6 col-12">
                                 <div className="card mb-3">
                                     <div className="card-header">
                                         <h5 className="card-title">Transfer History</h5>
                                     </div>
                                     <div className="card-body">
                                         <div className="scroll300">
                                             <ul className="list-unstyled d-grid gap-3">
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-primary rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     New admin theme purchased.
                                                 </li>
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-success rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     Best admin dashboard template.
                                                 </li>
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-warning rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     Bootstrap admin dashboard themes.
                                                 </li>
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-danger rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     Best admin dashboards.
                                                 </li>
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-primary rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     Responsive admin themes.
                                                 </li>
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-success rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     Latest admin dashboards.
                                                 </li>
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-warning rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     Responsive admin dashboards.
                                                 </li>
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-danger rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     Best admin themes.
                                                 </li>
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-primary rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     Latest admin dashboards.
                                                 </li>
                                             </ul>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="col-xl-4 col-sm-6 col-12">
                                 <div className="card mb-3">
                                     <div className="card-header">
                                         <h5 className="card-title">Events</h5>
                                     </div>
                                     <div className="card-body">
                                         <div className="scroll300">
                                             <ul className="m-0 p-0">
                                                 <li className="team-activity d-flex">
                                                     <div className="activity-time py-2 me-3">
                                                         <p className="m-0">10:30AM</p>
                                                         <span className="badge bg-primary">Live</span>
                                                     </div>
                                                     <div className="d-flex flex-column py-2">
                                                         <h6>Mercuty Admin Dashboard</h6>
                                                         <p className="m-0 text-secondary">by Srinu Basava</p>
                                                     </div>
                                                 </li>
                                                 <li className="team-activity d-flex">
                                                     <div className="activity-time py-2 me-3">
                                                         <p className="m-0">11:00AM</p>
                                                         <span className="badge bg-primary">Live</span>
                                                     </div>
                                                     <div className="d-flex flex-column py-2">
                                                         <h6>Venus Admin Dashboard</h6>
                                                         <p className="m-0 text-secondary">by Sandhya Balla</p>
                                                     </div>
                                                 </li>
                                                 <li className="team-activity d-flex">
                                                     <div className="activity-time py-2 me-3">
                                                         <p className="m-0">11:30AM</p>
                                                         <span className="badge bg-danger">New</span>
                                                     </div>
                                                     <div className="d-flex flex-column py-2">
                                                         <h6>Earth Admin Dashboard</h6>
                                                         <p className="m-0 text-secondary">by Abilene Omega</p>
                                                     </div>
                                                 </li>
                                                 <li className="team-activity d-flex">
                                                     <div className="activity-time py-2 me-3">
                                                         <p className="m-0">12:00PM</p>
                                                         <span className="badge bg-primary">Live</span>
                                                     </div>
                                                     <div className="d-flex flex-column py-2">
                                                         <h6>Mars Admin Dashboard</h6>
                                                         <p className="m-0 text-secondary">by Srinu Basava</p>
                                                     </div>
                                                 </li>
                                                 <li className="team-activity d-flex">
                                                     <div className="activity-time py-2 me-3">
                                                         <p className="m-0">12:30PM</p>
                                                         <span className="badge bg-primary">Live</span>
                                                     </div>
                                                     <div className="d-flex flex-column py-2">
                                                         <h6>Jupiter Admin Dashboard</h6>
                                                         <p className="m-0 text-secondary">by Sandhya Balla</p>
                                                     </div>
                                                 </li>
                                                 <li className="team-activity d-flex">
                                                     <div className="activity-time py-2 me-3">
                                                         <p className="m-0">01:00PM</p>
                                                         <span className="badge bg-danger">New</span>
                                                     </div>
                                                     <div className="d-flex flex-column py-2">
                                                         <h6>Unify Admin Dashboard</h6>
                                                         <p className="m-0 text-secondary">by Srinu Basava</p>
                                                     </div>
                                                 </li>
                                             </ul>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="col-xl-4 col-sm-6 col-md-12">
                                 <div className="card mb-3">
                                     <div className="card-header">
                                         <h5 className="card-title">Head Pastor</h5>
                                     </div>
                                     <div className="card-body">
                                         <div className="scroll300">
                                             <div className="my-2">
                                                 <div className="d-flex position-relative activity-block">
                                                     <img src="assets/images/user1.png" className="img-5x me-3 rounded-circle activity-user"
                                                         alt="Admin Dashboard" />
                                                     <div className="mb-5">
                                                         <h6 className="fw-semibold">Rev. Prince Atta Poku</h6>
                                                         <p className="text-secondary mb-1">Since 2023</p>
                                                         <p>Service ID: 26788</p>
                                                         <span className="bg-warning bg-opacity-10 p-2">Tema Branch - Present</span>
                                                     </div>
                                                 </div>
 
                                                 <div className="d-flex position-relative activity-block">
                                                     <img src="assets/images/user1.png" className="img-5x me-3 rounded-circle activity-user"
                                                         alt="Admin Dashboard" />
                                                     <div className="mb-5">
                                                         <h6 className="fw-semibold">Sofo Maame</h6>
                                                         <p className="text-secondary mb-1">Since 2023</p>
                                                         <p>Service ID: 26788</p>
                                                         
                                                         <span className="bg-warning bg-opacity-10 p-2">Tema Branch - Present</span>
                                                     </div>
                                                 </div>
                                                 
                                                 
                                               
                                                 
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         
                         <div className="row gx-3">
                             <div className="col-xxl-6 col-sm-12 col-12">
                                 <div className="card mb-3">
                                     <div className="card-header">
                                         <h5 className="card-title">Page Views</h5>
                                     </div>
                                     <div className="card-body">
                                         <div className="table-responsive">
                                             <table className="table align-middle">
                                                 <thead>
                                                     <tr>
                                                         <th>Link</th>
                                                         <th>Page Title</th>
                                                         <th>Visitors</th>
                                                         <th>Percentage</th>
                                                         <th>Growth</th>
                                                     </tr>
                                                 </thead>
                                                 <tbody>
                                                     <tr className="grd-info-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>Home</td>
                                                         <td>56,000</td>
                                                         <td>
                                                             <div className="progress lg progress-spacer">
                                                                 <div className="progress-bar bg-primary" role="progressbar" style={{width: "50%"}}
                                                                     aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                             </div>
                                                         </td>
                                                         <td>
                                                             <p className="m-0 text-info">8% high</p>
                                                         </td>
                                                     </tr>
                                                     <tr className="grd-success-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>About</td>
                                                         <td>35,000</td>
                                                         <td>
                                                             <div className="progress lg progress-spacer">
                                                                 <div className="progress-bar bg-success" role="progressbar" style={{width: "60%"}}
                                                                     aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                             </div>
                                                         </td>
                                                         <td>
                                                             <p className="m-0 text-success">12% low</p>
                                                         </td>
                                                     </tr>
                                                     <tr className="grd-warning-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>Contact</td>
                                                         <td>28,000</td>
                                                         <td>
                                                             <div className="progress lg progress-spacer">
                                                                 <div className="progress-bar bg-warning" role="progressbar" style={{width: "70%"}}
                                                                     aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                                             </div>
                                                         </td>
                                                         <td>
                                                             <p className="m-0 text-warning">15% high</p>
                                                         </td>
                                                     </tr>
                                                     <tr className="grd-danger-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>Services</td>
                                                         <td>33,000</td>
                                                         <td>
                                                             <div className="progress lg progress-spacer">
                                                                 <div className="progress-bar bg-danger" role="progressbar" style={{width: "80%"}}
                                                                     aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                                             </div>
                                                         </td>
                                                         <td>
                                                             <p className="m-0 text-danger">9% high</p>
                                                         </td>
                                                     </tr>
                                                     <tr className="grd-primary-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>Products</td>
                                                         <td>98,000</td>
                                                         <td>
                                                             <div className="progress lg progress-spacer">
                                                                 <div className="progress-bar bg-primary" role="progressbar" style={{width: "90%"}}
                                                                     aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                                             </div>
                                                         </td>
                                                         <td>
                                                             <p className="m-0 text-primary">3% low</p>
                                                         </td>
                                                     </tr>
                                                 </tbody>
                                             </table>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="col-xxl-6 col-sm-12 col-12">
                                 <div className="card mb-3">
                                     <div className="card-header">
                                         <h5 className="card-title">Clicks</h5>
                                     </div>
                                     <div className="card-body">
                                         <div className="table-responsive">
                                             <table className="table align-middle">
                                                 <thead>
                                                     <tr>
                                                         <th>Link</th>
                                                         <th>Page Title</th>
                                                         <th>Visitors</th>
                                                         <th>Percentage</th>
                                                         <th>Growth</th>
                                                     </tr>
                                                 </thead>
                                                 <tbody>
                                                     <tr className="grd-info-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>Home</td>
                                                         <td>56,000</td>
                                                         <td>25%</td>
                                                         <td>
                                                             <p className="m-0 text-info">8% high</p>
                                                         </td>
                                                     </tr>
                                                     <tr className="grd-success-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>About</td>
                                                         <td>35,000</td>
                                                         <td>23%</td>
                                                         <td>
                                                             <p className="m-0 text-success">12% low</p>
                                                         </td>
                                                     </tr>
                                                     <tr className="grd-warning-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>Contact</td>
                                                         <td>28,000</td>
                                                         <td>18%</td>
                                                         <td>
                                                             <p className="m-0 text-warning">15% high</p>
                                                         </td>
                                                     </tr>
                                                     <tr className="grd-danger-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>Services</td>
                                                         <td>33,000</td>
                                                         <td>12%</td>
                                                         <td>
                                                             <p className="m-0 text-success">9% high</p>
                                                         </td>
                                                     </tr>
                                                     <tr className="grd-primary-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>Products</td>
                                                         <td>98,000</td>
                                                         <td>16%</td>
                                                         <td>
                                                             <p className="m-0 text-primary">3% low</p>
                                                         </td>
                                                     </tr>
                                                 </tbody>
                                             </table>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         
 
                     </div>
                     
                     
 
                 </div>
    </>
   );

   
}

export const User = () => {

  
  const { token, handleLogout } = useAuthValidation();


 // Sparkline chart options and series
 const sparklineOptions = {
   chart: {
     type: "line",
     sparkline: { enabled: true }
   },
   stroke: {
     curve: "smooth",
     width: 2
   },
   colors: ["#0d6efd"],
   tooltip: {
     enabled: false
   }
 };
 const sparklineSeries = [
   {
     data: [10, 25, 15, 30, 20, 35, 25]
   }
 ];
 
 
 // Stacked area chart options and series
 const stackedAreaChartOptions = {
   chart: {
     type: "area",
     stacked: true,
     height: 200,
     toolbar: { show: false }
   },
   dataLabels: { enabled: false },
   stroke: {
     curve: "smooth",
     width: 2
   },
   xaxis: {
     categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
   },
   colors: ["#0d6efd", "#ffc107", "#dc3545"],
   fill: {
     type: "gradient",
     gradient: {
       shadeIntensity: 1,
       opacityFrom: 0.5,
       opacityTo: 0.1,
       stops: [0, 90, 100]
     }
   },
   legend: { position: "top" },
   grid: { show: false }
 };
 const stackedAreaChartSeries = [
   {
     name: "Income",
     data: [44, 55, 41, 67, 22, 43, 21]
   },
   {
     name: "Expenses",
     data: [13, 23, 20, 8, 13, 27, 33]
   },
   {
     name: "Profit",
     data: [11, 17, 15, 15, 21, 14, 15]
   }
 ];
 
 
 
   return (
    <>
        <div className="app-container">
 
                 
                     <div className="app-hero-header d-flex align-items-start">
 
                         
                       
                         
 
                     </div>
                     
                     <div className="app-body">
 
                     
                      
                         
                         <div className="row gx-3">
                             <div className="col-xl-3 col-sm-6 col-12">
                                 <div className="card mb-3">
                                     <div className="card-body">
                                         <div className="d-flex align-items-center flex-row">
                                             <div className="d-flex align-items-center">
                                                 <div className="border border-primary grd-primary-light rounded-4 p-3">
                                                     <i className="bi bi-check-circle text-primary fs-3 lh-1"></i>
                                                 </div>
                                                 <div className="mx-3">
                                                     <h3 className="m-0">1800</h3>
                                                     <p className="m-0 text-secondary">Likes</p>
                                                 </div>
                                             </div>
                                             {/* Sparkline chart rendered here (line 184) */}
                                             <div className="ms-auto" style={{ width: 80, height: 32 }}>
                                                 <Chart
                                                   options={sparklineOptions}
                                                   series={sparklineSeries}
                                                   type="line"
                                                   width={80}
                                                   height={32}
                                                 />
                                               </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="col-xl-3 col-sm-6 col-12">
                                 <div className="card mb-3">
                                     <div className="card-body">
                                         <div className="d-flex align-items-center flex-row">
                                             <div className="d-flex align-items-center">
                                                 <div className="border border-primary grd-primary-light rounded-4 p-3">
                                                     <i className="bi bi-check-circle text-primary fs-3 lh-1"></i>
                                                 </div>
                                                 <div className="mx-3">
                                                     <h3 className="m-0">4500</h3>
                                                     <p className="m-0 text-secondary">Views</p>
                                                 </div>
                                             </div>
                                             <div id="sparklineLine2" className="ms-auto"></div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="col-xl-3 col-sm-6 col-12">
                                 <div className="card mb-3">
                                     <div className="card-body">
                                         <div className="d-flex align-items-center flex-row">
                                             <div className="d-flex align-items-center">
                                                 <div className="border border-primary grd-primary-light rounded-4 p-3">
                                                     <i className="bi bi-check-circle text-primary fs-3 lh-1"></i>
                                                 </div>
                                                 <div className="mx-3">
                                                     <h3 className="m-0">3200</h3>
                                                     <p className="m-0 text-secondary">Users</p>
                                                 </div>
                                             </div>
                                             <div id="sparklineLine3" className="ms-auto"></div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="col-xl-3 col-sm-6 col-12">
                                 <div className="card mb-3">
                                     <div className="card-body">
                                         <div className="d-flex align-items-center flex-row">
                                             <div className="d-flex align-items-center">
                                                 <div className="border border-danger grd-danger-light rounded-4 p-3">
                                                     <i className="bi bi-check-circle text-danger fs-3 lh-1"></i>
                                                 </div>
                                                 <div className="mx-3">
                                                     <h3 className="m-0">9700</h3>
                                                     <p className="m-0 text-secondary">Sales</p>
                                                 </div>
                                             </div>
                                             <div id="sparklineLine4" className="ms-auto"></div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         
                         <div className="row gx-3">
                             <div className="col-xl-12">
                                 <div className="card mb-3">
                                     <div className="card-header">
                                         <h5 className="card-title">Visitors</h5>
                                     </div>
                                     <div className="card-body">
                                         <Chart
                                                              options={stackedAreaChartOptions}
                                                              series={stackedAreaChartSeries}
                                                              type="area"
                                                              width="100%"
                                                              height={200}
                                                            />
                                     </div>
                                 </div>
                             </div>
                             <div className="col-xl-4 col-12"></div>
                         </div>
                         
                       
                         <div className="row gx-3">
                             <div className="col-xl-4 col-sm-6 col-12">
                                 <div className="card mb-3">
                                     <div className="card-header">
                                         <h5 className="card-title">Transfer History</h5>
                                     </div>
                                     <div className="card-body">
                                         <div className="scroll300">
                                             <ul className="list-unstyled d-grid gap-3">
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-primary rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     New admin theme purchased.
                                                 </li>
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-success rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     Best admin dashboard template.
                                                 </li>
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-warning rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     Bootstrap admin dashboard themes.
                                                 </li>
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-danger rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     Best admin dashboards.
                                                 </li>
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-primary rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     Responsive admin themes.
                                                 </li>
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-success rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     Latest admin dashboards.
                                                 </li>
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-warning rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     Responsive admin dashboards.
                                                 </li>
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-danger rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     Best admin themes.
                                                 </li>
                                                 <li className="d-flex align-items-center">
                                                     <span className="icon-box md bg-primary rounded-circle me-2">
                                                         <i className="bi bi-bag text-white fs-4"></i>
                                                     </span>
                                                     Latest admin dashboards.
                                                 </li>
                                             </ul>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="col-xl-4 col-sm-6 col-12">
                                 <div className="card mb-3">
                                     <div className="card-header">
                                         <h5 className="card-title">Events</h5>
                                     </div>
                                     <div className="card-body">
                                         <div className="scroll300">
                                             <ul className="m-0 p-0">
                                                 <li className="team-activity d-flex">
                                                     <div className="activity-time py-2 me-3">
                                                         <p className="m-0">10:30AM</p>
                                                         <span className="badge bg-primary">Live</span>
                                                     </div>
                                                     <div className="d-flex flex-column py-2">
                                                         <h6>Mercuty Admin Dashboard</h6>
                                                         <p className="m-0 text-secondary">by Srinu Basava</p>
                                                     </div>
                                                 </li>
                                                 <li className="team-activity d-flex">
                                                     <div className="activity-time py-2 me-3">
                                                         <p className="m-0">11:00AM</p>
                                                         <span className="badge bg-primary">Live</span>
                                                     </div>
                                                     <div className="d-flex flex-column py-2">
                                                         <h6>Venus Admin Dashboard</h6>
                                                         <p className="m-0 text-secondary">by Sandhya Balla</p>
                                                     </div>
                                                 </li>
                                                 <li className="team-activity d-flex">
                                                     <div className="activity-time py-2 me-3">
                                                         <p className="m-0">11:30AM</p>
                                                         <span className="badge bg-danger">New</span>
                                                     </div>
                                                     <div className="d-flex flex-column py-2">
                                                         <h6>Earth Admin Dashboard</h6>
                                                         <p className="m-0 text-secondary">by Abilene Omega</p>
                                                     </div>
                                                 </li>
                                                 <li className="team-activity d-flex">
                                                     <div className="activity-time py-2 me-3">
                                                         <p className="m-0">12:00PM</p>
                                                         <span className="badge bg-primary">Live</span>
                                                     </div>
                                                     <div className="d-flex flex-column py-2">
                                                         <h6>Mars Admin Dashboard</h6>
                                                         <p className="m-0 text-secondary">by Srinu Basava</p>
                                                     </div>
                                                 </li>
                                                 <li className="team-activity d-flex">
                                                     <div className="activity-time py-2 me-3">
                                                         <p className="m-0">12:30PM</p>
                                                         <span className="badge bg-primary">Live</span>
                                                     </div>
                                                     <div className="d-flex flex-column py-2">
                                                         <h6>Jupiter Admin Dashboard</h6>
                                                         <p className="m-0 text-secondary">by Sandhya Balla</p>
                                                     </div>
                                                 </li>
                                                 <li className="team-activity d-flex">
                                                     <div className="activity-time py-2 me-3">
                                                         <p className="m-0">01:00PM</p>
                                                         <span className="badge bg-danger">New</span>
                                                     </div>
                                                     <div className="d-flex flex-column py-2">
                                                         <h6>Unify Admin Dashboard</h6>
                                                         <p className="m-0 text-secondary">by Srinu Basava</p>
                                                     </div>
                                                 </li>
                                             </ul>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="col-xl-4 col-sm-6 col-md-12">
                                 <div className="card mb-3">
                                     <div className="card-header">
                                         <h5 className="card-title">Head Pastor</h5>
                                     </div>
                                     <div className="card-body">
                                         <div className="scroll300">
                                             <div className="my-2">
                                                 <div className="d-flex position-relative activity-block">
                                                     <img src="assets/images/user1.png" className="img-5x me-3 rounded-circle activity-user"
                                                         alt="Admin Dashboard" />
                                                     <div className="mb-5">
                                                         <h6 className="fw-semibold">Rev. Prince Atta Poku</h6>
                                                         <p className="text-secondary mb-1">Since 2023</p>
                                                         <p>Service ID: 26788</p>
                                                         <span className="bg-warning bg-opacity-10 p-2">Tema Branch - Present</span>
                                                     </div>
                                                 </div>
 
                                                 <div className="d-flex position-relative activity-block">
                                                     <img src="assets/images/user1.png" className="img-5x me-3 rounded-circle activity-user"
                                                         alt="Admin Dashboard" />
                                                     <div className="mb-5">
                                                         <h6 className="fw-semibold">Sofo Maame</h6>
                                                         <p className="text-secondary mb-1">Since 2023</p>
                                                         <p>Service ID: 26788</p>
                                                         
                                                         <span className="bg-warning bg-opacity-10 p-2">Tema Branch - Present</span>
                                                     </div>
                                                 </div>
                                                 
                                                 
                                               
                                                 
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         
                         <div className="row gx-3">
                             <div className="col-xxl-6 col-sm-12 col-12">
                                 <div className="card mb-3">
                                     <div className="card-header">
                                         <h5 className="card-title">Page Views</h5>
                                     </div>
                                     <div className="card-body">
                                         <div className="table-responsive">
                                             <table className="table align-middle">
                                                 <thead>
                                                     <tr>
                                                         <th>Link</th>
                                                         <th>Page Title</th>
                                                         <th>Visitors</th>
                                                         <th>Percentage</th>
                                                         <th>Growth</th>
                                                     </tr>
                                                 </thead>
                                                 <tbody>
                                                     <tr className="grd-info-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>Home</td>
                                                         <td>56,000</td>
                                                         <td>
                                                             <div className="progress lg progress-spacer">
                                                                 <div className="progress-bar bg-primary" role="progressbar" style={{width: "50%"}}
                                                                     aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                             </div>
                                                         </td>
                                                         <td>
                                                             <p className="m-0 text-info">8% high</p>
                                                         </td>
                                                     </tr>
                                                     <tr className="grd-success-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>About</td>
                                                         <td>35,000</td>
                                                         <td>
                                                             <div className="progress lg progress-spacer">
                                                                 <div className="progress-bar bg-success" role="progressbar" style={{width: "60%"}}
                                                                     aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                             </div>
                                                         </td>
                                                         <td>
                                                             <p className="m-0 text-success">12% low</p>
                                                         </td>
                                                     </tr>
                                                     <tr className="grd-warning-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>Contact</td>
                                                         <td>28,000</td>
                                                         <td>
                                                             <div className="progress lg progress-spacer">
                                                                 <div className="progress-bar bg-warning" role="progressbar" style={{width: "70%"}}
                                                                     aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                                             </div>
                                                         </td>
                                                         <td>
                                                             <p className="m-0 text-warning">15% high</p>
                                                         </td>
                                                     </tr>
                                                     <tr className="grd-danger-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>Services</td>
                                                         <td>33,000</td>
                                                         <td>
                                                             <div className="progress lg progress-spacer">
                                                                 <div className="progress-bar bg-danger" role="progressbar" style={{width: "80%"}}
                                                                     aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                                             </div>
                                                         </td>
                                                         <td>
                                                             <p className="m-0 text-danger">9% high</p>
                                                         </td>
                                                     </tr>
                                                     <tr className="grd-primary-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>Products</td>
                                                         <td>98,000</td>
                                                         <td>
                                                             <div className="progress lg progress-spacer">
                                                                 <div className="progress-bar bg-primary" role="progressbar" style={{width: "90%"}}
                                                                     aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                                             </div>
                                                         </td>
                                                         <td>
                                                             <p className="m-0 text-primary">3% low</p>
                                                         </td>
                                                     </tr>
                                                 </tbody>
                                             </table>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div className="col-xxl-6 col-sm-12 col-12">
                                 <div className="card mb-3">
                                     <div className="card-header">
                                         <h5 className="card-title">Clicks</h5>
                                     </div>
                                     <div className="card-body">
                                         <div className="table-responsive">
                                             <table className="table align-middle">
                                                 <thead>
                                                     <tr>
                                                         <th>Link</th>
                                                         <th>Page Title</th>
                                                         <th>Visitors</th>
                                                         <th>Percentage</th>
                                                         <th>Growth</th>
                                                     </tr>
                                                 </thead>
                                                 <tbody>
                                                     <tr className="grd-info-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>Home</td>
                                                         <td>56,000</td>
                                                         <td>25%</td>
                                                         <td>
                                                             <p className="m-0 text-info">8% high</p>
                                                         </td>
                                                     </tr>
                                                     <tr className="grd-success-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>About</td>
                                                         <td>35,000</td>
                                                         <td>23%</td>
                                                         <td>
                                                             <p className="m-0 text-success">12% low</p>
                                                         </td>
                                                     </tr>
                                                     <tr className="grd-warning-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>Contact</td>
                                                         <td>28,000</td>
                                                         <td>18%</td>
                                                         <td>
                                                             <p className="m-0 text-warning">15% high</p>
                                                         </td>
                                                     </tr>
                                                     <tr className="grd-danger-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>Services</td>
                                                         <td>33,000</td>
                                                         <td>12%</td>
                                                         <td>
                                                             <p className="m-0 text-success">9% high</p>
                                                         </td>
                                                     </tr>
                                                     <tr className="grd-primary-light">
                                                         <td>
                                                             <Link to="" className="text-danger">
                                                                 <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                             </Link>
                                                         </td>
                                                         <td>Products</td>
                                                         <td>98,000</td>
                                                         <td>16%</td>
                                                         <td>
                                                             <p className="m-0 text-primary">3% low</p>
                                                         </td>
                                                     </tr>
                                                 </tbody>
                                             </table>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         
 
                     </div>
                     
                     
 
                 </div>
    </>
   );

   
}


