import type { INonEmptyArray } from "../type.utils.js";

export type IControlPoint = {
    controlPoint: number,
    value: number
}
export class LinearInterpolation {


    static interpolate(atPoint: number, ...controlPoints: INonEmptyArray<IControlPoint>) {

    }

    static interpolateBetween(start: IControlPoint, end: IControlPoint, atPoint: number) {
        const coef = (atPoint - start.controlPoint) / (end.controlPoint - start.controlPoint);
        return (end.value - start.value) * coef + start.value
    }
}