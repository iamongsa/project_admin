import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { yellow } from '@mui/material/colors';
import IconButton from "@mui/material/IconButton";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function Cars() {

  const [plate, setPlate] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [c_vin, setCvin] = useState("");
  const [num_serial, setNumserial] = useState("");

  const [carList, setcarlist] = useState([]);

  useEffect(() => {
    getDatas();
  })

  const addDatas = () => {
    Axios.post("http://localhost:3001/admin/manage/cars/create", {
      plate: plate,
      brand: brand,
      model: model,
      c_vin: c_vin,
      num_serial: num_serial
    }).then(() => {
      setcarlist([
        ...carList,
        {
          plate: plate,
          brand: brand,
          model: model,
          c_vin: c_vin,
          num_serial: num_serial
        },
      ]);
    });
  };

  const deleteCarlist = (car_id) => {
    Axios.delete(
      `http://localhost:3001/admin/manage/cars/delete/${car_id}`
    ).then((response) => {
      setUserlist(
        userList.filter((val) => {
          return val.car_id != car_id;
        })
      );
    });
  };

  const getDatas = () => {
    Axios.get("http://localhost:3001/admin/manage/cars").then((response) => {
      setcarlist(response.data);
    });
  };


  return (
    <div>
      <h1>ข้อมูลรถยนต์</h1>
      <Box
        component="form"
        sx={{
          margin: '3%',
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'center'
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            style={{ width: "200px", margin: "10px" }}
            required
            id="outlined-required"
            label="เลขทะเบียน"
            placeholder='เลขทะเบียน'
            onChange={(event) => {
              setPlate(event.target.value);
            }}
          />


          <TextField
            style={{ width: "200px", margin: "10px" }}
            required
            id="outlined-required"
            label="ยี่ห้อ"
            placeholder='ยี่ห้อ'
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />

          <TextField
            style={{ width: "200px", margin: "10px" }}
            required
            id="outlined-required"
            label="รุ่น"
            placeholder='รุ่น'
            onChange={(event) => {
              setModel(event.target.value);
            }}
          />
          <TextField
            style={{ width: "200px", margin: "10px" }}
            required
            id="outlined-required"
            label="หมายเลขตัวถัง"
            placeholder='หมายเลขตัวถัง'
            onChange={(event) => {
              setCvin(event.target.value);
            }}

          />
          <TextField
            style={{ width: "200px", margin: "10px" }}
            required
            id="outlined-required"
            label="หมายเลขเครื่อง"
            placeholder='หมายเลขเครื่อง'
            onChange={(event) => {
              setNumserial(event.target.value);
            }}
          />

          <Button style={{ width: "150px", height: "50px", margin: "10px" }} variant="contained" startIcon={<AddRoundedIcon />} onClick={addDatas}>เพิ่มข้อมูล</Button>

        </div>
      </Box>



      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>เลขทะเบียน:</TableCell>
                <TableCell align="right">ยี่ห้อ:</TableCell>
                <TableCell align="right">รุ่น:</TableCell>
                <TableCell align="right">หมายเลขตัวถัง:</TableCell>
                <TableCell align='right'>หมายเลขเครื่อง</TableCell>
                <TableCell align='center'>ลบรายการ</TableCell>
                <TableCell align='center'>แก้ไขรายการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {

                carList && carList.map((val) => (
                  <TableRow
                    key={val.plate}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {val.plate}
                    </TableCell>
                    <TableCell align="right">{val.brand}</TableCell>
                    <TableCell align="right">{val.model}</TableCell>
                    <TableCell align="right">{val.vin}</TableCell>
                    <TableCell align="right">{val.num_serial}</TableCell>
                    <TableCell align='center'>
                      <IconButton
                        onClick={() => {
                          Swal.fire({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete it!'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                              )
                              deleteCarlist(val.car_id);
                            }
                          })

                        }}

                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                    <TableCell align='center'>
                    <Link to={`/admin/manage/cars/edit/${val.car_id}`}>
                        <IconButton>
                          <EditIcon sx={{ color: yellow[900] }} />
                        </IconButton>
                      </Link>
                    </TableCell>

                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    </div>
  )
}

export default Cars