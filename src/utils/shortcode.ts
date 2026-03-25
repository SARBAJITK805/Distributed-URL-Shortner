import pkg from "snowflake-id";
import { encode,decode } from "./base62.js";

const SnowflakeId = (pkg as any).default;

const snowflake = new SnowflakeId({
    mid: 1,
    offset: new Date("2019-01-01").getTime()
});


export function generateShortCode():string{
    const id=BigInt(snowflake.generate());
    const encoded=encode(id);
    return encoded;
}


// const id = snowflake.generate();
// console.log(typeof BigInt(id));

// const encoded = encode(BigInt(id));
// const decoded = decode(encoded);

// console.log("Original ID:", id);
// console.log("Encoded:", encoded);
// console.log("Decoded:", decoded);
// console.log("Match?", id === String(decoded));