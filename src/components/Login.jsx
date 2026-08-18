import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password ,setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoginPage, setIsLoginPage] = useState(true)

    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSignup = async() => {
      try{
        const res = await axios.post(BASE_URL+"/signup", {firstName,lastName,emailId,password}, {withCredentials: true})
        console.log("signup",res)
        dispatch(addUser(res.data.data))
        return navigate("/profile")
      } catch(err) {
        setError(err?.response?.data || "something went wrong!")
      }
    }
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
        <h2 className="card-title">{isLoginPage ? "Log In" : "Sign up"}</h2>
        <div className="card-actions justify-center">
          {!isLoginPage && <> <label className="form-control w-full max-w-xs m-2">
            <div className="label">
              <span className="label-text">First Name <span className="text-rose-500 text-xl ml-0.5">*</span></span>
            </div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs m-2">
            <div className="label">
              <span className="label-text">Last Name: </span>
            </div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label> </>}
          <label className="form-control w-full max-w-xs m-2">
            <div className="label">
              <span className="label-text">Email ID <span className="text-rose-500 text-xl ml-0.5">*</span> </span>
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
              <span className="label-text">Password <span className="text-rose-500 text-xl ml-0.5">*</span></span>
            </div>
            <div className="relative">
              <input
                type= {showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full pr-10"
              />
              <button type="button" 
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}> {showPassword ? (<i className="bi bi-eye"></i>) : (<i className="bi bi-eye-slash"></i>)}</button>
            </div>
            {isLoginPage && <Link to="/forgotPassword" className="text-left p-1"><p className="cursor pointer">Forgot password?</p></Link>}

          </label>
          <div>
            {error && <p className="text-red-500">ERROR: {error}</p>}
            <button className="btn btn-primary m-2" onClick={isLoginPage ? handleLogin : handleSignup}>{isLoginPage ? "Login" : "Sign Up"}</button>
            <p className="text-center cursor-pointer m-2" onClick={() => setIsLoginPage(value => !value)}>
              {isLoginPage ? "New User? Sign up here" : "Existing user? Login here"}
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
