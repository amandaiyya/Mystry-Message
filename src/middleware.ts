// import { NextRequest, NextResponse } from 'next/server'
// import { getToken } from 'next-auth/jwt'
import { auth } from './auth'
 
// This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//     // console.log(request)
//     const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET})
//     console.log(token)
//     const url = request.nextUrl

//     if(token && (
//         url.pathname === '/' ||
//         url.pathname.startsWith('/sign-in') ||
//         url.pathname.startsWith('/sign-up') ||
//         url.pathname.startsWith('/verify')
//     )){
//         return NextResponse.redirect(new URL('/dashboard', request.url))
//     }

//     if(!token && url.pathname.startsWith('/dashboard'))
//     return NextResponse.redirect(new URL('/sign-in', request.url))
    

//     return NextResponse.next()
// }

export default auth((req) => {
    const url = req.nextUrl;

    if(req.auth && (
        url.pathname === '/' ||
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up') ||
        url.pathname.startsWith('/verify')
    )){
        return Response.redirect(new URL('/dashboard', url.origin))
    }

    if(!req.auth && url.pathname.startsWith("/dashboard")){
        return Response.redirect(new URL("/sign-in", url.origin))
    }

    return null
})
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
      '/',
      '/sign-in',
      '/sign-up',
      '/dashboard/:path*',
      '/verify/:path*',
    ]
  }