import "./OtherProfile.css";
import React from "react";
import axios from 'axios';
import { StoreContext } from '../Store';

const OtherProfile = () => {
    const context = React.useContext(StoreContext);
    const [url, ] = context.url;
    const [token, ] = context.token;
    console.log(token);
    console.log(url);
    // dummy
    const email = "shoan@mail.com";
    // get selected user's details
    React.useEffect(() => {
        axios.get(`${url}profile?email=${email}`)
        .then(res => handleSuccess(res))
        .catch(err => console.log(err));
    }, []);
        
    const handleSuccess = (res) => {
        console.log(res)
    }
    
    return (
        <div>
            hello this is the other profile
            <div>Profile picture</div>
            <div>Display name</div>
            <div>Name</div>
            <div>Degree</div>
            <div>Bio</div>
            <div>Timetable (if not hidden)</div>
        </div>
    );
};

export default OtherProfile;
