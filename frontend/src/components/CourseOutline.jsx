import React, { useState } from 'react';
import axios from 'axios';
// // import components
import { StoreContext } from '../Store';
import { Container } from "../components/CourseOutlineCSS";
// import SinglePage from "./components/pdf/SinglePage";
import COMP3121 from "../Outlines/COMP3121.pdf"
import COMP3900 from "../Outlines/COMP3900.pdf"
import COMP6080 from "../Outlines/COMP6080.pdf"
import COMP3331 from "../Outlines/COMP3331.pdf"

const CourseOutline = ( {courseid} ) => {
  console.log(courseid)
  let file;
  switch(courseid) {
    case "COMP3121":
      file = COMP3121
      break;
    case "COMP3900":
      file = COMP3900
      break;
    case "COMP6080":
      file = COMP6080
      break;
    case "COMP3331":
      file = COMP3331
      break;
    default:
      // code block
  }


  return (
    <Container>
      {/* <iframe src={COMP3900} className="viewer"/> */}
      <iframe src={file} className="viewer" frameborder="0"/>
      {/* <h4>Single Page</h4>
      <SinglePage pdf={COMP3900} /> */}
    </Container>
  );
};

export default CourseOutline;
