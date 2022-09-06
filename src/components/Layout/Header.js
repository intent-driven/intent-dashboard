import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Header = ({swich}) => {
  return <AppBar
    position="static"
    elevation={0}
    sx={{}}
  >
    <Toolbar sx={{flexWrap: 'wrap'}}>
      <Typography variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
        Intent API
      </Typography>
      <nav>
        <Link
          variant="button"
          color="inherit"
          href="#"
          sx={{my: 1, mx: 1.5}}
        >
          Features
        </Link>
        <Link
          variant="button"
          color="inherit"
          href="#"
          sx={{my: 1, mx: 1.5}}
        >
          Enterprise
        </Link>
        <Link
          variant="button"
          color="inherit"
          href="#"
          sx={{my: 1, mx: 1.5}}
        >
          Support
        </Link>
        {swich}
      </nav>
    </Toolbar>
  </AppBar>
}

export default Header;
