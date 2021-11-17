import "./TimetableScripts/fullcalendar-3.9.0-min.css";
import "./Timetable.css";
import React from "react";
import axios from 'axios';
import { StoreContext } from '../Store';
import { useState } from "react";

// User's timetable

const Timetable = () => {

  const context = React.useContext(StoreContext);
  const [url, ] = context.url;
  const token = localStorage.getItem("token");

  const [timetables, setTimetables] = React.useState([]);

  React.useEffect(() => {
    // Retrieve timetable from user profile
    axios.get(`${url}/dashboard/timetable?token=${token}`)
    .then(res => handleSuccess(res))
    .catch(err => console.log(err));
  }, [])

  const handleSuccess = (res) => {
    setTimetables(res.data.timetables);
  }

  const [current, setCurrent] = useState(0);
  const length = timetables.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="timetable-container">
      <div className="button-container">
        <button onClick={prevSlide}>&lt;</button>
        <button onClick={nextSlide}>&gt;</button>
      </div>
      <div className="week-counter">Week {current + 1}</div>
      <div className="carousel">
        {timetables.map((table, index) => {
          return (
            <div id="calendar" className="fc fc-unthemed fc-ltr">
              <div
                className={index === current ? "table-active" : "table"}
                key={index}
              >
                {index === current && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: table,
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timetable;
