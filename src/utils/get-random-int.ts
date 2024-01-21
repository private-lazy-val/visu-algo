export const getRandomInt = (minLen: number, maxLen: number): number => {
    return Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
};