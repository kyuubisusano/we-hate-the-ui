'use client'
// Why are we still here?
import {TokenCard} from "@/components/TokenCard";
import {BuySellDialog} from "@/components/BuySellDialog";
import {generateFakeToken} from "@/lib/utils";

export default function Home() {
    return (
        <main className="bg-background flex h-[calc(100vh_-_66px)] flex-col items-center justify-between p-24">
            <TokenCard token={generateFakeToken()}/>
            <BuySellDialog/>
        </main>
    );
}
