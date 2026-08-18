import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { isProfileSaved } from "../utils/navbarSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const savedProfile = useSelector((store) => store.navbar.isProfileSaved);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender || "");
  const [error, setError] = useState();

  useEffect(() => {
    dispatch(isProfileSaved(null));

    return () => {
      dispatch(isProfileSaved(null));
    };
  }, []);

  const saveProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit?corsTest=12345",
        { firstName, lastName, gender, age, photoUrl, about },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      dispatch(isProfileSaved(true));

      setTimeout(() => {
        dispatch(isProfileSaved(null));
      }, 2000);
    } catch (err) {
      setError(err?.response?.data);
      dispatch(isProfileSaved(false));
      setTimeout(() => {
        dispatch(isProfileSaved(null));
      }, 2000);
    }
  };

  if (!user) {
    return (
      <div>
        <h2> Loading... </h2>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <div className="flex min-h-[calc(100vh-4rem)] justify-center items-center p-4">
        <div className="card bg-base-300 text-neutral-content w-96">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Edit Profile</h2>
            <div className="card-actions justify-center">
              <label className="form-control w-full max-w-xs m-2">
                <div className="label">
                  <span className="label-text">First Name: </span>
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
              </label>
              <label className="form-control w-full max-w-xs m-2">
                <div className="label">
                  <span className="label-text">Photo URL: </span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs m-2">
                <div className="label">
                  <span className="label-text">Gender: </span>
                </div>
                {/* <select
                  value={gender || ""}
                  onChange={(e) => setGender(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>

                  <option value="male">Male</option>

                  <option value="female">Female</option>

                  <option value="others">Others</option>
                </select> */}
                <div className="dropdown w-full">
                  <div
                    tabIndex={0}
                    role="button"
                    className="input input-bordered w-full flex items-center justify-between"
                  >
                    {gender || "Select Gender"}
                  </div>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-full p-2 shadow-sm"
                  >
                    <li>
                      <button type="button" onClick={() => setGender("male")}>
                        Male
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={() => setGender("female")}>
                        Female
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={() => setGender("other")}>
                        Others
                      </button>
                    </li>
                  </ul>
                </div>
              </label>
              <label className="form-control w-full max-w-xs m-2">
                <div className="label">
                  <span className="label-text">Age: </span>
                </div>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs m-2">
                <div className="label">
                  <span className="label-text">About: </span>
                </div>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              <div>
                {error && <p className="text-red-500">ERROR: {error}</p>}
                <button className="btn btn-primary m-2" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <UserCard
          user={{ firstName, lastName, gender, age, photoUrl, about }}
        />

        {savedProfile === true && (
          <div
            role="alert"
            className="absolute alert alert-success top-0 left-0 right-0 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Your profile has been updated!!</span>
          </div>
        )}

        {savedProfile === false && (
          <div
            role="alert"
            className="absolute alert alert-error top-0 left-0 right-0 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Your profile has not been updated!!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
