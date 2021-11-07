import "./Profile.css";
import defprofile from "../images/default-user.png";
import React from "react";
import axios from "axios";
import { StoreContext } from "../Store";
import { useState } from "react";

const Profile = () => {
  const context = React.useContext(StoreContext);
  const [url] = context.url;
  const [token] = context.token;
  const [details, setDetails] = useState({});

  const [displayName, setDisplayName] = context.displayName;
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [timetablePublicity, setTimetablePublicity] = context.timetablePublicity;
  const [checked, setChecked] = useState(false);

  console.log('timetable publicity is ' + timetablePublicity);

  React.useEffect(() => {
    // get profile info
    axios
      .get(`${url}/dashboard/profile?token=${token}`)
      .then((res) => handleSuccess(res))
      .catch((err) => console.log(err));
  }, []);

  const handleSuccess = (res) => {
    console.log(res.data);
    setDetails(res.data);
    setDisplayName(res.data.username);
    setBio(res.data.bio);
    timetablePublicity ? setChecked(true) : setChecked(false);
  };

  const saveChanges = () => {
    console.log(`display name is ${displayName}`);
    console.log(`bio name is ${bio}`);
    console.log(`checked is ${checked}`);
    checked ? setTimetablePublicity(1) : setTimetablePublicity(0);
    axios
      .post(`${url}/dashboard/profile`, {
        token: token,
        display_name: displayName,
        bio: bio,
        timetable_publicity: timetablePublicity,
      })
      .then((r) => {
        console.log(`success`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDisplayChange = (e) => {
    console.log(`new display value is ${e.target.value}`);
    setDisplayName(e.target.value);
  };

  const handleBioChange = (e) => {
    console.log(`new bio value is ${e.target.value}`);
    setBio(e.target.value);
  };

  const handlePublicityChange = () => {
    setChecked(!checked);
  }

  const uploadImage = async (e) => {
    console.log(e);
    const file = e.target.files[0];
    const file_type = String(file["type"]);
    // console.log(file_type)
    if (!file_type.includes("image")) {
      alert("You can only upload jpeg/png/jpg.");
    } else {
      const base64 = await convertBase64(file);
      // console.log("Following is base64: ", base64);
      // for backend ppl, store this base64 variable to the db as a string.
      setProfilePic(base64);
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-photo">
        {/* assuming that ryder will implement a beautiful edit button here */}
        <img
          src={profilePic ? profilePic : defprofile}
          alt="user profile image"
        />
        <input
          type="file"
          onChange={(e) => {
            uploadImage(e);
          }}
        />
      </div>
      <div className="profile-description">
        <div className="title">
          Name: <div className="field-entry">{details.real_name}</div>
        </div>
        <div className="title">
          Display Name:{" "}
          <div>
            <textarea
              type="text"
              rows="1"
              cols="10"
              onChange={(e) => handleDisplayChange(e)}
              value={displayName}
            ></textarea>
          </div>
        </div>
        <div className="title">
          zID: <div className="field-entry">{details.zid}</div>
        </div>
        <div className="title">
          Degree: <div className="field-entry">{details.degree}</div>
        </div>
        <div className="title">
          Current courses: <div className="field-entry">{details.courses}</div>
        </div>
        <div className="title">
          Bio:{" "}
          <div>
            <textarea
              type="text"
              rows="4"
              cols="40"
              onChange={(e) => handleBioChange(e)}
              value={bio}
            >
              {bio}
            </textarea>
          </div>
        </div>
        <div className="title">
          Timetable display settings: <input type="checkbox" defaultChecked={timetablePublicity ? true : false} onChange={handlePublicityChange}/>
        </div>
        <button className="save-changes-button" onClick={saveChanges}>
          save changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
