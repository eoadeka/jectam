import useFormContext from "../../../hooks/useFormContext";
import { Select, Label } from "../FormElement";

const SelectRole = () => {

    const { data, handleChange } = useFormContext()
    const options =[
        [ "Default", "default" ], 
        [ "Project Manager", "project_manager" ], 
        [ "Product Manager", "product_manager" ],
        [ "Frontend Engineer", "frontend_engineer" ],
        [ "Backend Engineer", "backend_engineer" ],
        [ "Designer", "designer" ],
        [ "DevOps Engineer", "devops_engineer" ],
        [ "QA Tester", "qa_tester" ],
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