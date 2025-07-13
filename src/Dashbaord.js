import Chart from "react-apexcharts";

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

  return (
    <>
      <div className="app-container">
        <div className="app-hero-header d-flex align-items-center">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <i className="bi bi-house lh-1 pe-3 me-3 border-end border-dark"></i>
              <a href="index.html" className="text-decoration-none">Home</a>
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
                    <h3 className="m-0 text-primary">3500</h3>
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
                    <h3 className="m-0 text-primary">6500</h3>
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
        </div>
      </div>
    </>
  );
};
export default Dashboard;



export const Branch =()=>{

  return (
    <div className="container">
      <h1>Branch Dashboard</h1>
      {/* Add branch-specific content here */}
    </div>
  );
}

export const User = () => {
  return (
    <div className="container">
      <h1>User Dashboard</h1>
      {/* Add user-specific content here */}
    </div>
  );
}


