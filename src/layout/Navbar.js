import styles from './Navbar.module.css'

function Navbar(){

    return (
    <nav className={styles.navbar}>
        <a href=''>
            <img className='img' src='https://faculdadeinfnet.com.br/wp-content/uploads/sites/10/2023/08/Artboard-2.png'></img>
        </a>
        <ul className={styles.list}>
        <li className={styles.item}> <a href="/"> Home </a></li>
        <li className={styles.item}><a href="/projects"> Projetos </a></li>
        <li className={styles.item}><a href="/company">Empresa</a></li>
        <li className={styles.item}><a href="/contact"> Contato </a></li>
        <li className={styles.item}><a href="/newProject"> Novo Projeto </a></li>
		<li className={styles.item}><a href="/historico"> Histórico </a></li>

        </ul>

    </nav> 
    )
}
export default Navbar