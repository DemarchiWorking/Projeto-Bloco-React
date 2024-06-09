import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading';
import ServiceForm from '../components/ServiceForm'
import { parse, v4 as uuidv4} from 'uuid';
import ServiceCard from '../components/ServiceCard';
import ProjectForm from '../components/ProjectForm';
function Project(){
    const { id } = useParams();
    console.log(id);

    const [projectCost, setProjectCost] = useState(0)
    const [project, setProject] = useState([])
    const [service, setService] = useState([])
    const [showProjectForm, setShowProjectForm]= useState(false)
    const [showServiceForm, setShowServiceForm]= useState(false)
    useEffect(()=> {
        setTimeout(() => {
        console.log(`http://localhost:8080/project/${id}`)  
        fetch(`http://localhost:8080/project/${id}`, {
            method: 'GET',
            headers:{ 
                'Content-Type': 'application/json'
            }, 
        }) 
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
            }) 
            .catch(err => console.log)
    },400)
    }, [id])
    
    useEffect(()=> {
        setTimeout(() => {
        fetch(`http://localhost:8080/service/project/${id}`, {
            method: 'GET',
            headers:{ 
                'Content-Type': 'application/json'
            }, 
        }) 
            .then((resp) => resp.json())
            .then((data) => {
                setService(data)
                var cost = 0
                data.forEach(element => {
                     cost += element.cost;
                });
                setProjectCost(cost)
                setShowServiceForm(false)
            }) 
            .catch(err => console.log)
    },400)
    }, [id])
    
    function editPost(project){
        console.log(project)
        //bdgt
        if(project.budget < projectCost.projectCost){
            //mensagem
        }
        fetch(`http://localhost:8080/project/${project.id}`,
            {
                method:'PATCH',
                headers:{
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(project),
            })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false);
            // mensagem
            })
            .catch(err => console.log(err))

    }
    function createService(service){
        const lastService = service;
        
    }
    function removeService(){

    }
    function togglePeojectForm(){
        setShowProjectForm(!showProjectForm);
    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm);
    }
    return (
        <> 
        {project.name ? (
            <div className={styles.project_details}> 
                <div className={styles.details_container}>
                    <h1> Projeto: {project.name}</h1>
                    <button className={styles.btn} onClick={togglePeojectForm} >
                        {!showProjectForm ? 'Editar Projeto':'Fechar' }
                    </button>
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <br></br>
                            <p>
                                <span> Descrição: </span> {project.description}
                            </p>
                            <p>
                                <span> Total de Orçameto:</span> R${project.budget}
                            </p>
                            <p>
                                <span> Total : </span> R${projectCost}
                            </p>
                        </div>
                    )   :
                    (
                        <div className={styles.project_info}>
                            <ProjectForm handleSubmit={editPost} 
                            btnText="Concluir edição" 
                            projectData={project}/>
                        </div>
                    )}
                </div>
                <div className={styles.service_form_container}>
                    <h2> Adicione um Serviço </h2>


                    <button className={styles.btn} onClick={toggleServiceForm} >
                        {!showProjectForm ? 'Adicionar Serviço':'Fechar' }
                    </button>
                    <div className={styles.project_info}>
                        {showServiceForm && (
                            <ServiceForm
                                handleSubmit={createService}
                                btnText="Adicionar Serviço"
                                projectData={project}/>
                        )}
                    </div>
                </div>
                <h2>Serviços</h2>
                <div>
                    {service.length > 0 &&
                        service.map((service) =>(
                            <ServiceCard
                                id={service.id}
                                name={service.name}
                                cost={service.cost}
                                description={service.description}
                                key={service.id}
                                handleRemove={removeService}
                            />
                        ))
                    }
                    {
                        service.length ===0 && <p> Não há serviços cadastrados. </p>
                    }
                </div>
            </div>
        ): (
        
            <Loading/>
        )}
        </>
    )
    
}
export default Project