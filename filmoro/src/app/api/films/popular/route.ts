import { NextResponse } from "next/server";

export async function GET() {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const headers = {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZWU5ZDk0MjY1ZTFmOTQ0ZWIzNGIxNDNiODUxMzQ3MCIsIm5iZiI6MTY3MzkyNDM4Ny42ODQsInN1YiI6IjYzYzYwZjIzNzc3NmYwMDBhMDc5YTE3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZpNeoyvzshZ33Jge3V22PBsVkWjh-2M7540c7Eqd-sE',
        'accept': 'application/json'
    };
    
    try {
        const response = await fetch(url, {headers});

        if(!response.ok) {
            return NextResponse.json({success: false, message: "Error in popular films route"}, {status: 500});
        }

        const data = await response.json();

        console.log(data);
    
        return NextResponse.json({success: true, message: "Popular films fetched successfully", data: data.results});
    } catch (error) {
        console.error(error);
        return NextResponse.json({success: false, message: "Error in popular films route"}, {status: 500});
    }

}