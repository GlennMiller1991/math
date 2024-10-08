import type { IPoint2 } from "./index.js"
import { Matrix2d, type IMatrix2d } from "../index.js"

export class StraightLine {
    constructor(public p1: IPoint2, public p2: IPoint2) {

    }

    transform(matrix: IMatrix2d, transformThis = false) {
        if (transformThis) {
            return this
        }
        return new StraightLine(Matrix2d.apply(matrix, this.p1), Matrix2d.apply(matrix, this.p2))
    }
}