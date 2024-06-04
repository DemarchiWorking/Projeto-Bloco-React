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
    const location = useLocation();
    let message = '';
    if(location.state){
        message = location.state.message;
    }

    useEffect(()=> {
        setTimeout(
            () => {
                fetch("http://localhost:8080/projeto", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((resp) => resp.json())
                .then((data) => {
                    setProjects(data);
                    setRemoveLoading(true);
                })
                .catch((err) => console.log(err))
                
                }, 500)
        }, [])
        function handleCategory(e) {
            console.log(projects);
        }
    return (
        <div className={styles.project_container }>
            <div className={styles.container}>
                <div className={styles.title_container}>
                <h1> Meus  Projetos </h1>

          
                <LinkButton to='newProject' text="Criar Projeto"></LinkButton>
                {message &&   <Message msg="Sucesso" type="sucess"/> }
                </div>
            </div>      

            {             projects.map((project) => 
                <ProjectCard 
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        description={project.description}
                        key={project.id}
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