import { useEffect, useState } from "react";
import {
  createStyles,
  Navbar,
  UnstyledButton,
  Tooltip,
  Title,
  rem,
  Button,
} from "@mantine/core";

import { IconHome2, IconGauge, IconSettings, IconDashboard } from "@tabler/icons-react"; //IconSettings
import { useNavigate, useLocation } from "react-router-dom";


import "./styles.css"; // Import the CSS file



const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  aside: {
    flex: `0 0 ${rem(60)}`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
  },

  main: {
    flex: 1,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  mainLink: {
    width: rem(44),
    height: rem(44),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },

  title: {
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: rem(5),
    height: rem(5),
    borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
  },


  logo: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: rem(60),
    paddingTop: theme.spacing.md,
    borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
    marginBottom: theme.spacing.xl,
  },

  link: {
    boxSizing: "border-box",
    display: "block",
    textDecoration: "none",
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: rem(44),
    lineHeight: rem(44),

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  linkActive: {
    "&, &:hover": {
      borderLeftColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      color: theme.white,
    },
  },
}));

const mainLinksMockdata = [
  { icon: IconHome2, label: "Home" },
  { icon: IconGauge, label: "Dashboard" },
  { icon: IconSettings, label: "Settings" },
  { icon: IconDashboard, label: "Logs" },
];


interface DataItem {
  id: number;
  ec: number;
  ph: number;
  date: string;
}


export function DoubleNavbar() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Releases");
  const [isTableVisible, setTableVisible] = useState(false);
  const [isTableVisible1, setTableVisible1] = useState(false);
  const navigate = useNavigate();

  const location = useLocation(); // Use the useLocation hook to get the current location
  const searchParams = new URLSearchParams(location.search);
  const plant = searchParams.get("plant"); // Get the 'plant' query parameter from the URL

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        // onClick={() => setActive(link.label)}
        onClick={() => {
          if (link.label === 'Home') {
            navigate(`/`)
          } else {
            navigate(`/${link.label}?plant=${plant}`)
          }

          setActive(link.label);
        }}
        className={cx(classes.mainLink, {
          [classes.mainLinkActive]: link.label === active,
        })}
      >
        <link.icon size="1.4rem" stroke={1.5} />

      </UnstyledButton>
    </Tooltip>

  ));

  const [EC, setEC] = useState("");
  const [PH, setPH] = useState("");

  const [ECmin, setECmin] = useState("");
  const [PHmin, setPHmin] = useState("");

  const [ECmax, setECmax] = useState("");
  const [PHmax, setPHmax] = useState("");

  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const url = "http://vps163.vpshispeed.net:3001/data";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.EC);
        setEC(json.EC);
        setPH(json.PH);

        setECmin(json.minEC);
        setPHmin(json.minPH);

        setECmax(json.maxEC);
        setPHmax(json.maxPH);

      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchDataall = async () => {
      fetch('http://vps163.vpshispeed.net:3001/dataall')
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error));
    };
    selectdata(plant);
    fetchData();
    fetchDataall();

    setInterval(() => {
      fetchData();
      fetchDataall();

    }, 250000);
  }, []);

  let search = window.location.search;
  let params = new URLSearchParams(search);

  function subscribe(data: any) {
    const apiUrl = 'http://vps163.vpshispeed.net:3001/mqtt';
    fetch(apiUrl, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      },),
      body: "data=" + data
    })
      .then((responseText) => {
        alert(data);
      });
  };

  function selectdata(data: any) {
    const apiUrl = 'http://vps163.vpshispeed.net:3001/select';
    fetch(apiUrl, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      },),
      body: "data=" + data
    })
      .then((responseText) => {
        console.log(data);
      });
  };





  return (
    <Navbar.Section grow className={classes.wrapper} style={{ backgroundColor: 'sky' }}>
      <div className={classes.aside} style={{ backgroundColor: '#87CEEB' }}>{mainLinks}</div>
      <div className={classes.main}>
        <Title order={4} className={classes.title} style={{ background: '#87CEEB', color: 'white', fontSize: '1.5rem', padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {plant}
        </Title>

        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85.5vh' }}>
          <div className="info-box" style={{ alignItems: 'center', width: '200px' }}>
            <p className="info-title">ค่า EC</p>
            <p>ค่าที่กำหนด:</p>
            <p className="info-value">{ECmin}-{ECmax}</p>
            <p>ค่าที่วัดได้:</p>
            <p className="info-value">{EC}</p>
          </div>
          <div className="info-box">
            <p className="info-title">ค่า PH</p>
            <p>ค่าที่กำหนด:</p>
            <p className="info-value">{PHmin}-{PHmax}</p>
            <p>ค่าที่วัดได้:</p>
            <p className="info-value">{PH}</p>
          </div>


          {/* {isTableVisible1 && (
            <form method="POST" action="http://vps163.vpshispeed.net:3001/setting"> //
              <div className="info-box">
                <p>EC</p>
                <input type="text" className="info-value" name="minec" id="minec" placeholder="ค่า Min EC" />
                <p></p>
                <input type="text" className="info-value" name="maxec" id="maxec" placeholder="ค่า Max EC" />
                <p>PH</p>
                <input type="text" className="info-value" name="minph" id="minph" placeholder="ค่า Min PH" />
                <p></p>
                <input type="text" className="info-value" name="maxph" id="maxph" placeholder="ค่า Max PH" />
                <p></p>
                <button>setting</button>
              </div>
            </form>
          )}

          <Button onClick={() => setTableVisible1(!isTableVisible1)}>
            {isTableVisible1 ? "ซ่อน Setting" : "Setting"}
          </Button> */}

          <div className="pump-frame">
            <div className="pump-label">
              <label htmlFor="" color="blue">Pump 1</label>
            </div>
            <div className="pump-buttons">
              <Button onClick={() => subscribe('pump01on')} radius={"sm"} color="green">On</Button>
              <Button onClick={() => subscribe('pump01off')} radius={"sm"} color="red">Off</Button>
            </div>
            {/* </div>

          <div className="pump-frame"> */}
            <br />

            <div className="pump-label">
              <label htmlFor="">Pump 2</label>
            </div>
            <div className="pump-buttons">
              <Button onClick={() => subscribe('pump02on')} radius={"sm"} color="green">On</Button>
              <Button onClick={() => subscribe('pump02off')} radius={"sm"} color="red">Off</Button>
            </div>
            {/* </div>


          <div className="pump-frame"> */}
            <br />
            <div className="pump-label">
              <label htmlFor="">Pump 3</label>
            </div>
            <div className="pump-buttons">
              <Button onClick={() => subscribe('pump03on')} radius={"sm"} color="green">On</Button>
              <Button onClick={() => subscribe('pump03off')} radius={"sm"} color="red">Off</Button>
            </div>
          </div>

          {/* <Button onClick={() => setTableVisible(!isTableVisible)}>
            {isTableVisible ? "ซ่อน ข้อมูล" : "แสดง ข้อมูล"}
          </Button>


          {isTableVisible && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <table>
                <thead>
                  <tr>
                    <th>EC</th>
                    <th>PH</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.ec}</td>
                      <td>{item.ph}</td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          )} */}









        </div>
      </div>
    </Navbar.Section>
  );
}

export default DoubleNavbar;