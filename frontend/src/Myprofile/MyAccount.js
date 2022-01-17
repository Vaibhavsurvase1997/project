import React, { useState, useEffect, useRef } from "react";
// import { Outlet } from 'react-router-outlet'
import { Container } from "react-bootstrap";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { BsArrowLeftRight } from "react-icons/bs";
import { MdAccountBox, MdLibraryBooks } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  getProfile,
  getMulter,
  getImage,
  updProfile,
} from "../config/MyService";
import axios from "axios";
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function MyAccount() {
  let [user, setUser] = useState([]);
  // const [file, setFile] = useState("");
  
  const [showInvoice, setShowInvoice] = useState(false);
  let [password, setPassword] = useState("");
  let [name, setName] = useState("");
  let [lname, setLname] = useState("");
  let [phone, setPhone] = useState("");
  let [address, setAddress] = useState("");
  let [email, setEmail] = useState("");
  const [mainimage, setMainImage] = useState("");
  const [profileImg, setprofileImg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    if (localStorage.getItem('_token') != undefined) {
        let token = localStorage.getItem('_token');
        let decode = jwt_decode(token);
        console.log(decode)
        // setUid(decode.uid)
        getProfile(localStorage.getItem('user'))
            .then(res => {
                if (res.data.user) {
                    console.log(res.data.user);
                    let data = res.data.user;
                    setUser(data);
                    setEmail(data.email);
                    setName(data.name);
                    setPhone(data.phone);
                    // getImage1();
                }
            })
    }
    else {
        navigate("/")
    }
}, [])

  // const onSubmit1 = (e) => {
  //     e.preventDefault()
  //     const formData = new FormData()
  //     formData.append('profileImg', profileImg)
  //     getMulter(formData, localStorage.getItem('user')).then(res => {
  //         if (res) {
  //             console.log(res);
  //             getImage1();

  //         }
  //     })

  // }

  // const getImage1 = () => {
  //     let user = localStorage.getItem('user');
  //     getImage(user)
  //         .then(res => {

  //             if (res.data.err == 0) {
  //                 setMainImage(res.data.data.profileImg);

  //             }
  //             else {
  //                 setMainImage("images/pro.jpg")
  //             }
  //         })
  // }

  const onFileChange = (e) => {
    setprofileImg(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
    <div className="container-fluid" >
      <div className=" text-center col-5 mt-5">
        {/* <HiUserCircle className="text-center" size="200px" /> */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXDpAJm_hZ_gcCjB7Y9NKftGVI_5vIZH9EXA&usqp=CAU"
          height="200px"
          width="200px"
          className="card"
        ></img>
        <br />
        <br />
        <div>
          <div className="row">
            <form>
              {/* <form onSubmit={onSubmit1}> */}
              <div className="container text-center">
                <div className="form-group   text-center">
                  <input
                    type="file"
                    onChange={onFileChange}
                    className="form-control sha "
                  />
                </div>
                <br />
                <div className="form-group text-center">
                  <button className="btn btn-danger sha" type="submit">
                    UPLOAD
                  </button>
                </div>
              </div>
              <br />
              <br></br>
            </form>
          </div>
        </div>
        <h4 className="text-danger text-center mt-1">
          {user.fname}&nbsp;{user.lname}
        </h4>
        <br />
        <div>
          <a
            className="btn sha text-center "
            style={{ width: "200px" }}
            href="/order"
          >
            <HiOutlineMenuAlt2 style={{ margin: "5 5 5 5" }} />
            Order
          </a>
          <br />
          <br />
          <a
            className="btn sha text-center"
            style={{ width: "200px" }}
            href="/profile"
          >
            <MdAccountBox style={{ margin: "5 5 5 5" }} />
            Profile
          </a>
          <br />
          <br />
          <a
            className="btn sha text-center"
            style={{ width: "200px" }}
            href="/address"
          >
            <MdLibraryBooks style={{ margin: "5 5 5 5" }} />
            Address
          </a>
          <br />
          <br />
          <a
            className="btn  sha text-center"
            style={{ width: "200px" }}
            href="/changepassword"
          >
            <BsArrowLeftRight style={{ margin: "5 5 5 5" }} />
            ChangePasssword
          </a>
          <br />
          <br />
        </div>
      </div>
    </div>
    </div>
  );
}
