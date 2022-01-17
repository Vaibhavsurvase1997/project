const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const jwtSecret = "hkedjdu66e78w668t";
//dbconnection
const db = "mongodb://localhost:27017/neostore";
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
  }
};
connectDB();
//end

const registermodel = require("../db/RegisterSchema");
const productmodel = require("../db/productSchema");
const colorSchema = require("../db/colorSchema");
const categorymodel = require("../db/categorySchema");
const ordersmodel = require("../db/OrdersSchema");
const otpmodel = require("../db/otpSchema");


function autenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) {
    res.json({ err: 1, msg: "Token not match" });
  } else {
    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.json({ err: 1, msg: "Token incorrect" });
      } else {
        console.log("Match");
        next();
      }
    });
  }
}

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.password
  },
});

router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  registermodel.findOne({ email: email, password: password }, (err, data) => {
    if (err) {
      res.json({ err: 1, msg: "Invalid credentials" });
    } else if (data == null) {
      res.json({ err: 1, msg: "Invalid credentials" });
    } else {
      let payload = {
        uid: email,
      };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
      res.json({ err: 0, msg: "Welcome", token: token });
    }
  });
});

router.post("/adduser", (req, res) => {
  registermodel.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      res.json({ err: 1, msg: "Something went wrong in checking data" });
    } else if (data == null) {
      let ins = new registermodel({
        fname: req.body.fname,
        lname: req.body.lname,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password,
      });
      ins.save((e) => {
        if (e) {
          res.json({ err: 1, msg: "Something went wrong in adding data" });
        } else {
          res.json({ err: 0, msg: "Registered Successfully !" });
        }
      });
    } else {
      res.json({ err: 0, msg: "Login Successfully!" });
    }
  });
});

router.post("/email", async (req, res) => {
  let data = await registermodel.findOne({ email: req.body.email });
  if (data) {
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    let otpdata = new otpmodel({
      email: req.body.email,
      code: otpcode,
      expiresIn: new Date().getTime() + 300 * 1000,
    });
    otpdata.save((e) => {
      if (e) {
        res.json({ err: 1, msg: "Something went wrong in adding data" });
      } else {
        res.json({ err: 0, msg: "OTP sent to your email. Please check it !" });
      }
    });
    let mailDetails = {
      from: "abc@gmail.com",
      to: "neostore20@gmail.com",
      subject: "Your OTP for password reset",
      text: "...",
      html: `<!DOCTYPE html>
  <html>
  <head>
  <style>
 span {
      color:red;
    }

  </style>
  </head>
  <body>
  <h1>Neo<span>STORE</span><h1><hr/>
  
  <h3>To authenticate, please use the following One Time Password (OTP):

  <h1>${otpdata.code}</h1>
  
  Don't share this OTP with anyone. Our customer service team will never ask you for your password, OTP, credit card, or banking info.
  
  We hope to see you again soon.</h3>
  </body>
  </html> `,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent successfully");
      }
    });
  } else {
    res.json({ err: 1, msg: "Email id doesn't exist" });
  }
});

router.post("/changepassword", async (req, res) => {
  let data = await otpmodel.findOne({
    email: req.body.email,
    code: req.body.code,
  });
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expiresIn - currentTime;
    if (diff < 0) {
      res.json({ err: 1, msg: " Token Expires" });
    } else {
      let user = await registermodel.findOne({ email: req.body.email });
      if (user) {
        user.password = req.body.password;
        user.save();
        res.json({ err: 0, msg: "Password Changed Successfully !" });
      } else {
        console.log("Something went wrong :(");
      }
    }
  } else {
    res.json({ err: 1, msg: "Enter Correct OTP " });
  }
});

// router.get("/fetchpost", (req, res) => {
//   productmodel.find({}, (err, data) => {
//     if (err) throw err;
//     res.json({ err: 0, data: data });
//   });
// });

router.get("/getproduct", (req, res) => {
  productmodel.find({}, (err, data) => {
    if (err) throw err;
    res.json({ err: 0, data: data });
  });
});

router.get("/fetchproduct", (req, res) => {
  productmodel
    .find()
    .populate(["category_id", "color_id"])
    .then((product) => {
      console.log(product);
      // res.send("Data Fetch")
      res.json({ product: product });
    });
});

router.get("/getcategory", (req, res) => {
  categorymodel.find({}, (err, data) => {
    if (err) throw err;
    res.json({ err: 0, data: data });
  });
});

router.get("/singleproduct/:id", (req, res) => {
  let id = req.params.id;

  productmodel
    .findOne({ _id: id })
    .populate("color_id")
    .then((product) => {
      console.log(product);

      res.json({
        product: product,
        err: "0",
        image: product.product_subimages,
      });
    });
});

router.put("/updateprofile/:id", (req, res) => {
  let id = req.params.id;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let email = req.body.email;
  let mobile = req.body.mobile;
  console.log(fname);
  // let password = req.body.password;
  registermodel.updateOne(
    { _id: id },
    { $set: { fname: fname, lname: lname, email: email, mobile: mobile } },
    (err) => {
      if (err) res.json({ err: err });
      res.json({ msg: "Userprofile has Updated Succesfully" });
    }
  );
});

