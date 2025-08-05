import React from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import useAuthValidation from "./authentication/auth_validate";





const AttendanceStats = () => {
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
    name: "Adult",
    data: [5, 8, 6, 10, 7, 12, 9],
    
  },
   {
    name: "Youth",
    data: [15, 44, 61, 65, 17, 50, 19],
    
  },
  {
    name: "Chidren",
    data: [75, 44, 31, 58, 88, 20, 12],
    
  }
];






  return (
   <>
       <div className="app-container">

                
                    <div className="app-hero-header d-flex align-items-start">

                        
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <i className="bi bi-house lh-1"></i>
                                <a href="/dashbaord" className="text-decoration-none">Home</a>
                            </li>
                            <li className="breadcrumb-item" aria-current="page">Attendance_stats</li>
                        </ol>
                        
                        

                    </div>
                    
                    <div className="app-body">

                    
                        <div className="row gx-3">
                           
                            <div className="col-xl-12 col-12">
                                <div className="card mb-3">
                                    <div className="card-header">
                                        <h5 className="card-title">Attendance</h5>
                                    </div>
                                    <div className="card-body">
                                        <Chart
                                                             options={areaChartOptions}
                                                             series={areaChartSeries}
                                                             type="area"
                                                             width="100%"
                                                             height={200}
                                                           />
                                        
                                        <div className="row g-2">
                                            <div className="col-sm-4 col-4 v-curve-seperator">
                                                <div className="border p-2 rounded-2 text-center">
                                                    <h3 className="m-0 text-primary">900</h3>
                                                    <p className="m-0">Adult</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-4 v-curve-seperator">
                                                <div className="border p-2 rounded-2 text-center">
                                                    <h3 className="m-0 text-primary">600</h3>
                                                    <p className="m-0">Youth</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-4 ">
                                                <div className="border p-2 rounded-2 text-center">
                                                    <h3 className="m-0 text-primary">400</h3>
                                                    <p className="m-0">Children</p>
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
                                                    <p className="m-0 text-secondary">General</p>
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
                                                    <p className="m-0 text-secondary">Men</p>
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
                                                    <p className="m-0 text-secondary">Women</p>
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
                                                    <p className="m-0 text-secondary">Youth</p>
                                                </div>
                                            </div>
                                            <div id="sparklineLine4" className="ms-auto"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    
                        
                      
                       
                        
                        <div className="row gx-3">
                            <div className="col-xxl-12 col-sm-12 col-12">
                                <div className="card mb-3">
                                    <div className="card-header">
                                        <h5 className="card-title">Weekly Standings</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table align-middle">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Branch</th>
                                                        <th>Popuation</th>
                                                         <th>Week</th>
                                                        <th>Percentage</th>
                                                       
                                                        <th>Growth</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="grd-info-light">
                                                        <td>
                                                            <Link to="/" className="text-danger">
                                                                <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                            </Link>
                                                        </td>
                                                        <td>Home</td>
                                                        <td>56,000</td>
                                                        <td>Week 1</td>
                                                        <td>25%</td>
                                                        <td>
                                                            <p className="m-0 text-info">8% high</p>
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




export default AttendanceStats;