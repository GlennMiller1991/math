import { validateType } from "../type.utils.ts"
import { normalizeShade } from './utils.ts';

export class Color {
    constructor(private _red: number, private _green: number, private _blue: number, private _alpha = 255) {
        this.red = _red
        this.green = _green
        this.blue = _blue
        this.alpha = _alpha
    }

    set red(value: number) {
        this._red = Math.max(Math.min(Math.round(value), 255), 0)
    }

    set green(value: number) {
        this._green = Math.max(Math.min(Math.round(value), 255), 0)
    }
    
    set blue(value: number) {
        this._blue = Math.max(Math.min(Math.round(value), 255), 0)
    }

    set alpha(value: number) {
        this._alpha = Math.max(Math.min(Math.round(value), 255), 0)
    }

    get red() {
        return this._red
    }

    get green() {
        return this._green
    }

    get blue() {
        return this._blue
    }

    get alpha() {
        return this._alpha
    }

    [Symbol.toPrimitive]() {
        return this.toString()
    }

    toString(format: Parameters<typeof Color.representation>[1] = 'hex') {
        return Color.representation(this, format)
    }

    toNumber() {
        return Color.toNumber(this)
    }

    isEqual(c: Color) {
        return Color.areEquals(this, c)
    }

    static ofNumber(value: number) {
        return new Color(
            (value & 0xFF0000) >> 16,
            (value & 0xFF00) >> 8,
            value & 0xFF,
        )
    }

    static ofNumberAlpha(value: number) {
        return new Color(
            (value & 0xFF0000) >> 24,
            (value & 0xFF0000) >> 16,
            (value & 0xFF00) >> 8,
            value & 0xFF,
        )
    }

    static toNumber(color: Color) {
        return (((color.red << 16) | color.green) << 16) | color.blue
    }

    static areEquals(c1: Color, c2: Color) {
        return Color.toNumber(c1) === Color.toNumber(c2)
    }

    static representation(color: Color, format: 'rgba' | 'hex' = 'hex') {
        switch (format) {
            case "rgba":
                return `rgba(${color.red},${color.green},${color.blue},${normalizeShade(color.alpha)})`
            case "hex":
                return `#${color.red.toString(16)}${color.green.toString(16)}${color.blue.toString(16)}${color.alpha.toString(16)}`
            default:
                validateType(format)
        }
    }

}
