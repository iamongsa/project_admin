import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useState, useEffect } from "react";
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

function Mechanic() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [MechList, setMechlist] = useState([]);

  useEffect(() => {
    getDatas();
  });

  const addMech = () => {
    Axios.post("http://localhost:3001/admin/manage/mechanics/create", {
      name: name,
      phone: phone,
    }).then(() => {
      setMechlist([
        ...MechList,
        {
          name: name,
          phone: phone,
        },
      ]);
    });
  };

  const deleteMechlist = (m_id) => {
    Axios.delete(
      `http://localhost:3001/admin/manage/mechanics/delete/${m_id}`
    ).then((response) => {
      setUserlist(
        userList.filter((val) => {
          return val.m_id != m_id;
        })
      );
    });
  };

  const getDatas = () => {
    Axios.get("http://localhost:3001/admin/manage/mechanics").then(
      (response) => {
        setMechlist(response.data);
      }
    );
  };
  return (
    <div>
      <h1>ข้อมูลช่าง</h1>
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
            style={{ width: "200px", margin: "10px" }}
            required
            id="outlined-required"
            label="ชื่อ"
            placeholder="ชื่อ"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <TextField
            style={{ width: "200px", margin: "10px" }}
            required
            id="outlined-required"
            label="เบอร์โทร"
            placeholder="เบอร์โทร"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />

          <Button
            style={{ width: "150px", height: "50px", margin: "10px" }}
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={addMech}
          >
            เพิ่มข้อมูล
          </Button>
        </div>
      </Box>

      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id:</TableCell>
                <TableCell align="center">ชื่อ:</TableCell>
                <TableCell align="center">เบอร์โทร:</TableCell>
                <TableCell align="center">ลบรายการ</TableCell>
                <TableCell align="center">แก้ไขรายการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MechList &&
                MechList.map((val) => (
                  <TableRow
                    key={val.m_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {val.m_id}
                    </TableCell>
                    <TableCell align="center">{val.m_name}</TableCell>
                    <TableCell align="center">{val.m_phone}</TableCell>

                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              Swal.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                              );
                              deleteMechlist(val.m_id);
                            }
                          });
                        }}
                      >
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

export default Mechanic;
