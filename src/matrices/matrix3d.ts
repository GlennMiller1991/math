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

    static rotateIdentity(axis: 'x' | 'y' | 'z', value: number, unit: AngleUnits): IMatrix3d {
        value = Angle.toRad(value, unit)
        const cos = Math.cos(value)
        const sin = Math.sin(value)
        switch (axis) {
            case "x":
                return [1, 0, 0, 0, cos, sin, 0, -sin, cos, 0, 0, 0]
            case "y":
                return [cos, 0, -sin, 0, 1, 0, sin, 0, cos, 0, 0, 0]
            case "z":
                return [cos, sin, 0, -sin, cos, 0, 0, 0, 1, 0, 0, 0]
        }

        validateType(axis)
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
            Matrix3d.rotateIdentity('x', angle, units),
        )
    }

    static rotateY(m: IMatrix3d, angle: number, units: AngleUnits = AngleUnits.Deg) {
        return Matrix3d.multiply(
            m,
            Matrix3d.rotateIdentity('y', angle, units)
        )
    }

    static rotateZ(m: IMatrix3d, angle: number, units: AngleUnits = AngleUnits.Deg) {
        return Matrix3d.multiply(
            m,
            Matrix3d.rotateIdentity('z', angle, units)
        )
    }


    static isApproximatelyEqual(m1: IMatrix3d, m2: IMatrix3d) {
        return m1.every((element, index) => approximately(element, m2[index]))
    }

    static isEqual(m1: IMatrix3d, m2: IMatrix3d) {
        return m1.every((element, index) => element === m2[index])
    }
}
