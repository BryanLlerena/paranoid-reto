import ModelLoader from "../../components/scene/demo";
import "./styles.scss"
// icons

const TankDemo = () => {

  return (
    <div className="tank-demo--container">
      <div>
        <h3>Diagrama</h3>
      </div>

      <div className="work-space--container">
        <ModelLoader/>
      </div>
    </div>
  );
};

export default TankDemo