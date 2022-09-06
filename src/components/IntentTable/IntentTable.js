import * as React from 'react';
import {useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IntentDetail from "./IntentDetail";
import {TableFooter, TablePagination} from "@mui/material";
import {v4 as uuid4} from 'uuid';
import {queryExpectation, queryNamesAndLayer, queryReportAndStatus,queryReportExpectation} from "../../service/query";
import {queryDetail} from "../../service/service";
import {formatDetail, formatExpectation, formatReportExpectation,formatTS} from "../../utils/format";

const Row = (props) => {
  const {row} = props;
  const [open, setOpen] = React.useState(false);
  const [currentId, setCurrentId] = React.useState("");
  const [currentName, setCurrentName] = React.useState("");
  const [expectations, setExpectations] = React.useState([]);
  const [reportExpectations, setReportExpectations] = React.useState([]);
  const [stateName, setStateName] = React.useState([]);
  const [intentReport, setIntentReport] = React.useState("");
  const [reportUriList, setReportUriList] = React.useState([]);
  const [reportTS, setReportTS] = React.useState([]);

  const IconClick = (props) => {
    const handleClick = (e) => {
      setOpen(!open);
      setCurrentId(e.currentTarget.id);
      setCurrentName(props.data.name);
    }

    const isCurrentId = () => {
      return props.data.id === currentId;
    }

    return <>
      <IconButton
        aria-label="expand row"
        size="small"
        onClick={(e) => handleClick(e)}
        id={props.data.id}
      >
        {(open && isCurrentId()) ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>}
      </IconButton>
      {props.data.name}
    </>
  }

  useEffect(() => {
    // get Intent expectations
    queryExpectation(currentName).then(res => {
      const result = formatExpectation(res);
      setExpectations(result);
    }).catch(err => {
      console.log(err)
    })

    // get Intent Report and state
    queryReportAndStatus(currentName).then(res => {
      const result = res.results.bindings;
      if (result.length < 1) {
        setIntentReport("")
        setStateName("None");
        return;
      }
      setStateName(result[0].state.value.split("#")[1]);
      setReportUriList(result.map(item => {
        return item.report.value
      }));
      setReportTS(result.map(item => {
        return item.timestamp.value
      }));
    }).catch(err => {
      console.log(err);
    })
  }, [currentName])

  // update report
  useEffect(() => {
    // report
    const getReport = async (result) => {
      if (reportUriList.length > 0) {
        for (const reportUri of reportUriList) {

                  //query report expectations
        //start
        await queryReportExpectation(reportUri.split("#")[1]).then(res => {
          const report = formatReportExpectation(res);
          setReportExpectations(report);
          result = Object.assign(report, result)
//          const ts = formatTS(res);
//          setReportTS(ts);
//          result2 = Object.assign(ts, result2)
       }).catch(err => {
         console.log(err)
       })
//query report expectations
//end

      }
        console.log(result);
        setIntentReport(result);
      } else {
        setIntentReport("")
      }
    }
    getReport({});
  }, [reportUriList])

  const getCurrentData = () => {
    return {
      "id": currentId,
      "name": currentName,
      "stateName": stateName,
      "expectation": expectations,
      "intentReport": intentReport,
      "reportTS": reportTS,
      "reportExpectation": reportExpectations
    }
  }

  return (<React.Fragment>
    <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
      <TableCell align="left">{row.business.name && <IconClick data={row.business}/>}</TableCell>
      <TableCell align="left">{row.service.name && <IconClick data={row.service}/>}</TableCell>
      <TableCell align="left">{row.resource.name && <IconClick data={row.resource}/>}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
        <IntentDetail open={open} data={getCurrentData()}/>
      </TableCell>
    </TableRow>
  </React.Fragment>);
}

const groupByType = (arr) => {
  const result = {};
  arr.forEach(function (item) {
    const currGroupKey = item.type;
    const currGroupArr = result[currGroupKey];
    if (currGroupArr) {
      currGroupArr.push(item);
    } else {
      result[currGroupKey] = [item];
    }
  });
  return result;
}

const getMaxRowsLen = (business, resource, service) => {
  let maxLen = 0;
  if (business) {
    maxLen = Math.max(maxLen, business.length);
  }
  if (resource) {
    maxLen = Math.max(maxLen, resource.length);
  }
  if (service) {
    maxLen = Math.max(maxLen, service.length);
  }
  return maxLen;
}

const getName = (intents, i) => {
  if (intents && intents.length > i) {
    return intents[i].name;
  }
  return "";
}

const IntentTable = () => {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // intent name and layer
  useEffect(() => {
    queryNamesAndLayer().then(res => {
      const intentList = res.results.bindings.map(item => {
        return {name: item.intent.value.split("#")[1], type: item.type.value}
      })
      const group = groupByType(intentList);
      const business = group.business;
      const resource = group.resource;
      const service = group.service;
      const rowsLen = getMaxRowsLen(business, resource, service);
      const newRows = [];
      for (let i = 0; i < rowsLen; i++) {
        let row = {
          "id": uuid4(),
          "business": {
            "name": getName(business, i),
            "id": uuid4()
          },
          "service": {
            "name": getName(service, i),
            "id": uuid4()
          },
          "resource": {
            "name": getName(resource, i),
            "id": uuid4()
          }
        }
        newRows.push(row);
      }
      setRows(newRows);
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (<TableContainer component={Paper}>
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow>
          <TableCell>Business</TableCell>
          <TableCell>Service</TableCell>
          <TableCell>Resource</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (
          <Row key={row.id} row={row}/>))}
        {emptyRows > 0 && (<TableRow style={{height: 53 * emptyRows}}>
          <TableCell colSpan={6}/>
        </TableRow>)}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
            colSpan={3}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              }, native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableRow>
      </TableFooter>
    </Table>
  </TableContainer>);
}

export default IntentTable;
