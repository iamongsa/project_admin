import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const { cus_id } = useParams();
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [Lineid, setLineid] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/manage/users/update/" + cus_id)
      .then((res) => {
        console.log(res);
        setName(res.data[0].name);
        setPhone(res.data[0].phone);
        setAddress(res.data[0].address);
        setLineid(res.data[0].lineid);
      })
      .catch((err) => console.log(err));
  }, []);

  const UpdateData = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/admin/manage/users/edit/" + cus_id, {
        Name,
        Phone,
        Address,
        Lineid,
      })
      .then((response) => {
        nav("/admin/manage/users");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>แก้ไขข้อมูลลูกค้า</h2>
      <div className="bgform">
        <Box component="form" onSubmit={UpdateData}>
          <TextField
            style={{ width: "400px", margin: "10px" }}
            margin="dense"
            id="outlined-required"
            placeholder="ชื่อลูกค้า"
            value={Name}
            label="ชื่อลูกค้า"
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            style={{ width: "400px", margin: "10px" }}
            margin="dense"
            id="outlined-required"
            placeholder="เบอร์โทร"
            value={Phone}
            label="เบอร์โทร"
            onChange={(e) => setPhone(e.target.value)}
          />

          <TextField
            style={{ width: "400px", margin: "10px" }}
            id="outlined-multiline-static"
            placeholder="ที่อยู่"
            multiline
            rows={4}
            label="ที่อยู่"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <TextField
            style={{ width: "400px", margin: "10px" }}
            id="outlined-required"
            label="Line ID"
            placeholder="Line Id"
            value={Lineid}
            onChange={(e) => setLineid(e.target.value)}
          />

          <Button
            variant="contained"
            color="success"
            size="medium"
            type="submit"
            style={{ width: "150px", height: "50px", margin: "30px" }}
          >
            ยืนยัน
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default EditUser;
