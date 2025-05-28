import { Thermometer, Droplets, Clock, Calendar } from "lucide-react"

interface CurrentConditionsProps {
  temperature?: string
  soilHumidity?: string
  lastIrrigation?: string
  nextEvent?: string
}

export default function CurrentConditionsCard({
  temperature = "24°C",
  soilHumidity = "65%",
  lastIrrigation = "Hoje, 08:30",
  nextEvent = "Amanhã, 14:00",
}: CurrentConditionsProps) {
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
        <span className="text-black font-semibold">{temperature}</span>
      </div>

      {/* Umidade do Solo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Droplets className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-black text-sm font-medium">Umidade do Solo</span>
        </div>
        <span className="text-black font-semibold">{soilHumidity}</span>
      </div>

      {/* Última Irrigação */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Clock className="w-4 h-4 text-gray-600" />
          </div>
          <span className="text-black text-sm font-medium">Última Irrigação</span>
        </div>
        <span className="text-black font-semibold">{lastIrrigation}</span>
      </div>

      {/* Próximo Evento */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Calendar className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-black text-sm font-medium">Próximo Evento</span>
        </div>
        <span className="text-black font-semibold">{nextEvent}</span>
      </div>
    </div>
  )
}
