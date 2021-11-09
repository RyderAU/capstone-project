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
  
  const [loading, setLoading] = React.useState(false);
  
  function handleMarkSubmit() {
    setLoading(true);
    alert("You clicked edit")
    setLoading(false);
  }

  const handleChange = (e) => {
    console.log(e.target.value)
  };

  React.useEffect(() => {
    axios
      .get(`${url}/markcalc?token=${token}`)
      .then((res) => handleSuccess(res))
      .catch((err) => console.log(err));
  }, []);

  const handleSuccess = (res) => {
    setMarktable(res.data.assessments)
    
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
                    <input type="text" 
                      placeholder="Add your mark"
                      onChange={handleChange}
                      style={{marginRight:"5px"}}
                    />
                    <LoadingButton
                      color="secondary"
                      onClick={handleMarkSubmit}
                      loading={loading}
                      loadingPosition="start"
                      startIcon={
                        // <IconButton color="success">
                          <SaveIcon />
                        // </IconButton>
                      }
                      variant="contained"
                    >
                      Save
                    </LoadingButton>
                  </form>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </TableContainer>
  );
};

export default MarkCalculator;
