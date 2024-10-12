import { Angle, AngleUnits, approximately, type IPoint3 } from "../../index.js";
import { validateType, type IFixedLengthArray, type INonEmptyArray } from "../type.utils.js";

export type IMatrix3d = IFixedLengthArray<12, number>

export const identityMatrix3d: IMatrix3d = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
Object.freeze(identityMatrix3d)

export class Matrix3d {
    static multiply(matrix: IMatrix3d, ...rest: INonEmptyArray<IMatrix3d>) {
        for (let m of rest) {
            matrix = [
                m[0] * matrix[0] + m[1] * matrix[3] + m[2] * matrix[6],
                m[0] * matrix[1] + m[1] * matrix[4] + m[2] * matrix[7],
                m[0] * matrix[2] + m[1] * matrix[5] + m[2] * matrix[8],

                m[3] * matrix[0] + m[4] * matrix[3] + m[5] * matrix[6],
                m[3] * matrix[1] + m[4] * matrix[4] + m[5] * matrix[7],
                m[3] * matrix[2] + m[4] * matrix[5] + m[5] * matrix[8],

                m[6] * matrix[0] + m[7] * matrix[3] + m[8] * matrix[6],
                m[6] * matrix[1] + m[7] * matrix[4] + m[8] * matrix[7],
                m[6] * matrix[2] + m[7] * matrix[5] + m[8] * matrix[8],


                m[9] * matrix[0] + m[10] * matrix[3] + m[11] * matrix[6] + matrix[9],
                m[9] * matrix[1] + m[10] * matrix[4] + m[11] * matrix[7] + matrix[10],
                m[9] * matrix[2] + m[10] * matrix[5] + m[11] * matrix[8] + matrix[11],
            ]
        }

        return matrix
    }

    static apply(matrix: IMatrix3d, point: IPoint3): IPoint3 {
        return [
            point[0] * matrix[0] + point[1] * matrix[3] + point[2] * matrix[6] + matrix[9],
            point[0] * matrix[1] + point[1] * matrix[4] + point[2] * matrix[7] + matrix[10],
            point[0] * matrix[2] + point[1] * matrix[5] + point[2] * matrix[8] + matrix[11],
        ]
    }

    static translateIdentity(x: number, y = 0, z = 0): IMatrix3d {
        return [
            1, 0, 0, 0, 1, 0, 0, 0, 1, x, y, z
        ]
    }

    static scaleIdentity(x: number, y = 1, z = 1): IMatrix3d {
        return [
            x, 0, 0, 0, y, 0, 0, 0, z, 0, 0, 0
        ]
    }

    static rotateIdentityX(value: number, unit: AngleUnits = AngleUnits.Deg): IMatrix3d {
        value = Angle.toRad(value, unit)
        const cos = Math.cos(value)
        const sin = Math.sin(value)
        return [1, 0, 0, 0, cos, sin, 0, -sin, cos, 0, 0, 0]
    }

    static rotateIdentityY(value: number, unit: AngleUnits = AngleUnits.Deg): IMatrix3d {
        value = Angle.toRad(value, unit)
        const cos = Math.cos(value)
        const sin = Math.sin(value)
        return [cos, 0, -sin, 0, 1, 0, sin, 0, cos, 0, 0, 0]
    }

    static rotateIdentityZ(value: number, unit: AngleUnits = AngleUnits.Deg): IMatrix3d {
        value = Angle.toRad(value, unit)
        const cos = Math.cos(value)
        const sin = Math.sin(value)
        return [cos, sin, 0, -sin, cos, 0, 0, 0, 1, 0, 0, 0]
    }

    static translate(m: IMatrix3d, x: number, y = 0, z = 0): IMatrix3d {
        return Matrix3d.multiply(m, Matrix3d.translateIdentity(x, y, z))
    }

    static translateX(m: IMatrix3d, x: number): IMatrix3d {
        return Matrix3d.translate(m, x)
    }

