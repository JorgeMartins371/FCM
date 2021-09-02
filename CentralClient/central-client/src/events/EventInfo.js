import { useEffect , useState, useContext  } from 'react'
import { BsInfoCircleFill } from "react-icons/bs"
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { fetchData } from '../utils/Fetcher'
import {Button, Modal, Container} from 'react-bootstrap'

const EventInfo = ({conId,event}) => {

    const [triggerInfo, setTriggerInfo] = useState([])
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        let headers = new Headers({
            Accept: 'application/json',
            'Access-Control-Allow-Headers': 'Authorization',
        })
        let options = { headers }
        const a = fetchData('http://localhost:8080/'+conId+'/trigger/' + event.objectid, options)
            .then(res => {
                setTriggerInfo(res.data.result)
        })
    }, [])

    if(triggerInfo[0] !== undefined && triggerInfo[0].comments !== ""){
        return (
            <Container>
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Event info</Tooltip>}>
                <span className="d-inline-block">
                <BsInfoCircleFill as={Button} style={{color : 'blue'}} onClick={handleShow}/>
                </span>
                </OverlayTrigger>

                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Event Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>{triggerInfo[0].comments}</h5>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary">
                    Confirm
                </Button>
                </Modal.Footer>
                </Modal>
            </Container>
        )
    }
    else{
        return(
            <Container>
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">No info to show</Tooltip>}>
                <span className="d-inline-block">
                <BsInfoCircleFill style={{color : 'gray'}}/>
                </span>
            </OverlayTrigger>
            </Container>
            
        )
    }
    
}

export default EventInfo
