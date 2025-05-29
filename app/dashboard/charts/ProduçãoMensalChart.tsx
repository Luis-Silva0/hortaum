"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


function formatQuantity(quantity: number) {
    return quantity.toLocaleString("pt-PT", { style: "decimal" });
}

type ProduçãoMensalProps = {
    data: {
        month: string;
        quantity: number
    }[]
}



export function ProduçãoMensalChart( {data} : ProduçãoMensalProps) {
    return (
        <ResponsiveContainer width="100%" minHeight={300}>
            <LineChart data={data}>
                <CartesianGrid stroke="hsl(var(--muted))"/>
                <XAxis dataKey="month" name="Month" />
                <YAxis dataKey="quantity" name="Quantity" tickFormatter={tick => formatQuantity(tick)}
                    />
                <Tooltip 
                    formatter={quantity => formatQuantity(quantity as number)} 
                    labelFormatter={() => ''} 
                />
                <Line 
                    dot={true}
                    dataKey="quantity"
                    name="Quantidade de Plantas"
                    stroke="#22c55e"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}