export const convertNumberToWeek = (numberWeek: number): string => {
    switch (numberWeek) {
        case 0: return "D";
        case 1: return "S";
        case 2: return "T";
        case 3: return "Q";
        case 4: return "Q";
        case 5: return "S";
        case 6: return "S";
        default:
            throw new Error("It's not expected number of week greater than 6 and minor than 1");
    }
}