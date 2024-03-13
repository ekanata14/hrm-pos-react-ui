import React from "react";
import { useState, useEffect } from "react";
import apiUrl from "../../api/apiConfig";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [formData, setFormData] = useState({
    id_user: 0,
    name: "",
    username: "",
    email: "",
    address: "",
    phone_number: "",
    password: "",
    id_role: 0,
  });

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
      const response = await axios.post(`${apiUrl}/editUser`, formData).then(response => console.log(response.data.message)).catch(error => console.error("Error edit data", error));
    } catch (error) {
      console.error("Invalid input", error);
    }
  };

  useEffect(() => {
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
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </label>
        <input type="hidden" name="id_user" value={formData.id_user} />

        <button type="submit" className="btn btn-info w-1/2 text-white">Edit</button>
        <a href="/changePassword" className="btn btn-warning text-white">Change Password</a>
        </form>
      </div>
    </AdminLayout>
  );
};

export default Profile;
