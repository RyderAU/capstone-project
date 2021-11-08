import "./MarkCalculator.css";
import { useParams } from "react-router";
import axios from "axios";
import React from "react";
import { StoreContext } from "../Store";
import { useState } from "react";

// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Input from "@material-ui/core/Input";
// import Paper from "@material-ui/core/Paper";
// import IconButton from "@material-ui/core/IconButton";
// // Icons
// import EditIcon from "@material-ui/icons/EditOutlined";
// import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
// import RevertIcon from "@material-ui/icons/NotInterestedOutlined";


// Dynamically creating the table based on the JSON data we receive from the backend.

const MarkCalculator = () => {
  const { courseid } = useParams();
  const context = React.useContext(StoreContext);
  const [url] = context.url;
  const [token] = context.token;
  const [marktable, setMarktable] = useState([]);
  
  React.useEffect(() => {
    axios
      .get(`${url}/markcalc?token=${token}`)
      .then((res) => handleSuccess(res))
      .catch((err) => console.log(err));
  }, []);

  const handleSuccess = (res) => {
    // console.log(res.data.assessments);
    setMarktable(res.data.assessments)
  }

  return (
    <div className="course-main">mark calculator for {courseid}
    <div>
      <table>
        {marktable.map(assessment => (
          <tr>
            <td>{assessment.task}</td>
            <td>{assessment.weighting}</td>
            <td>{assessment.hurdle}</td>
            <td>{assessment.hurdle_mark}</td>
          </tr>
        ))}  
      </table>
    </div>

  </div> );
};

export default MarkCalculator;
