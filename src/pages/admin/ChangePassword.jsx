import React from "react";
import { useState, useEffect } from "react";
import apiUrl from "../../api/apiConfig";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [formData, setFormData] = useState({
    id_user: 0,
    password: ""
  });
  
  const checkAuth = () => {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");

    // Check if token exists
    if (token) {
      // Set token as default header for all Axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getProfile = () => {
    axios
      .get(`${apiUrl}/me`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error get profile", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/changePassword`, formData).then(response => console.log(response.data)).catch(error => console.error("Error edit data", error));
    } catch (error) {
      console.error("Invalid input", error);
    }
  };

  useEffect(() => {
    checkAuth();
    getProfile();
  }, []);
  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
    <h1 className="text-2xl text-center mb-6">Your Profile</h1>
    <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center h-full flex-col gap-5"
      >
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="********"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
          />
        </label>
        <input type="hidden" name="id_user" value={formData.id_user} />

        <button type="submit" className="btn btn-info w-1/2 text-white">Change</button>
        <a href="/profile" className="btn btn-warning text-white">Edit Profile</a>
        </form>
      </div>
    </AdminLayout>
  );
};

export default Profile;
