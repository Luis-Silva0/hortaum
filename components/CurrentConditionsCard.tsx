import { useEffect, useState } from "react";
import { Thermometer, Droplets, Clock, Calendar } from "lucide-react";

interface CurrentConditionsProps {
  nextEvent?: string;
}

export default function CurrentConditionsCard({
  nextEvent = "Amanhã, 14:00",
}: CurrentConditionsProps) {
  const [currentData, setCurrentData] = useState({
    temperature: "--°C",
    soilHumidity: "--%",
    lastIrrigation: "--",
    nextEvent: nextEvent,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // 🌤️ Open-Meteo para temperatura atual
        const weatherResponse = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=41.5454&longitude=-8.4265&current_weather=true"
        );
        const weatherData = await weatherResponse.json();
        const temp = weatherData.current_weather.temperature;

        // 🌱 Agromonitoring para umidade do solo
        const apiKey = "SUA_CHAVE_API"; // 🔑 Insira sua chave
        const polyId = "SEU_POLYID";    // 📐 Insira o ID do polígono
        const soilResponse = await fetch(
          `http://api.agromonitoring.com/agro/1.0/soil?polyid=${polyId}&appid=${apiKey}`
        );
        const soilData = await soilResponse.json();
        const soilMoisture = (soilData.moisture * 100).toFixed(2); // Converter para %

        // 🕒 Determinar última irrigação (simulação)
        const lastIrrigationTime =
          parseFloat(soilMoisture) < 30 ? "Hoje, 08:30" : "Ontem, 08:30";

        setCurrentData({
          temperature: `${temp}°C`,
          soilHumidity: `${soilMoisture}%`,
          lastIrrigation: lastIrrigationTime,
          nextEvent: nextEvent,
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      {/* Temperatura */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Thermometer className="w-4 h-4 text-orange-600" />
          </div>
          <span className="text-black text-sm font-medium">Temperatura</span>
        </div>
        <span className="text-black font-semibold">{currentData.temperature}</span>
      </div>

      {/* Umidade do Solo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Droplets className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-black text-sm font-medium">Umidade do Solo</span>
        </div>
        <span className="text-black font-semibold">{currentData.soilHumidity}</span>
      </div>

      {/* Última Irrigação */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Clock className="w-4 h-4 text-gray-600" />
          </div>
          <span className="text-black text-sm font-medium">Última Irrigação</span>
        </div>
        <span className="text-black font-semibold">{currentData.lastIrrigation}</span>
      </div>

      {/* Próximo Evento */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Calendar className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-black text-sm font-medium">Próximo Evento</span>
        </div>
        <span className="text-black font-semibold">{currentData.nextEvent}</span>
      </div>
    </div>
  );
}
