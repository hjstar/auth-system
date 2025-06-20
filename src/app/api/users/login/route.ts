import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import jwt from "jsonwebtoken";

connect()

export async function POST(request:NextRequest) {
    try {

        const reqBody=await request.json()
        const {username,password}=reqBody;
        console.log(reqBody);
        //check email
        const user=await User.findOne({username})
        if(!user){
            return NextResponse.json({error:"User data not exist"},{status:400})
        }

        //check password
        const validPassword=await bcryptjs.compare
        (password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid Password"},{status:400})
        }

        //create token data

        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }

        //create tokem

        const token =await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})


        const response=NextResponse.json({
            message:"Login successful",
            success:true,
        })

        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response;
    }catch (error: unknown) {
  let errorMessage = "An unknown error occurred";

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return NextResponse.json({ error: errorMessage }, { status: 500 });
}

}