import "./Profile.css";
import defprofile from "../images/default-user.png";
import React from "react";
import axios from "axios";
import { StoreContext } from "../Store";
import { useState } from "react";

// Update profile feature, the user can change their display name, picture, 
// bio and timetable publicity setting.

const Profile = () => {
  const context = React.useContext(StoreContext);
  const [url] = context.url;

  const token = localStorage.getItem("token");
  const [details, setDetails] = useState({});

  const [displayName, setDisplayName] = context.displayName;
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [timetablePublicity, setTimetablePublicity] = useState(0);

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
    setTimetablePublicity(res.data.timetable_publicity);
    if (res.data.avatar) {
      setProfilePic(res.data.avatar)
    }
  };

  const saveChanges = () => {
    axios
      .post(`${url}/dashboard/profile`, {
        token: token,
        display_name: displayName,
        bio: bio,
        timetable_publicity: timetablePublicity,
        avatar: profilePic,
      })
      .then((r) => {
        console.log(`success`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDisplayChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handlePublicityChange = () => {
    if (timetablePublicity == 0) {
      setTimetablePublicity(1);
    } else {
      setTimetablePublicity(0);
    }
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
        <div className="frame">
          <img
            className="profile-img"
            src={profilePic ? profilePic : defprofile}
            alt="user profile image"
          />
        </div>
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
          Timetable display settings: <button onClick={handlePublicityChange}>Change</button> <div className="field-entry">{timetablePublicity ? 'public' : 'private'}</div>
        </div>
        <button className="save-changes-button" onClick={saveChanges}>
          save changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
