import type { IPoint2 } from "./point.ts";
import { Matrix2d, type IMatrix2d } from "../matrices/index.ts";

export class Circle {
    constructor(public center: IPoint2, public r: number) {

    }

    transform(matrix: IMatrix2d) {
        this.center = Matrix2d.apply(matrix, this.center)
    }
}