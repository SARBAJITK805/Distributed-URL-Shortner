import pkg from "snowflake-id";

const SnowflakeId = (pkg as any).default;

const snowflake = new SnowflakeId({
    mid: 42,
    offset: new Date("2019-01-01").getTime()
});

const id = snowflake.generate();
console.log(id);