import { useState } from "react";
import { Input, Label } from "../../FormElement";
import axios from "axios";
import OverlayBtn from "../../../buttons/OverlayBtn";
import { BiSolidErrorAlt } from "react-icons/bi";


const LoginForm = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [error, setError] = useState('');
    const style = { fontSize: "1.5em", verticalAlign: "top", marginRight: ".5em" };


    // Create submit method
    const submit = async e => {
        e.preventDefault();

        const user = {
            email: email,
            password: password
        };

        try {
            // Create POST request
            const { data } = await axios.post('http://localhost:8000/accounts/token/',
            user, {headers: {'Content-Type': 'application/json'}, withCredentials: true});

            // Initialise the access & refresh token in localstorage
            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            axios.defaults.headers.common['Authorization'] =  `Bearer ${data['access']}`;
            window.location.href = '/dashboard'
        } catch (error) {
            setError('Something went wrong. Please try again.');
            console.error('Error logging in:', error);
        }
    }

    return (
        <div>
            {error && <div className="errorMessage"><small><BiSolidErrorAlt style={style} /> {error}</small></div>}
            <form onSubmit={submit} style={{marginTop:"1em"}}>

                <Label htmlFor="email" >Email address:</Label>
                <Input 
                    placeholder='Enter your email address...'
                    name="email"
                    type="email"
                    value={email}
                    required 
                    onChange={e => setEmail(e.target.value)}
                /><br></br>

                <Label htmlFor="password" >Password:</Label>
                <Input 
                    placeholder='Enter your password...'
                    name="password"
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
        </div>
    )
}

export default LoginForm;