import styles from './ProjectCard.module.css';
import {BsPencil, BsFillTrashFill } from 'react-icons/bs';

function ProjectCard({id, name,budget, description, category, handleRemove}){
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
            <div className={styles.project_card_actions}> 
                <a href= ""> <BsPencil/><p> Editar</p> </a> 
                <a href= ""> <BsFillTrashFill/><p> Remover </p></a>
            </div>
        </div>)
}

export default ProjectCard