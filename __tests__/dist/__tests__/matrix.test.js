"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../index.js");
describe('Matrix', function () {
    var matrix;
    test('should be the same', function () {
        matrix = index_js_1.identityMatrix;
        matrix = index_js_1.Matrix2d.multiply(matrix, index_js_1.identityMatrix);
        expect(matrix).toEqual(index_js_1.identityMatrix);
        expect(matrix).not.toBe(index_js_1.identityMatrix);
    });
    test('transform', function () {
        matrix = index_js_1.identityMatrix;
        // translate x 10
        matrix = index_js_1.Matrix2d.translate(matrix, 10);
        expect(matrix).toEqual([1, 0, 0, 1, 10, 0]);
        // translate x 10
        matrix = index_js_1.Matrix2d.translate(matrix, 10);
        expect(matrix).not.toEqual([1, 0, 0, 1, 10, 0]);
        expect(matrix[4]).toBe(20);
        // translate y 1
        matrix = index_js_1.Matrix2d.translate(matrix, 0, 1);
        expect(matrix[4]).toBe(20);
        expect(matrix[5]).toBe(1);
        // zoom at 0 0 by 2
        matrix = index_js_1.Matrix2d.scale(matrix, 2);
        expect(matrix[0]).toBe(2);
        expect(matrix[1]).toBe(0);
        expect(matrix[2]).toBe(0);
        expect(matrix[3]).toBe(2);
        expect(matrix[4]).toBe(20);
        expect(matrix[5]).toBe(1);
        // rotate at 0 0 by 90 deg
        matrix = index_js_1.Matrix2d.rotate(matrix, 90);
        expect((0, index_js_1.approximately)(matrix[0], 0)).toBe(true);
        expect((0, index_js_1.approximately)(matrix[1], 2)).toBe(true);
        expect((0, index_js_1.approximately)(matrix[2], -2)).toBe(true);
        expect((0, index_js_1.approximately)(matrix[3], 0)).toBe(true);
        expect((0, index_js_1.approximately)(matrix[4], 20)).toBe(true);
        expect((0, index_js_1.approximately)(matrix[5], 1)).toBe(true);
        matrix = index_js_1.Matrix2d.rotateIdentity(45);
        expect((0, index_js_1.approximately)(matrix[0], matrix[1])).toBe(true);
        expect((0, index_js_1.approximately)(matrix[2], -matrix[3])).toBe(true);
        matrix = index_js_1.Matrix2d.skewIdentity(-45, 0);
        expect((0, index_js_1.approximately)(matrix[3], 1)).toBe(true);
    });
});
