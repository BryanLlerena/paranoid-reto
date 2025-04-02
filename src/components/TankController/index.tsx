import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./styles.scss"
import { FaPowerOff, FaWater } from "react-icons/fa";

interface ITankControllerProps {
  currentLevels: number[],
  setTankWaterLevel: Dispatch<SetStateAction<number[]>>,
  tankNumber: number,
  title: string
}

const TankController = ({ currentLevels, setTankWaterLevel, tankNumber, title } : ITankControllerProps) => {
    const [waterLevel, setWaterLevel] = useState(0)

    const onWaterRefill = () => {
      const interval = setInterval(() => {
        setTankWaterLevel(prev => {
          if(tankNumber === 1 && prev[tankNumber-1] < 80){
            const levels = prev
            levels[tankNumber - 1] = levels[tankNumber - 1] + 1
            return [...levels];
          }
          if (prev[tankNumber-1] < 80 && prev[tankNumber-2] > 0 && tankNumber > 1 ) {
            const levels = prev
            levels[tankNumber - 1] = levels[tankNumber - 1] + 1
            levels[tankNumber - 2] = levels[tankNumber - 2] - 1
            return [...levels];
          }
          clearInterval(interval);
          return prev;
        });
      }, 100)
    }

    const onSlideChange = (e : number) => {
      if(e > currentLevels[tankNumber-1] && tankNumber > 1){
        if(currentLevels[tankNumber-2] > 0){
          const newLevels = currentLevels
          newLevels[tankNumber-2] = newLevels[tankNumber-2] + newLevels[tankNumber-1] - e
          newLevels[tankNumber-1] = e
          setTankWaterLevel([...newLevels])
          setWaterLevel(e)
        }
      } else {
        const newLevels = currentLevels
        newLevels[tankNumber-1] = e
        setTankWaterLevel([...newLevels])
        setWaterLevel(e)
      }
    }

    useEffect(() => {
      if(waterLevel !== currentLevels[tankNumber-1]){
        setWaterLevel(currentLevels[tankNumber-1])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentLevels[tankNumber-1]])

    // useEffect(() => {
    //   if(tankNumber > 1){
    //     if(currentLevels[tankNumber-2] > 0){
    //       const levels = currentLevels
    //       levels[tankNumber-1] = waterLevel
    //       levels[tankNumber-2] = levels[tankNumber-2] - 1
    //       setTankWaterLevel([...levels])
    //     }
    //   } else {
    //     const levels = currentLevels
    //     levels[tankNumber-1] = waterLevel
    //     setTankWaterLevel([...levels])
    //   }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [waterLevel])

    // useEffect(() => {
    //   if(currentLevels[tankNumber-1] === waterLevel){
    //     setWaterLevel(currentLevels[tankNumber-1])
    //   }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[currentLevels[tankNumber-1]])

  return(
    <div className="tank-controller--container">
      <h4>{title}</h4>
      <div>
        <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={waterLevel}
            onChange={(e) => onSlideChange(parseFloat(e.target.value))}
        />
        <span> Nivel de agua: {waterLevel}% </span>
      </div>

      <h4>Bomba #{tankNumber}</h4>
      <div className="tank-controller-buttons--container">
        <button className="primary-button button-power" title="apagado de la bomba" onClick={() => console.log("click")}>
          <FaPowerOff color="#FFFFFF" size={30}/>
        </button>
        <button className="primary-button button-power" title="llenar" onClick={() => onWaterRefill()}>
          <FaWater color="#FFFFFF" size={30}/>
        </button>
      </div>
    </div>
  )
}

export default TankController