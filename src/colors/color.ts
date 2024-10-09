export type IColor = {
    red: number,
    green: number,
    blue: number
}

export class Color implements IColor {
    constructor(public red: number, public green: number, public blue: number) {
        this.red = Math.max(Math.min(red, 255), 0)
        this.green = Math.max(Math.min(green, 255), 0)
        this.blue = Math.max(Math.min(blue, 255), 0)
    }

    toCSS() {
        return Color.toCSS(this)
    }

    isEqual(c: IColor) {
        return Color.areEquals(this, c)
    }

    static ofNumber(value: number) {
        return new Color(
            (value & 0xFF0000) >> 16,
            (value & 0xFF00) >> 8,
            value & 0xFF,
        )
    }

    static toNumber(color: IColor) {
        return (((color.red << 16) | color.green) << 16) | color.blue
    }

    static areEquals(c1: IColor, c2: IColor) {
        return Color.toNumber(c1) === Color.toNumber(c2)
    }

    static toCSS(color: IColor) {
        return `rgb(${color.red},${color.green},${color.blue})`
    }

}
