import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCustomers = () => api.get("/customers");
export const getOrders = () => api.get("/orders");
export const getCampaigns = () => api.get("/campaign");
export const getAudiences = () => api.get("/audience");

export const createCustomer = (data: any) =>{
  console.log("data : ", data);
  return api.post("/customers", data);}
export const createOrder = (data: any) => api.post("/orders", data);
export const createCampaign = (data: any) => api.post("/campaign", data);
export const createAudience = (data: any) => {
  console.log("data : ", data);
  return api.post("/audience", data);}

export default api;
