import { useState } from 'react';
import Input from '../components/Input';
import styles from '../components/ProjectForm.module.css';
import SubmitButton from './SubmitButton';
function ServiceForm( {handleSubmit, btnText, projectData}) {

    const [service, setService] = useState({})
    const itenService = {};
        function submit(e) {
            var objetoPost = service;
            objetoPost.projectId = projectData.id;
            e.preventDefault()
            console.log(JSON.stringify(objetoPost))
            fetch(`http://localhost:8761/service`, {
                method: "POST",
                headers: {
                  'Content-type': 'application/json',
                },
                body: JSON.stringify(service),
                })
                  .then((resp) => resp.json())
                  .then((data) => {
                    console.log(data);
                    window.location= "http://localhost:3000/projects"
                })
                .catch((err) => console.log(err))
            }
            //projectData.service.push(service)
            //handleSubmit(itenService)            
            //console.log(itenService)
        
    
        function handleChange(e){
            setService({...service, [e.target.name]: e.target.value})
        }
        return (
            <form onSubmit={submit} className={styles.form} action="">
                <Input 
                    type="text"
                    text="Nome do Serviço"
                    name="name"
                    placeholder="Insira o nome do serviço"
                    handleOnChange={handleChange}
                    />

                <Input 
                    type="number"
                    text="Custo do serviço"
                    name="cost"
                    placeholder="Insira o valor total"
                    handleOnChange={handleChange}
                    />
                <Input 
                        type="text"
                        text="Descrição do Serviço"
                        name="description"
                        placeholder="Descreva o serviço"
                        handleOnChange={handleChange}
                    />
               
                <SubmitButton text={btnText}/>
            </form>
            
        )
}
export default ServiceForm