import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

interface ITooltip {
  elementName: string,
  position: {
    x: number,
    y: number
  }
  children: React.ReactNode
}

const Tooltip = ({ elementName, children, position } : ITooltip) => {
  const [tooltip]

  const nameIdentifier = () => {
    switch (elementName) {
      case "Cylinder033":
        return "Pozo Natural"
      case "Cylinder033_3":
        return "Tanque de agua 1"
      case "Cylinder033_11":
        return "Tanque de agua 2"
      case "Cylinder033_10":
        return "Tanque de agua 3"
      case "Cylinder033_8":
        return "Pique"
      case "Cylinder033_9":
        return "Tanque de agua 3"
      default:
        return "";
    }
  }

  return (
    <div className="tooltip--container">
      <h2>{nameIdentifier()}</h2>
      <div
        className="tooltip"
        style={{
          position: "absolute",
          top: positon.y,
          left: position.x,
          background: "white",
          padding: "8px",
          borderRadius: "5px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        }}
      >
        {tooltip.text}
      </div>
    </div>
  )
}

export default Tooltip