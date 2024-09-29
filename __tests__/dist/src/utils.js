"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approximately = approximately;
exports.toPositive = toPositive;
exports.isCorrectNumber = isCorrectNumber;
function approximately(theValue, is, withPrecision) {
    if (withPrecision === void 0) { withPrecision = 1e-8; }
    return Math.abs(theValue - is) <= withPrecision;
}
function toPositive(value, range) {
    if (value >= 0)
        return Math.abs(value);
    return Math.abs((range + value % range) % range);
}
function isCorrectNumber(value) {
    var v = +value;
    if (!isNaN(value) && isFinite(value)) {
        v = parseFloat(value);
        return !isNaN(v) && isFinite(v);
    }
    return false;
}
