import styles from './LinkButton.module.css';

function LinkButton({to, text}){
    return (
        <>
            <a href={to} className={styles.btn}>
                {text}
            </a>
        </>
    )
}
export default LinkButton