    static translateY(m: IMatrix3d, y: number): IMatrix3d {
        return Matrix3d.translate(m, 0, y)
    }

    static translateZ(m: IMatrix3d, z: number): IMatrix3d {
        return Matrix3d.translate(m, 0, 0, z)
    }

    static scale(m: IMatrix3d, x: number, y?: number, z?: number): IMatrix3d {
        return Matrix3d.multiply(
            m,
            Matrix3d.scaleIdentity(x, y, z),
        )
    }

    static scaleX(m: IMatrix3d, x: number): IMatrix3d {
        return Matrix3d.scale(m, x)
    }

    static scaleY(m: IMatrix3d, y: number): IMatrix3d {
        return Matrix3d.scale(m, 1, y)
    }

    static scaleZ(m: IMatrix3d, z: number): IMatrix3d {
        return Matrix3d.scale(m, 1, 1, z)
    }

    static rotateX(m: IMatrix3d, angle: number, units: AngleUnits = AngleUnits.Deg) {
        return Matrix3d.multiply(
            m,
            Matrix3d.rotateIdentityX(angle, units),
        )
    }

    static rotateY(m: IMatrix3d, angle: number, units: AngleUnits = AngleUnits.Deg) {
        return Matrix3d.multiply(
            m,
            Matrix3d.rotateIdentityY(angle, units)
        )
    }

    static rotateZ(m: IMatrix3d, angle: number, units: AngleUnits = AngleUnits.Deg) {
        return Matrix3d.multiply(
            m,
            Matrix3d.rotateIdentityZ(angle, units)
        )
    }

    static isApproximatelyEqual(m1: IMatrix3d, m2: IMatrix3d, withPrecision?: number) {
        return m1.every((element, index) => approximately(element, m2[index], withPrecision))
    }

    static isEqual(m1: IMatrix3d, m2: IMatrix3d) {
        return m1.every((element, index) => element === m2[index])
    }

    static determinant(m: IMatrix3d) {
        return m[0] * m[4] * m[8] +
            m[3] * m[7] * m[2] +
            m[6] * m[1] * m[5] -
            m[6] * m[4] * m[2] -
            m[3] * m[1] * m[8] -
            m[0] * m[7] * m[5]
    }

    static multiplyByNumber(m: IMatrix3d, value: number): IMatrix3d {
        return m.map(c => c * value) as IMatrix3d
    }

    private static minors = [
        (m: IMatrix3d) => m[4] * m[8] - m[7] * m[5],
        (m: IMatrix3d) => m[1] * m[8] - m[7] * m[2],
        (m: IMatrix3d) => m[1] * m[5] - m[4] * m[2],
        (m: IMatrix3d) => m[3] * m[8] - m[9] * m[5],
        (m: IMatrix3d) => m[0] * m[8] - m[9] * m[2],
        (m: IMatrix3d) => m[0] * m[4] - m[3] * m[2],
        (m: IMatrix3d) => m[3] * m[7] - m[6] * m[4],
        (m: IMatrix3d) => m[0] * m[7] - m[1] * m[6],
        (m: IMatrix3d) => m[0] * m[4] - m[1] * m[3],
        (m: IMatrix3d) => m[3] * m[7] * m[11] +
            m[6] * m[10] * m[5] +
            m[9] * m[4] * m[8] -
            m[9] * m[7] * m[5] -
            m[6] * m[4] * m[11] -
            m[3] * m[10] * m[8],
        (m: IMatrix3d) => m[0] * m[4] * m[11] +
            m[6] * m[10] * m[2] +
            m[9] * m[1] * m[8] -
            m[0] * m[10] * m[8] -
            m[9] * m[7] * m[2] -
            m[6] * m[1] * m[11],
        (m: IMatrix3d) => m[0] * m[4] * m[11] +
            m[3] * m[10] * m[2] +
            m[9] * m[1] * m[5] -
            m[9] * m[4] * m[2] -
            m[3] * m[1] * m[11] -
            m[0] * m[1] * m[5]
    ]
}
