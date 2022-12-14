import "./OtherProfile.css";
import "./TimetableScripts/fullcalendar-3.9.0-min.css";
import "./Timetable.css";
import React from "react";
import axios from "axios";
import defprofile from "../images/default-user.png";
import { StoreContext } from "../Store";
import { useState } from "react";
import { useParams } from "react-router";

// Profile page which appears when searching for another user

const OtherProfile = () => {
  const context = React.useContext(StoreContext);
  const [url] = context.url;
  const [details, setDetails] = useState({});
  const [timetables, setTimetables] = React.useState([]);
  const { email } = useParams();
  const [profilePic, setProfilePic] = useState("");

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
    if (res.data.avatar) {
      setProfilePic(res.data.avatar)
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
      <div className="details">
        <div className="details-item">
          <div className="frame">
            <img
              className="profile-img"
              src={profilePic ? profilePic : defprofile}
              alt="user profile image"
            />
          </div>
        </div>
        <div className="details-item">
          <div className="details-title">Display name: <div className="details-description">{details.username}</div></div>
          <div className="details-title">Name: <div className="details-description">{details.real_name}</div></div>
          <div className="details-title">Degree: <div className="details-description">{details.degree}</div></div>
          <div className="details-title">Bio: <div className="details-description">{details.bio}</div></div>
        </div>
      </div>
      
			{/* if timetable is hidden, hide the element */}
      <div className={!details.timetable_publicity ? "timetable-hidden" : "timetable-outer"}>
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
      </div>
    </div>
  );
};

export default OtherProfile;
