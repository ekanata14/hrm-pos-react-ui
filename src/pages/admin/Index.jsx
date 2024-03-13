import React from "react";
import axios from "axios";
import apiUrl from "../../api/apiConfig.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import Card from "../../components/Card.jsx";
import { Link } from "react-router-dom";

const Index = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [profile, setProfile] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [totalPerDay, setTotalPerDay] = useState(0);
  let idCart = 0;
  let i = 1;
  let totalItem = 0;
  let totalCart = 0;
  const [formData, setFormData] = useState({
    id_cart: "",
    total: 0,
    payment_method: "",
    id_user: "",
    date_checkout: "",
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const currentDate = new Date(Date.now());

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because it's zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getProfile = () => {
    axios
      .get(`${apiUrl}/me`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error get profile", error);
      });
  };

  const getItems = () => {
    axios
      .get(`${apiUrl}/items`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  };

  const getTotalBazzar = () => {
    axios
      .get(`${apiUrl}/total`)
      .then((response) => {
        setTotal(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  };

  const getTotalPerDay = () => {
    axios
      .get(`${apiUrl}/totalPerDay`)
      .then((response) => {
        setTotalPerDay(response.data);
      })
      .catch((error) => {
        console.error("Error Fetching Data");
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
        console.error("Error fetching data", error);
      });
  };

  const getItemsByCart = async (id) => {
    let checkCart = await axios.get(`${apiUrl}/checkCart/${id}`);
    let itemsByCart = await axios
      .get(`${apiUrl}/itemByCart/${checkCart.data}`)
      .then((response) => setCart(response.data))
      .catch((error) => console.error("Error retrieving cart items", error));
  };

  const getItemsByCartReal = async (id) => {
    let itemsByCart = await axios
      .get(`${apiUrl}/itemByCart/${id}`)
      .then((response) => setCart(response.data))
      .catch((error) => console.error("Error retrieving cart items", error));
  };

  // Fungsi untuk mengupdate data awal jika prop items berubah
  const updateData = (newData) => {
    setData(newData);
  };

  const handleSearch = event => {
    let term = event.target.value;
    setSearchTerm(term);
    if (term === '') {
      setSearchResults([]);
    } else {
      performSearch(term);
    }
  };

  // Fungsi untuk melakukan pencarian
  const performSearch = (searchTerm) => {
    const results = data.filter(item =>
      item.name_item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const checkoutCart = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${apiUrl}/checkout`, formData)
        .then((response) => {
          getItemsByCart(profile.id_user);
          alert(response.data.message);
        })
        .catch((error) => console.error("Can't do the checkout", error));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (e, id, idCart) => {
    e.preventDefault();
    try {
      await axios
        .get(`${apiUrl}/itemDestroy/${id}`)
        .then((response) => {
          getItemsByCartReal(idCart);
          alert(response.data.message);
        })
        .catch((error) => alert("Can't do the destroy", error));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItems();
    getCategories();
    getProfile();
    getTotalBazzar();
    getTotalPerDay();
  }, []);
  const isAdmin = profile.id_role;
  let card = "";
  if (isAdmin == 1) {
    card = (
      <div>
        <div className="card w-full mb-6 bg-white text-black shadow-xl">
          <div className="card-body text-center">
            <h2 className="font-bold text-center text-2xl">Total Kas Bazzar</h2>
            <p className="font-semibold">
              {total.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDiigits: 0,
              })}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    card = "";
  }
  return (
    <AdminLayout>
      {card}
      <div>
        <div className="card w-full mb-6 bg-white text-black shadow-xl">
          <div className="card-body text-center">
            <h2 className="font-bold text-center text-2xl">
              Total Bazzar Harian
            </h2>
            <p className="font-semibold">
              {parseInt(totalPerDay).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDiigits: 0,
              })}
            </p>
            <Link to={"/history"}>
              <button className="btn btn-info">Detail</button>
            </Link>
          </div>
        </div>
      </div>
      <div>
<label className="input input-bordered flex items-center gap-2 mb-3">
  <input type="text" className="grow" placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch} />
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
</label>
    </div>
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
        {data.length > 0 ? ((searchTerm === '' ? data : searchResults).map((item) => (
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
        className="btn btn-warning fixed right-3 bottom-5"
        onClick={() => {
          document.getElementById("my_modal_1").showModal();
          getItemsByCart(profile.id_user);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
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
                {cart.map((item) => (
                  <tr key={item.id_item_in_out}>
                    <td>{i++}</td>
                    <td>{item.name_item}</td>
                    <td>
                      {item.sell_price_item.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDiigits: 0,
                      })}
                    </td>
                    <td>{item.item_out}</td>
                    <td className="hidden">
                      {(totalItem = item.sell_price_item * item.item_out)}
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
                    <td className="hidden">{(idCart = item.id_cart)}</td>
                    <td>
                      <button
                        className="btn btn-error"
                        onClick={(e, id) =>
                          deleteItem(e, item.id_item_in_out, item.id_cart)
                        }
                      >
                        X
                      </button>
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
              <h4 className="text-xl">
                {totalCart.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDiigits: 0,
                })}
              </h4>
            </div>
            <form onSubmit={checkoutCart}>
              <input
                type="hidden"
                value={(formData.id_cart = idCart || "")}
                name="id_cart"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="hidden"
                value={(formData.total = totalCart || "")}
                name="total"
                onChange={(e) => handleChange(e)}
              />
              <select
                className="select select-bordered"
                name="payment_method"
                id="paymentMethod"
                onChange={(e) => handleChange(e)}
                value={formData.payment_method}
                required
              >
                <option value="">Payment Method</option>
                <option value="cash">Cash</option>
                <option value="transfer">Transfer</option>
              </select>
              <input
                type="hidden"
                value={(formData.id_user = profile.id_user || "")}
                name="id_user"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="hidden"
                value={(formData.date_checkout = formattedDate || "")}
                name="date_checkout"
                onChange={(e) => handleChange(e)}
              />
              <button type="submit" className="btn btn-info ml-4">
                Checkout
              </button>
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
