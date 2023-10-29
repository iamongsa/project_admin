import React from "react";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import WorkOffOutlinedIcon from '@mui/icons-material/WorkOffOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import { Chart } from "react-google-charts";

function Dashboard() {
  const data = [
    ["Task", "Hours per Day"],
    ["ช่างดำ", 11],
    ["ช่างซี่", 2]
  ];

  const options = {
    title: "Sessions"

  };

  return (
    <div >
      <h1>Dashboard</h1>
      <div className="dashboard">
        <div className="bg-dt">
          <div className="head-dt">งานทั้งหมด</div>
          <div className="con-dt">
            <div className="work-icon">
              <WorkOutlineOutlinedIcon sx={{ fontSize: 50, color: "#2D4059" ,}}/>
            </div>
            <div className="dt-db"></div>
            <h1 className="dt-num">10</h1>
          </div>
        </div>
      

      <div className="bg-dt">
          <div className="head-dt">งานที่เสร็จแล้ว</div>
          <div className="con-dt">
            <div className="work-icon">
              <WorkOffOutlinedIcon color="success"  sx={{ fontSize: 50 }}/>
            </div>
            <div className="dt-db"></div>
            <h1 className="dt-num">5</h1>
          </div>
      </div>

      <div className="bg-dt">
          <div className="head-dt">งานรอดำเนินการ</div>
          <div className="con-dt">
            <div className="work-icon">
              <WorkHistoryOutlinedIcon color="warning"  sx={{ fontSize: 50}}/>
            </div>
            <div className="dt-db"></div>
            <h1 className="dt-num">10</h1>
          </div>
        </div>
      </div>
    

      <div className="pie-db">
      <Chart  
      style={{    backgroundColor: 'lightgray',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'}}
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
      </div>
      </div>
    
  );
}

export default Dashboard;
