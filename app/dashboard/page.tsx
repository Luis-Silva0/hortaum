"use client"
import { Card, CardBody, CardHeader } from "@heroui/react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { ProduçãoMensalChart } from "./charts/ProduçãoMensalChart";
import { useEffect, useState } from "react";
import axios from "axios";

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
import { PieChartEspecies } from "./charts/PieChartEspecies";

interface SpeciesStats{
  date: string, 
  quantity: number, 
  formattedDate: string
}

export default function Home() {

  const [numeroTotal, setNumeroTotal] = useState(0);
  const [speciesNumber, setSpeciesNumber] = useState(0);
  const [stats, setStats] = useState<SpeciesStats[]>([]);
  const [speciesStats, setSpeciesStats] = useState<{species: string, total_specimens: number}[]>([]);
  const [delta, setDelta] = useState(0);

  const getDistribution = async () => {
    try {
          const response = await axios.get("/api/plants/species/distribution");
          setSpeciesStats(response.data.species);
            
      } catch (error:any) {
          console.log("Failed to get species by month", error.response.data.error);   
      }
  }

  const getSpeciesByMonth = async () => {
    try {
          const response = await axios.get("/api/stats");
          const data = response.data.stats.map((stat: {numSpecies: number, date: string}) => {
            const date = new Date(stat.date);
            const dateString = months[date.getMonth()] + " " + date.getFullYear().toString();
            return {quantity: stat.numSpecies, formattedDate: dateString, date: stat.date}
          }).sort((a: SpeciesStats, b: SpeciesStats) => Date.parse(a.date) - Date.parse(b.date))
          setStats(data);
            
      } catch (error:any) {
          console.log("Failed to get species by month", error.response.data.error);   
      }
  }

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
    getSpeciesNumber();
    getSpeciesByMonth();
    getDistribution();
  }, []);

  useEffect(() => {
    if (stats.length != 0) {
      const lastMonth = new Date().getMonth() - 1;
      if (lastMonth == 11){
        const n = stats.filter((stat) => stat.formattedDate == (months[lastMonth] + " " + (new Date().getFullYear() - 1).toString()))[0].quantity;
        setDelta(((speciesNumber/n) - 1)*100);
      } else {
        const n = stats.filter((stat) => stat.formattedDate == (months[lastMonth] + " " + new Date().getFullYear().toString()))[0].quantity;
        setDelta(((speciesNumber/n) - 1)*100);
      }
    }
  }, [stats]);

  return (
    <div className="pt-8 overflow-y-scroll">
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="text-lg pb-5 text-black font-semibold items-center">Quantidade de Espécies por Mês</div>
            </CardHeader>
            <CardBody>
              <ProduçãoMensalChart data={stats}/>
            </CardBody>
          </Card>
                  <div className="grid grid-cols-1 lg:grid-rows-4 gap-4">
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
              <div className="text-xs text-black">{(delta > 0) ? (
                <div className="flex flex-row text-[#22c55e] gap-1"> <IoIosArrowUp size={14}/> {delta}% Desde o último mês </div>
              ) : ( (delta < 0) && 
                <div className="flex flex-row text-[#ee4444] gap-1"> <IoIosArrowDown/> {delta}% Desde o último mês </div>
              )} 
              </div>
            </CardBody>
          </Card>
        </div>
        </div>
        <div>
          <Card>
            <CardBody>
              <PieChartEspecies data={speciesStats} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}