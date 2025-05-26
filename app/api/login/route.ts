import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

dbConnect()
// Calls the connect function to establish a connection to the database.

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, password} = reqBody

        //check if user exists
        const user = await User.findOne({username})

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        
        //check if password is correct
        const validPassword = (password == user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

//create token data
// A JavaScript object (tokenData) is created to store essential user 
// information. In this case, it includes the user's unique identifier (id), 
// username, and email.

        const tokenData = {
            id: user._id,
            username: user.username
        }

        // Create a token with expiration of 1 day
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        // Create a JSON response indicating successful login
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        // Set the token as an HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}