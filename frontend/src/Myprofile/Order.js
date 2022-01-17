import React from "react";
import { Button, Container, Table, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { getOrderdata } from "../config/MyService";
import MyAccount from "./MyAccount";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Order() {
  let [temp, settemp] = useState([]);
  let [items, setitems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOrderdata(localStorage.getItem("user")).then((res) => {
      if (res.data.user) {
        console.log(res.data.user);
        let data1 = res.data.user;
        settemp(data1);
        console.log([data1]);
        console.log(temp);
        // console.log(res.data.items)
        // let data2 = res.data.items;
        // setitems(data2);
        // console.log(data2)
        // console.log(items)
        //console.log(data2[0].product_name)
      } else {
        console.log(res.data.err);
      }
    });
  }, []);
  const invoice = (orderno) => {
    navigate("/invoice", {
      state: { orderno: orderno },
    });
  };

  return (
    <>
    <Header/>
    <div>
      <div className="row card4">
        <div className="col-5" style={{ marginTop: "10px" }}>
          <MyAccount />
        </div>
        <div className="col-7">
          <br />
          <br />
          <table className="table card2 ">
            <thead></thead>
            <tbody>
              {temp.map((value, index) => {
                return (
                  <tr key={index}>
                    <h5>
                      <span className="text-success">Transit</span> Order BY
                    </h5>
                    <p>
                      <span className="text-danger">DATE</span>:{value.date}
                    </p>
                    <div className="row">
                      {temp[index].items.map((val) => {
                        return (
                          <div className="row  col-4 ">
                            <div className=" ">
                              <img
                                src={val.product_image}
                                height="150px"
                                width="200px"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <tr>
                      <button
                        className="btn btn-info "
                        onClick={() => invoice(value.Orderno)}
                      >
                        VIEW INVOICE PDF
                      </button>
                    </tr>
                    <br />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
