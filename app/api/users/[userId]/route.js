import { NextRequest, NextResponse } from 'next/server';
import { verifyBearer, assertRole ,ROLE_ADMIN, ROLE_JURY, ROLE_MENTOR } from "../../../../lib/middlewares/helpers.js";
const {
    getUserInfo
} = require("../../../../functions/api/services/userService.js");
const {getUser} = require("../../../../functions/api/services/authService.js");

export const runtime = 'nodejs';

export async function GET(request, { params }) {
    const { userId } = params;
    let authUser;
    try {
        authUser = await verifyBearer(request.headers.get("authorization"));
        //console.log("authUser: ", authUser);
    }
    catch (err) {
        console.error('Authentication failed:', err);
        console.log ("error status " + err.status)
        return NextResponse.json(
            { error: err.body },
            { status: err.status }
        );
    }
  if (authUser.uid === userId) {
    const result = await getUser(userId);
    //console.log("result: ", result);
    if (!result || result.error) {
      return NextResponse.json(result || { error: 'Not found' }, { status: 404 });
    }
    //console.log("result: ", result);
    return NextResponse.json(result, { status: 200 });
  }
  try {
    assertRole(authUser, [ROLE_ADMIN, ROLE_JURY, ROLE_MENTOR]);
  } catch (err) {
    return NextResponse.json(err.body, { status: err.status });
  }

  const result = await getUser(userId);
  if (!result || result.error) {
    return NextResponse.json(result || { error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(result, { status: 200 });
    
}