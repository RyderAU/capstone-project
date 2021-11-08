import "./MarkCalculator.css";
import { useParams } from "react-router";
import axios from "axios";
import React from "react";
import { StoreContext } from "../Store";
import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
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
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
// Dynamically creating the table based on the JSON data we receive from the backend.
const MarkCalculator = () => {
  const { courseid } = useParams();
  const context = React.useContext(StoreContext);
  const [url] = context.url;
  const [token] = context.token;
  const [marktable, setMarktable] = useState([]);

  const onToggleEditMode = id => {
    setMarktable(state => {
      return marktable.map(assessment => {
        if (assessment.id === id) {
          return { ...assessment, isEditMode: !assessment.isEditMode };
        }
        return assessment;
      });
    });
  };

  const onChange = (e, assessment) => {

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> Task </TableCell>
            <TableCell align="right"> Due </TableCell>
            <TableCell align="right"> Weighting</TableCell>
            <TableCell align="right"> Hurdle </TableCell>
            <TableCell align="right"> Hurdle mark </TableCell>
            <TableCell align="right"> My mark </TableCell>
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
                <TableCell align="right">{assessment.hurdle}</TableCell>
                <TableCell align="right">{assessment.hurdle ? String(assessment.hurdle_mark) + "%" : "N/A"}</TableCell>
                <TableCell align="right">
                  <input type="text" value="Add your mark" />
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </TableContainer>
  );
  // </div> );
};

export default MarkCalculator;
