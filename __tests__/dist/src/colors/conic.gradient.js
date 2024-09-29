"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConicGradient = void 0;
var index_js_1 = require("./index.js");
var ConicGradient = /** @class */ (function () {
    function ConicGradient() {
        var colors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            colors[_i] = arguments[_i];
        }
        this.colors = __spreadArray([], colors, true).sort(function (a, b) { return a.angle - b.angle; });
        this.colors.push({
            angle: 1,
            color: this.colors[0].color
        });
    }
    /**
     * Получить цвет по углу от оси X по часовой стрелке
     * @param angle единица измерения угла должна быть той же самой, что и углы всех передаваемых в констурктор цветов
     */
    ConicGradient.prototype.getColorAtAngle = function (angle) {
        var prev = undefined;
        var next = undefined;
        for (var _i = 0, _a = this.colors; _i < _a.length; _i++) {
            var color = _a[_i];
            if (color.angle === angle)
                return color.color;
            if (color.angle < angle)
                prev = color;
            if (color.angle > angle) {
                next = color;
                break;
            }
        }
        if (!prev || !next)
            return undefined;
        var coef = (angle - prev.angle) / (next.angle - prev.angle);
        return new index_js_1.Color(Math.floor((next.color.red - prev.color.red) * coef + prev.color.red), Math.floor((next.color.green - prev.color.green) * coef + prev.color.green), Math.floor((next.color.blue - prev.color.blue) * coef + prev.color.blue));
    };
    ConicGradient.prototype.getAngleByColor = function (color) {
        var prev;
        var next = this.colors[0];
        if (color.red === next.color.red && color.green === next.color.green && color.blue === next.color.blue)
            return next.angle;
        for (var i = 1; i < this.colors.length; i++) {
            next = this.colors[i];
            prev = this.colors[i - 1];
            if (color.red === next.color.red && color.green === next.color.green && color.blue === next.color.blue)
                return next.angle;
            var redDif = next.color.red - prev.color.red;
            var greenDif = next.color.green - prev.color.green;
            var blueDif = next.color.blue - prev.color.blue;
            var redDifColor = color.red - prev.color.red;
            var greenDifColor = color.green - prev.color.green;
            var blueDifColor = color.blue - prev.color.blue;
            if (((redDifColor >= 0 && redDifColor <= redDif) || (redDifColor <= 0 && redDifColor >= redDif)) &&
                ((greenDifColor >= 0 && greenDifColor <= greenDif) || (greenDifColor <= 0 && greenDifColor >= greenDif)) &&
                ((blueDifColor >= 0 && blueDifColor <= blueDif) || (blueDifColor <= 0 && blueDifColor >= blueDif))) {
                var redCoef = ((color.red - prev.color.red) / (next.color.red - prev.color.red));
                var greenCoef = ((color.green - prev.color.green) / (next.color.green - prev.color.green));
                var blueCoef = ((color.blue - prev.color.blue) / (next.color.blue - prev.color.blue));
                var coefs = [redCoef, greenCoef, blueCoef].filter(Boolean);
                return (next.angle - prev.angle) * Math.min.apply(Math, coefs) + prev.angle;
            }
        }
        return undefined;
    };
    ConicGradient.prototype.isColorInRange = function (color) {
        return Boolean(this.getAngleByColor(color));
    };
    /**
     * Для использования метода, углы  должны быть в Turn единицах измерения
     */
    ConicGradient.prototype.toCanvas = function (ctx, center) {
        var gradient = ctx.createConicGradient.apply(ctx, __spreadArray([0], center, false));
        for (var _i = 0, _a = this.colors; _i < _a.length; _i++) {
            var color = _a[_i];
            gradient.addColorStop(color.angle, color.color.toCSS());
        }
        return gradient;
    };
    /**
     * Для использования метода, углы  должны быть в Turn единицах измерения
     */
    ConicGradient.prototype.toCSS = function () {
        var s = '';
        for (var _i = 0, _a = this.colors; _i < _a.length; _i++) {
            var color = _a[_i];
            if (s)
                s += ',';
            s += "rgb(".concat(color.color.red, ",").concat(color.color.green, ",").concat(color.color.blue, ")");
        }
        s = "conic-gradient(in srgb from 0.25turn at 50% 50%, ".concat(s, ")");
        return s;
    };
    return ConicGradient;
}());
exports.ConicGradient = ConicGradient;
