import React from 'react'
import { useState, useEffect } from 'react'
import apiUrl from "../../api/apiConfig";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

const Leaderboard = () => { 
    const [data, setData] = useState([]);
    let i = 1;

  const getLeaderboard = async() => { 
    await axios
      .get(`${apiUrl}/checkoutLeaderboard`)
      .then((response) => setData(response.data))
      .catch((error) => console.log("Error retrieving cart today items", error));
  }

  useEffect(() => {
    getLeaderboard();
  }, []);
  return (
    <AdminLayout>
        <h1 className="text-2xl text-center">Leaderboard</h1>
        <div className="overflow-x-auto p-1">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>No</th>
        <th>Username</th>
        <th>Total Transaction</th>
      </tr>
    </thead>
    <tbody>
    {data.map(item => (
      <tr key={i++}>
        <th>{i++}</th>
        <td>{item.username}</td>
        <td>{item.total_transaction}</td>
      </tr>
    ))}
    </tbody>
  </table>
</div>
    </AdminLayout>
  )
}

export default Leaderboard