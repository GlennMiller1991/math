import type { IFixedLengthArray, INonEmptyArray } from "../type.utils.js";

export type IMatrix3d = IFixedLengthArray<12, number>

export const identityMatrix3d: IMatrix3d = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
Object.freeze(identityMatrix3d)

export class Matrix3d {
    static multiply(first: IMatrix3d, ...rest: INonEmptyArray<IMatrix3d>) {
        for (let second of rest) {
            
        }   
    }
}
