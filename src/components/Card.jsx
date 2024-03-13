import React from "react";
import { useState } from "react";
import axios from "axios";
import apiUrl from "../api/apiConfig.js";

const Card = ({ id, title, price }) => {
    const currentDate = new Date(Date.now());

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-based
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

  const [formData, setFormData] = useState({ 
    id_cart: "", 
    id_item: id, 
    item_in: 0,
    item_out: 0,
    id_user: "",
    item_date: formattedDate
 });

 const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value });
 }

 const handleIncrement = () => {
    setFormData({ ...formData, item_out: formData.item_out + 1 });
  };

  const handleDecrement = () => {
    if (formData.item_out > 0) {
      setFormData({ ...formData, item_out: formData.item_out - 1 });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    let {data: {id_user: userId}} = await axios.get(`${apiUrl}/me`)
    let {data: checkCart} = await axios.get(`${apiUrl}/checkCart/${userId}`)

    if(checkCart == false){ 
        let createCart = await axios.post(`${apiUrl}/cart`, {id_user: userId, is_checked_out: 0});
        let {data: checkCart} = await axios.get(`${apiUrl}/checkCart/${userId}`)
        formData.id_cart= checkCart;
        formData.id_user = userId;
        let itemOut = await axios.post(`${apiUrl}/itemInOut`, formData);
        alert(itemOut.data.message);
        
    } else{
        // let addItemToCart = await axios.post(`${apiUrl}/cart`, formData);
        formData.id_cart= checkCart;
        formData.id_user = userId;
        let itemOut = await axios.post(`${apiUrl}/itemInOut`, formData)
        alert(itemOut.data.message);
    }
    } catch(error){
        console.error("Error: ", error);
    }
  };
  return (
    <div className="card w-37 bg-late-700 shadow-xl text-white" key={id}>
      <div className="card-body flex justify-center text-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-md">{parseInt(price).toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0})}</p>
        <div className="card-actions justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input type="hidden" value={id} name="id_item" onChange={handleChange}/>
            <div className="flex">
              <button type="button" className="btn btn-secondary" onClick={handleDecrement}>-</button>
              <input className=" text-white w-6 bg-transparent text-center" type="number" name="item_out" value={formData.item_out} onChange={handleChange} required/>
              <button type="button" className="btn btn-secondary" onClick={handleIncrement}>+</button>
            </div>
            {/* <input className="bg-white text-black w-full text-center" type="number" name="item_out" id="itemOut" onChange={handleChange} required/> */}
            <button type="submit" className="btn btn-primary">
              <p className="text-2xl">+</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Card;
