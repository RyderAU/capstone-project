/* eslint-disable */
import React from "react";
export const StoreContext = React.createContext(null);

export default ({ children }) => {
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [emailUNSW, setEmailUNSW] = React.useState("");
  const [passwordUNSW, setPasswordUNSW] = React.useState("");
  const [url, setUrl] = React.useState("http://localhost:3030");
  const [courses, setCourses] = React.useState([
    "COMP3900",
    "COMP6080",
    "COMP3331",
  ]);
  const [token, setToken] = React.useState("");
  const [timetablePublicity, setTimetablePublicity] = React.useState(0);

  const store = {
    displayName: [displayName, setDisplayName],
    email: [email, setEmail],
    password: [password, setPassword],
    passwordConfirm: [passwordConfirm, setPasswordConfirm],
    emailUNSW: [emailUNSW, setEmailUNSW],
    passwordUNSW: [passwordUNSW, setPasswordUNSW],
    url: [url, setUrl],
    courses: [courses, setCourses],
    token: [token, setToken],
    timetablePublicity: [timetablePublicity, setTimetablePublicity],
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
