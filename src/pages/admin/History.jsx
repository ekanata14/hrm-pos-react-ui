import React from "react";
import { useState, useEffect } from "react";
import apiUrl from "../../api/apiConfig";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

const History = () => {
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState([]);
  let i = 1;
  let totalItem,
    totalCart = 0;

  const currentDate = new Date(Date.now());

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because it's zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  // Fungsi untuk mendapatkan tanggal hari ini dalam format 'YYYY-MM-DD'
  function getTodayDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because it's zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Fungsi untuk mengubah tanggal yang dipilih
  const handleChangeDate = (event) => {
    setSelectedDate(event.target.value);
  };

  // Fungsi untuk mengirim permintaan pencarian ke backend berdasarkan tanggal yang dipilih
  const handleSubmit = (event) => {
    event.preventDefault();
    // Lakukan pemanggilan API ke backend dengan menggunakan tanggal yang dipilih
    axios
      .get(`${apiUrl}/itemToday/${selectedDate}`)
      .then((response) => {
        // Lakukan sesuatu dengan data yang diterima dari backend, seperti menampilkan dalam komponen
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat memanggil API:", error);
      });
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

  const getTodayItem = async () => {
    await axios
      .get(`${apiUrl}/itemToday/${formattedDate}`)
      .then((response) => setData(response.data))
      .catch((error) =>
        console.log("Error retrieving cart today items", error)
      );
  };

  useEffect(() => {
    // getTodayItem();
    getProfile();
  }, []);
  return (
    <AdminLayout>
      <h1 className="text-2xl text-center">Purchases History</h1>
      <h2 className="text-2xl text-center my-3">{profile.username}</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="date"
              className="grow"
              placeholder="Date"
              name="name"
              value={selectedDate}
              onChange={handleChangeDate}
            />
          </label>
          <button type="submit" className="btn btn-info w-full mt-4 mb-4">
            Cari
          </button>
        </form>
      </div>
      <div className="overflow-x-auto h-full pb-20">
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
            {data.map(
              (item) =>
                item.total_item_out != 0 && (
                  <tr key={item.id_item}>
                    <th>{i++}</th>
                    <td>{item.name_item}</td>
                    <td>
                      {item.sell_price_item.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDiigits: 0,
                      })}
                    </td>
                    <td>{item.total_item_out}</td>
                    <td className="hidden">
                      {(totalItem = item.sell_price_item * item.total_item_out)}
                    </td>
                    <td>
                      {totalItem.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDiigits: 0,
                      })}
                    </td>
                    <td className="hidden">{(totalCart += totalItem)}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>

        <div className="fixed w-full bottom-0 left-0 bg-white text-black text-center py-3 rounded-3xl"> 
          <h3 className="text-2xl">
            {totalCart.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDiigits: 0,
            })}
          </h3>
        </div>
      </div>
    </AdminLayout>
  );
};

export default History;
