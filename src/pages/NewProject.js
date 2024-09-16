import { HttpStatusCode } from 'axios';
import { loadSession, reloadData } from '../components/alunos/AlunoSession';
import ProjectForm from '../components/ProjectForm';
import styles from './NewProject.module.css';
import Loading from '../layout/Loading';
import { useState } from 'react';
//import { useHistory } from  'react-router-dom';

function NewProject({}) {
  //  const history = useHistory()
    const [loading, setLoading] = useState(false);  
    function createPost(project){
      // initialize cost and services
      //project.cost = 0
      //project.services = []
      setLoading(true)
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
                .catch((err) => {console.log(err); setLoading(false)})}, 2500)
            }
        })
        .catch((err) => {console.log(err); setLoading(false)})
      }
      

    

    return (
      <div className={styles.newproject_container}>
        <h1> Criar Projeto </h1>
        <p> Adicione seu projeto na lista.</p>
        <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        {loading ? <Loading/> : ""}
      </div>
    );
  }
  
  export default NewProject;