"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../src/index.js");
test('approximately', function () {
    expect((0, index_js_1.approximately)(0, 0)).toBe(true);
    expect((0, index_js_1.approximately)(1 + 1e-8, 1)).toBe(true);
    expect((0, index_js_1.approximately)(-1 - 1e-8, -1)).toBe(true);
    expect((0, index_js_1.approximately)(1 + 1e-8 + 1e-9, 1)).toBe(false);
    expect((0, index_js_1.approximately)(-1 - 1e-8 - 1e-9, -1)).toBe(false);
    expect((0, index_js_1.approximately)(0, 0.1)).toBe(false);
    expect((0, index_js_1.approximately)(0, 0.1, 0.1)).toBe(true);
});
test('toPositive', function () {
    expect((0, index_js_1.toPositive)(-1, 360)).toEqual(359);
    expect((0, index_js_1.toPositive)(1, 360)).toEqual(1);
    expect((0, index_js_1.toPositive)(0, 1)).toEqual(0);
    expect((0, index_js_1.toPositive)(-720, 360)).toEqual(0);
    expect((0, index_js_1.toPositive)(-721, 360)).toEqual(359);
    expect((0, index_js_1.toPositive)(-0, 0)).toEqual(0);
});
test('isCorrectNumber', function () {
    expect((0, index_js_1.isCorrectNumber)(0)).toBe(true);
    expect((0, index_js_1.isCorrectNumber)('0')).toBe(true);
    expect((0, index_js_1.isCorrectNumber)('0e-08')).toBe(true);
    expect((0, index_js_1.isCorrectNumber)('0e -08')).toBe(false);
    expect((0, index_js_1.isCorrectNumber)({ 1: 2 })).toBe(false);
    expect((0, index_js_1.isCorrectNumber)(null)).toBe(false);
    expect((0, index_js_1.isCorrectNumber)(undefined)).toBe(false);
    expect((0, index_js_1.isCorrectNumber)(Infinity)).toBe(false);
    expect((0, index_js_1.isCorrectNumber)(-Infinity)).toBe(false);
    expect((0, index_js_1.isCorrectNumber)(NaN)).toBe(false);
    expect((0, index_js_1.isCorrectNumber)('')).toBe(false);
});
