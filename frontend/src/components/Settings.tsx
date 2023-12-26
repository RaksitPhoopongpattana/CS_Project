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


export function Settings() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Releases");
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

  const [data, setData] = useState<DataItem[]>([]);

  let search = window.location.search;
  let params = new URLSearchParams(search);

  return (
    <Navbar.Section grow className={classes.wrapper}>
      <div className={classes.aside} style={{ backgroundColor: '#87CEEB' }} >{mainLinks}</div>
      <div className={classes.main}>
        <Title order={4} className={classes.title} style={{ background: '#87CEEB', color: 'white', fontSize: '1.5rem', padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {plant}
        </Title>

        <div className={classes.container} style={{ height: '85.5vh' }}>

          <form method="POST" action="http://vps163.vpshispeed.net:3001/setting">
            <div className="info-box">
              <p>EC</p>
              <input type="text" className="input-value" name="minec" id="minec" placeholder="ค่า Min EC" />
              <p></p>
              <input type="text" className="input-value" name="maxec" id="maxec" placeholder="ค่า Max EC" />
              <p>PH</p>
              <input type="text" className="input-value" name="minph" id="minph" placeholder="ค่า Min PH" />
              <p></p>
              <input type="text" className="input-value" name="maxph" id="maxph" placeholder="ค่า Max PH" />
              <p></p>
              <button>Set</button>
            </div>
          </form>
        </div>
      </div>
    </Navbar.Section>
  );
}

export default Settings;