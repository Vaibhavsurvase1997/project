import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaMapPin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function Footer() {
  const navigate = useNavigate();

  const ty = (e) => {
    navigate("/thankyou");
  };

  return (
    <div>
      <footer>
        <div class="container-fluid footer" style={{position:"absolute"}}>
          <div class="row">
            <div class="col-md-4 footer-column mt-5">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <h4 class="footer-title text-light">About Company</h4>
                </li>
                <li class="nav-item text-light">
                  <a class="nav-link text-white" href="#">
                    NeoSTORE Pvt Ltd.
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white " href="#">
                    <FaMapPin /> Ruby Tower,Dadar, Mumbai-412
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="#">
                    <AiOutlineMail /> admin@neostore.com
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="#">
                    <AiOutlinePhone /> Contact No: 9890438126
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-md-4 footer-column mt-5">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <h4 class="footer-title text-light">Information</h4>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="https://www.itps.co.uk/wp-content/uploads/2019/03/General-Terms-Conditions.pdf">
                    Terms and Conditions
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="#">
                    Gurantee and Return Policy
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="/map">
                    Locate Us
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-md-4 footer-column mt-5">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <h4 class="footer-title text-light">NewsLetter</h4>
                </li>
                <li class="nav-item">
                  <span class="nav-link text-white">
                    Sign Up to get exclusive offer from our favourite brand.
                  </span>
                </li>
                <li class="nav-item">
                  <input type="email" placeholder="Your Email"></input>
                </li>
                <br />
                <li class="nav-item">
                  <button className="btn btn-light" onClick={ty}>
                    Subscribe
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <br />
          <br />

          <div className="mb-5">
            <h6 className="text-center text-light ">
              Copyright &copy; 2021 All rights reserved
            </h6>
          </div>
        </div>
      </footer>
      <br />
      <br />
    </div>
  );
}
