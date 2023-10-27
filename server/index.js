const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "project_ongsa",
});


app.get("/admin", (req, res) => {
  let sql =
    "SELECT * FROM `order_repair`";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Add Orders
app.post("/admin/form", (req, res) => {
  const name = req.body.customer_name;
  const plate = req.body.plate_id;
  const re_status = req.body.repair_status;
  const mech = req.body.mech_name;
  const detail = req.body.order_description;


  db.query(
    "INSERT INTO order_repair (customer_name,plate_id,repair_status,mech_name,order_description) VALUES(?,?,?,?,?)",
    [name, plate, re_status, mech,detail],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});



///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////Users/////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

app.get("/admin/manage/users", (req, res) => {
  db.query("SELECT * FROM customerinfo", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Add Users
app.post("/admin/manage/users/create", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const lineid = req.body.lineid;
  const address = req.body.address;

  db.query(
    "INSERT INTO customerinfo (name,phone,lineid,address) VALUES(?,?,?,?)",
    [name, phone, lineid, address],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.delete("/admin/manage/users/delete/:cus_id", (req, res) => {
  const cus_id = req.params.cus_id;
  db.query(
    "DELETE FROM customerinfo WHERE cus_id =?",
    cus_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

////Get id to edit page
app.get("/admin/manage/users/update/:cus_id", (req, res) => {
  const sql = "SELECT * FROM customerinfo WHERE cus_id=?";
  const id = req.params.cus_id;
  db.query(sql, id, (err, result) => {
    if (err) return res.json({ Error: err });
    return res.json(result);
  });
});

app.put("/admin/manage/users/edit/:cus_id", async (req, res) => {
  const { cus_id } = req.params;
  const { Name, Phone, Address, Lineid } = req.body;

  try {
    await db.query(
      `UPDATE customerinfo SET name = ?, phone = ?, address = ?, lineid = ? WHERE cus_id = ?`,
      [Name, Phone, Address, Lineid, cus_id]
    );

    res.json({
      message: "User updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////Cars///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

app.get("/admin/manage/cars", (req, res) => {
  db.query("SELECT * FROM car", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Add Car
app.post("/admin/manage/cars/create", (req, res) => {
  const plate = req.body.plate;
  const brand = req.body.brand;
  const model = req.body.model;
  const c_vin = req.body.c_vin;
  const num_serial = req.body.num_serial;

  db.query(
    "INSERT INTO car (plate,brand,model,vin,num_serial) VALUES(?,?,?,?,?)",
    [plate, brand, model, c_vin, num_serial],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
///Delete
app.delete("/admin/manage/cars/delete/:car_id", (req, res) => {
  const car_id = req.params.car_id;
  db.query("DELETE FROM car WHERE car_id =?", car_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

///Get update list id
app.get("/admin/manage/cars/update/:car_id", (req, res) => {
  const sql = "SELECT * FROM car WHERE car_id=?";
  const id = req.params.car_id;
  db.query(sql, id, (err, result) => {
    if (err) return res.json({ Error: err });
    return res.json(result);
  });
});

////
app.put("/admin/manage/cars/edit/:car_id", async (req, res) => {
  const { car_id } = req.params;
  const { plate, brand, model, vin, num_serial } = req.body;

  try {
    await db.query(
      `UPDATE car SET plate = ?, brand = ?, model = ?, vin = ? ,num_serial = ? WHERE car_id = ?`,
      [plate, brand, model, vin, num_serial, car_id]
    );

    res.json({
      message: "User updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////Mechanics//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

app.get("/admin/manage/mechanics", (req, res) => {
  db.query("SELECT * FROM mechanic", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Add Mech
app.post("/admin/manage/mechanics/create", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;

  db.query(
    "INSERT INTO mechanic (m_name,m_phone) VALUES(?,?)",
    [name, phone],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.delete("/admin/manage/mechanics/delete/:m_id", (req, res) => {
  const m_id = req.params.m_id;
  db.query("DELETE FROM mechanic WHERE m_id =?", m_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/////////////////////////////////////////////////////////////////////////////////

app.listen(3001, () => {
  console.log("Hey , yoour server is running on port 3001!");
});
