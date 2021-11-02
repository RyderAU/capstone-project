import "./Profile.css";
import defprofile from "../images/default-user.png";

const Profile = () => {
  // dummy response
  const res = {
    degree: "Program: 3778 - Computer Science - Sydney",
    name: "Ryder Jacka",
    displayName: "Ryderr",
    bio: "I hate coding",
    zID: "z5230735",
    courses: ["COMP3900", "COMP4920"],
  };
  return (
    <div className="profile-container">
      <div className="profile-photo">
        <img src={defprofile} alt="default user image" />
      </div>
      <div className="profile-description">
        <div>Name: {res.name}</div>
        <div>Display Name: {res.displayName}</div>
        <div>zID: {res.zID}</div>
        <div>Degree: {res.degree}</div>
        <div>Current courses: {res.courses.join(", ")}</div>
        <div>Bio: {res.bio}</div>
      </div>
    </div>
  );
};

export default Profile;
