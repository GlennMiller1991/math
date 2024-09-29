"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Angle = exports.AngleUnits = void 0;
var utils_js_1 = require("./utils.js");
var AngleUnits;
(function (AngleUnits) {
    AngleUnits[AngleUnits["Deg"] = 0] = "Deg";
    AngleUnits[AngleUnits["Rad"] = 1] = "Rad";
    AngleUnits[AngleUnits["Turn"] = 2] = "Turn";
})(AngleUnits || (exports.AngleUnits = AngleUnits = {}));
var Angle = /** @class */ (function () {
    function Angle() {
    }
    // #region Converters
    /**
     * Угол к радианам
     */
    Angle.toRad = function (angle, unit) {
        if (unit === void 0) { unit = AngleUnits.Deg; }
        switch (unit) {
            case AngleUnits.Rad:
                return angle;
            case AngleUnits.Deg:
                return angle * Math.PI / 180;
            case AngleUnits.Turn:
                return Math.PI * 2 * angle;
        }
    };
    /**
     * Угол к оборотам
     */
    Angle.toTurn = function (angle, unit) {
        if (unit === void 0) { unit = AngleUnits.Deg; }
        switch (unit) {
            case AngleUnits.Turn:
                return angle;
            case AngleUnits.Deg:
                return angle / 360;
            case AngleUnits.Rad:
                return angle / (Math.PI * 2);
        }
    };
    /**
    * Угол к градусам
    */
    Angle.toDeg = function (angle, unit) {
        if (unit === void 0) { unit = AngleUnits.Rad; }
        switch (unit) {
            case AngleUnits.Deg:
                return angle;
            case AngleUnits.Turn:
                return angle * 360;
            case AngleUnits.Rad:
                return angle * 180 / Math.PI;
        }
    };
    /**
     * Привести угол к положительному значению и нормализовать
     */
    Angle.toPositive = function (angle, unit) {
        switch (unit) {
            case AngleUnits.Deg:
                return (0, utils_js_1.toPositive)(angle, 360);
            case AngleUnits.Turn:
                return (0, utils_js_1.toPositive)(angle, 1);
            case AngleUnits.Rad:
                return (0, utils_js_1.toPositive)(angle, Math.PI * 2);
        }
    };
    /**
     * Привести угол к стандантному диапазону
     *
     * Для градусов [0; 360)
     * Для радианов [0; Math.Pi * 2)
     * Для оборотов [0; 1)
     */
    Angle.normalize = function (angle, unit) {
        switch (unit) {
            // 0 - 359.9999
            case AngleUnits.Deg:
                return Angle.toPositive(angle, unit) % 360;
            // 0 - Math.PI * 2
            case AngleUnits.Rad:
                return Angle.toPositive(angle, unit) % (Math.PI * 2);
            // 0 - 1
            case AngleUnits.Turn:
                return Angle.toPositive(angle, unit) % 1;
        }
    };
    // #endregion Converters
    // #region representation
    /**
     * From angle to string "rotate({angle}{units})"
     */
    Angle.toCSS = function (angle, unit) {
        if (!(0, utils_js_1.isCorrectNumber)(angle))
            return '';
        return "rotate(".concat(angle).concat(Angle.angleUnitCorrespondence[unit], ")");
    };
    Angle.angleUnitCorrespondence = (_a = {},
        _a[AngleUnits.Rad] = 'rad',
        _a[AngleUnits.Turn] = 'turn',
        _a[AngleUnits.Deg] = 'deg',
        _a);
    return Angle;
}());
exports.Angle = Angle;
