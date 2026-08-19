import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addRequests(res?.data));
      console.log(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequest = async(status, reqId) => {
    try {
      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + reqId, {}, {withCredentials: true})
      console.log("Request", res)
      console.log(BASE_URL + "/request/review/" + status + "/" + reqId,)
      dispatch(removeRequest(reqId))
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)]">
       <h2 className="text-center text-2xl font-bold m-auto">No Requests!</h2>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="my-10">
        <h1 className="text-center font-bold text-2xl p-2">Requests</h1>
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex p-4 rounded-lg bg-base-300 w-1/2 my-2 mx-auto"
            >
              <div className="p-4 w-4/6">
                <img
                  alt="user-photo"
                  className="w-[220px] h-[220px] rounded-full object-cover"
                  src={photoUrl}
                />
              </div>
              <div>
                <h2 className="font-bold text-xl">
                  {" "}
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-between py-2 mt-5">
                  <button className="btn btn-soft btn-primary rounded-full" onClick={() => reviewRequest("rejected",request._id)}>
                    <i className="bi text-xl bi-x"></i>
                  </button>
                  <button className="btn btn-soft btn-primary rounded-full" onClick={() => reviewRequest("accepted",request._id)}>
                    <i className="bi text-xl bi-check"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
