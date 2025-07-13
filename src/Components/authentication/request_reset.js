import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

const RequestReset = () => {

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 const onSubmit = async (data) => {
  setLoading(true);
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/send-reset-link",
      { email: data.email },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      toast.success(response.data.message || "Reset link sent!", {
        position: "top-right",
      });
     setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    if (error.response?.status === 422) {
      const errors = error.response.data.errors;
      Object.values(errors).forEach((messages) => {
        toast.error(messages[0], { position: "top-right" });
      });
    } else {
      toast.error("An unexpected error occurred!", { position: "top-right" });
    }
  }
};


  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-5 col-sm-6 col-12">
            <form onSubmit={handleSubmit(onSubmit)} className="my-5">
              <div className="border rounded-2 p-4 mt-5">
                <div className="login-form">
                  <Link href="index.html" className="mb-4 d-flex">
                    <img
                      src="assets/images/logo.svg"
                      className="img-fluid login-logo"
                      alt="Earth Admin Dashboard"
                    />
                  </Link>
                  <h5 className="fw-light mb-5 lh-2">
                    In order to access your account, please enter the email id
                    you provided during the registration.
                  </h5>
                  <div className="mb-3">
                    <label className="form-label">Your Email</label>
                    <input type="text" className={`form-control${ errors.email ? " is-invalid" : "" }`} placeholder="Enter your email" name="email"{...register("email", {required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email format",
                        },
                      })}
                    />
                    <p className="text-danger">{errors.email?.message}</p>
                  </div>
                  <div className="d-grid py-3 mt-4">
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="d-flex align-items-center justify-content-center">
                          <ClipLoader color="#fff" size={20} />
                          <span className="ms-2">loading...</span>
                        </span>
                      ) : (
                        "Request Reset"
                      )}
                    </button>
                  </div>
                </div>
              </div>
                <ToastContainer/>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestReset;
