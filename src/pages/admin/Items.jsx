import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import apiUrl from "../../api/apiConfig.js";
import { Link } from "react-router-dom";

const Items = () => {
  const [data, setData] = useState([]);
  let i = 1;

  const getSupplier = () => {
    axios
      .get(`${apiUrl}/supplier`)
      .then((response) => {
        setData(response.data.suppliers);
      })
      .catch((error) => {
        alert("Error fetching data", error);
      });
  };

  useEffect(() => {
    getSupplier();
  }, []);
  return (
    <AdminLayout>
        <div className="flex justify-center"> 
        <Link to={`/addSupplier`}>
          <button className="btn btn-primary">Add Supplier</button>
        </Link>
        </div>
      <div className="overflow-x-auto p-1">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id_supplier}>
                  <th>{i++}</th>
                  <td>{item.name_supplier}</td>
                  <td>
                    <Link to={`/items/${item.id_supplier}`}>
                        <button className="btn btn-info">Detail Item</button> 
                    </Link>
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

export default Items;
