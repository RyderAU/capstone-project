import React, { useState } from 'react';
import { Container } from "../components/CourseOutlineCSS";
import COMP2511 from "../Outlines/COMP2511.pdf"
import COMP3121 from "../Outlines/COMP3121.pdf"
import COMP3311 from "../Outlines/COMP3311.pdf"
import COMP3331 from "../Outlines/COMP3331.pdf"
import COMP3900 from "../Outlines/COMP3900.pdf"
import COMP4418 from "../Outlines/COMP4418.pdf"
import COMP4920 from "../Outlines/COMP4920.pdf"
import COMP6080 from "../Outlines/COMP6080.pdf"
import COMP9444 from "../Outlines/COMP9444.pdf"
import FINS2624 from "../Outlines/FINS2624.pdf"
import TABL3757 from "../Outlines/TABL3757.pdf"

// Pre-loaded pdfs
// Our tutor Joseph allowed us to do this
const CourseOutline = ( {courseid} ) => {
  console.log(courseid)
  let file;
  switch(courseid) {
    case "COMP2511":
      file = COMP2511
      break;
    case "COMP3121":
      file = COMP3121
      break;
    case "COMP3311":
      file = COMP3311
      break;
    case "COMP3331":
      file = COMP3331
      break;
    case "COMP3900":
      file = COMP3900
      break;
    case "COMP4418":
      file = COMP4418
      break;
    case "COMP4920":
      file = COMP4920
      break;
    case "COMP6080":
      file = COMP6080
      break;
    case "COMP9444":
      file = COMP9444
      break;
    case "FINS2624":
      file = FINS2624
      break;
    case "TABL3757":
      file = TABL3757
      break;
    default:
  }

  return (
    <Container>
      <iframe src={file} className="viewer" frameborder="0"/>
    </Container>
  );
};

export default CourseOutline;
