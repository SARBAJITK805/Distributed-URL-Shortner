import pkg from "snowflake-id";
import { encode } from "./base62.js";
import prisma from "../lib/prisma.js";

const SnowflakeId = (pkg as any).default;

const snowflake = new SnowflakeId({
    mid: 1,
    offset: new Date("2019-01-01").getTime()
});

const RESERVED_WORDS = [
    "api", "admin", "health", "docs", "metrics",
    "test", "demo", "login", "signup", "logout",
    "dashboard", "settings", "help", "about", "contact"
];

function isReserved(code: string): boolean {
    return RESERVED_WORDS.includes(code.toLowerCase());
}

export async function generateShortCode(): Promise<string> {
    let tries = 0;
    const MAX_TRIES = 7;
    
    let id = BigInt(snowflake.generate());
    let encoded = encode(id);
    
    while (tries < MAX_TRIES) {
        const url = await prisma.url.findFirst({
            where: { shortCode: encoded }
        });
        
        if (url == null && !isReserved(encoded)) {
            return encoded;
        }
        
        id = BigInt(snowflake.generate());
        encoded = encode(id);
        tries++;
    }
    
    throw new Error("Failed to generate unique short code");
}