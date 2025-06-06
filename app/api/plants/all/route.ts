import dbConnect from "@/lib/mongodb";
import Plant from "@/models/Plant";
import { NextRequest, NextResponse } from "next/server";

dbConnect()
// Calls the connect function to establish a connection to the database.

export async function GET(request: NextRequest){
    try {

        //check if user exists
        const plants = await Plant.find({}).select({"_id":0,"id":1,"designation":1, "description":1, "species":1, "n_specimens":1, "scientific_name":1})

        return NextResponse.json({response: "Success", plants: plants});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}