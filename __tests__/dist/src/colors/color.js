"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
var Color = /** @class */ (function () {
    function Color(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.red = Math.max(Math.min(red, 255), 0);
        this.green = Math.max(Math.min(green, 255), 0);
        this.blue = Math.max(Math.min(blue, 255), 0);
    }
    Color.prototype.toCSS = function () {
        return "rgb(".concat(this.red, ", ").concat(this.green, ", ").concat(this.blue, ")");
    };
    return Color;
}());
exports.Color = Color;
