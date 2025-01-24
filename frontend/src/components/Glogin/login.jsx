import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const clientId = "469569277949-d2pgq48oe8juuh2gkbiotmf5t05fc84g.apps.googleusercontent.com"

function Glogin() {
    const navigate = useNavigate();

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user:", res.profileObj);
        // Optionally, handle login success (e.g., navigate, update state)
    };

    const onFailure = (res) => {
        console.log("LOGIN Failed!", res);
    };

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}

export default Glogin;
