import { useEffect, useState } from 'react';
import Input from './Input';
import styles from './ProjectForm.module.css';
import Select from './Select';
import SubmitButton from './SubmitButton';
function ProjectForm({ handleSubmit, btnText, projectData}){

    const[categories, setCategories] = useState([]);
    const[project, setProject] = useState(projectData || {});
    useEffect(()=> {
        fetch("http://localhost:8080/categoria", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(resp => resp.json())
        .then((data) => {
            setCategories(data);
        })
        .catch((err) =>console.log(err))
    }, [])

    function handleChange(e) {
        setProject({...project, [e.target.name] : e.target.value})
        console.log(project);
    }
    function handleCategory(e) {
        setProject({...project, 
            category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
            },
        })
        console.log(project);
    }

    const submit = (e) => {
        e.preventDefault()
        console.log(project)
        //handleSubmit(project)
    }
    return (
    <form onSubmit={submit} className={styles.form} >
        <div>
            <Input type="text" 
            text="name" 
            name="name" 
            placeholder="Informe o nome do projeto"
            handleOnChange={handleChange}
            value={project.name ? project.name : ''}
            />
        </div>
        <div>
            <Input type="number"
                text="budget" 
                name="budget" 
                placeholder="Insira o orçamento do projeto"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''} 
            />
        </div>
        <div>
            <Input type="text" 
                text="description" 
                name="description" 
                placeholder="Insira a descrição do projeto"
                handleOnChange={handleChange}
                value={project.description ? project.description : ''}
                />
        </div>
        <div>
        <Select name="category_id" 
                text="Selecione a categoria" 
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
                >

        </Select>
        </div>
        <div>
            <SubmitButton text={btnText}/>
        </div>
    </form>)
}
export default ProjectForm