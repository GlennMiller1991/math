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

    test('translate identity', () => {
        expect(Matrix3d.translateIdentity(-5)[9]).toBe(-5)
        expect(Matrix3d.translateIdentity(0, -5)[10]).toBe(-5)
        expect(Matrix3d.translateIdentity(0, 0, -5)[11]).toBe(-5)
        const res = Matrix3d.translateIdentity(2, -5, 0.1)
        expect(res[9]).toBe(2)
        expect(res[10]).toBe(-5)
        expect(res[11]).toBe(0.1)
    })

    test('translate', () => {
        matrix = Matrix3d.translateIdentity(2, -5, 0.1)
        let res: IMatrix3d

        let add = 5
        res = Matrix3d.translate(matrix, add)
        expect(Matrix3d.isApproximatelyEqual(matrix, res)).not.toBe(true)
        expect(res[9]).toBe(matrix[9] + add)
        expect(res[10]).toBe(matrix[10])
        expect(res[11]).toBe(matrix[11])

        add = -0.5
        matrix = res
        res = Matrix3d.translate(matrix, 0, add)
        expect(res[9]).toBe(matrix[9])
        expect(res[10]).toBe(matrix[10] + add)
        expect(res[11]).toBe(matrix[11])

        add = 3.4
        matrix = res
        res = Matrix3d.translate(matrix, 0, 0, add)
        expect(res[9]).toBe(matrix[9])
        expect(res[10]).toBe(matrix[10])
        expect(res[11]).toBe(matrix[11] + add)
    })
})