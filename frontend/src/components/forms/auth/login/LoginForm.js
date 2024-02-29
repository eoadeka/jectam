import Button from "../../../buttons/Button"

const LoginForm = () => {
    return (
        <form>
            <input placeholder='Work Email' /><br></br>
            <input placeholder='Password' /><br></br>
            <p>Forgot Password?</p>

            <Button>Continue</Button>

            <hr></hr>
            <Button>Login with Google</Button><br></br><br></br>
            <Button>Login with Apple</Button><br></br>

            <small>Haven't signed up yet? <a href='/sign-up' style={{textDecoration: "underline"}}>Sign Up</a></small><br></br>
         </form>
    )
}

export default LoginForm;