import {BaseGradient} from "./base.gradient.ts";
import type {IPoint2} from "../../figures/index.ts";

export class LinearGradient extends BaseGradient {
    toCanvas(ctx: CanvasRenderingContext2D, p1: IPoint2, p2: IPoint2) {
        const gradient = ctx.createLinearGradient(...p1, ...p2);
        for (let color of this.colors) {
            gradient.addColorStop(color.percentage, color.color.toString())
        }

        return gradient
    }

    toCSS(direction: string = 'to bottom') {
        let s = ''

        for (let {color} of this.colors) {
            if (s) s += ','
            s += color;
        }

        return `linear-gradient(${direction}, ${s})`
    }

}
