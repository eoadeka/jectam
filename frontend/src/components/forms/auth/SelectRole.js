import useFormContext from "../../../hooks/useFormContext";
import { Select, Label } from "../FormElement";

const SelectRole = () => {

    const { data, handleChange } = useFormContext()
    const options =[
        [ "Default", "Default" ], 
        [ "Project Manager", "Project Manager" ], 
        [ "Product Manager", "Product Manager" ],
        [ "Frontend Engineer", "Frontend Engineer" ],
        [ "Backend Engineer", "Backend Engineer" ],
        [ "Designer", "Designer" ],
        [ "QA Tester", "QA Tester" ],
        [ "DevOps Engineer", "DevOps Engineer" ],
    ]

    const content = (
        <div>
            {/* <h2>Select Role</h2> */}
            <p>Select your role in your organisation</p>
            {/* <Label htmlFor="id_roles">roles:</Label> */}
            <Select 
                name="role" 
                id="id_roles" 
                multiple
                value={data.role}
                onChange={handleChange}
            >
                {options.map(([text, value], i) => (
                    <option className='role-btn' value={value} defaultValue={value}>{text}</option>
                ))}
                {/* <option className='role-btn' value="default" selected>Default</option>
                <option className='role-btn' value="project_manager">Project Manager</option>
                <option className='role-btn' value="product_manager">Product Manager</option>
                <option className='role-btn' value="frontend_engineer">Frontend Engineer</option>
                <option className='role-btn' value="backend_engineer">Backend Engineer</option>
                <option className='role-btn' value="designer">Designer</option>
                <option className='role-btn' value="devops_engineer">DevOps Engineer</option>
                <option className='role-btn' value="qa_tester">QA Tester</option> */}
            </Select>
        </div>
    )

    return content
}
export default SelectRole;