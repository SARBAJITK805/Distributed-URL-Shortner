const map = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const encode = (input: number): string => {
    if (input === 0) return "0";

    let output = "";

    while (input > 0) {
        const rem = input % 62;
        output += map.charAt(rem);
        input = Math.floor(input / 62);
    }

    return output.split('').reverse().join('');
};

export const decode = (str: string): number => {
    let result = 0;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const value = map.indexOf(char);
        result = result * 62 + value;
    }

    return result;
};