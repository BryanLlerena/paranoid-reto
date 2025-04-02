import React, { useEffect, useState } from "react";
import mqtt, { MqttClient } from "mqtt";
import ModelLoader from "../../components/scene"
import "./styles.scss"

const Home: React.FC = () => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [messages, setMessages] = useState<{ topic: string; message: string }[]>([]);
  const [waterLevel, setWaterLevel] = useState(0);

  const waterLevelText = () => {
    if (waterLevel < 20) {
      return "Tanque vació"
    } else if (waterLevel >= 80) {
      return "Tanque por desbordar"
    } else {
      return "Tanque normal"
    }
  }

  useEffect(() => {
    const options: mqtt.IClientOptions = {
      username: "test",
      password: "test123",
      protocol: "ws",
    };

    const mqttClient = mqtt.connect("ws://paranoid.lat:8083/mqtt", options);
    setClient(mqttClient);

    mqttClient.on("connect", () => {
      console.log("Conectado a MQTT");
      mqttClient.subscribe("planta/agua/tanque1", (err) => {
        if (!err) {
          console.log("planta/agua/tanque1");
        } else {
          console.error("Error al suscribirse:", err);
        }
      });
    });

    mqttClient.on("message", (topic: string, message: Buffer) => {
      const msg = message.toString();
      console.log(`Mensaje recibido en ${topic}: ${msg}`);
      setMessages((prevMessages) => [...prevMessages, { topic, message: msg }]);
    });

    mqttClient.on("error", (err) => {
      console.error("Error de conexión MQTT:", err);
    });

    return () => {
      mqttClient.end();
      console.log("Desconectado de MQTT");
    };
  }, []);

  // Función para enviar un mensaje
  const sendMessage = () => {
    if (client) {
      const message = `Datos actualizados ${new Date().toLocaleTimeString()}`;
      client.publish("planta/agua/tanque1", message);
      console.log("Mensaje enviado:", message);
    }
  };

  return (
    <div className="home--container">
      <div className="work-space--container">
        <div>
          <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={waterLevel}
              onChange={(e) => setWaterLevel(parseFloat(e.target.value))}
          />
          <span> Nivel de agua: {waterLevel}% </span>
        </div>
        <ModelLoader waterLevel={waterLevel}/>
      </div>
      
      <div className="mqtt-client--container">
        <h3>Nivel de Agua: {waterLevelText()} </h3>
        <h3>Mensajes Recibidos:</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.topic}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home