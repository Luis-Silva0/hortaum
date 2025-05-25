import dbConnect from "@/lib/mongodb";
import Plant from "@/models/Plant";
import { NextRequest, NextResponse } from "next/server";

dbConnect()
// Calls the connect function to establish a connection to the database.

export async function GET(request: NextRequest){
    try {
        const reqBody = await request.json()
        const plantId = reqBody

        //check if user exists
        const plants = await Plant.find({}).select({"designation":1, "description":1, "species":1, "n_specimens":1, "scientific_name":1})

        console.log("Yay", Object.keys(plants[0].toObject()))

        return plants;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}