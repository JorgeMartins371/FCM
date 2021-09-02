import {Container} from 'react-bootstrap'
import DeleteConnection from './connections/DeleteConnection'

const StoredConnections = ({connections,title,remove}) => {

    let i=0

    return (
        <Container>
            <div className="row justify-content-md-center">
            <div className="card">
            <div className="card-body">
                
                <div className="row">
                    
                    <div className="col-md-12">
                        <h2 class="py-3 text-center font-bold font-up blue-text">{title}</h2>
                    </div>
                    
                </div>
                
                <table className="table table-hover table-responsive mb-0">
                    
                    <thead>
                        <tr>
                            <th scope="row">#</th>
                            <th className="th-lg"><a>ID</a></th>
                            <th className="th-lg"><a>IP</a></th>
                            <th className="th-lg"><a>Tool</a></th>
                            <th className="th-lg"><a>Server User</a></th>
                            {remove === true ? 
                            <th className="th-lg"><a>Delete Connection</a></th> :
                            <></>}
                        </tr>
                    </thead>

                    <tbody>
                        {connections.map(connection => {
                            i++
                            return(
                                <tr>
                                <th scope="row">{i}</th>
                                <td>{connection.id}</td>
                                <td>{connection.ip}</td>
                                <td>{connection.tool}</td>
                                <td>{connection.user}</td>
                                {remove!== undefined ? 
                                <td className="th-lg"><a>{<DeleteConnection connection={connection}/>}</a></td> :
                                <></>}
                                </tr>
                            )
                        })}
                    </tbody>
                    
                </table>         
            </div>
            </div>
            </div>  
        </Container>
    )
}

export default StoredConnections