//add address
router.post("/addaddress", (req, res) => {
  // let Address=[];
  console.log("address section");
  console.log(req.body);
  registermodel.find({ email: req.body.email }, (err, data) => {
    if (err) {
      res.json({ err: 1, msg: "Unable to Add Address" });
    } else {
      let email = req.body.email;
      let address = req.body.address;
      let pincode = req.body.pincode;
      let city = req.body.city;
      let state = req.body.state;
      let country = req.body.country;
      let update = req.body.update;
      // let Address=req.body.Address;
      // console.log(Address)
      let addressData = {
        Address_id: Math.random(),
        address: address,
        pincode: pincode,
        city: city,
        state: state,
        country: country,
      };
      console.log(addressData);
      data[0].Address.push(addressData);
      console.log(data);
      registermodel.updateOne(
        { email: email },
        { $set: { Address: data[0].Address } },
        (err, data) => {
          if (err) {
            res.json({ err: 1, msg: "Address Not Added" });
          } else {
            res.json({
              err: 0,
              msg: "Address added successfully",
              user_details: data,
            });
            console.log(data.Address);
          }
        }
      );
    }
  });
});

//edit address
router.post("/editaddress", (req, res) => {
  console.log("address edit section");
  console.log(req.body);
  registermodel.updateMany(
    {},
    {
      $set: {
        "Address.$[elem].address": req.body.address,
        "Address.$[elem].pincode": req.body.pincode,
        "Address.$[elem].city": req.body.city,
        "Address.$[elem].state": req.body.state,
        "Address.$[elem].country": req.body.country,
      },
    },
    { arrayFilters: [{ "elem.Address_id": req.body.Address_id }] },
    (err, data) => {
      if (err) {
        console.log(err);
        res.json({ err: 1, msg: "unable to Update address" });
      } else {
        registermodel.find({ email: req.body.email }, (err, data) => {
          if (!data[0]) {
            console.log("inside email not found");
            res.json({ err: 1, msg: "Unable to genrate jwt" });
          } else {
            let payload = { uid: data };
            const token = jwt.sign(payload, jwtSecret, { expiresIn: 360 });
            res
              .status(200)
              .json({
                err: 0,
                msg: "Address Updated Successfully",
                token: token,
              });
          }
        });
      }
    }
  );
});

//delete address
router.delete("/deleteadd/:Address._id", (req, res) => {
  let id = req.params.id;
  registermodel.deleteOne({ _id: id }, (err) => {
    if (err) throw err;
    res.json({ msg: "Do you want to delete" });
  });
});
//changepassword
router.put("/changepass/:id", (req, res) => {
  let id = req.params.id;
  let password = req.body.password;
  let confirmpassword = req.body.confirmpassword;
  registermodel.updateOne(
    { _id: id },
    { $set: { password: password, confirmpassword: confirmpassword } },
    (err) => {
      if (err) res.json({ err: err });
      res.json({ msg: "Password Updated Succesfully" });
    }
  );
});
//update profile
router.put("/updprofile/:id", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let lname = req.body.lname;
  let email = req.body.email;
  let phone = req.body.moblie;
  console.log(name);
  registermodel.updateOne(
    { _id: id },
    { $set: { name: name, lname: lname, email: email, phone: phone } },
    (err) => {
      if (err) res.json({ err: err });
      res.json({ msg: "Userprofile has Updated Succesfully" });
    }
  );
});

router.get("/profile/:email", (req, res) => {
  let email = req.params.email;
  registermodel.findOne({ email: email }, (err, data) => {
    if (err) res.json({ err: err });
    res.json({ user: data});
  });
});

router.get("/getaddress/:email",autenticateToken, (req, res) => {
  let email = req.params.email;
  registermodel.findOne({ email: email }, (err, data) => {
    if (err) res.json({ err: err });
    res.json({address: data.Address });
  });
});

//order data
router.get("/getorder/:email", (req, res) => {
  let email = req.params.email;
  ordersmodel.find({ email: email }, (err, data) => {
    if (err) {
      throw err;
    }
   
  res.json({ err: 0, user:data });
});
});

router.get('/loginfirst', autenticateToken, (req, res) => {
  res.json({ "err": 0 })

})

//checkout
router.post("/carddetails", (req, res) => {
  let field = {
      Orderno: req.body.orderno,
      email: req.body.email,
      items: req.body.items,
      //cardnumber: req.body.cardnumber,
      total: req.body.total,
  };
  console.log(field)
  let ins = new ordersmodel({ ...field });
  ins.save((err) => {
      if (err) {
          console.log(err)
          res.send("Error");
      } else {
          res.send({ flag: 1, msg: "Details Added" });

      }

  });
});
router.post("/cardaddress", (req, res) => {

  let email = req.body.email;

  ordersmodel.updateOne({ email: email, Orderno: req.body.orderno }, { $set: { "selectaddr": req.body.selectaddr } }, (err) => {
      if (err) res.json({ err: err });
      res.json({ msg: "ORDER PLACED" });
  })

});

router.get("/getinvoice/:orderno", autenticateToken,(req, res) => {
  let orderno = req.params.orderno;
  ordersmodel.find({ Orderno:orderno }, (err, data) => {
      if (err) {
          throw err;
      }
      res.json({ orderdetail: data, "err": 1 })
  })
})


module.exports = router;
