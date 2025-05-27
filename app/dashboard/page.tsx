import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProduçãoMensalChart } from "./charts/ProduçãoMensalChart"

export default function Home() {
  return (
    <div className="pt-8">
      <h1 className="text-lg text-black m-4">Horta ComUM</h1>
      <h3 className=" pl-4 text-black m-4">RUA</h3>

      <div className="p-4 space-y-6">
        {/* Primeira linha - 4 cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-black">ÁREA TOTAL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-black font-bold">450 m²</div>
              <p className="text-xs text-black">24 canteiros disponíveis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-black">VOLUNTÁRIOS ATIVOS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-black font-bold">45</div>
              <p className="text-xs text-black">Desde o último mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-black">ESPÉCIES CULTIVADAS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-black font-bold">32</div>
              <p className="text-xs text-black">Desde o último mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-black">PRODUÇÃO TOTAL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-black font-bold">267 kg</div>
              <p className="text-xs text-black">Neste ano</p>
            </CardContent>
          </Card>
        </div>

        {/* Segunda linha - 2 cards maiores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-black font-semibold">Condições Atuais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-32 rounded-md flex items-center justify-center">
                <p className="text-black">Conteúdo do card</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg pb-5 text-black font-semibold">Produção Mensal (kg)</CardTitle>
            </CardHeader>
            <CardContent>
              <ProduçãoMensalChart/>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
