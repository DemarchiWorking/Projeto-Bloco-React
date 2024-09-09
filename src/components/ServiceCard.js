import { BsFillTrashFill } from 'react-icons/bs'
import styles from '../components/ProjectCard.module.css'

function ServiceCard({id, name, cost, description, handleRemove}){
    const remove = (e) => {
        e.preventDefault();
        console.log(`http://localhost:8080/service/${id}`)
        fetch(`http://localhost:8080/service/${id}`, {
            method: "DELETE",
            headers: {
              'Content-type': 'application/json',
            },
            })
              .then((resp) => resp.json())
              .then((data) => {
                console.log(data);
            })
            .catch((err) => console.log(err))
            window.location="http://localhost:3000/projects"
    }
    

    return (
         <div className={styles.project_card}>
            <h4> {name} </h4>
            <p>
                <span> Custo  : </span> {cost}
            </p>
            <p>{description}</p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill/>
                    Excluir
                </button>
            </div>
         </div>
    )
}
export default ServiceCard