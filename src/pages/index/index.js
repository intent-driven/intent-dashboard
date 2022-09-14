import React from "react";
import {Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import IntentTable from "../../components/IntentTable/IntentTable";
import logo from "../../image/tmf921.png"

const Index = () => {
  return <>
    <Container maxWidth="md" component="main" align="center" sx={{mt: 2, mb:2}}>
      <img src={logo}  alt="Logo" />
    </Container>
    <Container disableGutters maxWidth="sm" component="main" sx={{pt: 6, pb: 6}}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Intent Dashboard
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" component="p">
        Intent-driven autonomous networks Catalyst.
      </Typography>
    </Container>
    <Container maxWidth="md" component="main" sx={{mt: 2, mb:2}}>
      <IntentTable/>
    </Container>
  </>
}

export default Index;
