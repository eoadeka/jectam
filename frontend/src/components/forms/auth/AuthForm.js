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

    const handleSubmit = e => {
        e.preventDefault()
        console.log(JSON.stringify(data));
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