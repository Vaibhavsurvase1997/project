import React, { useEffect, useState } from "react";
import { Dropdown, Row, Col } from "react-bootstrap";
// import categorySchema from "./categorySchema";
import { getcategory, getPosts } from "../config/MyService";
import "react-multiple-select-dropdown-lite/dist/index.css";
import Footer from "./Footer";
import Header from "./Header";
import "./Style.css";

function Dashboard(props) {
  const [postdata, setPostdata] = useState([]);
  const [uid, setUid] = useState("");
  const [search, setSearch] = useState("");

  const [temp, setTemp] = useState([]);

  const filterCategory = (catItem) => {
    console.log(temp);
    const result = temp.filter((curdata) => {
      return curdata.category_id.category_name === catItem;
    });
    setPostdata(result);
  };

  const filterColor = (catItem) => {
    const result = postdata.filter((curdata) => {
      return curdata.color_id.color_name === catItem;
    });
    setPostdata(result);
  };
  const allproduct = () => {
    getPosts().then((res) => {
      console.log(res.data);
      setPostdata(res.data.product);
      setTemp(res.data.product);
    });
  };
  useEffect(() => {
    allproduct();
  }, []);
  console.log(postdata);

  return (
    <div>
      <Header />
      <br />
      <br />

      <div className="container-fluid" >
        

        <h4 className="text-center"> Popular Products</h4>
       
        <div className="container-fluid">
          <div className=" row">
            {postdata
              .filter((val) => {
                if (search == "") {
                  return val;
                } else if (
                  val.product_name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((val, index) => (
                <div className="col-md-3" style={{ marginTop: "-100px" }}>
                  <div class="center">
                    <div class="property-card">
                      <a href="#">
                        <div class="property-image">
                          <img
                            src={val.product_image}
                            className="card-img"
                            alt="..."
                            height="250px"
                          />
                          <div class="property-image-title">
                            <h5 className="card-title">{val.product_name}</h5>
                          </div>
                        </div>
                      </a>
                      <div class="property-description">
                        <h5 className="card-title">{val.product_desc}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Dashboard;
