/* eslint-disable */
import React from 'react';
export const StoreContext = React.createContext(null);

export default ({ children }) => {
  const [fullName, setFullName] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailUNSW, setEmailUNSW] = React.useState("");
  const [passwordUNSW, setPasswordUNSW] = React.useState("");

  const store = {
    fullName: [fullName, setFullName],
    displayName: [displayName, setDisplayName],
    email: [email, setEmail],
    password: [password, setPassword],
    emailUNSW: [emailUNSW, setEmailUNSW],  
    passwordUNSW: [passwordUNSW, setPasswordUNSW],
  }

  return <StoreContext.Provider value={store}>{ children }</StoreContext.Provider>
}