export function approximately(theValue: number, is: number, withPrecision: number = 1e-8) {
    return Math.abs(theValue - is) <= withPrecision
}

export function toPositive(value: number, range: number) {
    if (value >= 0) return Math.abs(value)
    return Math.abs((range + value % range) % range)
}

export function isCorrectNumber(value: any) {
    const v1 = parseFloat(value);
    const v2 = +value;
    return !Array.isArray(value) && v1 === v2 && !isNaN(v1) && isFinite(v1)
}

export function normalize(value: number, top: number, bottom = 0) {
    return (value - bottom) / (top - bottom)
}

export function denormalize(value: number, top: number, bottom = 0) {
    return (top - bottom) * value + bottom
}

export function isPositive(n: number) {
    return !isNaN(n) && n > 0;
}

export function isNegative(n: number) {
    return !isNaN(n) && n < 0;
}

export function isInteger(n: number) {
    return !isNaN(n) && isFinite(n) && (n - (n % 1)) === n;
}

export function isNatural(n: number) {
    return isPositive(n) && isInteger(n);
}

export function isNonNegativeInteger(n: number) {
    return !isNegative(n) && isInteger(n);
}