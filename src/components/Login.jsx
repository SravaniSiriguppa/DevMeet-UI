import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password ,setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async() => {
       try {
         const res = await axios.post(`${BASE_URL}/login`, {emailId, password}, {withCredentials: true})

        dispatch(addUser(res.data))
        return navigate("/")
      } catch(err) {
        // if(err.status ===)
        setError(err?.response?.data || "something went wrong!")
      }
    }

  return (

    <div className="flex min-h-[calc(100vh-4rem)] justify-center items-center p-4">

    <div className="card bg-base-300 text-neutral-content w-96">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Log In</h2>
        <div className="card-actions justify-center">
          <label className="form-control w-full max-w-xs m-2">
            <div className="label">
              <span className="label-text">Email ID: </span>
            </div>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs m-2">
            <div className="label">
              <span className="label-text">Password: </span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <div>
            {error && <p className="text-red-500">ERROR: {error}</p>}
            <button className="btn btn-primary m-2" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
