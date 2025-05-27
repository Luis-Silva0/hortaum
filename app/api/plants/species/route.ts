import dbConnect from "@/lib/mongodb";
import Plant from "@/models/Plant";
import { NextRequest, NextResponse } from "next/server";

dbConnect()
// Calls the connect function to establish a connection to the database.

export async function GET(request: NextRequest){
    try {
        //check if user exists
        const species = await Plant.find({}).select({"species":1, "_id": 0})

        return NextResponse.json({response: "Success", species: species});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});

    }
}