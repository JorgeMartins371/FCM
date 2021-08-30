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
                
                <div className="d-flex justify-content-center">
                
                    <nav className="my-4 pt-2">
                        <ul className="pagination pagination-circle pg-blue mb-0">
                            
                            <li className="page-item disabled clearfix d-none d-md-block"><a className="page-link">First</a></li>
                            
                            <li className="page-item disabled">
                                <a className="page-link" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                            </li>
                            
                            <li className="page-item active"><a className="page-link">1</a></li>
                            <li className="page-item"><a className="page-link">2</a></li>
                            <li className="page-item"><a className="page-link">3</a></li>
                            <li className="page-item"><a className="page-link">4</a></li>
                            <li className="page-item"><a className="page-link">5</a></li>
                            
                            <li className="page-item">
                                <a className="page-link" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                            </li>
                            
                            <li className="page-item clearfix d-none d-md-block"><a className="page-link">Last</a></li>
                        </ul>
                    </nav>
                    
                </div>
                
            </div>
            </div>
            </div>  
        </Container>
    )
}

export default StoredConnections
