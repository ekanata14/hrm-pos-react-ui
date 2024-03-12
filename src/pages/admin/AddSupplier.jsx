import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import apiUrl from "../../api/apiConfig";

const AddSupplier = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name_supplier: "",
    phone_number_supplier: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/supplier`, formData);
      console.log("Supplier added successfully:", response.data);
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
        <h2 className="text-2xl font-bold">Add New Supplier</h2>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            type="text"
            className="grow"
            placeholder="Supplier Name"
            name="name_supplier"
            value={formData.name_supplier}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            type="number"
            className="grow"
            placeholder="Phone Number Supplier"
            name="phone_number_supplier"
            value={formData.phone_number_supplier}
            onChange={handleChange}
          />
        </label>
        <button className="btn btn-primary w-full">Add Supplier</button>
        <Link to={"/items"} className="w-full">
          <button className="btn btn-info w-full">Cancel</button>
        </Link>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </AdminLayout>
  );
};

export default AddSupplier;
