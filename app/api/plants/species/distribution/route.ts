import dbConnect from "@/lib/mongodb";
import Plant from "@/models/Plant";
import { NextRequest, NextResponse } from "next/server";

dbConnect()
// Calls the connect function to establish a connection to the database.

interface Plant {
  species: string;
  n_specimens: number;
}

export async function GET(request: NextRequest){
    try {
        //check all species
        const species = await Plant.aggregate([
            { $group: {
                _id: "$species",
                total_specimens: { $sum: "$n_specimens" }
            }},

            { $project: {
                _id: 0,
                species: "$_id",
                total_specimens: 1
            }},
                                        
            { $sort: { total_specimens: -1 }}, // Ordenar decrescente
    
            { $limit: 6  }// Pega os 6 primeiros
        ]);

        return NextResponse.json({response: "Success", species: species});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});

    }
}