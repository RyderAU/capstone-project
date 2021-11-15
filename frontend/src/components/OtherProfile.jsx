import "./OtherProfile.css";
import "./TimetableScripts/fullcalendar-3.9.0-min.css";
import "./Timetable.css";
import React from "react";
import axios from "axios";
import { StoreContext } from "../Store";
import { useState } from "react";
import { useParams } from "react-router";

const OtherProfile = () => {
  const context = React.useContext(StoreContext);
  const [url] = context.url;
  const [details, setDetails] = useState({});
  const [timetables, setTimetables] = React.useState([]);
  const { email } = useParams();
  
  // get selected user's details
  React.useEffect(() => {
    axios
      .get(`${url}/profile?email=${email}`)
      .then((res) => handleSuccess(res))
      .catch((err) => console.log(err));
  }, []);

  const handleSuccess = (res) => {
    console.log(res.data);
    setDetails(res.data);
    if (res.data.timetable_publicity === 1) {
			setTimetables(res.data.timetables.timetables);
		}
  };

	console.log(timetables);

  const [current, setCurrent] = useState(0);
  const length = timetables.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div>
      <div>Profile picture</div>
      <div>Display name: {details.username}</div>
      <div>Name: {details.real_name}</div>
      <div>Degree: {details.degree}</div>
      <div>Bio: {details.bio}</div>
			{/* if timetable is hidden, hide the element */}
      <div className={!details.timetable_publicity ? "timetable-hidden" : "timetable-outer"}>
        Timetable:
        <div className="timetable-container">
          <div className="button-container">
            <button onClick={prevSlide}>&lt;</button>
            <button onClick={nextSlide}>&gt;</button>
          </div>
          <div className="week-counter">week {current + 1}</div>
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
      </div>
    </div>
  );
};

export default OtherProfile;
