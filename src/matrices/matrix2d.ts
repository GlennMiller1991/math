import {IPoint2} from "../figures/index.ts";
import {IFixedLengthArray} from "../type.utils.ts";
import {Angle, AngleUnits} from "../angle.ts";
import {approximately} from "../utils.ts";

export type IMatrix2d = IFixedLengthArray<6, number>

export const identityMatrix2d: IMatrix2d = Object.freeze([1, 0, 0, 1, 0, 0]) as IMatrix2d;

export function getIdentityMatrix(): IMatrix2d {
    return [1, 0, 0, 1, 0, 0]
}

export class Matrix2d {

    static multiply(matrix: IMatrix2d, ...matrices: IMatrix2d[]) {
        for (let m of matrices) {
            matrix = [
                matrix[0] * m[0] + matrix[2] * m[1],
                matrix[1] * m[0] + matrix[3] * m[1],
                matrix[0] * m[2] + matrix[2] * m[3],
                matrix[1] * m[2] + matrix[3] * m[3],
                matrix[0] * m[4] + matrix[2] * m[5] + matrix[4],
                matrix[1] * m[4] + matrix[3] * m[5] + matrix[5],
            ]
        }

        return matrix
    }

    static apply(matrix: IMatrix2d, point: IPoint2): IPoint2 {
        return [
            matrix[0] * point[0] + matrix[2] * point[1] + matrix[4],
            matrix[1] * point[0] + matrix[3] * point[1] + matrix[5],
        ]
    }

    static scaleIdentity(x: number, y: number = x): IMatrix2d {
        return [x, 0, 0, y, 0, 0]
    }

    static scale(m: IMatrix2d, x: number, y: number = x): IMatrix2d {
        return Matrix2d.multiply(m, Matrix2d.scaleIdentity(x, y))
    }

    static rotateIdentity(angle: number, units = AngleUnits.Deg): IMatrix2d {
        angle = Angle.toRad(angle, units)
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        return [cos, sin, -sin, cos, 0, 0]
    }

    static rotate(m: IMatrix2d, angle: number, units = AngleUnits.Deg): IMatrix2d {
        return Matrix2d.multiply(m, Matrix2d.rotateIdentity(angle, units))
    }

    static translateIdentity(x: number, y: number = 0): IMatrix2d {
        return [1, 0, 0, 1, x, y]
    }

    static translate(m: IMatrix2d, x: number, y: number = 0): IMatrix2d {
        return Matrix2d.multiply(m, Matrix2d.translateIdentity(x, y))
    }

    static translateX(m: IMatrix2d, x: number): IMatrix2d {
        return Matrix2d.multiply(m, this.translateIdentity(x))
    }

    static translateY(m: IMatrix2d, y: number): IMatrix2d {
        return Matrix2d.multiply(m, this.translateIdentity(0, y))
    }

    static skewIdentity(x: number, y: number, units = AngleUnits.Deg): IMatrix2d {
        x = Angle.toRad(x, units)
        y = Angle.toRad(y, units)
        x = Math.tan(x)
        y = Math.tan(y)
        return [1, -y, -x, 1, 0, 0]
    }

    static skewX(m: IMatrix2d, x: number, units = AngleUnits.Deg): IMatrix2d {
        return Matrix2d.multiply(m, Matrix2d.skewIdentity(x, 0, units))
    }

    static skewY(m: IMatrix2d, y: number, units = AngleUnits.Deg): IMatrix2d {
        return Matrix2d.multiply(m, Matrix2d.skewIdentity(0, y, units))
    }

    static skew(m: IMatrix2d, x: number, y = 0, units = AngleUnits.Deg): IMatrix2d {
        return Matrix2d.multiply(m, Matrix2d.skewIdentity(x, y, units))
    }

    static isApproximatelyEqual(m1: IMatrix2d, m2: IMatrix2d) {
        return m1.every((element, index) => approximately(element, m2[index]))
    }

    static isEqual(m1: IMatrix2d, m2: IMatrix2d) {
        return m1.every((element, index) => element === m2[index])
    }

    static determinant(m: IMatrix2d) {
        return m[0] * m[3] - m[1] * m[2]
    }

    static multiplyByNumber(m: IMatrix2d, value: number): IMatrix2d {
        return m.map((c) => c * value) as IMatrix2d
    }

    static invert(m: IMatrix2d): IMatrix2d {
        const d = Matrix2d.determinant(m)
        if (!d) return [0, 0, 0, 0, 0, 0]
        return Matrix2d.multiplyByNumber(
            m.map((c, i) => Matrix2d.adjoints[i](m)) as IMatrix2d,
            1 / d)
    }

    private static adjoints = [
        (m: IMatrix2d) => Matrix2d.minors[0](m),
        (m: IMatrix2d) => -Matrix2d.minors[1](m),
        (m: IMatrix2d) => -Matrix2d.minors[2](m),
        (m: IMatrix2d) => Matrix2d.minors[3](m),
        (m: IMatrix2d) => Matrix2d.minors[4](m),
        (m: IMatrix2d) => -Matrix2d.minors[5](m)
    ]

    private static minors = [
        (m: IMatrix2d) => m[3],
        (m: IMatrix2d) => m[1],
        (m: IMatrix2d) => m[2],
        (m: IMatrix2d) => m[0],
        (m: IMatrix2d) => m[2] * m[5] - m[4] * m[3],
        (m: IMatrix2d) => m[0] * m[5] - m[4] * m[1]
    ]
}