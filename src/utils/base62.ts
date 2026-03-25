const map = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const encode = (input: bigint): string => {
    if (input === 0n) return "0";

    let output = "";

    while (input > 0) {
        const rem = (input % 62n);
        output += map.charAt(Number(rem));
        input = (input / 62n);
    }

    return output.split('').reverse().join('');
};

export const decode = (str: string): bigint => {
    let result = 0n;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const value = map.indexOf(char);
        result = (result * 62n) + BigInt(value);
    }
    return result;
};