import { useEffect, useState } from 'react';
import LinkButton from '../components/LinkButton';
import { useLocation } from 'react-router-dom';
import Message from '../components/Message';
import ProjectCard from '../components/ProjectCard';
import styles from './Projects.module.css';
function Projects(){
    const [projects, setProjects ] = useState([])
    
    const location = useLocation();
    let message = '';
    if(location.state){
        message = location.state.message;
    }

    useEffect(() => {
        fetch("http://localhost:8080/projeto", {
          method: 'get',
          headers: {
            'content-type': 'application/json',
          },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjects(data);
        })
        .catch((err) => console.log(err));
      }, []);
      
      useEffect(() => {
        console.log("aaaa"+projects);
      }, [projects]);
    
    return (
        <div className={styles.project_container }>
            <div className={styles.container}>
                <div className={styles.title_container}>
                <h1> Meus  Projetos </h1>

          
                <LinkButton to='newProject' text="Criar Projeto"></LinkButton>
                {message &&   <Message msg="Sucesso" type="sucess"/> }
                </div>
            </div>      



            <p> proojetos</p>

            { 
            projects.lenght > 0 && projects.map((project) => 
                <ProjectCard 
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        />)
            }

        </div>
    )
}
export default Projects