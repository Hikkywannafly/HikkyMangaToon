import { Chapter } from "../types";

export const parseNumbersFromString = (
    text: string,
    fallbackNumber = null as any
): number[] => {
    const matches = text.match(/\d+([\.,][\d{1,2}])?/g);

    if (!matches) return [fallbackNumber];

    return matches.map(Number);
};


export const parseNumberFromString = (text: string, fallbackNumber = null as any) => {
    return parseNumbersFromString(text, fallbackNumber)[0];
};

// @ts-ignore
export const parseBetween = (str, start, end) => {
    const startIndex = str.indexOf(start) + start.length;
    const endIndex = str.indexOf(end);

    return str.substring(startIndex, endIndex);
};


export const sortMediaUnit = <T extends Chapter>(data: T[]) => {
    return data.sort((a, b) => {
        const aNumber = parseNumbersFromString(a.name, 9999)?.[0];
        const bNumber = parseNumbersFromString(b.name, 9999)?.[0];
        return aNumber - bNumber;
    });
};