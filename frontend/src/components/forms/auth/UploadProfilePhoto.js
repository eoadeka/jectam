import useFormContext from "../../../hooks/useFormContext";
import { Select } from "../FormElement";

const UploadProfilePhoto = () => {

    const { data, handleChange } = useFormContext()

    const content = (
        <div>
            {/* <h2>Upload profile photo</h2> */}
            <p>Choose from your gallery</p>
            <div className="box__input">
                <input 
                id='file' 
                type='file'
                name='profilePhoto'
                value={data.profilePhoto}
                onChange={handleChange}
                /><br></br>
                <label htmlFor="file"><strong>Choose a file</strong><span className="box__dragndrop"> or drag it here</span>.</label>
            </div>
                
            <p>1 profile photo required</p>
            <input style={{width:"100%", margin: "2em 0"}} type='submit' value="Submit" />
        </div>

    )

    return content
}
export default UploadProfilePhoto;