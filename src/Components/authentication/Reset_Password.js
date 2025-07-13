import React, { useState } from "react";
import { Link, useParams, useSearchParams,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {

  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
   const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

 const onSubmit = async (data) => {
  setLoading(true);
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/reset-password",
      { 
        email: data.email, 
        password: data.password,
        password_confirmation: data.confirmPassword,
        token: token},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
         
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      toast.success(response.data.message || "Password Reset Success!", {
        position: "top-right",
      });
     setLoading(false);
      // Optionally, redirect to login or home page
       navigate("/login");
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
                      src="/assets/images/logo.svg"
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
                    <input type="text" className={`form-control${ errors.email ? " is-invalid" : "" }`} readOnly value={email} placeholder="Enter your email" name="email"{...register("email", {required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email format",
                        },
                      })}
                    />
                    <p className="text-danger">{errors.email?.message}</p>
                  </div>
                 
               <div className="mb-3">
                  <label className="form-label">Your Password</label>
                  <input
                    type="password"
                    className={`form-control${
                      errors.password ? " is-invalid" : ""
                    }`}
                    placeholder="Enter password"
                    name="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <p className="text-danger">{errors.password?.message}</p>
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control${
                      errors.confirmPassword ? " is-invalid" : ""
                    }`}
                    placeholder="Re-enter password"
                    name="confirmPassword"
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                  />
                  <p className="text-danger">
                    {errors.confirmPassword?.message}
                  </p>
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
                        "Reset Password"
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

export default ResetPassword;
