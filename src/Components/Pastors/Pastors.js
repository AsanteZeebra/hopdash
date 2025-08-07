import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useAuthValidation from "../authentication/auth_validate";
import $, { data } from "jquery";

import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import jszip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.default.vfs;
window.JSZip = jszip;

const ViewPastors = () => {
  const [pastor, setPastor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pastorToDelete, setPastorToDelete] = useState(null);
  const tableRef = useRef(null);

  const { token, handleLogout } = useAuthValidation();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://api.fremikeconsult.com/api/pastors", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPastor(response.data.data);
        setLoading(false);

        if ($.fn.DataTable.isDataTable(tableRef.current)) {
          $(tableRef.current).DataTable().destroy();
        }

        $(tableRef.current).DataTable({
          responsive: true,
          lengthMenu: [5, 10, 25, 50],
          pageLength: 10,
          paging: true,
          searching: true,
          destroy: true,
          dom: "Bfrtip",
          buttons: [
            {
              extend: "csv",
              text: '<i class="bi bi-file-earmark-spreadsheet"></i> CSV',
              className: "btn btn-light",
            },
            {
              extend: "pdf",
              text: '<i class="bi bi-file-earmark-pdf"></i> PDF',
              className: "btn btn-light",
            },
            {
              extend: "print",
              text: '<i class="bi bi-printer"></i> Print',
              className: "btn btn-light",
              customize: function (win) {
                $(win.document.body)
                  .find("table")
                  .addClass("display")
                  .css("font-size", "9pt");
                $(win.document.body).find("h1").css("text-align", "center");
                $(win.document.head).append(
                  '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/css/bootstrap.min.css" type="text/css" />'
                );
              },
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching Pastors:", error);
        toast.error("Error fetching Pastors");
        setLoading(false);
      });

    return () => {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, []);

  const handleDeleteBranch = () => {
    if (!pastorToDelete) return;

    axios
      .delete(
        `http://api.fremikeconsult.com/api/delete-pastor/${pastorToDelete.pastor_code}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setPastor((prev) =>
          prev.filter((b) => b.pastor_code !== pastorToDelete.pastor_code)
        );
        toast.success("Pastor Deleted Success!");
        setPastorToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting pastor:", error);
        toast.error("Error deleting pastor");
      });
  };

  return (
    <div className="col-xxl-12">
      {/* Modal */}
      <div
        className="modal fade modal-alert rounded-3"
        tabIndex="-1"
        role="dialog"
        id="modalask"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-sm"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body p-4 text-center">
              <h5 className="text-primary">Delete Pastor Info?</h5>
              <i
                className="bi bi-exclamation-triangle fs-1"
                style={{ color: "red" }}
              ></i>
            </div>
            <div className="modal-footer flex-nowrap p-0">
              <button
                type="button"
                className="btn text-danger fs-6 col-6 m-0 border-end"
                onClick={handleDeleteBranch}
                data-bs-dismiss="modal"
              >
                <strong>Yes, Delete</strong>
              </button>
              <button
                type="button"
                className="btn text-primary fs-6 col-6 m-0"
                data-bs-dismiss="modal"
              >
                No thanks
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card mb-3">
        <div className="card-header">
          <h5 className="card-title">Pastors List</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <table
                ref={tableRef}
                id="myTable"
                className="table table-striped"
              >
                <thead>
                  <tr>
                    <th></th>
                    <th> ID</th>
                    <th>FullName </th>
                    <th>Title</th>

                  
                   
                    <th>Telephone</th>
                    <th>Branch</th>
                     <th>Due_Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pastor && pastor.length > 0 ? (
                    pastor.map((pastors) => (
                      <tr key={pastors.pastor_code}>
                        <td>
                          <Link  to={"/pastor-profile"}
                            className="nav-link"
                            onClick={() =>
                              localStorage.setItem(
                                "pastor_code",
                                pastors.pastor_code
                              )
                            }>
                           <img
                            src={
                              pastors?.photo
                                ? `http://api.fremikeconsult.com/storage/${pastors.photo}`
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    pastors?.fullname || "Pastor"
                                  )}&background=0d6efd&color=fff`
                            }
                            className="img-fluid " style={{ width: "50px",  }}
                            alt="img"
                          />
                          </Link>

                         
                        </td>
                        <td>
                          <Link
                            to={"/pastor-profile"}
                            className="nav-link"
                            onClick={() =>
                              localStorage.setItem(
                                "pastor_code",
                                pastors.pastor_code
                              )
                            }
                          >
                            {pastors.pastor_code}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={"/pastor-profile"}
                            className="nav-link"
                            onClick={() =>
                              localStorage.setItem(
                                "pastor_code",
                                pastors.pastor_code
                              )
                            }
                          >
                            {pastors.fullname}
                          </Link>
                        </td>
                        <td>{pastors.title}</td>

                      
                        
                        <td>{pastors.telephone}</td>
                        <td>{pastors.branch}</td>
                        <td>
                          {pastors.to_date}
                          
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              pastors.status === "active" ||
                              pastors.status === "transferred"
                                ? "bg-success"
                                : pastors.status === "retired"
                                ? "bg-warning"
                                : pastors.status === "suspended" ||
                                  pastors.status === "Blocked"
                                ? "bg-danger"
                                : "bg-secondary"
                            }`}
                          >
                            {pastors.status}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/edit-pastor`}
                            className="btn btn-sm btn-primary"
                            title="Edit Branch"
                            onClick={() =>
                              localStorage.setItem(
                                "pastor_code",
                                pastors.pastor_code
                              )
                            }
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-danger ms-2"
                            title="Delete Branch"
                            data-bs-toggle="modal"
                            data-bs-target="#modalask"
                            onClick={() => setPastorToDelete(pastors)}
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No branches found!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPastors;

export const AddPastor = () => {
  const { token, handleLogout } = useAuthValidation();
  const [branchData, setBranchData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData(); // must use this for file uploads

      formData.append("fullname", data.FullName);
      formData.append("title", data.Title);
      formData.append("dob", data.dob);
      formData.append("marital_status", data.marital_status);
      formData.append("spouse", data.spouse);
      formData.append("children", data.children);
      formData.append("telephone", data.telephone);
      formData.append("branch", data.branch);
      formData.append("from_date", data.From);
      formData.append("to_date", data.To);
      formData.append("next_of_kin", data.next_of_kin ?? "");
      formData.append("emergency_contact", data.emergency_contact ?? "");
      formData.append("photo", data.Photo[0]); // required for file
      formData.append("status", data.status || "active");

      const response = await axios.post(
        "http://api.fremikeconsult.com/api/add-pastor",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data", // very important!
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Pastor created successfully!", {
          position: "top-right",
        });
        reset();
        setInterval(() => {
          navigate("/view-pastors");
        }, 2000); // Redirect after 1 second
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      if (error.response?.status === 422) {
        Object.values(error.response.data.errors).forEach((messages) => {
          toast.error(messages[0], { position: "top-right" });
        });
      } else {
        toast.error("An unexpected error occurred!", { position: "top-right" });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get(
        "http://api.fremikeconsult.com/api/view-branches",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === "success") {
        setBranchData(response.data.data);
      } else {
        toast.success(response.data.data, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(error, {
        position: "top-right",
      });
    }
  };

  fetchBranches();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="col-xxl-12">
        <div className="card mb-3">
          <div className="card-header">
            <h5 className="card-title">Add New Pastor</h5>
          </div>

          <div className="card-body">
            <div className="row gx-3">
              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">FullName:</label>
                  <input
                    type="text"
                    {...register("FullName", { required: true })}
                    className="form-control"
                    placeholder="Enter FullName"
                  />
                  {errors.FullName && (
                    <small className="text-danger">
                      Branch Name is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Tittle</label>
                  <select
                    className="form-select"
                    {...register("Title", { required: true })}
                  >
                    <option value="">-Select-</option>
                    <option value="Rev.">Rev.</option>
                    <option value="Pastor">Pastor</option>
                    <option value="Bishop">Bishop</option>
                    <option value="Apostle">Apostle</option>
                    <option value="Evangelist">Evangelist</option>
                  </select>
                  {errors.Tittle && (
                    <small className="text-danger">Tittle is required</small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    {...register("dob", { required: true })}
                    className="form-control"
                    placeholder="Enter Date of Birth"
                  />
                  {errors.dob && (
                    <small className="text-danger">
                      Date of Birth is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Marital_Status</label>
                  <select
                    className="form-select"
                    {...register("marital_status", { required: true })}
                  >
                    <option value="">-Select-</option>
                    <option value="married">Married</option>
                    <option value="single">Single</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                  {errors.Marital_Status && (
                    <small className="text-danger">
                      Marital_Status is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Spouse</label>
                  <input
                    type="text"
                    {...register("spouse", { required: true })}
                    className="form-control"
                    placeholder="Enter Spouse Name"
                  />
                  {errors.Spouse && (
                    <small className="text-danger">
                      Spouse Name is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">No. of Children</label>
                  <input
                    type="number"
                    {...register("children", { required: true })}
                    className="form-control"
                    placeholder="Enter Number of Children"
                  />
                  {errors.Children && (
                    <small className="text-danger">
                      Number of Children is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Telephone</label>
                  <input
                    type="number"
                    {...register("telephone", { required: true })}
                    className="form-control"
                    placeholder="Enter Telephone"
                  />
                  {errors.Telephone && (
                    <small className="text-danger">Telephone is required</small>
                  )}
                </div>
              </div>
              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Branch</label>
                  <select
                    className="form-select"
                    {...register("branch", { required: true })}
                  >
                    <option value="">-Select-</option>
                    {branchData && branchData.length > 0 ? (
                      branchData.map((branch, index) => (
                        <option key={index} value={branch.branch_name}>
                          {branch.branch_name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No Branch found
                      </option>
                    )}
                  </select>
                  {errors.branch && (
                    <small className="text-danger">Please Choose Branch</small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">From</label>
                  <input
                    type="date"
                    {...register("From", { required: true })}
                    className="form-control"
                    placeholder="From Date is required"
                  />
                  {errors.From && (
                    <small className="text-danger">From Date is required</small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">To</label>
                  <input
                    type="date"
                    {...register("To", { required: true })}
                    className="form-control"
                    placeholder="Enter To Date"
                  />
                  {errors.To && (
                    <small className="text-danger">To Date is required</small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Choose Photo</label>
                  <input
                    type="file"
                    {...register("Photo", { required: true })}
                    className="form-control"
                    placeholder="Please Choose Photo"
                  />
                  {errors.Photo && (
                    <small className="text-danger">Photo is required</small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Next_of_kin</label>
                  <input
                    type="text"
                    {...register("next_of_kin", { required: true })}
                    className="form-control"
                    placeholder="Enter next of kin "
                  />
                  {errors.next_of_kin && (
                    <small className="text-danger">
                      Next_of_kin info is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Emergency Contact info</label>
                  <input
                    type="text"
                    {...register("emergency_contact", { required: true })}
                    className="form-control"
                    placeholder="Enter emergency contact info"
                  />
                  {errors.emergency_contact && (
                    <small className="text-danger">
                      Emergency contact info is required
                    </small>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div className="d-flex gap-2 justify-content-end">
              <button type="button" className="btn btn-outline-secondary">
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? (
                  <span className="d-flex align-items-center justify-content-center">
                    <ClipLoader color="#fff" size={20} />
                    <span className="ms-2">loading...</span>
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export const EditPastor = () => {
  const { token, handleLogout } = useAuthValidation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPastorDetails = async () => {
      const pastor_code = localStorage.getItem("pastor_code");
      if (!pastor_code) return;

      try {
        const response = await axios.get(
          `http://api.fremikeconsult.com/api/fetch-pastor/${pastor_code}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === "success") {
          const data = response.data.data;

          reset({
            fullname: data.fullname,
            title: data.title,
            dob: data.dob,
            marital_status: data.marital_status,
            spouse: data.spouse,
            children: data.children,
            telephone: data.telephone,
            from_date: data.from_date,
            to_date: data.to_date,
            next_of_kin: data.next_of_kin,
            emergency_contact: data.emergency_contact,
            status: data.status || "active",
          });
        }
      } catch (error) {
        console.error("Failed to fetch Pastor info:", error);
        toast.error("Failed to load Pastor info", { position: "top-right" });
      }
    };

    fetchPastorDetails();
  }, [token, reset, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const pastor_code = localStorage.getItem("pastor_code");

      const response = await axios.patch(
        `http://api.fremikeconsult.com/api/update-pastor/${pastor_code}`,
        {
          fullname: data.fullname,
          title: data.title,
          dob: data.dob,
          marital_status: data.marital_status,
          spouse: data.spouse,
          children: data.children,
          telephone: data.telephone,
          from_date: data.from_date,
          to_date: data.to_date,
          next_of_kin: data.next_of_kin,
          emergency_contact: data.emergency_contact,
          status: data.status || "active",
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Pastor info updated successfully!", {
          position: "top-right",
        });
        localStorage.removeItem("pastor_code");

        setTimeout(() => {
          navigate("/view-pastors");
        }, 2000); // 3000ms = 3 seconds
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        Object.values(errors).forEach((messages) => {
          toast.error(messages[0], { position: "top-right" });
        });
      } else {
        toast.error(
          "An unexpected error occurred!",
          { position: "top-right" },
          error
        );
        console.error("Error updating Pastor Info:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="col-xxl-12">
        <div className="card mb-3">
          <div className="card-header">
            <h5 className="card-title">Edit Pastor Info</h5>
          </div>

          <div className="card-body">
            <div className="row gx-3">
              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">FullName:</label>
                  <input
                    type="text"
                    {...register("fullname", { required: true })}
                    className="form-control"
                    placeholder="Enter FullName"
                  />
                  {errors.FullName && (
                    <small className="text-danger">
                      Branch Name is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Tittle</label>
                  <select
                    className="form-select"
                    {...register("title", { required: true })}
                  >
                    <option value="">-Select-</option>
                    <option value="Rev.">Reverened</option>
                    <option value="Apostle">Apostle</option>
                    <option value="Evangelist">Evangelist</option>
                    <option value="Pastor">Pastor</option>
                  </select>
                  {errors.Tittle && (
                    <small className="text-danger">Tittle is required</small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    {...register("dob", { required: true })}
                    className="form-control"
                    placeholder="Enter Date of Birth"
                  />
                  {errors.dob && (
                    <small className="text-danger">
                      Date of Birth is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Marital_Status</label>
                  <select
                    className="form-select"
                    {...register("marital_status", { required: true })}
                  >
                    <option value="">-Select-</option>
                    <option value="married">Married</option>
                    <option value="single">Single</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                  {errors.Marital_Status && (
                    <small className="text-danger">
                      Marital_Status is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Spouse</label>
                  <input
                    type="text"
                    {...register("spouse", { required: true })}
                    className="form-control"
                    placeholder="Enter Spouse Name"
                  />
                  {errors.Spouse && (
                    <small className="text-danger">
                      Spouse Name is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">No. of Children</label>
                  <input
                    type="text"
                    {...register("children", { required: true })}
                    className="form-control"
                    placeholder="Enter Number of Children"
                  />
                  {errors.Children && (
                    <small className="text-danger">
                      NUmber of Children is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Telephone</label>
                  <input
                    type="text"
                    {...register("telephone", { required: true })}
                    className="form-control"
                    placeholder="Enter Telephone"
                  />
                  {errors.Telephone && (
                    <small className="text-danger">Telephone is required</small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">From</label>
                  <input
                    type="date"
                    {...register("from_date", { required: true })}
                    className="form-control"
                    placeholder="From Date is required"
                  />
                  {errors.from_date && (
                    <small className="text-danger">From Date is required</small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">To</label>
                  <input
                    type="date"
                    {...register("to_date", { required: true })}
                    className="form-control"
                    placeholder="Enter To Date"
                  />
                  {errors.to_date && (
                    <small className="text-danger">To Date is required</small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Next_of_kin</label>
                  <input
                    type="text"
                    {...register("next_of_kin", { required: true })}
                    className="form-control"
                    placeholder="Enter next of kin "
                  />
                  {errors.next_of_kin && (
                    <small className="text-danger">
                      Next_of_kin info is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Emergency Contact info</label>
                  <input
                    type="text"
                    {...register("emergency_contact", { required: true })}
                    className="form-control"
                    placeholder="Enter emergency contact info"
                  />
                  {errors.emergency_contact && (
                    <small className="text-danger">
                      Emergency contact info is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    {...register("status", { required: true })}
                  >
                    <option value="">-Select-</option>
                    <option value="active">Active</option>
                    <option value="transferred">Transferred</option>
                    <option value="suspended">Suspended</option>
                    <option value="sacked">Sacked</option>
                    <option value="retired">Retired</option>
                    <option value="blocked">Blocked</option>
                  </select>
                  {errors.status && (
                    <small className="text-danger">Status is required</small>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div className="d-flex gap-2 justify-content-end">
              <Link
                to={"/view-pastors"}
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => localStorage.removeItem("pastor_code")}
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? (
                  <span className="d-flex align-items-center justify-content-center">
                    <ClipLoader color="#fff" size={20} />
                    <span className="ms-2">loading...</span>
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export const PastorProfile = () => {
  const { token, handleLogout } = useAuthValidation();
  const [loading, setLoading] = useState(false);
  const [pastorData, setPastorData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const PastorDetails = async () => {
      const pastor_code = localStorage.getItem("pastor_code");
      if (!pastor_code) return;

      try {
        const response = await axios.get(
          `http://api.fremikeconsult.com/api/fetch-pastor/${pastor_code}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === "success") {
          setPastorData(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Error Fateching Pastor Details. Please try again.");
      }
    };
    PastorDetails();
  }, []);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true); // Start spinner
    const pastorCode = localStorage.getItem("pastor_code");
    const token = localStorage.getItem("token");
    if (!pastorCode || !file) {
      toast.error("Pastor code or photo missing", { position: "top-right" });
      setLoading(false); // Stop spinner if error
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await axios.post(
        `http://api.fremikeconsult.com/api/upload-pastor-photo/${pastorCode}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message, { position: "top-right" });
      setFile(null);
        window.location.reload();
    } catch (error) {
      toast.error("Upload failed", {
        position: "top-right",
      });
    } finally {
      setLoading(false); // Always stop spinner
    }
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xxl-12">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-auto">
                  <img
                    src={
                      pastorData?.photo
                        ? `http://api.fremikeconsult.com/storage/${pastorData.photo}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            pastorData?.fullname || "Pastor"
                          )}&background=0d6efd&color=fff`
                    }
                    className="img-fluid"
                    alt="Pastor"
                    style={{ width: "80px", height: "80px" }}
                  />
                </div>
                <div className="col">
                  <h6 className="text-primary">{pastorData?.title || "N/A"}</h6>
                  <h4 className="m-0">{pastorData?.fullname || "N/A"}</h4>
                </div>
                <div className="col-12 col-md-auto">
                  <Link
                    to="#!"
                    className="btn btn-outline-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#filemodal"
                  >
                    change photo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="filemodal"
        tabindex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Upload Photo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

            </div>
            <div class="modal-body">
              <form>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            
               <button
                type="submit"
                className="btn btn-success"
                disabled={loading} onClick={handleUpload}
              >
                {loading ? (
                  <span className="d-flex align-items-center justify-content-center">
                    <ClipLoader color="#fff" size={20} />
                    <span className="ms-2">loading...</span>
                  </span>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row gx-3">
        <div className="col-xxl-3 col-sm-6 col-12 order-xxl-1 order-xl-2 order-lg-2 order-md-2 order-sm-2">
          <div className="card mb-3">
            <div className="card-header">
              <h5 className="card-title">About</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Pastor ID: </b>
                  <span> {pastorData?.pastor_code || "N/A"}</span>
                </li>

                <li className="list-group-item">
                  <b>Branch: </b>
                  <span> {pastorData?.branch}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-xxl-9 col-sm-12 col-12 order-xxl-2 order-xl-1 order-lg-1 order-md-1 order-sm-1">
          <div className="card mb-3">
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-6 fw-bold">Full Name:</div>
                    <div className="col-6 text-end">
                      {pastorData?.fullname || "N/A"}
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-6 fw-bold">Date of Birth:</div>
                    <div className="col-6 text-end">
                      {pastorData?.dob || "N/A"}
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-6 fw-bold">Marital Status:</div>
                    <div className="col-6 text-end">
                      {pastorData?.spouse || "N/A"}
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-6 fw-bold">Spouse:</div>
                    <div className="col-6 text-end">
                      {pastorData?.spouse_name || "N/A"}
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-6 fw-bold">Children:</div>
                    <div className="col-6 text-end">
                      {pastorData?.children || "N/A"}
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-6 fw-bold">Phone:</div>
                    <div className="col-6 text-end">
                      {pastorData?.telephone || "N/A"}
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-6 fw-bold">Next of Kin:</div>
                    <div className="col-6 text-end">
                      {pastorData?.next_of_kin || "N/A"}
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-6 fw-bold">Emergency Contact:</div>
                    <div className="col-6 text-end">
                      {pastorData?.emergency_contact || "N/A"}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export const Transfer = () => {
  const [pastor, setPastor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pastorToDelete, setPastorToDelete] = useState(null);
  const tableRef = useRef(null);

  const { token, handleLogout } = useAuthValidation();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://api.fremikeconsult.com/api/pastors", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPastor(response.data.data);
        setLoading(false);

        if ($.fn.DataTable.isDataTable(tableRef.current)) {
          $(tableRef.current).DataTable().destroy();
        }

        $(tableRef.current).DataTable({
          responsive: true,
          lengthMenu: [5, 10, 25, 50],
          pageLength: 10,
          paging: true,
          searching: true,
          destroy: true,
          dom: "Bfrtip",
          buttons: [
            {
              extend: "csv",
              text: '<i class="bi bi-file-earmark-spreadsheet"></i> CSV',
              className: "btn btn-light",
            },
            {
              extend: "pdf",
              text: '<i class="bi bi-file-earmark-pdf"></i> PDF',
              className: "btn btn-light",
            },
            {
              extend: "print",
              text: '<i class="bi bi-printer"></i> Print',
              className: "btn btn-light",
              customize: function (win) {
                $(win.document.body)
                  .find("table")
                  .addClass("display")
                  .css("font-size", "9pt");
                $(win.document.body).find("h1").css("text-align", "center");
                $(win.document.head).append(
                  '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/css/bootstrap.min.css" type="text/css" />'
                );
              },
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching Pastors:", error);
        toast.error("Error fetching Pastors");
        setLoading(false);
      });

    return () => {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, []);

  const handleDeleteBranch = () => {
    if (!pastorToDelete) return;

    axios
      .delete(
        `http://localhost:8000/api/delete-pastor/${pastorToDelete.pastor_code}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setPastor((prev) =>
          prev.filter((b) => b.pastor_code !== pastorToDelete.pastor_code)
        );
        toast.success("Pastor Deleted Success!");
        setPastorToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting pastor:", error);
        toast.error("Error deleting pastor");
      });
  };

  return (
    <div className="col-xxl-12">
      {/* Modal */}
      <div
        className="modal fade modal-alert rounded-3"
        tabIndex="-1"
        role="dialog"
        id="modalask"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-sm"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body p-4 text-center">
              <h5 className="text-primary">Delete Pastor Info?</h5>
              <i
                className="bi bi-exclamation-triangle fs-1"
                style={{ color: "red" }}
              ></i>
            </div>
            <div className="modal-footer flex-nowrap p-0">
              <button
                type="button"
                className="btn text-danger fs-6 col-6 m-0 border-end"
                onClick={handleDeleteBranch}
                data-bs-dismiss="modal"
              >
                <strong>Yes, Delete</strong>
              </button>
              <button
                type="button"
                className="btn text-primary fs-6 col-6 m-0"
                data-bs-dismiss="modal"
              >
                No thanks
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card mb-3">
        <div className="card-header">
          <h5 className="card-title">Transfer</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <table
                ref={tableRef}
                id="myTable"
                className="table table-striped"
              >
                <thead>
                  <tr>
                    <th></th>
                    <th> ID</th>
                    <th>FullName </th>
                    <th>Title</th>
                   
                    <th>Telephone</th>
                    <th>Branch</th>
                    <th>Due_date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pastor && pastor.length > 0 ? (
                    pastor.map((pastors) => (
                      <tr key={pastors.pastor_code}>
                        <td>
                          <Link  to={"/pastor-profile"}
                            className="nav-link"
                            onClick={() =>
                              localStorage.setItem(
                                "pastor_code",
                                pastors.pastor_code
                              )
                            }>
                           <img
                            src={
                              pastors?.photo
                                ? `http://api.fremikeconsult.com/storage/${pastors.photo}`
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    pastors?.fullname || "Pastor"
                                  )}&background=0d6efd&color=fff`
                            }
                            className="img-fluid " style={{ width: "50px",  }}
                            alt="img"
                          />
                          </Link>

                         
                        </td>
                        <td>
                          <Link
                            to={"/pastor-profile"}
                            className="nav-link"
                            onClick={() =>
                              localStorage.setItem(
                                "pastor_code",
                                pastors.pastor_code
                              )
                            }
                          >
                            {pastors.pastor_code}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={"/pastor-profile"}
                            className="nav-link"
                            onClick={() =>
                              localStorage.setItem(
                                "pastor_code",
                                pastors.pastor_code
                              )
                            }
                          >
                            {pastors.fullname}
                          </Link>
                        </td>
                        <td>{pastors.title}</td>
                        <td>{pastors.telephone}</td>
                        <td>{pastors.branch}</td>
                         <td>{pastors.to_date}</td>
                        <td>
                          <span
                            className={`badge ${
                              pastors.status === "active" ||
                              pastors.status === "transferred"
                                ? "bg-success"
                                : pastors.status === "retired"
                                ? "bg-warning"
                                : pastors.status === "suspended" ||
                                  pastors.status === "Blocked"
                                ? "bg-danger"
                                : "bg-secondary"
                            }`}
                          >
                            {pastors.status}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/make-transfer`}
                            className="btn btn-sm btn-primary"
                            title="Transfer Pastor"
                            onClick={() =>
                              localStorage.setItem(
                                "pastor_code",
                                pastors.pastor_code
                              )
                            }
                          >
                            <i className="bi bi-arrow-return-right"></i> Transfer
                          </Link>
                          <button hidden
                            className="btn btn-sm btn-danger ms-2"
                            title="Delete Pater Profile"
                            data-bs-toggle="modal"
                            data-bs-target="#modalask"
                            onClick={() => setPastorToDelete(pastors)}
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No branches found!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MakeTransfer = () => {
  const { token, handleLogout } = useAuthValidation();
  const [branchData, setBranchData] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPastorDetails = async () => {
      const pastor_code = localStorage.getItem("pastor_code");
      if (!pastor_code) return;

      try {
        const response = await axios.get(
          `http://api.fremikeconsult.com/api/fetch-pastor/${pastor_code}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === "success") {
          const data = response.data.data;

          reset({
            fullname: data.fullname,
            title: data.title,
            dob: data.dob,
            marital_status: data.marital_status,
            spouse: data.spouse,
            children: data.children,
            telephone: data.telephone,
            from_date: data.from_date,
            to_date: data.to_date,
            next_of_kin: data.next_of_kin,
            emergency_contact: data.emergency_contact,
            status: data.status || "active",
          });
        }
      } catch (error) {
        console.error("Failed to fetch Pastor info:", error);
        toast.error("Failed to load Pastor info", { position: "top-right" });
      }
    };

    fetchPastorDetails();
  }, [token, reset, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const pastor_code = localStorage.getItem("pastor_code");

      const response = await axios.put(
        `http://api.fremikeconsult.com/api/transfer-pastor/${pastor_code}`,
        {
         
         
          branch: data.branch,
          from_date: data.from_date,
          to_date: data.to_date,
        
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
          toast.success("Transfer Success", {
          position: "top-right",
        });
        localStorage.removeItem("pastor_code");

        setTimeout(() => {
          navigate("/transfer");
        }, 2000); // 3000ms = 3 seconds
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        Object.values(errors).forEach((messages) => {
          toast.error(messages[0], { position: "top-right" });
        });
      } else {
        toast.error(
          "An unexpected error occurred!",
          { position: "top-right" },
          error
        );
        console.error("Error updating Pastor Info:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get(
        "http://api.fremikeconsult.com/api/view-branches",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === "success") {
        setBranchData(response.data.data);
      } else {
        toast.success(response.data.data, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(error, {
        position: "top-right",
      });
    }
  };

  fetchBranches();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="col-xxl-12">
        <div className="card mb-3">
          <div className="card-header">
            <h5 className="card-title">Transfer Pastor</h5>
          </div>

          <div className="card-body">
            <div className="row gx-3">
              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">FullName:</label>
                  <input
                    type="text" disabled
                    {...register("fullname", { required: true })}
                    className="form-control"
                    placeholder="Enter FullName"
                  />
                  {errors.FullName && (
                    <small className="text-danger">
                       Name is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Tittle</label>
                  <select
                    className="form-select"
                    {...register("title", { required: true })}
                  >
                    <option value="">-Select-</option>
                    <option value="Rev.">Reverened</option>
                    <option value="Apostle">Apostle</option>
                    <option value="Evangelist">Evangelist</option>
                    <option value="Pastor">Pastor</option>
                  </select>
                  {errors.Tittle && (
                    <small className="text-danger">Tittle is required</small>
                  )}
                </div>
              </div>

             

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Telephone</label>
                  <input 
                   disabled type="text"
                    {...register("telephone", { required: true })}
                    className="form-control"
                    placeholder="Enter Telephone"
                  />
                  {errors.Telephone && (
                    <small className="text-danger">Telephone is required</small>
                  )}
                </div>
              </div>
               
                 <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Branch</label>
                  <select
                    className="form-select"
                    {...register("branch", { required: true })}
                  >
                    <option value="">-Select-</option>
                    {branchData && branchData.length > 0 ? (
                      branchData.map((branch, index) => (
                        <option key={index} value={branch.branch_name}>
                          {branch.branch_name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No Branch found
                      </option>
                    )}
                  </select>
                  {errors.branch && (
                    <small className="text-danger">Please Choose Branch</small>
                  )}
                </div>
              </div>


              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">From</label>
                  <input
                    type="date"
                    {...register("from_date", { required: true })}
                    className="form-control"
                    placeholder="From Date is required"
                  />
                  {errors.from_date && (
                    <small className="text-danger">From Date is required</small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">To</label>
                  <input
                    type="date"
                     {...register("to_date", { required: true })}
                    className="form-control"
                    placeholder="Enter To Date"
                  />
                  {errors.to_date && (
                    <small className="text-danger">To Date is required</small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Comment</label>
                  <textarea className="form-control" rows={3} {...register("comment", )} placeholder="Additional information about new Branch or Instruction"> </textarea>
                 
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div className="d-flex gap-2 justify-content-end">
              <Link
                to={"/view-pastors"}
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => localStorage.removeItem("pastor_code")}
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? (
                  <span className="d-flex align-items-center justify-content-center">
                    <ClipLoader color="#fff" size={20} />
                    <span className="ms-2">loading...</span>
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};


