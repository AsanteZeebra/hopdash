import React from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import useAuthValidation from "./authentication/auth_validate";





const Overview = () => {
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
    { name: "Adult", data: [30, 55, 75, 80, 60] },
    { name: "Youth", data: [0, 30, 35, 40, 50] },
    { name: "Children", data: [10, 20, 25, 30, 40] },
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
                                <a href="index.html" className="text-decoration-none">Home</a>
                            </li>
                            <li className="breadcrumb-item" aria-current="page">Analytics</li>
                        </ol>
                        
                        

                    </div>
                    
                    <div className="app-body">

                    
                        <div className="row gx-3">
                            <div className="col-xl-7 col-12">
                                <div className="card mb-3">
                                    <div className="card-header">
                                        <h5 className="card-title">Members Statistics</h5>
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
                            <div className="col-xl-8 col-sm-6 col-12">
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
                           
                        </div>
                        
                        <div className="row gx-3">
                            <div className="col-xxl-6 col-sm-12 col-12">
                                <div className="card mb-3">
                                    <div className="card-header">
                                        <h5 className="card-title">MIni Harvest</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table align-middle">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Branch</th>
                                                        <th>Popuation</th>
                                                        <th>Percentage</th>
                                                        <th>Growth</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="grd-info-light">
                                                        <td>
                                                            <a href="javascript:void()" className="text-danger">
                                                                <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                            </a>
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
                                                            <a href="javascript:void()" className="text-danger">
                                                                <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                            </a>
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
                                                            <a href="javascript:void()" className="text-danger">
                                                                <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                            </a>
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
                                                            <a href="javascript:void()" className="text-danger">
                                                                <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                            </a>
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
                                                            <a href="javascript:void()" className="text-danger">
                                                                <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                            </a>
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
                            <div className="col-xxl-6 col-sm-12 col-12">
                                <div className="card mb-3">
                                    <div className="card-header">
                                        <h5 className="card-title">MIni Harvest</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table align-middle">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Branch</th>
                                                        <th>Popuation</th>
                                                        <th>Percentage</th>
                                                        <th>Growth</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="grd-info-light">
                                                        <td>
                                                            <a href="javascript:void()" className="text-danger">
                                                                <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                            </a>
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
                                                            <a href="javascript:void()" className="text-danger">
                                                                <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                            </a>
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
                                                            <a href="javascript:void()" className="text-danger">
                                                                <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                            </a>
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
                                                            <a href="javascript:void()" className="text-danger">
                                                                <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                            </a>
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
                                                            <a href="javascript:void()" className="text-danger">
                                                                <i className="bi bi-box-arrow-up-right fs-3"></i>
                                                            </a>
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
export default Overview;

