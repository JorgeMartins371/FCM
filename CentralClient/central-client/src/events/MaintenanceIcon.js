import { FiTool } from "react-icons/fi";
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const MaintenanceIcon = () => {

      return(
        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Under Maintenance!</Tooltip>}>
            <span className="d-inline-block">
            <FiTool style={{color : 'orange'}}/>
            </span>
        </OverlayTrigger>
      );
}

export default MaintenanceIcon
