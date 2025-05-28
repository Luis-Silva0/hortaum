"use client"
import { Card, CardBody, CardHeader } from "@heroui/react";
import CurrentConditionsCard from "@/components/CurrentConditionsCard";
import { ProduçãoMensalChart } from "./charts/ProduçãoMensalChart";
import { useEffect, useState } from "react";
import axios from "axios";
/*
async function getQuantity(createdAfter: Date | null, createdBefore: Date | null) {
  const client = await clientPromise
  const db = client.db()
  const orders = db.collection("order")

  const createdAtQuery: Record<string, any> = {}
  if (createdAfter) createdAtQuery["$gte"] = createdAfter
  if (createdBefore) createdAtQuery["$lte"] = createdBefore

  const [aggregateResult, chartData] = await Promise.all([
    orders.aggregate([
      { $match: { createdAt: createdAtQuery } },
      { $group: { _id: null, quantityNum: { $sum: "$quantityNum" }, count: { $sum: 1 } } }
    ]).toArray(),
    orders.find({ createdAt: createdAtQuery }).sort({ createdAt: 1 }).toArray()
  ])

  const data = aggregateResult[0] || { quantityNum: 0, count: 0 }

  const dayArray = eachDayOfInterval(interval(
    createdAfter || startOfDay(chartData[0]?.createdAt || new Date()),
    createdBefore || new Date()
  )).map(day => ({
    date: formatRevalidate(day),
    total: 0
  }))

  const reducedChartData = chartData.reduce((data, quantity) => {
    const formattedDate = formatRevalidate(quantity.createdAt)
    const entry = data.find(day => day.date === formattedDate)
    if (entry) entry.total += (quantity.quantityNum || 0) / 100
    return data
  }, dayArray)

  return {
    chartData: reducedChartData,
    amount: (data.quantityNum || 0) / 100,
    numPlants: data.count
  }
}
*/
// ver com o Luis por causa da Base de Dados



export default function Home() {

  const [numeroTotal, setNumeroTotal] = useState(0);
  const [speciesNumber, setSpeciesNumber] = useState(0);

  const getPlantNumber = async () => {
    try {
          const response = await axios.get("/api/plants/total");
          setNumeroTotal(response.data.number);
            
      } catch (error:any) {
          console.log("Failed to get plant number", error.response.data.error);   
      }
  }

  const getSpeciesNumber = async () => {
    try {
          const response = await axios.get("/api/plants/species");
          setSpeciesNumber(response.data.species.length);
          
      } catch (error:any) {
          console.log("Couldn't get plant species", error);
          
      }
  }

  useEffect(() => {
    getPlantNumber();
    getSpeciesNumber()
  }, []);

  return (
    <div className="pt-8">
      <h1 className="text-lg text-black m-4">Horta ComUM</h1>
      <h3 className=" pl-4 text-black m-4"> Localização: Universidade do Minho, Campus de Gualtar, Braga </h3> 
      {/* Meter um icon de localização*/}


      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="text-sm font-medium text-black">NÚMERO TOTAL DE PLANTAS</div>
            </CardHeader>
            <CardBody>
                <div className="text-2xl text-black font-bold">{numeroTotal} </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="text-sm font-medium text-black">ESPÉCIES CULTIVADAS</div>
            </CardHeader>
            <CardBody>
              <div className="text-2xl text-black font-bold pb-2">{speciesNumber}</div>
              <p className="text-xs text-black">Desde o último mês</p>
            </CardBody>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="text-lg text-black font-semibold">Condições Atuais</div>
            </CardHeader>
            <CardBody className="space-y-4 mt-10">
              <div className="h-32 rounded-md">
                <CurrentConditionsCard
                temperature="24°C" // getTemp()
                soilHumidity="65%" // getHum() ?
                lastIrrigation="Hoje, 08:30" // getIrrigation()
                nextEvent="Amanhã, 14:00" // getEvent() ?                 
                /> 
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-lg pb-5 text-black font-semibold items-center">Produção Mensal</div>
            </CardHeader>
            <CardBody>
              <ProduçãoMensalChart data={[
                { month: "Jan", quantity: 12 },
                { month: "Fev", quantity: 10 },
                { month: "Mar", quantity: 22 },
                { month: "Abr", quantity: 14 },
                { month: "Mai", quantity: 34 },
                { month: "Jun", quantity: 13 },
                { month: "Jul", quantity: 9 },
                { month: "Ago", quantity: 4 },
                { month: "Set", quantity: 20 },
                { month: "Out", quantity: 22 },
                { month: "Nov", quantity: 23 },
                { month: "Dez", quantity: 21 }]}/>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

function eachDayOfInterval({ start, end }: { start: Date; end: Date }): Date[] {
  const days: Date[] = []
  let current = new Date(start)
  while (isBefore(current, end) || current.getTime() === end.getTime()) {
    days.push(new Date(current))
    current = addDays(current, 1)
  }
  return days
}

function interval(start: Date, end: Date): { start: Date; end: Date } {
  return { start, end }
}
function isBefore(current: Date, end: Date) {
  return current.getTime() < end.getTime();
}
function addDays(current: Date, days: number): Date {
  const result = new Date(current)
  result.setDate(result.getDate() + days)
  return result
}
function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}
function formatRevalidate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

