import Button from '@material-ui/core/Button';
import { auth, provider } from '../firebase.js';
import logo from '../img/imessage.png';

const Login = () => {
    const signIn = () => {
        auth.signInWithPopup((provider)).catch(error => alert(error.message));
    }
    return (
        <div className="login">
            <div className="login_logo">
                <img src={logo} alt="" />
                <h1>iMessage</h1>
            </div>
            <Button onClick={signIn}>Sign in</Button>
        </div>
    );
}

export default Login;