import "./MarkCalculator.css";
import { useParams } from "react-router";
import axios from "axios";
import React from "react";
import { StoreContext } from "../Store";
import { useState } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@mui/material/TableContainer';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";

// Icons
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckIcon from '@mui/icons-material/Check';

import Alert from '@mui/material/Alert';

// Dynamically creating the table based on the JSON data we receive from the backend.
const MarkCalculator = () => {
  const { courseid } = useParams();
  const context = React.useContext(StoreContext);
  const [url] = context.url;
  const [token] = context.token;
  const [marktable, setMarktable] = useState([]);

  const [task, setTask] = useState("");
  const [mark, setMark] = useState("");

  const [totalMark, setTotalMark] = useState(0);

  const [loading, setLoading] = React.useState(false);
  
  React.useEffect(() => {
    console.log(courseid)
    console.log(token)
    axios
      .get(`${url}/markcalc?token=${token}&course_name=${courseid}`)
      .then((res) => handleSuccess(res))
      .catch((err) => console.log(err));
  }, []);

  const handleSuccess = (res) => {
    console.log(res)
    setMarktable(res.data.assessments)
    let total = 0
    let arr = res.data.assessments
    arr.forEach((e, i, a) => {
      total += parseFloat(e["my_mark"])

    })
    console.log(total)
    setTotalMark(total)
  }

  const handleMarkInput = (task, mark) => {
    console.log(task, mark)
    if (mark === "") {
      mark = 0
    }

    mark = parseFloat(mark)

    if (isNaN(mark)) {
      // setMark("")
      alert("Please enter integer or decimal")
    }
    else {
      setTask(task)
      setMark(mark)
    }
  }

  const handleMarkSubmit = () => {
    // setLoading(true);
    
    alert("Your mark has been updated.")
    
    // setOpen(true);
    console.log(task)
    console.log(mark)
    axios.post(`${url}/markcalc`, {
      token: token,
      course: courseid,
      tasks: task,
      marks: mark,
    })
      .then(r => {
        console.log(r)
      })
      .catch(err => {
        console.log(err);
      });
    
    // setTimeout(()=>{setLoading(false);}, 2000)
  }  

  return (
    <div>
      { loading ? <Alert severity="success" color="info" style={{fontSize:"20pt", backgroundColor:"pink"}}>We've updated your mark!</Alert>
        : <div/>}
      
    <TableContainer component={Paper}>
      
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: 'bold', backgroundColor:'pink'}}> Task </TableCell>
            <TableCell style={{fontWeight: 'bold', backgroundColor:'pink'}} align="center"> Due </TableCell>
            <TableCell style={{fontWeight: 'bold', backgroundColor:'pink'}} align="center"> Weighting</TableCell>
            <TableCell style={{fontWeight: 'bold', backgroundColor:'pink'}} align="center"> Hurdle </TableCell>
            <TableCell style={{fontWeight: 'bold', backgroundColor:'pink'}} align="center"> Hurdle mark </TableCell>
            <TableCell style={{fontWeight: 'bold', backgroundColor:'pink'}} align="center"> My mark (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {marktable.map(assessment => (

            <TableRow
              key={assessment.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {assessment.name}
              </TableCell>
                <TableCell align="center">{assessment.deadline}</TableCell>
                <TableCell align="center">{assessment.weighting}%</TableCell>
                <TableCell align="center">{assessment.hurdle ? "Yes" : "No"}</TableCell>
                <TableCell align="center">{assessment.hurdle ? String(assessment.hurdle_mark) + "%" : "N/A"}</TableCell>
                <TableCell align="center">
  
                  <input type="text"
                    className="markInput"
                    placeholder={assessment.my_mark}
                    // value={mark}
                    onChange={(e) => handleMarkInput(assessment.name, e.target.value)}
                    style={{width:"65px"}}
                  />
                  <CheckIcon onClick={() => handleMarkSubmit()} type="submit"/>
                  {/* <LoadingButton
                    color="secondary"
                    style={{marginLeft:"15px"}}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={
                      <CheckIcon 
                        onClick={() => handleMarkSubmit()
                      }
                        type="submit"/>
                    }
                    variant="contained"
                  >
                    Save
                  </LoadingButton> */}
                </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>My Total Mark (%)</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="center">
              {totalMark} %
            </TableCell>
          </TableRow>
        </TableBody>
        </Table>
    </TableContainer>
    
    </div>
  );
};

export default MarkCalculator;
