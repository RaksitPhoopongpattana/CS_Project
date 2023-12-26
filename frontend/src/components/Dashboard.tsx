import { AppShell, Button } from "@mantine/core";
import DoubleNavbar from "./Navbar";
import { useEffect, useState } from "react";

interface DataItem {
  id: number;
  // userid: string;
  // temperature: number;
  // humidity: number;
  // light: number;
  // pm25: number;
  // pm10: number;
  ec: number;
  ph: number;
  date: string;
}

export function Dashboard() {
  // const [EC, setEC] = useState("");
  // const [PH, setPH] = useState("");
  // const [data, setData] = useState<DataItem[]>([]);

  // useEffect(() => {

  //   const url = "http://vps163.vpshispeed.net:3001/data";


  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(url);
  //       const json = await response.json();
  //       console.log(json.EC);
  //       setEC(json.EC);
  //       setPH(json.PH);
  //       // setData(data)
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };
  //   const fetchDataall = async () => {

  //     fetch('http://vps163.vpshispeed.net:3001/dataall')

  //       .then((response) => response.json())
  //       .then((data) => setData(data))
  //       .catch((error) => console.error(error));
  //   }
  //   fetchData();
  //   fetchDataall();

  //   setInterval(() => {
  //     fetchData(); // Fetch data every 2 minutes
  //     fetchDataall();
  //   }, 5000);

  // }, []);


  // let search = window.location.search;
  // let params = new URLSearchParams(search);
  // let plant = params.get("plant");

  // function subscribe(data: any) {
  //   const apiUrl = 'http://vps163.vpshispeed.net:3001/mqtt';
  //   fetch(apiUrl, {
  //     method: 'POST',
  //     headers: new Headers({
  //       'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
  //     },),
  //     body: "data=" + data // <-- Post parameters
  //   })
  //     .then((responseText) => {
  //       alert(data);
  //     })
  // };

  // return (

  //   <AppShell navbar={<DoubleNavbar plant={plant} />} >
  //     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
  //       <div>
  //         <p>EC : ค่าที่กำหนด : ค่าที่วัดได้ : {EC}</p>
  //         <p>PH : ค่าที่กำหนด : ค่าที่วัดได้ : {PH}</p>
  //       </div>
  //       <div>
  //         <label htmlFor="" color="blue">Pump 1 </label>
  //       </div>
  //       <div>
  //         <Button className="custom-button" onClick={() => subscribe('pump01on')} radius={"sm"} color="green">On</Button>
  //         <Button className="custom-button" onClick={() => subscribe('pump01off')} radius={"sm"} color="red">Off</Button>
  //       </div>
  //       <div>
  //         <label htmlFor="">Pump 2 </label>
  //       </div>
  //       <div>
  //         <Button onClick={() => subscribe('pump02on')} radius={"sm"} color="green">On</Button>
  //         <Button onClick={() => subscribe('pump02off')} radius={"sm"} color="red">Off</Button>
  //       </div>
  //       <div>
  //         <label htmlFor="">Pump 3 </label>
  //       </div>
  //       <div>
  //         <Button onClick={() => subscribe('pump03on')} radius={"sm"} color="green">On</Button>
  //         <Button onClick={() => subscribe('pump03off')} radius={"sm"} color="red">Off</Button>
  //       </div>
  //     </div>
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>ID</th>
  //           <th>EC</th>
  //           <th>PH</th>
  //           <th>Date</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {data.map((item) => (
  //           <tr key={item.id}>
  //             <td>{item.id}</td>
  //             <td>{item.ec}</td>
  //             <td>{item.ph}</td>
  //             <td>{item.date}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </AppShell>
  // );
}
