import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs"
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
import buddhistEra from "dayjs/plugin/buddhistEra";


function main() {
  dayjs.extend(buddhistEra);
  const [taskList, setTasklist] = useState([]);

  useEffect(() => {
    getDatas();
  });

  const getDatas = () => {
    Axios.get("http://localhost:3001/admin").then((response) => {
      setTasklist(response.data);
    });
  };
  const DateLongTH = (date) => {
    dayjs.locale("th");
    
    return dayjs(date).format("DD MMMM BBBB HH MM");
  };
  
  return (
    <div>
      <h1>รายการซ่อม</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      ></Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>วันที่:</TableCell>
                <TableCell align="center">ชื่อลูกค้า:</TableCell>
                <TableCell align="center">เลขทะเบียนรถ:</TableCell>
                <TableCell align="center">ช่างซ่อม:</TableCell>
                <TableCell align="center">รายละเอียด:</TableCell>
                <TableCell align="center">สถานะ:</TableCell>
                <TableCell align="center">ลบรายการ</TableCell>
                <TableCell align="center">แก้ไขรายการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskList &&
                taskList.map((val) => (
                  <TableRow
                    key={val.order_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {DateLongTH(val.create_order)}
                    </TableCell>
                    <TableCell align="center">{val.customer_name}</TableCell>
                    <TableCell align="center">{val.plate_id}</TableCell>
                    <TableCell align="center">{val.mech_name}</TableCell>
                    <TableCell align="center">
                      {val.order_description}
                    </TableCell>
                    <TableCell align="center">{val.repair_status}</TableCell>
                    <TableCell align="center">
                      <IconButton>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <EditIcon sx={{ color: yellow[900] }} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default main;


