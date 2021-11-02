import "./Profile.css";
import defprofile from "../images/default-user.png";
import React from "react";
import axios from 'axios';
import { StoreContext } from '../Store';
import { useState } from "react";

const Profile = () => {
  // dummy response
  // const res = {
  //   degree: "Program: 3778 - Computer Science - Sydney",
  //   name: "Ryder Jacka",
  //   displayName: "Ryderr",
  //   bio: "I hate coding",
  //   zID: "z5230735",
  //   courses: ["COMP3900", "COMP4920"],
  // };

  const context = React.useContext(StoreContext);
  const [url, ] = context.url;
  const [token, ] = context.token;
  const [details, setDetails] = useState({});

  React.useEffect(() => {
    // get profile info
    axios.get(`${url}/dashboard/profile?token=${token}`)
    .then(res => handleSuccess(res))
    .catch(err => console.log(err));
  }, []);

  const handleSuccess = (res) => {
    setDetails(res.data);
  }

  const saveChanges = () => {
    console.log('hi');
  }

  return (
    <div className="profile-container">
      <div className="profile-photo">
        <img src={defprofile} alt="default user image" />
      </div>
      <div className="profile-description">
        <div className="title">Name: <div className="field-entry">{details.real_name}</div></div>
        <div className="title">Display Name: <div><input type="text" value={details.username}/></div></div>
        <div className="title">zID: <div className="field-entry">{details.zid}</div></div>
        <div className="title">Degree: <div className="field-entry">{details.degree}</div></div>
        <div className="title">Current courses: <div className="field-entry">{details.courses}</div></div>
        <div className="title">Bio: <div><textarea type="text" rows="4" cols="40">{details.bio}</textarea></div></div>
        <button className="save-changes-button" onClick={saveChanges}>save changes</button>
      </div>
    </div>
  );
};

export default Profile;
