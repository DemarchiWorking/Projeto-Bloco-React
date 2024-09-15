import { HttpStatusCode } from 'axios';
import { loadSession, reloadData } from '../components/alunos/AlunoSession';
import ProjectForm from '../components/ProjectForm';
import styles from './NewProject.module.css';
//import { useHistory } from  'react-router-dom';

function NewProject({}) {
  //  const history = useHistory()

    function createPost(project){
      // initialize cost and services
      //project.cost = 0
      //project.services = []
      project.id = window.crypto.getRandomValues( new Uint32Array(10))[0]
      console.log(project)
      fetch("http://localhost:8080/main/", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(project)
        })
          .then((resp) => {
            console.log(resp.status)
            if (resp.status == HttpStatusCode.Ok) {
              setTimeout(() => {fetch("http://localhost:8080/aluno" + `/${loadSession().id}/projetos/${project.id}`, {
                method: "POST",
                headers: {
                  'Content-type': 'application/json',
                }
              })
                .then((resp) => {
                  console.log(resp.status)
                  if (resp.status == HttpStatusCode.Ok) {
                    reloadData("http://localhost:3000/projects")
                  }
                })
                .catch((err) => console.log(err))}, 2500)
            }
        })
        .catch((err) => console.log(err))
      }
      

    

    return (
      <div className={styles.newproject_container}>
        <h1> Criar Projeto </h1>
        <p> Adicione seu projeto na lista.</p>
        <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
      </div>
    );
  }
  
  export default NewProject;