"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const data = [
    { value: 6, date: "02-03-2025", month:"January" },
    { value: 12, date: "12-03-2025", month:"February"  },
    { value: 15, date: "22-03-2025", month:"March" },
    { value: 18, date: "02-04-2025", month:"April" },
    { value: 22, date: "03-05-2025", month:"May" }
]

function formatQuantity(value: number) {
    return value.toLocaleString("pt-PT", { style: "decimal" }) + " KG";
}



export function ProduçãoMensalChart() {
    return (
        <ResponsiveContainer width="100%" minHeight={300}>
            <LineChart data={data}>
                <CartesianGrid stroke="hsl(var(--muted))"/>
                <XAxis dataKey="month" name="Month" />
                <YAxis dataKey="value" name="Value" tickFormatter={tick => formatQuantity(tick)}
                    />
                <Tooltip formatter={value => formatQuantity(value as number)} />
                <Line 
                dot={true}
                dataKey="value"
                name="Produção Mensal"
                
                />
            </LineChart>
        </ResponsiveContainer>
    );
}