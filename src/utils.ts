export function approximately(theValue: number, is: number, withPrecision: number = 1e-8) {
    return Math.abs(theValue - is) <= withPrecision
}

export function toPositive(value: number, range: number) {
    if (value >= 0) return Math.abs(value)
    return Math.abs((range + value % range) % range)
}

export function isCorrectNumber(value: any) {
    let v: number = +value
    if (!isNaN(value) && isFinite(value)) {
        v = parseFloat(value)
        return !isNaN(v) && isFinite(v)
    }
    return false
}

export function normalize(value: number, top: number, bottom = 0) {
    return (value - bottom) / (top - bottom)
}

export function denormalize(value: number, top: number, bottom = 0) {
    return (top - bottom) * value + bottom
}