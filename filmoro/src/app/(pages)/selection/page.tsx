/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SelectionPage() {
    const { data: session } = useSession();
    const [selectedFilms, setSelectedFilms] = useState<string[]>([]);
    interface Film {
        id: string;
        title: string;
        poster_path: string;
    }

    const [films, setFilms] = useState<Film[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            fetch("http://localhost:3000/api/films/popular")
                .then(response => response.json())
                .then(data => {
                    setFilms(data.data)
                })
                .catch(error => console.error("Error fetching films:", error));
        };

        fetchData();
    }, []);

    const handleCardClick = (id: string) => {
        setSelectedFilms(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(filmId => filmId !== id);
            } else if (prevSelected.length < 5) {
                return [...prevSelected, id];
            } else {
                return prevSelected;
            }
        });
        console.log(selectedFilms);
    };

    const skeletonElements = []
    for (let i = 0; i < 20; i++) {
        skeletonElements.push(                        
        <Card
            key={i}
            className="m-1 w-[300px] h-[450px] space-y-5 p-4"
            radius="lg"
        >
            <Skeleton className="rounded-lg">
                <div className="h-[450px] rounded-lg bg-default-300"></div>
            </Skeleton>
        </Card>
        )
        
    }

    return (
        <div className="w-screen h-screen bg-black flex flex-col items-center p-10 gap-3">
            <div className="flex flex-col items-center">
                <p className="text-3xl font-medium">SELECTION</p>
                <p className="text-lg font-light">Vyber filmy které se ti za poslední dobu líbily.</p>
                <p className={`text-lg font-light `}>Filmů na výběr zbývá <span className={`${selectedFilms.length >= 0 ? "text-green-500": ""} ${selectedFilms.length == 5 ? "text-red-500": ""}`}>{5-selectedFilms.length}</span></p>
            </div>
            <div className="flex flex-wrap h-5/6 w-fit justify-center items-center overflow-y-auto gap-7 rounded-lg">
                {films.length < 1 ? (
                    <div className="flex flex-wrap w-full justify-center items-center overflow-y-auto gap-7">
                        {skeletonElements}
                    </div>
                ) : (
                    films.map(film => (
                    <Card
                        key={film.id}
                        isPressable
                        className={`m-1 border-4 ${selectedFilms.includes(film.id) ? "border-green-500 grayscale-0 transition-all" : "border-transparent grayscale"}`}
                        radius="lg"
                        onPress={() => handleCardClick(film.id)}
                    >
                        <Image
                            alt={film.title}
                            className="object-cover"
                            height={450}
                            width={300}
                            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${film.poster_path}`}
                        />
                    </Card>
                )))}
            </div>
            <Button 
                isDisabled={selectedFilms.length < 5 ? true : false}
                color={selectedFilms.length < 5 ? "default" : "primary"}
                size="lg"
            >
                Submit
            </Button>
        </div>
    )
}