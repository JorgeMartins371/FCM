import { FiTool } from "react-icons/fi";
import { useState } from 'react'

const MaintenanceIcon = () => {
    const [hover, setHover] = useState(false);
    const onHover = () => {
        setHover(true);
    };

    const onLeave = () => {
        setHover(false);
    };
    return (
        <div
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        role="button"
        tabIndex="-3"
        >
        {hover ? "hi" : <FiTool style={{color : 'orange'}}/> }
        </div>
    );
}

export default MaintenanceIcon
