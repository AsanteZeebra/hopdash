import  { useState,useEffect,useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { ghanaRegionsAndDistricts } from "./districts_and_regions";
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





const AddBranch = () => {
  
  const { token, handleLogout } = useAuthValidation();


  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const regionOptions = Object.keys(ghanaRegionsAndDistricts).map((region) => ({
    value: region,
    label: region,
  }));

  const districtOptions = selectedRegion
    ? ghanaRegionsAndDistricts[selectedRegion.value].map((district) => ({
        value: district,
        label: district,
      }))
    : [];

const onSubmit = async (data) => {
  setLoading(true);
  try {
    const response = await axios.post(
      "http://api.fremikeconsult.com/api/add-branch",
      {
        branch_name: data.branchName,
        region: data.region,
        district: data.district,
        type: data.type,
        town: data.city, // Assuming your input field is named 'city'
        area_head: data.areaHead,
        telephone: data.telephone,
        email: data.email,
        address: data.address, // Make sure this input exists in your form
        status: data.status || "active", // Optional status, default to 'active'
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 201) {
      toast.success("Branch created successfully!", { position: "top-right" });
      reset(); // Clear form fields
    }
  } catch (error) {
    setLoading(false);
    if (error.response && error.response.status === 422) {
      const errors = error.response.data.errors;
      Object.values(errors).forEach((messages) => {
        toast.error(messages[0], { position: "top-right" });
      });
    } else {
      toast.error("An unexpected error occurred!", { position: "top-right" });
      console.error("Error creating branch:", error);
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
            <h5 className="card-title">Form Layout</h5>
          </div>

          <div className="card-body">
            <div className="row gx-3">
              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Branch Name:</label>
                  <input
                    type="text"
                    {...register("branchName", { required: true })}
                    className="form-control"
                    placeholder="Enter branch name"
                  />
                  {errors.branchName && (
                    <small className="text-danger">Branch Name is required</small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <select
                    className="form-select"
                    {...register("type", { required: true })}
                  >
                    <option value="">-Select-</option>
                    <option value="Main">Main Branch</option>
                    <option value="Area">Area</option>
                  </select>
                  {errors.type && (
                    <small className="text-danger">Type is required</small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Area-Head</label>
                  <input
                    type="text"
                    {...register("areaHead", { required: true })}
                    className="form-control"
                    placeholder="Area-Head"
                  />
                  {errors.areaHead && (
                    <small className="text-danger">Area-Head is required</small>
                  )}
                </div>
              </div>

              {/* REGION SELECT */}
              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Region</label>
                  <Controller
                    name="region"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={regionOptions}
                        value={selectedRegion}
                        onChange={(val) => {
                          setSelectedRegion(val);
                          field.onChange(val);
                        }}
                        placeholder="Select Region"
                        isSearchable
                      />
                    )}
                  />
                  {errors.region && (
                    <small className="text-danger">Region is required</small>
                  )}
                </div>
              </div>

              {/* DISTRICT SELECT */}
              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">District</label>
                  <Controller
                    name="district"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={districtOptions}
                        placeholder="Select District"
                        isSearchable
                      />
                    )}
                  />
                  {errors.district && (
                    <small className="text-danger">District is required</small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">City/Town</label>
                  <input
                    type="text"
                    {...register("city", { required: true })}
                    className="form-control"
                    placeholder="Enter City/Town"
                  />
                  {errors.city && (
                    <small className="text-danger">City/Town is required</small>
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
                  {errors.telephone && (
                    <small className="text-danger">Telephone is required</small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="form-control"
                    placeholder="Enter Email"
                  />
                  {errors.email && (
                    <small className="text-danger">Email is required</small>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-sm-4 col-12">
                <div className="mb-3">
                  

              
                  <label className="form-label">Branch Address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    {...register("address", { required: true })}
                    placeholder="Enter address"
                  ></textarea>
                  {errors.address && (
                    <small className="text-danger">Branch Address is required</small>
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


export const ViewBranch = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const tableRef = useRef(null);


  
  const { token, handleLogout } = useAuthValidation();


  useEffect(() => {
    setLoading(true);
    axios
      .get("http://api.fremikeconsult.com/api/view-branches", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBranches(response.data.data);
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
        console.error("Error fetching branches:", error);
        toast.error("Error fetching branches");
        setLoading(false);
      });

    return () => {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, []);

  const handleDeleteBranch = () => {
    if (!branchToDelete) return;

    axios
      .delete(`http://api.fremikeconsult.com/api/delete-branch/${branchToDelete.branch_id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setBranches((prev) =>
          prev.filter((b) => b.branch_id !== branchToDelete.branch_id)
        );
        toast.success("Branch deleted successfully!");
        setBranchToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting branch:", error);
        toast.error("Error deleting branch");
      });
  };



  return (
    <div className="col-xxl-12">

      {/* Modal */}
      <div className="modal fade modal-alert rounded-3" tabIndex="-1" role="dialog" id="modalask">
        <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-body p-4 text-center">
              <h5 className="text-primary">Delete branch?</h5>
              <i className="bi bi-exclamation-triangle fs-1" style={{ color: "red" }}></i>
              
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
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <table ref={tableRef} id="myTable" className="table table-striped">
                <thead>
                  <tr>
                    <th>Branch ID</th>
                    <th>Branch Name</th>
                    <th>Email</th>
                    <th>Region</th>
                    <th>District</th>
                    <th>Town</th>
                    <th>Telephone</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {branches && branches.length > 0 ? (
                    branches.map((branch) => (
                      <tr key={branch.branch_id}>
                        <td>{branch.branch_id}</td>
                        <td>{branch.branch_name}</td>
                        <td>{branch.email}</td>
                        <td>{branch.region}</td>
                        <td>{branch.district}</td>
                        <td>{branch.town}</td>
                        <td>{branch.telephone}</td>
                        <td>
                          <span
                            className={`badge ${
                              branch.status === "active"
                                ? "bg-success"
                                : branch.status === "Pending"
                                ? "bg-warning"
                                : branch.status === "inactive" || branch.status === "Blocked"
                                ? "bg-danger"
                                : "bg-secondary"
                            }`}
                          >
                            {branch.status}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/edit-branch`}  onClick={() => localStorage.setItem("branch_id", branch.branch_id)}
                            className="btn btn-sm btn-primary"
                            title="Edit Branch"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-danger ms-2"
                            title="Delete Branch"
                            data-bs-toggle="modal"
                            data-bs-target="#modalask"
                            onClick={() => setBranchToDelete(branch)}
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
            <ToastContainer/>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BranchActivity = () =>{
  return(
    <>
      <div className="row gx-3">
                <div className="col-xl-12 col-lg-12">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Branch Activity</h5>
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
              </div>
    </>
  )
}



export const EditBranch = () => {
  const { token, handleLogout } = useAuthValidation();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const regionOptions = Object.keys(ghanaRegionsAndDistricts).map((region) => ({
    value: region,
    label: region,
  }));

 let districtOptions = [];

if (
  selectedRegion &&
  selectedRegion.value &&
  ghanaRegionsAndDistricts[selectedRegion.value]
) {
  districtOptions = ghanaRegionsAndDistricts[selectedRegion.value].map((district) => ({
    value: district,
    label: district,
  }));
}


  // ✅ Fetch branch data on mount
  useEffect(() => {
    const fetchBranchDetails = async () => {
      const branchId = localStorage.getItem("branch_id");
      if (!branchId) return;

      try {
        const response = await axios.get(`http://api.fremikeconsult.com/api/fetch-branch/${branchId}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status === "success") {
          const data = response.data.data;

          reset({
            branchName: data.branch_name,
            areaHead: data.area_head,
            city: data.town,
            telephone: data.telephone,
            email: data.email,
            address: data.address,
            type: data.type,
            status: data.status,
          });

          const region = { value: data.region, label: data.region };
          const district = { value: data.district, label: data.district };

          setSelectedRegion(region);
          setValue("region", region);
          setValue("district", district);
        }
      } catch (error) {
        console.error("Failed to fetch branch:", error);
        toast.error("Failed to load branch info", { position: "top-right" });
      }
    };

    fetchBranchDetails();
  }, [token, reset, setValue]);

  // ✅ Submit updated data
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const branchId = localStorage.getItem("branch_id");

      const response = await axios.put(
        `http://api.fremikeconsult.com/api/update-branch/${branchId}`,
        {
          branch_name: data.branchName,
          region: data.region.value,
          district: data.district.value,
          type: data.type,
          town: data.city,
          area_head: data.areaHead,
          telephone: data.telephone,
          email: data.email,
          address: data.address,
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
        toast.success("Branch info updated successfully!", { position: "top-right" });
        localStorage.removeItem("branch_id");
        
        setTimeout(() => {
    navigate("/view-branch");
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
        toast.error("An unexpected error occurred!", { position: "top-right" });
        console.error("Error updating branch:", error);
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
            <h5 className="card-title">Edit Branch</h5>
          </div>

          <div className="card-body">
            <div className="row gx-3">
              {/* Branch Name */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Branch Name</label>
                  <input
                    type="text"
                    {...register("branchName", { required: true })}
                    className="form-control"
                  />
                  {errors.branchName && <small className="text-danger">Required</small>}
                </div>
              </div>

              {/* Type */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <select className="form-select" {...register("type", { required: true })}>
                    <option value="">-Select-</option>
                    <option value="main">Main Branch</option>
                    <option value="sub">Area</option>
                  </select>
                  {errors.type && <small className="text-danger">Required</small>}
                </div>
              </div>

              {/* Area Head */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Area Head</label>
                  <input
                    type="text"
                    {...register("areaHead", { required: true })}
                    className="form-control"
                  />
                  {errors.areaHead && <small className="text-danger">Required</small>}
                </div>
              </div>

              {/* Region */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Region</label>
                  <Controller
                    name="region"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={regionOptions}
                        value={selectedRegion}
                        onChange={(val) => {
                          setSelectedRegion(val);
                          field.onChange(val);
                        }}
                        placeholder="Select Region"
                      />
                    )}
                  />
                  {errors.region && <small className="text-danger">Required</small>}
                </div>
              </div>

              {/* District */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">District</label>
                  <Controller
                    name="district"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={districtOptions}
                        placeholder="Select District"
                      />
                    )}
                  />
                  {errors.district && <small className="text-danger">Required</small>}
                </div>
              </div>

              {/* City */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">City/Town</label>
                  <input
                    type="text"
                    {...register("city", { required: true })}
                    className="form-control"
                  />
                  {errors.city && <small className="text-danger">Required</small>}
                </div>
              </div>

              {/* Telephone */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Telephone</label>
                  <input
                    type="text"
                    {...register("telephone", { required: true })}
                    className="form-control"
                  />
                  {errors.telephone && <small className="text-danger">Required</small>}
                </div>
              </div>

              {/* Email */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="form-control"
                  />
                  {errors.email && <small className="text-danger">Required</small>}
                </div>
              </div>

              {/* Address */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Branch Address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    {...register("address", { required: true })}
                  ></textarea>
                  {errors.address && <small className="text-danger">Required</small>}
                </div>
              </div>

               <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select className="form-select" {...register("status", { required: true })}>
                    <option value="">-Select-</option>
                    <option value="active">Active</option>
                    <option value="inactive">Suspend</option>
                     <option value="closed">Close</option>
                  </select>
                  {errors.status && <small className="text-danger">Required</small>}
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                localStorage.removeItem("branch_id");
                navigate("/view-branch");
              }}
            >
              Cancel
            </button>

            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? (
                <span className="d-flex align-items-center">
                  <ClipLoader size={20} color="#fff" />
                  <span className="ms-2">Updating...</span>
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};


export default AddBranch;
