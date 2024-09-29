"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
var index_js_1 = require("../index.js");
var Circle = /** @class */ (function () {
    function Circle(center, r) {
        this.center = center;
        this.r = r;
    }
    Circle.prototype.transform = function (matrix) {
        this.center = index_js_1.Matrix2d.apply(matrix, this.center);
    };
    return Circle;
}());
exports.Circle = Circle;
