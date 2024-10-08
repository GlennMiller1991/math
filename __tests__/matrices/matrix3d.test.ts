import { approximately, identityMatrix3d, Matrix3d, type IMatrix3d } from "../../src"

describe('Matrix3d', () => {
    let matrix: IMatrix3d

    test('identity matrix should be freezed', () => {
        matrix = [...identityMatrix3d]
        const assign = () => identityMatrix3d[1] = 4
        expect(assign).toThrow();
        expect(matrix).toEqual(identityMatrix3d)
    })

    test('multiply', () => {
        expect(Matrix3d.multiply(identityMatrix3d, identityMatrix3d)).toEqual(identityMatrix3d)

        matrix = [2, 1, -1, 0.5, 2, -1, 0, 0, -1, 0, 0, 0]
        let res: IMatrix3d

        res = Matrix3d.multiply(matrix, identityMatrix3d)
        expect(Matrix3d.isApproximatelyEqual(res, matrix)).toBe(true)

        res = Matrix3d.multiply(matrix, matrix)
        expect(Matrix3d.isApproximatelyEqual(res, [4.5, 4, -2, 2, 4.5, -1.5, 0, 0, 1, 0, 0, 0])).toBe(true)
    })
})