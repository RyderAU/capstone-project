import "./Profile.css";
import defprofile from "../images/default-user.png";
import React from "react";
import axios from 'axios';
import { StoreContext } from '../Store';
import { useState } from "react";

const Profile = () => {
const context = React.useContext(StoreContext);
const [url, ] = context.url;
const [token, ] = context.token;
const [details, setDetails] = useState({});

const [displayName, setDisplayName] = context.displayName;
const [bio, setBio] = useState("");
const [profilePic, setProfilePic] = useState("");

React.useEffect(() => {
// get profile info
axios.get(`${url}/dashboard/profile?token=${token}`)
.then(res => handleSuccess(res))
.catch(err => console.log(err));
}, []);

const handleSuccess = (res) => {
console.log(res.data)
setDetails(res.data);
setDisplayName(res.data.username);
setBio(res.data.bio);
}

const saveChanges = () => {
console.log(`display name is ${displayName}`);
console.log(`bio name is ${bio}`);
axios.post(`${url}/dashboard/profile`, {
token: token,
display_name: displayName,
bio: bio,
})
.then(r => {
console.log(`response is ${r}`);
})
.catch(err => {
console.log(err);
});
}

const handleDisplayChange = (e) => {
console.log(`new display value is ${e.target.value}`);
setDisplayName(e.target.value);
}

const handleBioChange = (e) => {
console.log(`new bio value is ${e.target.value}`)
setBio(e.target.value);
}

const uploadImage = async (e) => {
    // console.log(e.target.files);
    const file = e.target.files[0];
    const base64 = await convertBase64(file)
    // console.log(base64);
    setProfilePic(base64)
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
    })
}

return (
<div className="profile-container">
<div className="profile-photo">
    {/* assuming that ryder will implement edit button here */}
    <img src={profilePic} height="200px"/>
    <img src={defprofile} alt="default user image" />
    i am profile pic
    <input
        type="file"
        onChange={(e) => {
            uploadImage(e);
        }}
    />
</div>
<div className="profile-description">
<div className="title">Name: <div className="field-entry">{details.real_name}</div></div>
<div className="title">Display Name: <div><textarea type="text" rows="1" cols="10" onChange={(e) => handleDisplayChange(e)} value={displayName}></textarea></div></div>
<div className="title">zID: <div className="field-entry">{details.zid}</div></div>
<div className="title">Degree: <div className="field-entry">{details.degree}</div></div>
<div className="title">Current courses: <div className="field-entry">{details.courses}</div></div>
<div className="title">Bio: <div><textarea type="text" rows="4" cols="40" onChange={(e) => handleBioChange(e)} value={bio}>{bio}</textarea></div></div>
<button className="save-changes-button" onClick={saveChanges}>save changes</button>
</div>
</div>
);
};

export default Profile;
