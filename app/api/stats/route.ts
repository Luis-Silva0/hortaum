import dbConnect from "@/lib/mongodb";
import Stat from "@/models/Stat";
import { NextRequest, NextResponse } from "next/server";

dbConnect()
// Calls the connect function to establish a connection to the database.

export async function GET(request: NextRequest){
    try {

        const stats = await Stat.find().select({"_id": 0, "type": 0});

        return NextResponse.json({response: "Success", stats: stats});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}