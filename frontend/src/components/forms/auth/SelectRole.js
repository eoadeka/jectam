import useFormContext from "../../../hooks/useFormContext";
import { Select } from "../FormElement";

const SelectRole = () => {

    const { data, handleChange } = useFormContext()

    const content = (
        <div>
            {/* <h2>Select Role</h2> */}
            <p>Select your role in your organisation</p>
            <Select 
                name="roles" 
                id="id_roles" 
                multiple
                value={data.role}
                onChange={handleChange}
            >
                <option className='role-btn' value="project_manager">Project Manager</option>
                <option className='role-btn' value="product_manager">Product Manager</option>
                <option className='role-btn' value="frontend_developer">Frontend Engineer</option>
                <option className='role-btn' value="backend_developer">Backend Engineer</option>
                <option className='role-btn' value="designer">Designer</option>
                <option className='role-btn' value="devops_engineer">DevOps Engineer</option>
                <option className='role-btn' value="qa_tester">QA Tester</option>
            </Select>
        </div>
    )

    return content
}
export default SelectRole;