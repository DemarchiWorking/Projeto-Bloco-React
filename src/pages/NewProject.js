import ProjectForm from '../components/ProjectForm';
import styles from './NewProject.module.css';
//import { useHistory } from  'react-router-dom';

function NewProject({}) {
  //  const history = useHistory()

    function createPost(project){
      // initialize cost and services
      //project.cost = 0
      //project.services = []

      fetch("http://localhost:8080/main/", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(project),
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
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