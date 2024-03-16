import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import apiUrl from "../../../api/apiConfig";
import { useParams } from "react-router-dom";

const AddStock = () => {
const { idItem, idSupplier } = useParams();
  const currentDate = new Date(Date.now());
  const navigate = useNavigate();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because it's zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const [formData, setFormData] = useState({
    id_cart: "",
    id_item: 0,
    item_in: 0,
    item_out: 0,
    id_user: "",
    item_date: formattedDate,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
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
      alert(itemIn.data.message);
      navigate(`/items/${idSupplier}`);
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  return (
    <AdminLayout>
        <form onSubmit={handleSubmit} className="flex items-center justify-center h-full flex-col gap-5">

        <h2 className="text-2xl font-bold">Add Stock</h2>
          <input type="hidden" name="id_item" value={formData.id_item = idItem} onChange={handleChange} />

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
          <button type="submit" className="btn btn-primary mt-3 w-full">
            Add Stock
          </button>
        <Link to={`/items/${idSupplier}`} className="w-full">
          <button className="btn btn-info w-full">Cancel</button>
        </Link>
        </form>
    </AdminLayout>
  );
};

export default AddStock;
