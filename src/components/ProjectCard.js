import styles from './ProjectCard.module.css';
import {BsPencil, BsFillTrashFill } from 'react-icons/bs';

function ProjectCard({id, name,budget, category, handleRemove}){
    return (
        <div> {name}
            <p>
                <span> Orçamento: </span> R${budget}
            </p>
            <p>
                <span> {category} </span>

            </p>
            <div> 
                <p>editar</p> 
                <p> remover </p>
            </div>
        </div>)
}

export default ProjectCard