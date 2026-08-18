import { useState } from "react"
import { BASE_URL } from "../utils/constants"
import axios from "axios"

const ForgotPassword = () => {
    const [emailId, setEmailId] = useState("")
    const [msg, setMsg] = useState("")
    // const navigate = useNavigate()

    const handleSubmit = async() => {
        try {
            if(!emailId) return 

            const res =  await axios.post(BASE_URL+"/forgotPassword", {emailId}, {withCredentials: true})
            setMsg(res.data)
            // navigate("/resetPassword" + token)
        } catch(err) {
            setMsg(err.response?.data || "Something went wrong");
        }
    }

  return (
    <div className='min-h-[calc(100vh-4rem)] text-center'>
        <h2 className=' text-2xl font-bold mx-auto my-2'> Forgot Password?</h2>
        <p className=' text-xl my-2'> No worries, We got you covered!!</p>
        <div className="flex justify-center">
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
        </div>
        <p className="font-bold">{msg}</p>
           <button type="submit" className="btn btn-primary m-2" onClick={handleSubmit}> Submit </button>
    </div>
  )
}

export default ForgotPassword