import { useEffect, useState } from 'react';
import Loading from '../layout/Loading';
import styles from './Historico.module.css';

function HistoricoCard({data, op, tipo, novo, velho}) {
    return (
        <tr>
            <td>{data}</td>
            <td>{op}</td>
            <td>{tipo}</td>
            <td>{velho}</td>
            <td>{novo}</td>
        </tr>
    )
}

function Historicos() {
    const [ops, setOps ] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false);  

    useEffect(()=> {
        setTimeout(
            () => {
                fetch("http://localhost:8761/historico", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((resp) => resp.json())
                .then((data) => {
                    setOps(data);
                    setRemoveLoading(true);
                })
                .catch((err) => console.log(err))
                
                }, 500)
        }, [])


    return (
      <div className={styles.container}>
        <div className={styles.title_container}>
            <h1> Histórico de Dados </h1>
        </div>
        <table className={styles.tabela}>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Operação</th>
                    <th>Tipo</th>
                    <th>Velho</th>
                    <th>Novo</th>
                </tr>
            </thead>

            <tbody>
                {              
                    ops.map((_op) => 
                    <HistoricoCard 
                        data={_op.data}
                        op={_op.operacao}
                        tipo={_op.tipo_dado}
                        novo={_op.valor_novo}
                        velho={_op.valor_velho}
                            />)
                }
            </tbody>
        </table>
        {!removeLoading && <Loading/>}
        {removeLoading && ops.length === 0 && (
                <p>Não houve nenhuma operação até agora</p>
        )}
      </div>
    );
  }
  
  export default Historicos;