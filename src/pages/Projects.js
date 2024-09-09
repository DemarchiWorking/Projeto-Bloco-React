import { useEffect, useState } from 'react';
import LinkButton from '../components/LinkButton';
import { useLocation } from 'react-router-dom';
import Message from '../components/Message';
import ProjectCard from '../components/ProjectCard';
import styles from './Projects.module.css';
import Loading from '../layout/Loading';
function Projects(){
    const [projects, setProjects ] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false);  
    const [projectMessage, setProjectMessage]  = useState('');
    const location = useLocation();
    let message = '';
    if(location.state){
        message = location.state.message;
    }

    useEffect(()=> {
        setTimeout(
            () => {
                fetch("http://localhost:8080/project/", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    setProjects(data);
                    setRemoveLoading(true);
                })
                .catch((err) => console.log(err))
                
                }, 500) 
        }, [])

        function removeProject(id){
            fetch(`http://localhost:8080/main/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(
                resp => resp.json
            ).then(() => {
                setProjects(projects.filter((project) => project.id !== id))
                setProjectMessage("Projeto removido com sucesso!")
            }).catch(err => console.log(err))
        }
    return (
        <div className={styles.project_container }>
            <div className={styles.container}>
                <div className={styles.title_container}>
                <h1> Meus  Projetos </h1>

          
                <LinkButton to='newProject' text="Criar Projeto"></LinkButton>
                {message &&   <Message msg="Sucesso" type="sucess"/> }             
                {projectMessage &&   <Message msg={projectMessage} type="error"/> }
                </div>
            </div>      

            {              
                projects.map((project) => 
                <ProjectCard 
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        description={project.description}
                        key={project.id}
                        handleRemove={removeProject}
                        proceeding={project.proceeding}
                        />)
            }
            {!removeLoading && <Loading/>}
            {removeLoading && projects.length === 0 && (
                    <p> Não há projetos cadastrados.</p>
            )}
        </div>
    )
}
export default Projects