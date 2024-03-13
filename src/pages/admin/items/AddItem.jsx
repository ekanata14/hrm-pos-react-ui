import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import apiUrl from "../../../api/apiConfig";

const AddItem = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name_item: "",
    base_price_item: "",
    sell_price_item: "",
    id_category: "",
    id_supplier: ""
  });
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/category`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/supplier`);
      setSuppliers(response.data.suppliers);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/items`, formData);
      console.log("Item added successfully:", response.data);
      // Redirect to dashboard or another page
      navigate(`/items`);
    } catch (error) {
      console.error("Error adding item:", error);
      setError("Failed to add item");
    }
  };

  return (
    <AdminLayout>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center h-full flex-col gap-5"
      >
        <h2 className="text-2xl font-bold">Add New Item</h2>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            type="text"
            className="grow"
            placeholder="Item Name"
            name="name_item"
            value={formData.name_item}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            type="text"
            className="grow"
            placeholder="Base Price"
            name="base_price_item"
            value={formData.base_price_item}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            type="text"
            className="grow"
            placeholder="Sell Price"
            name="sell_price_item"
            value={formData.sell_price_item}
            onChange={handleChange}
          />
        </label>
          <select
            className="select select-bordered w-full"
            name="id_category"
            value={formData.id_category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id_category} value={category.id_category}>
                {category.name_category}
              </option>
            ))}
          </select>
          <select
            className="select select-bordered w-full"
            name="id_supplier"
            value={formData.id_supplier}
            onChange={handleChange}
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id_supplier} value={supplier.id_supplier}>
                {supplier.name_supplier}
              </option>
            ))}
          </select>
        <button className="btn btn-primary w-full">Add Item</button>
        <Link to={"/items"} className="w-full">
          <button className="btn btn-info w-full">Cancel</button>
        </Link>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </AdminLayout>
  );
};

export default AddItem;
