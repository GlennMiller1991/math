"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point2 = void 0;
/**
 * Точка/вектор
 */
var Point2 = /** @class */ (function () {
    function Point2() {
    }
    Point2.sum = function (p1, p2) {
        return [
            p1[0] + p2[0],
            p1[1] + p2[1],
        ];
    };
    Point2.scale = function (v, factor) {
        return [
            v[0] * factor,
            v[1] * factor,
        ];
    };
    return Point2;
}());
exports.Point2 = Point2;
