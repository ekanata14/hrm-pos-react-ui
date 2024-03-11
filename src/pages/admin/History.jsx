import React from "react";
import { useState, useEffect } from "react";
import apiUrl from "../../api/apiConfig";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

const History = () => {
    const [data, setData] = useState([]);
    const [profile, setProfile] = useState([]);
    let i = 1;
    let totalItem, totalCart = 0;
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
  
  const getProfile = () => {
    axios
      .get(`${apiUrl}/me`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        alert("Error get profile", error);
      });
  };

  const getTodayItem = async() => { 
    await axios
      .get(`${apiUrl}/itemToday`)
      .then((response) => setData(response.data))
      .catch((error) => console.log("Error retrieving cart today items", error));
  }

  useEffect(() => {
    checkAuth();
    getTodayItem();
    getProfile();
  }, []);
  return (
    <AdminLayout>
        <h1 className="text-2xl text-center">Purchases History</h1>
        <h2 className="text-2xl text-center my-3">{profile.username}</h2>
        <div className="overflow-x-auto p-1">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Sell Price</th>
        <th>Qty</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
    {data.map(item => (
      <tr key={item.id_item}>
        <th>{i++}</th>
        <td>{item.name_item}</td>
                <td>{item.sell_price_item.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDiigits: 0})}</td>
                <td>{item.total_item_out}</td>
                <td className="hidden">{totalItem = item.sell_price_item * item.total_item_out}</td>
                <td>{totalItem.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDiigits: 0})}</td>
                <td className="hidden">
                {totalCart += totalItem}</td>
      </tr>
    ))}
    </tbody>
  </table>
  <div className="flex flex-col items-end px-6">
  <h2 className="text-xl">Total</h2>
  <h3 className="text-2xl">{totalCart.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDiigits: 0})}</h3>
  </div>
</div>
    </AdminLayout>
  );
};

export default History;
