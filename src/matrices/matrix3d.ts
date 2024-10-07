import { approximately } from "../../index.js";
import type { IFixedLengthArray, INonEmptyArray } from "../type.utils.js";

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

    static isApproximatelyEqual(m1: IMatrix3d, m2: IMatrix3d) {
        return (
            approximately(m1[0], m2[0]) &&
            approximately(m1[1], m2[1]) &&
            approximately(m1[2], m2[2]) &&
            approximately(m1[3], m2[3]) &&
            approximately(m1[4], m2[4]) &&
            approximately(m1[5], m2[5]) &&
            approximately(m1[6], m2[6]) &&
            approximately(m1[7], m2[7]) &&
            approximately(m1[8], m2[8]) &&
            approximately(m1[9], m2[9]) &&
            approximately(m1[10], m2[10]) &&
            approximately(m1[11], m2[11])
        )
    }

    static isEqual(m1: IMatrix3d, m2: IMatrix3d) {
        return (
            m1[0], m2[0] &&
            m1[1], m2[1] &&
            m1[2], m2[2] &&
            m1[3], m2[3] &&
            m1[4], m2[4] &&
            m1[5], m2[5] &&
            m1[6], m2[6] &&
            m1[7], m2[7] &&
            m1[8], m2[8] &&
            m1[9], m2[9] &&
            m1[10], m2[10] &&
            m1[11], m2[11]
        )
    }
}
