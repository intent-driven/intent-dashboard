import {createTheme} from "@mui/material/styles";

// graph db config
export const HOTS = "http://10.220.239.92:7200";
export const QUERY_URL = "/repositories";
export const REPOSITORY = "intent";
export const PREFIX = `
  PREFIX imo: <http://imgpedia.dcc.uchile.cl/ontology#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  prefix  ex: <http://www.example.org/IntentNamespace#> 
  prefix icm: <http://tio.models.tmforum.org/tio/v1.0.0/IntentCommonModel#> 
  prefix cem: <http://tio.labs.tmforum.org/tio/v1.0.0/CatalystExtensionModel#>
  PREFIX ent: <http://www.ontotext.com/owlim/entity#>`

// themeDark
export const themeDark = createTheme({
  palette: {
    background: {
      default: "#EEEEEE"
    },
    primary: {
      main: "#000000"
    },
    secondary: {
      main: "#FFFFFF"
    }
  }
});

// themeLight
export const themeLight = createTheme({
  palette: {
    background: {
      default: "#F5F5F5"
    },
  }
});
