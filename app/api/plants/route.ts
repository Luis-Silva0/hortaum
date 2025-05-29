import dbConnect from "@/lib/mongodb";
import Plant from "@/models/Plant";
import { NextRequest, NextResponse } from "next/server";

dbConnect()
// Calls the connect function to establish a connection to the database.

export async function GET(request: NextRequest){
    try {
        const params = new URL(request.url);
        const plantId = params.searchParams.get("id");

        //check if user exists
        const plant = await Plant.findOne({id: plantId}).select({"__v": 0});

        //console.log("Yay", Object.keys(plant.toObject()))

        return NextResponse.json({response: "Success", plant: plant});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const data = reqBody;

        const plant = await Plant.insertOne({
            designation: data.designation, 
            scientific_name: data.scientific_name, 
            n_specimens: data.n_specimens, 
            species: data.species,
            description: data.description,
        })
        return NextResponse.json({response: "Success"});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}

export async function DELETE(request: NextRequest){
    try {
        const reqBody = await request.json()
        const data = reqBody;

        const plant = await Plant.deleteOne({id: data.id});
        return NextResponse.json({response: "Success"});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}

export async function PUT(request: NextRequest){
    try {
        const reqBody = await request.json()
        const data = reqBody;
        const update = {[data.data.key]: data.data.value};

        const plant = await Plant.findOneAndUpdate({id: data.data.id}, {$set:update});
        return NextResponse.json({response: "Success"});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}