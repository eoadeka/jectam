import { useState } from "react";
import { Link } from "react-router-dom";
import useFormContext from "../../../hooks/useFormContext";
import AuthFormList from './AuthFormList';
import { BiSolidErrorAlt } from "react-icons/bi";
import OverlayBtn from "../../buttons/OverlayBtn";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";


const AuthForm = () => {
    const [error, setError] = useState('');
    const style = { fontSize: "1.5em", verticalAlign: "top", marginRight: ".5em" };
    const styleTwo = { fontSize: "1em", verticalAlign: "middle" };

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
    } = useFormContext();

    const isFirstPage = page === 0;
    const isLastPage = page === totalPages;

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
        // await fetch('http://localhost:8000/accounts/dj-rest-auth/registration/', {
        await fetch('https://jectam-backend.onrender.com/accounts/dj-rest-auth/registration/', {
            method: 'POST',
            // headers: {
            //   Accept: 'application/json',
            //   'Content-Type': 'multipart/form-data',
            // },
            body: formData
          })
        .then(res => {
          res.json()
          console.log(res)
        })
        .catch(error => {
          setError(error);
          console.error(error);
        });
        window.location.href = '/login'

        
    }


    const content = (
        <form onSubmit={handleSubmit} action={<Link to="/login" />} className='new-project-form' style={{width:"100%"}}> 

            <div className="button-container" style={{position: "relative"}}>
                <button type="button" className={`button ${prevHide}`} onClick={handlePrev} disabled={disablePrev} style={{visibility: isFirstPage ? "hidden" : "visible", float: "left" }}><IoChevronBack style={styleTwo} /> Prev</button>
                <button type="button" className={`button ${nextHide}`} onClick={handleNext} disabled={page === totalPages} style={{ visibility: isLastPage ? "hidden" : "visible", float: "right"}}>Next <IoChevronForward style={styleTwo} /></button>
            </div>
            <br></br>
            <h5 style={{ width:"100%",border: "2px dashed gray", borderRadius:"5px", background:"gainsboro",  padding: "1em"}}>{title[page]}<small style={{opacity: "0.5", float: "right", fontSize: "1.2em", verticalAlign:"middle"}}>{page + 1}/{totalPages+1}</small></h5>

            {error && <div className="errorMessage"><small><BiSolidErrorAlt style={style} /> {error}</small></div>}
            <AuthFormList />
            {isLastPage && <OverlayBtn type="submit" className={`button ${submitHide}`} disabled={!canSubmit}>Submit</OverlayBtn>}
            {/* <small>Already signed up?<a href='/login' style={{textDecoration: "underline"}}>Login</a></small><br></br> */}
        </form>
    )

    return content
}
export default AuthForm