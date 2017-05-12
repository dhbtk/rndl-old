export function numberStringToLocale(number: string, numDecimals: number = 2): string {
    number = parseFloat(number).toFixed(numDecimals);
    return number.split('.').join(',');
}