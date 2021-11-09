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
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
// Icons
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

// Dynamically creating the table based on the JSON data we receive from the backend.
const MarkCalculator = () => {
  const { courseid } = useParams();
  const context = React.useContext(StoreContext);
  const [url] = context.url;
  const [token] = context.token;
  const [marktable, setMarktable] = useState([]);

  const [allTasks, setAllTasks] = useState("");
  const [allMarks, setAllMarks] = useState("");
  // const [myMark, setMyMark] = useState({});

  const [loading, setLoading] = React.useState(false);
  

  React.useEffect(() => {
    axios
      .get(`${url}/markcalc?token=${token}`)
      .then((res) => handleSuccess(res))
      .catch((err) => console.log(err));
  }, []);

  const handleSuccess = (res) => {
    setMarktable(res.data.assessments)
    // setMyMark(res.data.)
  }


  const handleMarkInput = (task, mark) => {
    setAllTasks(task)
    setAllMarks(mark)
    // console.log(marktable)
    // let allTasksString = ""
    // let allMymarkString = ""
    // for (let i = 0; i < marktable.length; i++) {
    //   // console.log(marktable[i]["task"]);
    //   // console.log(marktable[i]["my_mark"]);
    //   allTasksString += marktable[i]["task"]
    //   allMymarkString += marktable[i]["my_mark"]
    //   if (!(i == (marktable.length - 1))) {
    //     allTasksString += ", "
    //     allMymarkString += ", "
    //   }
    // }
    // console.log(allTasksString)
    // console.log(allMymarkString)

    // setAllTasks(allTasksString)
    // setAllMarks(allMymarkString)
  }

  const handleMarkSubmit = () => {
    setLoading(true);
    // alert("You clicked edit")
    console.log(allTasks)
    console.log(allMarks)
    axios.post(`${url}/markcalc`, {
      token: token,
      course_name: courseid,
      tasks: allTasks,
      marks: allMarks,
    })
      .then(r => {
        console.log(r)
      })
      .catch(err => {
        console.log(err);
      });
    setLoading(false);
  }  
  
  const {isEditMode} = true;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: 'bold', backgroundColor:'pink'}}> Task </TableCell>
            <TableCell style={{fontWeight: 'bold', backgroundColor:'pink'}} align="right"> Due </TableCell>
            <TableCell style={{fontWeight: 'bold', backgroundColor:'pink'}} align="right"> Weighting</TableCell>
            <TableCell style={{fontWeight: 'bold', backgroundColor:'pink'}} align="right"> Hurdle </TableCell>
            <TableCell style={{fontWeight: 'bold', backgroundColor:'pink'}} align="right"> Hurdle mark </TableCell>
            <TableCell style={{fontWeight: 'bold', backgroundColor:'pink'}} align="right"> My mark </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {marktable.map(assessment => (
            <TableRow
              key={assessment.task}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {assessment.task}
              </TableCell>
                <TableCell align="right">{assessment.deadline}</TableCell>
                <TableCell align="right">{assessment.weighting}%</TableCell>
                <TableCell align="right">{assessment.hurdle ? "Yes" : "No"}</TableCell>
                <TableCell align="right">{assessment.hurdle ? String(assessment.hurdle_mark) + "%" : "N/A"}</TableCell>
                <TableCell align="right">
                  <form>
                    <Input type="text" 
                      // value={displayMyMark}
                      placeholder={assessment.my_mark}
                      onChange={(e) => handleMarkInput(assessment.task, e.target.value)}
                      style={{marginRight:"5px"}}
                    />
                    <LoadingButton
                      color="secondary"
                      
                      loading={loading}
                      loadingPosition="start"
                      startIcon={
                        <SaveIcon 
                          onClick={() => handleMarkSubmit()}
                          type="submit"/>
                      }
                      variant="contained"
                    >
                      Save
                    </LoadingButton>
                  </form>
                </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>My Total</TableCell>
          </TableRow>
        </TableBody>
        </Table>
    </TableContainer>
  );
};

export default MarkCalculator;
