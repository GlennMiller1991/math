import type { INonEmptyArray } from "../type.utils.ts";

export type IControlPoint = {
    controlPoint: number,
    value: number
}
export class LinearInterpolation {

    static interpolateArray(atPoint: number, controlPoints: INonEmptyArray<IControlPoint>) {
        let cp: IControlPoint
        let cpNext: IControlPoint
        for (let i = 0; i < controlPoints.length - 1; i++) {
            cp = controlPoints[i]
            cpNext = controlPoints[i + 1]
            if (cp.controlPoint === atPoint) return cp.value
            if (cpNext.controlPoint === atPoint) return cpNext.value
            if (
                (cp.controlPoint > atPoint && cpNext.controlPoint < atPoint) ||
                (cp.controlPoint < atPoint && cpNext.controlPoint > atPoint)
            ) {
                return LinearInterpolation.interpolateBetween(cp, cpNext, atPoint);
            }
        }

        return undefined
    }

    static interpolateBetween(start: IControlPoint, end: IControlPoint, atPoint: number) {
        const coef = (atPoint - start.controlPoint) / (end.controlPoint - start.controlPoint);
        return (end.value - start.value) * coef + start.value
    }

}