'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function Home() {
  const router = useRouter()
  
  const { data: session, status } = useSession(); // Přidán `status`

  // ✅ Přesměrování pouze při změně session
  useEffect(() => {
    if (true) {
      router.replace  ("/selection");
    }
  }, [session, router]); // Přesměruje pouze při změně session

  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center h-screen">
        {status === "loading" ? ( // ⏳ Zobrazit loading, pokud session ještě není načtená
          <p>Načítání...</p>
        ) : session ? (
          <>
            <p>Přihlášen jako {session.user?.name}</p>
            <button onClick={() => signOut()} className="p-2 bg-red-500 text-white rounded">
              Odhlásit se
            </button>
          </>
        ) : (
          <button onClick={() => signIn("discord")} className="p-2 bg-blue-500 text-white rounded">
            Přihlásit se přes Discord
          </button>
        )}
      </div>
    </div>
  );
}
