import React, { useEffect, useState } from "react";
import ModelLoader from "../../components/scene";
import TankDemo from "../../components/TankDemo"
import "./styles.scss"

const Tank: React.FC = () => {
  const [tankStatus, setTankStatus] = useState([
    {tank: 1, status: true},
    {tank: 2, status: false},
    {tank: 3, status: false},
    {tank: 4, status: false}
  ])

  useEffect(() => {

  }, [tankStatus])

  return (
    <div className="tank-page--container">
      <TankDemo title="Deposito 1" tankStatus={tankStatus[1]}/>
    </div>
  );
};

export default Tank