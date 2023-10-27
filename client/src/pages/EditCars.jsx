import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditCars() {
  const { car_id } = useParams();
  const [plate, setPlate] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [vin, setVin] = useState("");
  const [num_serial, setNumserial] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/manage/cars/update/" + car_id)
      .then((res) => {
        console.log(res);
        setPlate(res.data[0].plate);
        setBrand(res.data[0].brand);
        setModel(res.data[0].model);
        setVin(res.data[0].vin);
        setNumserial(res.data[0].num_serial);
      })
      .catch((err) => console.log(err));
  }, []);


  const UpdateData = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/admin/manage/cars/edit/" + car_id, {
        plate,
        brand,
        model,
        vin,
        num_serial,
      })
      .then((response) => {
        nav("/admin/manage/cars");
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
            placeholder="เลขทะเบียน"
            label="เลขทะเบียน"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
          />

          <TextField
            style={{ width: "400px", margin: "10px" }}
            margin="dense"
            id="outlined-required"
            placeholder="ยี่ห้อ"
            label="ยี่ห้อ"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          <TextField
            style={{ width: "400px", margin: "10px" }}
            id="outlined-required"
            label="รุ่น"
            placeholder="รุ่น"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
         

          <TextField
            style={{ width: "400px", margin: "10px" }}
            id="outlined-required"
            label="หมายเลขตัวถัง"
            placeholder="หมายเลขตัวถัง"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
          />

          <TextField
            style={{ width: "400px", margin: "10px" }}
            id="outlined-required"
            label="หมายเลขเครื่อง"
            placeholder="หมายเลขเครื่อง"
            value={num_serial}
            onChange={(e) => setNumserial(e.target.value)}
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

export default EditCars;