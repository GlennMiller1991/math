import type { IPoint2 } from "./index.js";
import { Matrix2d, type IMatrix2d } from "../index.js";

export class Circle {
    constructor(public center: IPoint2, public r: number) {

    }

    transform(matrix: IMatrix2d) {
        this.center = Matrix2d.apply(matrix, this.center)
    }
}