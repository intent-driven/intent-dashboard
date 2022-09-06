import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import TreeCell from "../TreeCell/TreeCell";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {v4 as uuid4} from 'uuid';

const IntentDetail = (props) => {
  return <Collapse in={props.open} timeout="auto" unmountOnExit>
    <Box sx={{mt: 1.5, backgroundColor: "#FFF8E1"}}>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6" gutterBottom width="49%">Intent Detail</Typography>
              {props.data.name}
            </TableCell>
            <TableCell>
              <Typography variant="h6" gutterBottom width="49%" align={"left"}>State</Typography>
              {props.data.stateName}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={uuid4()}>
            <TableCell>
              <Typography variant="h6" gutterBottom>Expectation</Typography>
              <TreeCell value={props.data.expectation}/>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow key={uuid4()}>
            <TableCell>
              <Typography variant="h6" gutterBottom>Report</Typography>
              <TreeCell value={props.data.intentReport}/>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  </Collapse>
}

export default IntentDetail;
