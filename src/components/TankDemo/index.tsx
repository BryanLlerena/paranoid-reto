import { useEffect, useState } from "react";
import ModelLoader from "../../components/scene/demo";
import TankController from "../TankController";
import "./styles.scss"
// icons
import { FaPowerOff } from "react-icons/fa";

interface Props {
  title: string,
  tankData?: {
    tank: number,
    status: boolean
  }
}

const TankDemo = ({ title }: Props) => {
  const [waterLevel, setWaterLevel] = useState([0,0,0,0]);

  return (
    <div className="tank-demo--container">
      <div>
        <h3>{title}</h3>
      </div>

      <div className="work-space--container">
        <ModelLoader waterLevel={waterLevel}/>
      </div>

      <div className="tank-controller">
        <TankController
          title="Tanque #1"
          tankNumber={1}
          currentLevels={waterLevel}
          setTankWaterLevel={setWaterLevel}
        />
        <TankController
          title="Tanque #2"
          tankNumber={2}
          currentLevels={waterLevel}
          setTankWaterLevel={setWaterLevel}
        />
        <TankController
          title="Tanque #3"
          tankNumber={3}
          currentLevels={waterLevel}
          setTankWaterLevel={setWaterLevel}
        />
        <TankController
          title="Tanque #4"
          tankNumber={4}
          currentLevels={waterLevel}
          setTankWaterLevel={setWaterLevel}
        />

        {/* <div className="button-controller">
          <button className="primary-button button-power" onClick={() => console.log(tankData.tank)}>
            <FaPowerOff color="#FFFFFF" size={30}/>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TankDemo