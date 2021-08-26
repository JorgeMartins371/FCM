import { useState, useContext, useEffect } from 'react'
import {Button, Modal, Form, Row, Col, Container} from 'react-bootstrap'
import { fetchData } from '../../utils/Fetcher';
import GlobalState from '../../utils/GlobalState';

const AddConnectionUser = ({allCons,userCons,user}) => {

    const [state, setState] = useContext(GlobalState);
    const [show, setShow] = useState(false)
    const [cons, setCons] = useState([])
    const [update, setUpdate] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    var notIncludedCons = []
    let containsID = false
    console.log(user)

    useEffect(() => {
        if(update){
            setCons([])
            setUpdate(false)
        } 
     },[update])

    //Filter connections associated with User
    const a = allCons.map(con => {
        userCons.map(userCon => {
            if(con.id == userCon.id) containsID = true
        })
        if(!containsID) notIncludedCons = [...notIncludedCons,con]
        else containsID=false
    })

    const handleSubmit = e => {

        e.preventDefault()

        let payload = {
            cons
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        const resp = fetchData('http://localhost:8080/connections/'+user.name,options)
           .then(res => {
              console.log(res)
              alert('Success')
           })

        setUpdate(true)
        handleClose()
    }

    const handleAddCon = (e) => {
        var index = cons.indexOf(e.target.id);
        if(index > -1){
            console.log(cons)
            setCons(cons => cons.filter(con => con == e.target.id))
        }
        else{
            setCons([...cons,e.target.id])
        }
    }

    return (
        <Container>
        <Button variant="success" onClick={handleShow}>
            Add Connections
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add Connections</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Col} className="mb-3" controlId="AddCon" Key="Add">
                        <Col sm={10}>
                        {notIncludedCons.map(con => {
                            return(
                                <Form.Check 
                                type="radio" 
                                label={con.id}
                                name ="checkbox" 
                                onChange={handleAddCon} 
                                id={con.id}/>
                            )
                        })}
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>
    </Container>
    )
}

export default AddConnectionUser
