// import { Outlet } from 'react-router-dom'
// import Navbar from './Navbar'
// import Footer from './Footer'

// const Body = () => {
//   return (
//     <div>
//         <Navbar />
//         <Outlet />
//         <Footer />
//     </div>
//   )
// }

// export default Body

import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {
    try {
      if(userData) return 
      
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      if(err.status === 401) {
        navigate('/login')
        return
      }
      navigate('/error')
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
