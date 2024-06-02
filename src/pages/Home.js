import LinkButton from '../components/LinkButton';
import styles from './Home.module.css';

function Home() {
    return (
      <section className={styles.home_container}>
        <h1> Bem-vindo ao <span> Projeto</span></h1> 
        <p> Gerencie sua lista de projetos! </p>
        <LinkButton to="/newProject" text="Criar Projeto" />
      </section>
    );
  }
  
  export default Home;