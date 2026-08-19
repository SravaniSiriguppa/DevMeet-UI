import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      //
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return <div> Loading... </div>;
  }

  if (connections.length === 0) {
    return (
    <div className="min-h-[calc(100vh-4rem)]">
       <h2 className="text-center text-2xl font-bold m-auto">No Connections!</h2>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="my-10">
        <h1 className="text-center font-bold text-2xl p-2">Connections</h1>
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div key = {_id} className="flex p-4 rounded-lg bg-base-300 w-1/2 my-2 mx-auto">
              <div className="p-4 shrink-0">
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
