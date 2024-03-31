import { useState } from "react";
import { Input } from "../../FormElement";
import axios from "axios";
import OverlayBtn from "../../../buttons/OverlayBtn";

const UserProfileForm = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    // Create submit method
    const submit = async e => {
        e.preventDefault();

        const user = {
            email: email,
            password: password
        };

        // Create POST request
        const { data } = await axios.post('http://localhost:8000/accounts/token/',
        user, {headers: {'Content-Type': 'application/json'}, withCredentials: true});

        // Initialise the access & refresh token in localstorage
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        axios.defaults.headers.common['Authorization'] =  `Bearer ${data['access']}`;
        window.location.href = '/dashboard'
    }
    return (
        <form onSubmit={submit}>
            <Input 
                placeholder='Work Email'
                type="email"
                value={email}
                required 
                onChange={e => setEmail(e.target.value)}
            /><br></br>
            <Input 
                placeholder='Password'
                type="password"
                value={password}
                required 
                onChange={e => setPassword(e.target.value)}
             /><br></br>
            <p>Forgot Password?</p>

            <OverlayBtn type="submit">Submit</OverlayBtn>
            <br></br>

            {/* <hr></hr> */}
            {/* <Button>Login with Google</Button><br></br><br></br>
            <Button>Login with Apple</Button><br></br> */}

            {/* <small>Haven't signed up yet? <a href='/sign-up' style={{textDecoration: "underline"}}>Sign Up</a></small><br></br> */}
         </form>
    )
}

export default UserProfileForm;