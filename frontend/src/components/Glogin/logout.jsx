import {GoogleLogout} from 'react-google-login'
const clientId="469569277949-d2pgq48oe8juuh2gkbiotmf5t05fc84g.apps.googleusercontent.com"
function Logout(){

    const onSuccess = () =>{
        console.log("Logged out successfully")
    }
    return(
        <div id="signOutButton">
            <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
            />
        </div>
    )
}
export default Logout;