import { useEffect, useState } from 'react';
import Input from '../components/Input';
import Select from '../components/Select';
import SubmitButton from '../components/SubmitButton';
function ProjectForm({ handleSubmit, btnText, projectData}){
    const [projects, setProjects ] = useState([])

    useEffect(()=> {
        fetch("http://localhost:8761/project", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(resp => resp.json())
        .then((data) => {
            setProjects(data);
            console.log("aaaa")
            console.log(data)
        })
        .catch((err) =>console.log(err))
    }, [])

    return (
    <form>
     {projects}
     
       {// <Select name="category_id" 
        //        text="Selecione a categoria" 
        //        options={projects}
        //</form>        ></Select>
       }
    </form>)
}
export default ProjectForm