import React, { useState, useEffect } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import axios from "axios";
import apiUrl from "../../../api/apiConfig";
import { Link } from "react-router-dom";

const Users = () => {
  const [data, setData] = useState([]);
  let i = 1;

  const getUserData = () => {
    axios
      .get(`${apiUrl}/users`)
      .then((response) => {
        setData(response.data.users);
      })
      .catch((error) => console.error("Error get users", error));
  };

  const confirmDelete = (userId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      handleDelete(userId);
    }
  };

  const handleDelete = (userId) => {
    axios
      .get(`${apiUrl}/users/delete/${userId}`)
      .then((response) => {
        alert(response.data.message);
        getUserData();
      })
      .catch((error) => alert("Can't delete user", error));
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-center">Users Page</h1>
      <Link to={`/users/add`} className="w-full flex justify-center">
        <button className="btn btn-info my-3">Add User</button>
      </Link>
      <div className="overflow-x-auto p-1">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id_user}>
                  <td>{i++}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>
                    <Link to={`/users/${item.id_user}`}>
                      <button className="btn btn-warning w-full">Edit</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => confirmDelete(item.id_user)}
                      className="btn btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  Data Tidak Ada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Users;
