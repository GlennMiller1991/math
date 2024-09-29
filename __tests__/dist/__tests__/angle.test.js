"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../src/index.js");
describe('math.angle.toDeg', function () {
    test('from Turn', function () {
        expect(index_js_1.Angle.toDeg(1, index_js_1.AngleUnits.Turn)).toBe(360);
        expect(index_js_1.Angle.toDeg(0, index_js_1.AngleUnits.Turn)).toBe(0);
        expect(index_js_1.Angle.toDeg(0.5, index_js_1.AngleUnits.Turn)).toBe(180);
        expect(index_js_1.Angle.toDeg(-0.5, index_js_1.AngleUnits.Turn)).toBe(-180);
    });
    test('from Rad', function () {
        expect(index_js_1.Angle.toDeg(Math.PI * 2, index_js_1.AngleUnits.Rad)).toBe(360);
        expect(index_js_1.Angle.toDeg(0, index_js_1.AngleUnits.Rad)).toBe(0);
        expect(index_js_1.Angle.toDeg(Math.PI, index_js_1.AngleUnits.Rad)).toBe(180);
        expect(index_js_1.Angle.toDeg(-Math.PI, index_js_1.AngleUnits.Rad)).toBe(-180);
    });
    test('from Deg', function () {
        expect(index_js_1.Angle.toDeg(180, index_js_1.AngleUnits.Deg)).toBe(180);
    });
});
describe('math.angle.toRad', function () {
    test('from Rad', function () {
        expect(index_js_1.Angle.toRad(1, index_js_1.AngleUnits.Rad)).toBe(1);
    });
    test('from Deg', function () {
        expect(index_js_1.Angle.toRad(360, index_js_1.AngleUnits.Deg)).toBe(Math.PI * 2);
        expect(index_js_1.Angle.toRad(0, index_js_1.AngleUnits.Deg)).toBe(0);
        expect(index_js_1.Angle.toRad(180, index_js_1.AngleUnits.Deg)).toBe(Math.PI);
        expect(index_js_1.Angle.toRad(-180, index_js_1.AngleUnits.Deg)).toBe(-Math.PI);
    });
    test('from Turn', function () {
        expect(index_js_1.Angle.toRad(1, index_js_1.AngleUnits.Turn)).toBe(Math.PI * 2);
        expect(index_js_1.Angle.toRad(0, index_js_1.AngleUnits.Turn)).toBe(0);
        expect(index_js_1.Angle.toRad(0.5, index_js_1.AngleUnits.Turn)).toBe(Math.PI);
        expect(index_js_1.Angle.toRad(-0.5, index_js_1.AngleUnits.Turn)).toBe(-Math.PI);
    });
});
describe('math.angle.toTurn', function () {
    test('from Turn', function () {
        expect(index_js_1.Angle.toTurn(0.1, index_js_1.AngleUnits.Turn)).toBe(0.1);
    });
    test('from Deg', function () {
        expect(index_js_1.Angle.toTurn(360, index_js_1.AngleUnits.Deg)).toBe(1);
        expect(index_js_1.Angle.toTurn(0, index_js_1.AngleUnits.Deg)).toBe(0);
        expect(index_js_1.Angle.toTurn(180, index_js_1.AngleUnits.Deg)).toBe(0.5);
        expect(index_js_1.Angle.toTurn(-180, index_js_1.AngleUnits.Deg)).toBe(-0.5);
    });
    test('from Rad', function () {
        expect(index_js_1.Angle.toTurn(Math.PI * 2, index_js_1.AngleUnits.Rad)).toBe(1);
        expect(index_js_1.Angle.toTurn(0, index_js_1.AngleUnits.Rad)).toBe(0);
        expect(index_js_1.Angle.toTurn(Math.PI, index_js_1.AngleUnits.Rad)).toBe(0.5);
        expect(index_js_1.Angle.toTurn(-Math.PI, index_js_1.AngleUnits.Rad)).toBe(-0.5);
    });
});
describe('math.angle.toPositive', function () {
    test('deg', function () {
        expect(index_js_1.Angle.toPositive(0, index_js_1.AngleUnits.Deg)).toBe(0);
        expect(index_js_1.Angle.toPositive(-0, index_js_1.AngleUnits.Deg)).toBe(0);
        expect(index_js_1.Angle.toPositive(-721, index_js_1.AngleUnits.Deg)).toBe(359);
        expect(index_js_1.Angle.toPositive(361, index_js_1.AngleUnits.Deg)).toBe(361);
    });
    test('rad', function () {
        expect(index_js_1.Angle.toPositive(0, index_js_1.AngleUnits.Rad)).toBe(0);
        expect(index_js_1.Angle.toPositive(-0, index_js_1.AngleUnits.Rad)).toBe(0);
        expect(index_js_1.Angle.toPositive(-Math.PI, index_js_1.AngleUnits.Rad)).toBe(Math.PI);
        expect(index_js_1.Angle.toPositive(-(Math.PI * 3), index_js_1.AngleUnits.Rad)).toBe(Math.PI);
    });
    test('turn', function () {
        expect(index_js_1.Angle.toPositive(0, index_js_1.AngleUnits.Turn)).toBe(0);
        expect(index_js_1.Angle.toPositive(-0, index_js_1.AngleUnits.Turn)).toBe(0);
        expect((0, index_js_1.approximately)(index_js_1.Angle.toPositive(-1.1, index_js_1.AngleUnits.Turn), 0.9)).toBe(true);
        expect(index_js_1.Angle.toPositive(1.1, index_js_1.AngleUnits.Turn)).toBe(1.1);
    });
});
describe('math.angle.normalize', function () {
    test('deg', function () {
        expect(index_js_1.Angle.normalize(0, index_js_1.AngleUnits.Deg)).toBe(0);
        expect(index_js_1.Angle.normalize(-0, index_js_1.AngleUnits.Deg)).toBe(0);
        expect(index_js_1.Angle.normalize(-721, index_js_1.AngleUnits.Deg)).toBe(359);
        expect(index_js_1.Angle.normalize(721, index_js_1.AngleUnits.Deg)).toBe(1);
        expect(index_js_1.Angle.normalize(361, index_js_1.AngleUnits.Deg)).toBe(1);
        expect(index_js_1.Angle.normalize(360, index_js_1.AngleUnits.Deg)).toBe(0);
        expect(index_js_1.Angle.normalize(-360, index_js_1.AngleUnits.Deg)).toBe(0);
    });
    test('rad', function () {
        expect(index_js_1.Angle.normalize(0, index_js_1.AngleUnits.Rad)).toBe(0);
        expect(index_js_1.Angle.normalize(-0, index_js_1.AngleUnits.Rad)).toBe(0);
        expect(index_js_1.Angle.normalize(-(Math.PI * 3), index_js_1.AngleUnits.Rad)).toBe(Math.PI);
        expect(index_js_1.Angle.normalize(Math.PI * 3, index_js_1.AngleUnits.Rad)).toBe(Math.PI);
        expect((0, index_js_1.approximately)(index_js_1.Angle.normalize(Math.PI * 2 + 0.01, index_js_1.AngleUnits.Rad), 0.01)).toBe(true);
        expect(index_js_1.Angle.normalize(Math.PI * 2, index_js_1.AngleUnits.Rad)).toBe(0);
        expect(index_js_1.Angle.normalize(-Math.PI * 2, index_js_1.AngleUnits.Rad)).toBe(0);
    });
    test('turn', function () {
    });
});
describe('math.angle.toCSS', function () {
    expect(index_js_1.Angle.toCSS(1, index_js_1.AngleUnits.Deg)).toEqual('rotate(1deg)');
    expect(index_js_1.Angle.toCSS(1, index_js_1.AngleUnits.Rad)).toEqual('rotate(1rad)');
    expect(index_js_1.Angle.toCSS(1, index_js_1.AngleUnits.Turn)).toEqual('rotate(1turn)');
    expect(index_js_1.Angle.toCSS(-1, index_js_1.AngleUnits.Deg)).toEqual('rotate(-1deg)');
    expect(index_js_1.Angle.toCSS(-1, index_js_1.AngleUnits.Rad)).toEqual('rotate(-1rad)');
    expect(index_js_1.Angle.toCSS(-1, index_js_1.AngleUnits.Turn)).toEqual('rotate(-1turn)');
    expect(index_js_1.Angle.toCSS(NaN, index_js_1.AngleUnits.Deg)).toEqual('');
    expect(index_js_1.Angle.toCSS(Infinity, index_js_1.AngleUnits.Rad)).toEqual('');
    expect(index_js_1.Angle.toCSS(-Infinity, index_js_1.AngleUnits.Turn)).toEqual('');
    //@ts-ignore
    expect(index_js_1.Angle.toCSS('1e -08', index_js_1.AngleUnits.Deg)).toEqual('');
    //@ts-ignore
    expect(index_js_1.Angle.toCSS(undefined, index_js_1.AngleUnits.Deg)).toEqual('');
    //@ts-ignore
    expect(index_js_1.Angle.toCSS(null, index_js_1.AngleUnits.Deg)).toEqual('');
});
