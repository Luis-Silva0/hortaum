"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

type PieChartProps = {
  data: {
    especie: string
    quantidade: number
  }[]
}

// Cores para diferentes espécies
const COLORS = [
  "#22c55e", // Verde
  "#3b82f6", // Azul
  "#f59e0b", // Amarelo
  "#ef4444", // Vermelho
  "#8b5cf6", // Roxo
  "#06b6d4", // Ciano
  "#f97316", // Laranja
  "#84cc16", // Lima
  "#ec4899", // Rosa
  "#6b7280", // Cinza
]

// Função para formatar os dados
const formatData = (data: PieChartProps["data"]) => {
  return data.map((item, index) => ({
    name: item.especie,
    value: item.quantidade,
    color: COLORS[index % COLORS.length],
  }))
}

// Componente customizado para o tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{data.name}</p>
        <p className="text-sm text-gray-600">
          Quantidade: <span className="font-semibold">{data.value}</span>
        </p>
        <p className="text-sm text-gray-600">
          Percentual:{" "}
          <span className="font-semibold">{((data.value / payload[0].payload.total) * 100).toFixed(1)}%</span>
        </p>
      </div>
    )
  }
  return null
}

// Componente para labels customizados
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (percent < 0.05) return null // Não mostrar label se for menos de 5%

  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export function PieChartEspecies({ data }: PieChartProps) {
  const formattedData = formatData(data)
  const total = data.reduce((sum, item) => sum + item.quantidade, 0)

  // Adicionar total aos dados para o tooltip
  const dataWithTotal = formattedData.map((item) => ({ ...item, total }))

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <p className="text-sm">Nenhuma espécie encontrada</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Header com estatísticas */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Distribuição de Espécies</h3>
        <div className="flex gap-4 text-sm text-gray-600">
          <span>
            Total de plantas: <strong>{total}</strong>
          </span>
          <span>
            Espécies diferentes: <strong>{data.length}</strong>
          </span>
        </div>
      </div>

      {/* Gráfico */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataWithTotal}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {dataWithTotal.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry: any) => (
                <span style={{ color: entry.color }} className="text-sm">
                  {value} ({entry.payload.value})
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Lista detalhada */}
      <div className="mt-6">
        <h4 className="text-md font-medium text-gray-900 mb-3">Detalhes por Espécie</h4>
        <div className="space-y-2">
          {formattedData
            .sort((a, b) => b.value - a.value)
            .map((item, index) => {
              const percentage = ((item.value / total) * 100).toFixed(1)
              return (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{item.value} plantas</div>
                    <div className="text-xs text-gray-500">{percentage}%</div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
