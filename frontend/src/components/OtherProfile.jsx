import "./OtherProfile.css";
import React from "react";
import axios from 'axios';
import { StoreContext } from '../Store';
import { useState } from "react";

const OtherProfile = () => {
    const context = React.useContext(StoreContext);
    const [url, ] = context.url;
    const [details, setDetails] = useState({});
    // dummy
    const email = "shoan@mail.com";
    // get selected user's details
    React.useEffect(() => {
        axios.get(`${url}/profile?email=${email}`)
        .then(res => handleSuccess(res))
        .catch(err => console.log(err));
    }, []);
        
    const handleSuccess = (res) => {
        console.log(res.data);
        setDetails(res.data);
    }

    console.log(details.timetables);
    
    return (
        <div>
            <div>Profile picture</div>
            <div>Display name: {details.username}</div>
            <div>Name: {details.real_name}</div>
            <div>Degree: {details.degree}</div>
            <div>Bio: {details.bio}</div>
            <div>Timetable (if not hidden): </div>
        </div>
    );
};

export default OtherProfile;
