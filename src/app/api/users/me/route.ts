import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest,NextResponse } from "next/server";

import User from "@/models/userModel";

import{connect} from "@/dbConfig/dbConfig"

connect();

export async function GET(request:NextRequest) {

    try {
        const userId=await getDataFromToken(request);
        const user =await User.findOne({_id:userId}).select("-password");
        return NextResponse.json({
            message:"user found",
            data:user
        })
    } catch (error: unknown) {
  return NextResponse.json(
    { error: error instanceof Error ? error.message : "Something went wrong" },
    { status: 400 }
  );
}

    
}