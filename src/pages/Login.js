import { HttpStatusCode } from 'axios';
import AlunoLogin from '../components/alunos/AlunoLogin';
import { saveSession } from '../components/alunos/AlunoSession';
import styles from './Login.module.css';
import { useState } from 'react';

function Login({}) {
    const [logstatus, setLogstatus] = useState("");  
    function createPost(aluno){

      fetch("http://localhost:8080/aluno/login", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(aluno)
        })
          .then((resp) => {
            if (resp.status == HttpStatusCode.Ok )
                return resp.json()
            else {
                return null
            }
          })
          .then((data) => {
            if (data != null) {
                setLogstatus("Login efetuado com sucesso!")
                saveSession(data)
                window.location.href = "http://localhost:3000/projects"
            } else
                setLogstatus("Senha ou nome invalido!")
        })
        .catch((err) => setLogstatus("Ocorreu um erro!"))
      }

    return (
      <div className={styles.newproject_container}>
        <h1> Login </h1>
        <p> Entre na sua conta de aluno INFNET. </p><br></br>
        <span>{logstatus}</span>
        <AlunoLogin handleSubmit={createPost}/>
      </div>
    );
  }
  
  export default Login;