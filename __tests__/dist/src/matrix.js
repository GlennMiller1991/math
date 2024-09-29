"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix2d = exports.identityMatrix = void 0;
exports.getIdentityMatrix = getIdentityMatrix;
var index_js_1 = require("./index.js");
exports.identityMatrix = [1, 0, 0, 1, 0, 0];
function getIdentityMatrix() {
    return [1, 0, 0, 1, 0, 0];
}
/**
 * Класс операций над матрицами двумерного пространства.
 *
 * Матрица двумерного пространства характеризуется тремя столбцами и тремя строками.
 * Однако в реализации, так как двумерное простраснтво не обладает осью Z, третья строка усечена,
 * оставшиеся две строки и три столбца собраны в плоский массив, где:
 * m[0], m[1] разложение вектора X по осям X/Y
 * m[2], m[3] разложение вектора Y по осям X/Y
 * m[4], m[5] разложение вектора Z по осям X/Y для проективных плоскостей.
 * При этом условное смещение по оси Z для проектинвых плоскостей равна единице
 * То есть полный вид матрицы бы выглядел следующим образом
 * [
 *      [1, 0, 0],
 *      [0, 1, 0],
 *      [0, 0, 1],
 * ],
 * после усечения
 * [
 *      [1, 0, 0],
 *      [0, 1, 0],
 * ]
 * и в реализации
 * [
 *      1, 0, 0, 1, 0, 0
 * ]
 */
var Matrix2d = /** @class */ (function () {
    function Matrix2d() {
    }
    /**
     * Последовательное наложение матриц трансформации к результату
     * предыдущего наложения. По сути, умножение двух и более матриц
     *
     * Умножение двух матриц суть применение трансформации к трансформации, при этом
     * порядок при умножении важен - m1 * m2 !== m2 * m1
     *
     * Первая переданная матрица - первый трансформ, и далее последовательное наложение трансформов
     */
    Matrix2d.multiply = function (matrix) {
        var matrices = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            matrices[_i - 1] = arguments[_i];
        }
        for (var _a = 0, matrices_1 = matrices; _a < matrices_1.length; _a++) {
            var m = matrices_1[_a];
            matrix = [
                matrix[0] * m[0] + matrix[2] * m[1],
                matrix[1] * m[0] + matrix[3] * m[1],
                matrix[0] * m[2] + matrix[2] * m[3],
                matrix[1] * m[2] + matrix[3] * m[3],
                matrix[0] * m[4] + matrix[2] * m[5] + matrix[4],
                matrix[1] * m[4] + matrix[3] * m[5] + matrix[5],
            ];
        }
        return matrix;
    };
    Matrix2d.apply = function (matrix, point) {
        return [
            matrix[0] * point[0] + matrix[2] * point[1] + matrix[4],
            matrix[1] * point[0] + matrix[3] * point[1] + matrix[5],
        ];
    };
    Matrix2d.scaleIdentity = function (x, y) {
        if (y === void 0) { y = x; }
        return [x, 0, 0, y, 0, 0];
    };
    Matrix2d.scale = function (m, x, y) {
        if (y === void 0) { y = x; }
        return Matrix2d.multiply(m, Matrix2d.scaleIdentity(x, y));
    };
    Matrix2d.rotateIdentity = function (angle, units) {
        if (units === void 0) { units = index_js_1.AngleUnits.Deg; }
        angle = index_js_1.Angle.toRad(angle, units);
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        return [cos, sin, -sin, cos, 0, 0];
    };
    Matrix2d.rotate = function (m, angle, units) {
        if (units === void 0) { units = index_js_1.AngleUnits.Deg; }
        return Matrix2d.multiply(m, Matrix2d.rotateIdentity(angle, units));
    };
    Matrix2d.translateIdentity = function (x, y) {
        if (y === void 0) { y = 0; }
        return [1, 0, 0, 1, x, y];
    };
    Matrix2d.translate = function (m, x, y) {
        if (y === void 0) { y = 0; }
        return Matrix2d.multiply(m, Matrix2d.translateIdentity(x, y));
    };
    Matrix2d.translateX = function (m, x) {
        return Matrix2d.multiply(m, this.translateIdentity(x));
    };
    Matrix2d.translateY = function (m, y) {
        return Matrix2d.multiply(m, this.translateIdentity(0, y));
    };
    Matrix2d.skewIdentity = function (x, y, units) {
        if (units === void 0) { units = index_js_1.AngleUnits.Deg; }
        x = index_js_1.Angle.toRad(x, units);
        y = index_js_1.Angle.toRad(y, units);
        x = Math.tan(x);
        y = Math.tan(y);
        return [1, y, x, 1, 0, 0];
    };
    Matrix2d.skewX = function (m, x, units) {
        if (units === void 0) { units = index_js_1.AngleUnits.Deg; }
        return Matrix2d.multiply(m, Matrix2d.skewIdentity(x, 0, units));
    };
    Matrix2d.skewY = function (m, y, units) {
        if (units === void 0) { units = index_js_1.AngleUnits.Deg; }
        return Matrix2d.multiply(m, Matrix2d.skewIdentity(0, y, units));
    };
    Matrix2d.skew = function (m, x, y, units) {
        if (y === void 0) { y = 0; }
        if (units === void 0) { units = index_js_1.AngleUnits.Deg; }
        return Matrix2d.multiply(m, Matrix2d.skewIdentity(x, y, units));
    };
    return Matrix2d;
}());
exports.Matrix2d = Matrix2d;
