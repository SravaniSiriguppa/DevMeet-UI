import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState();
  const [showConfirmPassword, setShowConfirmPassword] = useState();

  const [error, setError] = useState("")

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setError("");

      if (!password || !confirmPassword) {
        setError("Please enter both passwords");

        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");

        return;
      }

      const res = await axios.post(BASE_URL+ "/resetPassword/" + token , {password}, {withCredentials: true})
      console.log(res)
      navigate("/login")
    } catch (err) {
      setError(err)
      navigate("/error")
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] text-center">
      <h2 className=" text-2xl font-bold mx-auto my-2"> Reset Password..</h2>
      <p className=" text-xl my-2"> No worries, We got you covered!!</p>
      <div className="flex flex-col items-center">
        <label className="form-control w-full max-w-xs m-2">
          <div className="label">
            <span className="label-text">
              New Password{" "}
              <span className="text-rose-500 text-xl ml-0.5">*</span>
            </span>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {" "}
              {showPassword ? (
                <i className="bi bi-eye"></i>
              ) : (
                <i className="bi bi-eye-slash"></i>
              )}
            </button>
          </div>
        </label>
        <label className="form-control w-full max-w-xs m-2">
          <div className="label">
            <span className="label-text">
              Confirm Password{" "}
              <span className="text-rose-500 text-xl ml-0.5">*</span>
            </span>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {" "}
              {showConfirmPassword ? (
                <i className="bi bi-eye"></i>
              ) : (
                <i className="bi bi-eye-slash"></i>
              )}
            </button>
          </div>
        </label>
      </div>
      <p className="font-bold">{error}</p>
      <button type="submit" className="btn btn-primary m-2" onClick={handleSubmit}>
        {" "}
        Submit{" "}
      </button>
    </div>
  );
};

export default ResetPassword;
