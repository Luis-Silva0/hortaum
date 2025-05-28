import dbConnect from "@/lib/mongodb";
import Plant from "@/models/Plant";
import { NextRequest, NextResponse } from "next/server";

dbConnect()
// Calls the connect function to establish a connection to the database.

export async function GET(request: NextRequest){
    try {

        //check if user exists
        const plants = await Plant.aggregate([{ $group: {_id: null, total: { $sum: "$n_specimens" }}}]);

        return NextResponse.json({response: "Success", number: plants[0].total});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}