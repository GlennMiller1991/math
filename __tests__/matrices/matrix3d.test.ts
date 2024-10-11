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

    test('scale identity', () => {
        matrix = Matrix3d.scaleIdentity(2)

        expect(Matrix3d.isApproximatelyEqual(matrix, [2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0])).toBe(true)
        matrix = Matrix3d.scaleIdentity(1, 2)
        expect(Matrix3d.isApproximatelyEqual(matrix, [1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0])).toBe(true)
        matrix = Matrix3d.scaleIdentity(1, 1, 2)
        expect(Matrix3d.isApproximatelyEqual(matrix, [1, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0])).toBe(true)
    })

    test('scale', () => {
        matrix = Matrix3d.scaleIdentity(2)

        let res: IMatrix3d
        res = Matrix3d.scale(matrix, 2)
        expect(Matrix3d.isApproximatelyEqual(res, matrix)).toBe(false)
        expect(res[0]).toBe(4)
        expect(res[1]).toBe(0)

        res = Matrix3d.scale(res, 1, .5, 3)
        expect(res[0]).toBe(4)
        expect(res[1]).toBe(0)
        expect(res[4]).toBe(.5)
        expect(res[8]).toBe(3)

        res = Matrix3d.scale(res, 1, 1, 3)
        expect(res[0]).toBe(4)
        expect(res[1]).toBe(0)
        expect(res[4]).toBe(.5)
        expect(res[8]).toBe(9)
    })

    test('scale + translate', () => {
        matrix = Matrix3d.translateX(identityMatrix3d, 5)

        expect(matrix[9]).toBe(5)

        let res: IMatrix3d
        res = Matrix3d.scaleX(matrix, 2)
        expect(res[0]).toBe(2)
        expect(res[4]).toBe(1)
        expect(res[8]).toBe(1)
        expect(res[9]).toBe(5)

        res = Matrix3d.translateX(res, 3)
        expect(res[0]).toBe(2)
        expect(res[4]).toBe(1)
        expect(res[8]).toBe(1)
        expect(res[9]).toBe(11)

        res = Matrix3d.scaleY(res, .5)
        expect(res[0]).toBe(2)
        expect(res[4]).toBe(.5)
        expect(res[8]).toBe(1)
        expect(res[9]).toBe(11)

        res = Matrix3d.translateY(res, 5)
        expect(res[0]).toBe(2)
        expect(res[4]).toBe(.5)
        expect(res[8]).toBe(1)
        expect(res[9]).toBe(11)
        expect(res[10]).toBe(2.5)

        res = Matrix3d.translateZ(res, 5)
        expect(res[0]).toBe(2)
        expect(res[4]).toBe(.5)
        expect(res[8]).toBe(1)
        expect(res[9]).toBe(11)
        expect(res[10]).toBe(2.5)
        expect(res[11]).toBe(5)

        res = Matrix3d.scaleZ(res, .5)
        expect(res[0]).toBe(2)
        expect(res[4]).toBe(.5)
        expect(res[8]).toBe(.5)
        expect(res[9]).toBe(11)
        expect(res[10]).toBe(2.5)
        expect(res[11]).toBe(5)

        res = Matrix3d.translateZ(res, 2)
        expect(res[0]).toBe(2)
        expect(res[4]).toBe(.5)
        expect(res[8]).toBe(.5)
        expect(res[9]).toBe(11)
        expect(res[10]).toBe(2.5)
        expect(res[11]).toBe(6)
    })

    test('rotate identity', () => {
        matrix = Matrix3d.rotateIdentityZ(90)
        expect(approximately(matrix[0], 0)).toBe(true)
        expect(approximately(matrix[1], 1)).toBe(true)
        expect(approximately(matrix[3], -1)).toBe(true)
        expect(approximately(matrix[4], 0)).toBe(true)
        expect(approximately(matrix[8], 1)).toBe(true)
        expect(approximately(matrix[9], 0)).toBe(true)
        expect(approximately(matrix[10], 0)).toBe(true)
        expect(approximately(matrix[11], 0)).toBe(true)
    })
})