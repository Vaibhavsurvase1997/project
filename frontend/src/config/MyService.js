import axios from "axios";
import { MAIN_URL } from "./Url";
let token=localStorage.getItem('_token');

export function addUser(data) {
  return axios.post(`${MAIN_URL}adduser`, data);
}
export function login(data) {
  return axios.post(`${MAIN_URL}login`, data);
}
export function Email(data) {
  return axios.post(`${MAIN_URL}email`, data);
}
export function ChangePassword(data) {
  return axios.post(`${MAIN_URL}changepassword`, data);
}
export function getPosts() {
  return axios.get(`${MAIN_URL}fetchproduct`);
}
export function getcategory() {
  return axios.get(`${MAIN_URL}getcategory`);
}
export function getProduct() {
  return axios.get(`${MAIN_URL}getproduct`);
}
export function getsingleproduct(data) {
  return axios.get(
    `${MAIN_URL}singleproduct/` + data
    // {headers:{"Authorization":`Bearer ${token}`}}
  );
}
export function updateProfile(id, data) {
  console.log(data);
  return axios.put(`${MAIN_URL}updateprofile/${id}`, data);
}
//profile fields
export function addAddress(data) {
  console.log(data);
  return axios.post(`${MAIN_URL}addaddress`, data);
}
export function editAddress(data) {
  console.log(data);
  return axios.post(`${MAIN_URL}editaddress`, data);
}
export function deleteAddr(email) {
  return axios.delete(`${MAIN_URL}deleteadd/${email}`);
}

export function updProfile(id, data) {
  console.log(data);
  return axios.put(`${MAIN_URL}updprofile/${id}`, data);
}
export function getProfile(email) {
  return axios.get(`${MAIN_URL}profile/${email}`);
}
export function changePass(id, data) {
  return axios.put(`${MAIN_URL}changepass/${id}`, data);
}
//get orderdata
export function getOrderdata(email) {
  return axios.get(`${MAIN_URL}getorder/${email}`);
}
export function createOrders(data) {
  console.log(data)
  return axios.post(`${MAIN_URL}carddetails`, data)
}
export function cardaddress(data) {
  console.log(data)
  return axios.post(`${MAIN_URL}cardaddress`, data)
}
export function authentication(token) {
  return axios.get(`${MAIN_URL}loginfirst`, {
      headers: { "authorization": `Bearer ${token}` }
  });
}
export function getinvoice(orderno) {
  return axios.get(`${MAIN_URL}getinvoice/${orderno}`,{
  headers: { "authorization": `Bearer ${token}` }
  });
}
export function getaddress1(email) {
  return axios.get(`${MAIN_URL}getaddress/${email}`,{
    headers: { "authorization": `Bearer ${token}` }
    })
}



