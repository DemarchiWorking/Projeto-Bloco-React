import { useState } from 'react';
import Input from '../components/Input';
import styles from '../components/ProjectForm.module.css';
import SubmitButton from './SubmitButton';
function ServiceForm( {handleSubmit, btnText, projectData}) {

    const [service, setService] = useState({})
    const itenService = {};
        function submit(e) {
            e.preventDefault()
            fetch("http://localhost:8080/project", {
                method: "POST",
                headers: {
                  'Content-type': 'application/json',
                },
                body: JSON.stringify(service),
                })
                  .then((resp) => resp.json())
                  .then((data) => {
                    console.log(data);
                })
                .catch((err) => console.log(err))
              }
        
            

            //projectData.service.push(service)
            //handleSubmit(itenService)            
            console.log(itenService)
        }
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
                    name="coast"
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