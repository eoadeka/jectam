import { Link } from "react-router-dom"
import useFormContext from "../../../hooks/useFormContext"
import AuthFormList from './AuthFormList'

const AuthForm = () => {
    const totalPages = 5; 

    const {
        page,
        setPage,
        data,
        title,
        canSubmit,
        disablePrev,
        // disableNext,
        prevHide,
        nextHide,
        submitHide
    } = useFormContext()

    const handlePrev = () => {
        if (page > 0) { // Ensure page doesn't go below 1
          setPage(prevPage => prevPage - 1);
        }
      };
    
      const handleNext = () => {
        // You can replace 6 with the total number of pages in your application
        if (page < totalPages) { // Ensure page doesn't exceed the total number of pages
          setPage(prevPage => prevPage + 1);
        }
      };

    const handleSubmit = async e => {
        e.preventDefault()
        // console.log(JSON.stringify(data));
        let formData = new FormData()
        formData.append('profile_picture', data.profile_picture)
        formData.append('role', data.role)
        formData.append('email', data.email)
        formData.append('password1', data.password1)
        formData.append('password2', data.password2)
        formData.append('accepted_terms', data.accepted_terms)
        formData.append('phone_number', data.phone_number)
        formData.append('otp', data.otp)
        formData.append('first_name', data.first_name)
        formData.append('last_name', data.last_name)
        formData.append('birth_date', data.birth_date)
        formData.append('gender', data.gender)

        const user = {
          role: data.role,
          email: data.email,
          password1: data.password1,
          password2: data.password2,
          accepted_terms: data.accepted_terms,
          phone_number: data.phone_number,
          otp: data.otp,
          first_name: data.first_name,
          last_name: data.last_name,
          birth_date: data.birth_date,
          gender: data.gender,
          profile_picture: data.profile_picture
        }

        console.log(user)
        await fetch('http://localhost:8000/accounts/dj-rest-auth/registration/', {
            method: 'POST',
            // headers: {
            //   Accept: 'application/json',
            //   'Content-Type': 'multipart/form-data',
            // },
            body: formData
          })
        .then(res => {
          res.json()
        })
        .catch(error => {
          console.error(error);
        });
        window.location.href = '/login'

        
    }


    const content = (
        <form onSubmit={handleSubmit} action={<Link to="/login" />} className='new-project-form' style={{width:"65%", height:"100vh"}}> 

            <h2>{title[page]}</h2>
            <div className="button-container">
                <button type="button" className={`button ${prevHide}`} onClick={handlePrev} disabled={disablePrev}>Prev</button>
                <button type="button" className={`button ${nextHide}`} onClick={handleNext} disabled={page === totalPages}>Next</button>
                <button type="submit" className={`button ${submitHide}`} disabled={!canSubmit}>Submit</button>
            </div>
            <AuthFormList />
            {/* <small>Already signed up?<a href='/login' style={{textDecoration: "underline"}}>Login</a></small><br></br> */}
        </form>
    )

    return content
}
export default AuthForm