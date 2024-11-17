
import axios from "axios";
import '../styles/Home.css';
import React, { useState, useEffect } from "react";
import ErrorPopUp from '../components/ErrorWindow';
// import {
//   getCustomers,
//   getOrders,
//   getCampaigns,
//   getAudiences,
//   createCustomer,
//   createOrder,
//   createCampaign,
//   createAudience,
// } from "./services/api";

const Home = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [audiences, setAudiences] = useState([]);
  const [showError,setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phoneNo: "",
    totalSpendings: 0,
    visits: 0,
  });
  // Function to delete a customer
const deleteCustomer = async (id) => {
  try {
      await axios.delete(
        `https://mini-crm-pe3c.onrender.com/api/customers/${id}`
      );
      setCustomers(customers.filter((customer) => customer._id !== id)); // Update state
  } catch (error) {
      console.error("Error deleting customer:", error.response?.data || error.message);
  }
};

  const [newOrder, setNewOrder] = useState({
    customerId: "",
    orderAmount: 0,
    orderDate: "",
  });

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    description: "",
    status: "active",
    startDate: "",
    endDate: "",
  });

  const [newAudience, setNewAudience] = useState({
    name: "",
    criteria: [],
    description: "",
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersData = await axios.get(
          "https://mini-crm-pe3c.onrender.com/api/customers"
        );
        setCustomers(customersData.data);

        // const ordersData = await getOrders();
        // setOrders(ordersData.data);

        // const campaignsData = await getCampaigns();
        // setCampaigns(campaignsData.data);

        // const audiencesData = await getAudiences();
        // setAudiences(audiencesData.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // POST Customer
  const addCustomer = async () => {
    try {
      const response = await axios.post(
        "https://mini-crm-pe3c.onrender.com/api/customers",
        newCustomer
      );
      setCustomers([...customers, response.data]);
      setNewCustomer({ name: "", email: "", phoneNo: "", totalSpendings: 0, visits: 0 });
    } catch (error) {
      setShowError(true);
      setErrorMessage(
        "Error adding customer:",
        error.message
      );
      console.error("Error adding customer:", error.response?.data || error.message);
    }
  };

  // POST Order
  const addOrder = async () => {
    try {
      const response = await createOrder(newOrder);
      setOrders([...orders, response.data]);
      setNewOrder({ customerId: "", orderAmount: 0, orderDate: "" });
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  // POST Campaign
  const addCampaign = async () => {
    try {
      const response = await createCampaign(newCampaign);
      setCampaigns([...campaigns, response.data]);
      setNewCampaign({
        name: "",
        description: "",
        status: "active",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.error("Error adding campaign:", error);
    }
  };

  // POST Audience
  const addAudience = async () => {
    try {
      const response = await createAudience(newAudience);
      setAudiences([...audiences, response.data]);
      setNewAudience({ name: "", criteria: [], description: "" });
    } catch (error) {
      console.error("Error adding audience:", error);
    }
  };

  return (
    <div>
      <center>
        <h1>CRM Management App</h1>
      </center>
      {showError && (
        <ErrorPopUp
          errorMessage={errorMessage}
          onClose={() => setShowError(false)} // Close the popup
        />
      )}
      {/* Customers */}
      <div className="section">
        <h2 className="section-heading">Customers</h2>

        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            addCustomer();
          }}
        >
          <div className="form-group">
            <label htmlFor="customerName" className="label">
              Customer Name
            </label>
            <input
              id="customerName"
              className="input"
              type="text"
              placeholder="Customer Name"
              value={newCustomer.name}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customerEmail" className="label">
              Customer Email
            </label>
            <input
              id="customerEmail"
              className="input"
              type="email"
              placeholder="Customer Email"
              value={newCustomer.email}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerEmail" className="label">
              Phone Number
            </label>
            <input
              className="input"
              type="text"
              placeholder="Phone Number"
              value={newCustomer.phoneNo}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phoneNo: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="totalSpendings" className="label">
              Total Spending
            </label>
            <div className="input-container">
              <span className="input-text">₹</span>
              <input
                id="totalSpendings"
                className="input"
                type="number"
                placeholder="Total Spending"
                value={newCustomer.totalSpendings}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    totalSpendings: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="visits" className="label">
              Visits
            </label>
            <div className="input-container">
              <span className="input-text">#</span>
              <input
                id="visits"
                className="input"
                type="number"
                placeholder="Visits"
                value={newCustomer.visits}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    visits: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
          </div>

          <button className="btn" type="submit">
            Add Customer
          </button>
        </form>

        <ul className="list">
          {customers.map((customer) => (
            <li className="list-item" key={customer._id}>
              {customer.name} - {customer.email} - ₹{customer.totalSpendings} -{" "}
              {customer.visits} visits - {customer.phoneNo}
              <button
                className="delete-btn"
                onClick={() => deleteCustomer(customer._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* {showError && (
        <ErrorPopUp
          errorMessage={errorMessage}
          onClose={setShowError(false)}
        />
      )} */}
    </div>
  );
};

export default Home;
