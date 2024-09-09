import styles from './ProjectCard.module.css';
import {BsPencil, BsFillTrashFill } from 'react-icons/bs';

function ProjectCard({id, name,budget, description, category, handleRemove, proceeding}){

    const remove = (e) => {
        e.preventDefault()
        console.log(id);
        handleRemove(id)
    }
    return (
        <div className={styles.project_card}> 
        
            <h4> {name} </h4> 
             <p>
                <span> Orçamento: </span> R$ {budget}
            </p>
            <p>
                <span> Descrição: </span> {description}
            </p>
            <p>
                <span> {category} </span>

            </p>
            <p>
                <span>{proceeding.replace("_", " ")}</span>
            </p>
            <div className={styles.project_card_actions}> 
                <a href={`/project/${id}`}><p> Visualizar</p> </a> 
                <button onClick={remove}><BsFillTrashFill/><p> Remover </p></button>
            </div>
        </div>)
}

export default ProjectCard