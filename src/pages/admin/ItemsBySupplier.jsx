import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import axios from "axios";
import apiUrl from "../../api/apiConfig.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Items = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  let i = 1;
  const currentDate = new Date(Date.now());

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because it's zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const [formData, setFormData] = useState({
    id_cart: "",
    id_item: "",
    item_in: 0,
    item_out: 0,
    id_user: "",
    item_date: formattedDate,
  });
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let {
        data: { id_user: userId },
      } = await axios.get(`${apiUrl}/me`);
      // let addItemToCart = await axios.post(`${apiUrl}/cart`, formData);
      formData.id_cart = null;
      formData.id_user = userId;
      let itemIn = await axios.post(`${apiUrl}/itemInOut`, formData);
      getItemsBySupplier();
      alert(itemIn.data.message);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const getItemsBySupplier = () => {
    axios
      .get(`${apiUrl}/itemsSup/${id}`)
      .then((response) => {
        setData(response.data.items);
      })
      .catch((error) => {
        alert("Error fetching data", error);
      });
  };

  useEffect(() => {
    getItemsBySupplier();
  }, []);
  return (
    <AdminLayout>
      <div className="flex justify-center">
        <Link to={`/addItem`}>
          <button className="btn btn-primary">Add Item</button>
        </Link>
      </div>
      <div className="overflow-x-auto p-1">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Base Price</th>
              <th>Sell Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id_item}>
                  <th>{i++}</th>
                  <td>{item.name_item}</td>
                  <td>
                    {item.base_price_item.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDiigits: 0,
                    })}
                  </td>
                  <td>
                    {item.sell_price_item.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDiigits: 0,
                    })}
                  </td>
                  <td>{item.total_stock}</td>
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
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-info w-full mt-5"
        onClick={() => {
          document.getElementById("my_modal_1").showModal();
        }}
      >
        Add Stock
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <select
              className="select select-bordered w-full"
              name="id_item"
              value={formData.id_item}
              onChange={handleChange}
            >
              <option value="">Select Items</option>
              {data.map((item) => (
                <option key={item.id_item} value={item.id_item}>
                  {item.name_item}
                </option>
              ))}
            </select>

            <label className="input input-bordered flex items-center gap-2 w-full">
              <input
                type="number"
                className="grow"
                placeholder="Item Name"
                name="item_in"
                value={formData.item_in}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="btn btn-info ml-4">
              Add
            </button>
          </form>
          <form method="dialog" className="absolute right-2 top-2">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">X</button>
          </form>
        </div>
      </dialog>
    </AdminLayout>
  );
};

export default Items;
