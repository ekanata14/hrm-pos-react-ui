import React from "react";
import axios from "axios";
import apiUrl from "../../api/apiConfig.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import Card from "../../components/Card.jsx";

const Index = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [profile, setProfile] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  let idCart = 0;
  let i = 1;
  let totalItem = 0;
  let totalCart = 0;
const [formData, setFormData] = useState({ 
    id_cart: "", 
    total: 0, 
    payment_method: "",
    id_user: "",
    date_checkout: ""
 });

 

    const currentDate = new Date(Date.now());

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-based
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;


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


const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value });
 }

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

  const getItems = () => {
    axios
      .get(`${apiUrl}/items`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        alert("Error fetching data", error);
      });
  };
  
  const getTotalBazzar = () => {
    axios
      .get(`${apiUrl}/total`)
      .then((response) => {
        setTotal(response.data);
      })
      .catch((error) => {
        alert("Error fetching data", error);
      });
  };

  const getCategories = () => {
    axios
      .get(`${apiUrl}/category`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  };

  const changeCategory = (id) => {
    axios
      .get(`${apiUrl}/items/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        alert("Error fetching data", error);
      });
  };

  const getItemsByCart = async (id) => {
    let checkCart = await axios.get(`${apiUrl}/checkCart/${id}`);
    let itemsByCart = await axios
      .get(`${apiUrl}/itemByCart/${checkCart.data}`)
      .then((response) => setCart(response.data))
      .catch((error) => console.log("Error retrieving cart items", error));
  };
    
  const getItemsByCartReal = async (id) => {
    let itemsByCart = await axios
      .get(`${apiUrl}/itemByCart/${id}`)
      .then((response) => setCart(response.data))
      .catch((error) => alert("Error retrieving cart items", error));
  };
    
  const checkoutCart = async(e) => {
    e.preventDefault();
    try{
        await axios.post(`${apiUrl}/checkout`, formData).then(response => {getItemsByCart(profile.id_user); alert(response.data.message)}).catch(error => console.error("Can't do the checkout", error));
    } catch(error){
        alert(error);
    }
 }

  const deleteItem = async(e, id, idCart) => {
    e.preventDefault(); 
    try{
        await axios.get(`${apiUrl}/itemDestroy/${id}`).then(response => {getItemsByCartReal(idCart); alert(response.data.message)}).catch(error => alert("Can't do the destroy", error));
    } catch(error){
        alert(error);
    }
  }

  useEffect(() => {
    checkAuth();
    getItems();
    getCategories();
    getProfile();
    getTotalBazzar();
  }, []);
  const isAdmin = profile.id_role;
  let card = '';
  if(isAdmin == 1){
    card = 
      <div>
        <div className="card w-full mb-6 bg-white text-black shadow-xl">
  <div className="card-body text-center">
    <h2 className="font-bold text-center text-2xl">Total Kas Bazzar</h2>
    <p className="font-semibold">{total.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDiigits: 0})}</p>
  </div>
</div>
      </div>
  } else{
    card = ''
  }
  return (
    <AdminLayout>
      {card}
      <div className="grid grid-cols-4 gap-2">
        {categories.length > 0 ? (
          categories.map((item) => (
            <button
              className="btn btn-info"
              key={item.id_category}
              onClick={() => changeCategory(item.id_category)}
            >
              {item.name_category}
            </button>
          ))
        ) : (
          <button className="btn btn-danger">Loading / Data Tidak Ada</button>
        )}
      </div>
      <div className="container grid grid-cols-2 mt-3 gap-3 max-h-[600px] overflow-auto">
        {data.length > 0 ? (
          data.map((item) => (
            <Card
              key={item.id_item}
              id={item.id_item}
              title={item.name_item}
              price={item.sell_price_item}
            ></Card>
          ))
        ) : (
          <div>
            <h1 className="text-3xl text-center">Tidak ada Data</h1>
          </div>
        )}
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-warning absolute right-5 bottom-5"
        onClick={() => {
          document.getElementById("my_modal_1").showModal();
          getItemsByCart(profile.id_user);
        }}
      >
        Keranjang
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Your Cart</h3>
          <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
            <table className="table table-xs">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                <tr key={item.id_item_in_out}>
                <td>{i++}</td>
                <td>{item.name_item}</td>
                <td>{item.sell_price_item.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDiigits: 0})}</td>
                <td>{item.item_out}</td>
                <td className="hidden">{totalItem = item.sell_price_item * item.item_out}</td>
                <td>{totalItem.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDiigits: 0})}</td>
                <td className="hidden">
                {totalCart += totalItem}</td>
                <td className="hidden">
                    {idCart = item.id_cart}
                </td>
                <td>
                    <button className="btn btn-error" onClick={(e, id) => deleteItem(e, item.id_item_in_out, item.id_cart)}>X</button>
                </td>
                </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                <th colSpan={4} className="text-end"></th>
                <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="modal-action flex flex-col items-end gap-4">
            <div className="flex items-center gap-2">
            <h6 className="text-sm">Total</h6>
            <h4 className="text-xl">{totalCart.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDiigits: 0})}</h4>
            </div>
            <form onSubmit={checkoutCart}>
                <input type="hidden"  value={formData.id_cart = idCart || ''} name="id_cart" onChange={(e) => handleChange(e)}/>
                <input type="hidden" value={formData.total = totalCart || ''} name="total" onChange={(e) => handleChange(e)}/>
                <select className="select select-bordered" name="payment_method" id="paymentMethod" onChange={(e) => handleChange(e)} value={formData.payment_method} required>
                    <option value="">Payment Method</option>
                    <option value="cash">Cash</option>
                    <option value="transfer">Transfer</option>
                </select>
                <input type="hidden" value={formData.id_user = profile.id_user || ''} name="id_user" onChange={(e) => handleChange(e)} />
                <input type="hidden" value={formData.date_checkout = formattedDate || ''} name="date_checkout" onChange={(e) => handleChange(e)}/>
                <button type="submit" className="btn btn-info ml-4">Checkout</button>
            </form>
            <form method="dialog" className="absolute right-2 top-2">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">X</button>
            </form>
          </div>
        </div>
      </dialog>
    </AdminLayout>
  );
};

export default Index;
