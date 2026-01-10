import type { IPoint2 } from "../../figures/index.ts"
import {BaseGradient} from "./base.gradient.ts";

export class ConicGradient extends BaseGradient {

    /**
     * Для использования метода, углы  должны быть в Turn единицах измерения
     */
    toCanvas(ctx: CanvasRenderingContext2D, center: IPoint2) {
        const gradient = ctx.createConicGradient(0, ...center as [number, number])
        for (let color of this.colors) {
            gradient.addColorStop(color.percentage, color.color.toString())
        }

        return gradient
    }

    /**
     * Для использования метода, углы  должны быть в Turn единицах измерения
     */
    toCSS() {
        let s = ''

        for (let color of this.colors) {
            if (s) s += ','
            s += `rgb(${color.color.red},${color.color.green},${color.color.blue})`
        }

        s = `conic-gradient(in srgb from 0.25turn at 50% 50%, ${s})`
        return s
    }

}