import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { yellow } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
import SideBar from "../Layout/SideBar";

function Users() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [lineid, setLineid] = useState("");
  const [address, setAddress] = useState("");

  const [userList, setUserlist] = useState([]);

  useEffect(() => {
    getEmployees();
  });

  const addUsers = () => {
    Axios.post("http://localhost:3001/admin/manage/users/create", {
      name: name,
      phone: phone,
      lineid: lineid,
      address: address,
    }).then(() => {
      setUserlist([
        ...userList,
        {
          name: name,
          phone: phone,
          lineid: lineid,
          address: address,
        },
      ]);
    });
  };

  const deleteUserslist = async (cus_id) => {
    const response = await Axios.delete(
      `http://localhost:3001/admin/manage/users/delete/${cus_id}`
    );

    setUserlist(
      userList.filter((val) => {
        return val.cus_id != cus_id;
      })
    );
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/admin/manage/users").then((response) => {
      setUserlist(response.data);
    });
  };

  return (
    <>
      
      <div>
        <h1>ข้อมูลลูกค้า</h1>

        <Box
          component="form"
          sx={{
            margin: "3%",
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="ชื่อลูกค้า"
              placeholder="ชื่อลูกค้า"
              style={{ width: "200px", margin: "10px" }}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />

            <TextField
              required
              id="outlined-required"
              label="เบอร์โทร"
              placeholder="เบอร์โทร"
              style={{ width: "200px", margin: "10px" }}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />

            <TextField
              required
              id="outlined-required"
              label="Line-Id"
              placeholder="Line-Id"
              style={{ width: "200px", margin: "10px" }}
              onChange={(event) => {
                setLineid(event.target.value);
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="ที่อยู่"
              placeholder="ที่อยู่"
              style={{ width: "200px", margin: "10px" }}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />

            <Button
              style={{ width: "150px", height: "55px", margin: "10px" }}
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => {
                Swal.fire({
                  title: "แจ้งเตือน",
                  text: "ต้องการเพิ่มข้อมูลนี้หรือไม่",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "ใช่ ต้องการเพิ่มข้อมูล",
                  cancelButtonText: "ยกเลิก",
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire("Success", "เพิ่มข้อมูลสำเร็จ", "success");
                    addUsers();
                    window.location.reload();
                  }
                });
              }}
            >
              เพิ่มข้อมูล
            </Button>
          </div>
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ Width: "80%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ชื่อลูกค้า:</TableCell>
                  <TableCell align="center">เบอร์โทร:</TableCell>
                  <TableCell align="center">LINE ID:</TableCell>
                  <TableCell align="center">ที่อยู่:</TableCell>
                  <TableCell align="center">ลบรายการ</TableCell>
                  <TableCell align="center">แก้ไขรายการ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList &&
                  userList.map((val) => (
                    <TableRow
                      key={val.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {val.name}
                      </TableCell>
                      <TableCell align="center">{val.phone}</TableCell>
                      <TableCell align="center">{val.lineid}</TableCell>
                      <TableCell align="center">{val.address}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            Swal.fire({
                              title: "คำเตือน",
                              text: "ต้องการลบข้อมูลนี้หรือไม่",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "ใช่ ต้องการลบ!",
                              cancelButtonText: "ยกเลิก",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                Swal.fire(
                                  "Deleted!",
                                  "ลบข้อมูลสำเร็จ",
                                  "success"
                                );
                                deleteUserslist(val.cus_id);
                              }
                            });
                          }}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        {/* //////////////ปุ่ม edit//////////////// */}
                        <Link to={`/admin/manage/users/edit/${val.cus_id}`}>
                          <IconButton>
                            <EditIcon sx={{ color: yellow[900] }} />
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </>
  );
}

export default Users;
