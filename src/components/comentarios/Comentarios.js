import { useState, useEffect } from 'react'
import SubmitButton from '../SubmitButton'
import Input from '../Input'

function Comentario({id, nome, conteudo, date, handleStartEdit, handleDelete}) {
    return (
    <div className="comentario">
        <h3>{nome}</h3>
        <p>{conteudo}</p>
        <h6>Postado em {date}</h6>
        <div>
            <button onClick={() => handleStartEdit(id, nome, conteudo)}>Editar</button>
            <button onClick={() => handleDelete(id)}>Apagar</button>
        </div>
    </div>)
}

function CommentForm({secao_id, edit_id, handleEdit, handlePost}) {
    const [newcom, setNewcom] = useState({})
    function submit(e) {
        console.log(JSON.stringify(newcom))
        e.preventDefault()
        fetch("http://localhost:8081/" + (edit_id > -1 ? `comentarios/${edit_id}` : `secoes/${secao_id}/comentarios`), {
            method: edit_id > -1 ? "PUT" : "POST",
            headers: {
              'Content-type': 'application/json',
            },
            body: edit_id > -1 ? newcom.conteudo : JSON.stringify(newcom)
            })
            .then((resp) => {
                if (resp.status == 200) {
                    if (edit_id > -1) {
                        handleEdit(edit_id, newcom.conteudo)
                    }
                    else
                        handlePost()
                }
            })
            .catch((err) => console.log(err))
        }
    function handleChange(e){
        setNewcom({...newcom, [e.target.name]: e.target.value})
    }
    return (
        <form id="comment_form" onSubmit={submit} action="">
            <Input 
                type="text"
                text="Nome"
                name="nome"
                placeholder="Seu nome."
                handleOnChange={handleChange}
                />

            <Input 
                type="text"
                text="Conteudo"
                name="conteudo"
                placeholder="Escreva oque quiser aqui."
                handleOnChange={handleChange}
                />
           
            {edit_id < 0 && <SubmitButton text="Postar"/>}
            {edit_id > -1 && <SubmitButton text="Editar"/>}
        </form>
        
    )
}

function Comentarios({id}){
    const [comms, setComms ] = useState([])
    const [secao_id, setSecaoId ] = useState(-1)
    const [edit_id, setEditId] = useState(-1)
    function getComments() {
        setTimeout(
            () => {
                fetch(`http://localhost:8081/secoes/por_proj/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((resp) => { 
                    if (resp.status == 404)
                        fetch("http://localhost:8081/secoes", {
                            method:'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({id_projeto:id})
                        }).then(() => setTimeout(getComments, 500))
                        .catch( (err) => console.log(err) )
                    return resp.json()})
                .then((data) => {
                    setSecaoId(data.id)
                    setComms(data.comentarios);
                })
                .catch((err) => console.log(err))
                
                }, 1000)
    }

    useEffect(()=> { getComments() }, [])


    function deleteComment(_id) {
        fetch(`http://localhost:8081/comentarios/${_id}`, {
            method: "DELETE",
            headers: {
              'Content-type': 'application/json',
            },
            })
            .then((resp) => {
                if (resp.status == 200)
                    setComms(comms.filter( (com) => com.id != _id ))
            })
            .catch((err) => console.log(err))
    }
    function startEdit(id, nome, conteudo) {
        setEditId(id)
        document.querySelector("#comment_form #nome")
        document.querySelector("#comment_form #conteudo")
    }
    function editComment(_id, _conteudo) {
        setEditId(-1)
        setComms( comms.map( (com) => com.id == _id ? {...com, conteudo:_conteudo} : com )   )
    }
    function postComment() {
        setComms([])
        getComments()
    }
    return (
        <div>
            <h2>Comentarios({comms.length})</h2>
            {secao_id > -1 && 
            <CommentForm 
                secao_id={secao_id}
                edit_id={edit_id}
                handleEdit={editComment}
                handlePost={postComment}
            />
            }
            {comms.length > 0 &&
            comms.map((com) =>(
                <Comentario 
                    key={com.id}
                    id={com.id}
                    nome={com.nome}
                    conteudo={com.conteudo}
                    date={com.date}
                    handleDelete={deleteComment}
                    handleStartEdit={startEdit}
                    />
                ))
            }
            {
               comms.length < 1 && <p>Nenhum comentario encontrado</p>
            }
        </div>
    )
}

export default Comentarios