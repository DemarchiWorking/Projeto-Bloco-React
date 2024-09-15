export function saveSession(aluno) {
    sessionStorage.setItem("aluno_login", JSON.stringify( aluno ));
}

export function loadSession() {
    let aluno = sessionStorage.getItem( "aluno_login" )
    if (aluno != null)
        return JSON.parse( sessionStorage.getItem( "aluno_login" ) );
    return null
}

export function logout(e) {
    e.preventDefault()
    sessionStorage.removeItem("aluno_login")
    window.location.reload()
}

export function canManipulateProject(proj_id) {
    if (isLoggedIn()) {
        const aluno = loadSession()
        return aluno.rank == "ADMIN" || aluno.projetos_id.find( (proj) => proj_id == proj ) != undefined
    }
    return false
} 

export function canManipulateProjectTest(proj_name) {
    if (isLoggedIn()) {
        const aluno = loadSession()
        const matches = proj_name.match( new RegExp(/\((\w+)\[(\d+)\]\)$/gm) )
        return aluno.rank == "ADMIN"  || matches[0] == `(${aluno.nome}[${aluno.id}])`
    }
    return false
}

export function reloadData(href="") {
    setTimeout(
        () => {
            fetch("http://localhost:8080/aluno/id/" + loadSession().id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                if (data != null) {
                    saveSession(data)
                    if (href.length > 1)
                        window.location.href = href
                    else
                        window.location.reload()
                }
            })
            .catch((err) => console.log(err))
            
    }, 500) 
}

export function isLoggedIn() {
    return loadSession() != null
}
