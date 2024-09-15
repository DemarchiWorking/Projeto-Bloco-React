import { useEffect, useState } from 'react';
import Input from '../Input';
import styles from '../ProjectForm.module.css';
import SubmitButton from '../SubmitButton';
function AlunoLogin({ handleSubmit, loginData }){

    const[aluno, setAluno] = useState(loginData || {});

    function handleChange(e) {
        setAluno({...aluno, [e.target.name] : e.target.value})
        console.log(aluno);
    }

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(aluno)
    }
    return (
    <form onSubmit={submit} className={styles.form} >
        <div>
            <Input type="text" 
            text="Nome" 
            name="nome" 
            placeholder="Seu nome"
            handleOnChange={handleChange}
            value={aluno.nome ? aluno.nome : ''}
            />
        </div>
        <div>
            <Input type="password" 
                text="Senha" 
                name="senha" 
                placeholder="Sua senha"
                handleOnChange={handleChange}
                value={aluno.senha ? aluno.senha : ''}
                />
        </div>
        <div>
            <SubmitButton text={"Fazer Login"}/>
        </div>
    </form>)
}
export default AlunoLogin