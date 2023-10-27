import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from '@mui/icons-material/Dashboard';
import BuildIcon from "@mui/icons-material/Build";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsIcon from '@mui/icons-material/Notifications';

const SideBar = () => {
  const [isCollapsed, setisCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        image=""
        breakPoint="md"
        style={{ height: "100%" }}
        backgroundColor="#2D4059"
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu iconShape="square">
              {/* LOGO */}
              <MenuItem
                onClick={() => setisCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0 20px 0",
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
              {!isCollapsed && (
                <Box mb="25px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      alt="profile-user"
                      width="100px"
                      height="100px"
                      src={`/assets/logo.jpg`}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                </Box>
              )}

              <Link to={"/"} className="menu-bars">
                <MenuItem icon={<HomeOutlinedIcon />}>หน้าแรก</MenuItem>
              </Link>
              <Link to={"/admin/form"} className="menu-bars">
                <MenuItem icon={<InsertDriveFileIcon />}>แบบฟอร์ม</MenuItem>
              </Link>
              <Link to={"/admin/dashboard"} className="menu-bars">
                <MenuItem icon={<DashboardIcon />}>แดชบอร์ด</MenuItem>
              </Link>
              <Link to={"/admin/nontiline"} className="menu-bars">
                <MenuItem icon={<NotificationsIcon />}>แจ้วเตือนไลน์</MenuItem>
              </Link>
              {/* <Link to="/admin/listitem" className="menu-bars">
                                <MenuItem icon={<InsertDriveFileIcon />}>ListItem</MenuItem>
                            </Link> */}

              <SubMenu
                icon={<PeopleOutlinedIcon />}
                label="การจัดการ"
                className="menu-bars"
              >
                <Link to={"/admin/manage/users"} className="sub-menu-bars">
                  <MenuItem icon={<PersonIcon />}>ข้อมูลลูกค้า</MenuItem>
                </Link>
                <Link to={"/admin/manage/cars"} className="sub-menu-bars">
                  <MenuItem icon={<DirectionsCarIcon />}>ข้อมูลรถยนต์</MenuItem>
                </Link>
                <Link to={"/admin/manage/mechanics"} className="sub-menu-bars">
                  <MenuItem icon={<BuildIcon />}>ข้อมูลช่าง</MenuItem>
                </Link>
              </SubMenu>
            </Menu>
          </div>
        </div>
      </Sidebar>
      <main>
        <div style={{ padding: "16px 2px ", color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <IconButton onClick={() => setToggled(!toggled)}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default SideBar;
