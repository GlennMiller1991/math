"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StraightLine = void 0;
var index_js_1 = require("../index.js");
var StraightLine = /** @class */ (function () {
    function StraightLine(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
    StraightLine.prototype.transform = function (matrix, transformThis) {
        if (transformThis === void 0) { transformThis = false; }
        if (transformThis) {
            return this;
        }
        return new StraightLine(index_js_1.Matrix2d.apply(matrix, this.p1), index_js_1.Matrix2d.apply(matrix, this.p2));
    };
    return StraightLine;
}());
exports.StraightLine = StraightLine;
