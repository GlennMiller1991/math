import { approximately, identityMatrix3d, Matrix2d, Matrix3d, type IMatrix3d } from "../../src"

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

    test('transform', () => {
        matrix = Matrix3d.translateIdentity(15, -5, 0.5)

        expect(Matrix3d.isApproximatelyEqual(matrix, [1, 0, 0, 0, 1, 0, 0, 0, 1, 15, -5, 0.5])).toBe(true)
        matrix = Matrix3d.rotateX(matrix, 3)
        expect(Matrix3d.isApproximatelyEqual(matrix, [1, 0, 0, 0, 0.998629, 0.05233, 0, -0.05233, 0.998629, 15, -5, 0.5], 0.01)).toBe(true)
        matrix = Matrix3d.rotateX(matrix, 3)
        const cmpMatrix: IMatrix3d = [1, 0, 0, 0, 0.994521450741, 0.10451651114, 0, -0.10451651114, 0.994521450741, 15, -5, 0.5]
        expect(Matrix3d.isApproximatelyEqual(matrix, cmpMatrix, 0.01)).toBe(true)
        matrix = Matrix3d.multiply(cmpMatrix, [1, 0, 0, 0, -0.06975, 0.99756, 0, -0.99756, -0.06975, 0, 0, 0])
        expect(Matrix3d.isApproximatelyEqual(matrix, [1, 0, 0, 0, -0.17362936204200316, 0.984804791749177, 0, -0.984804791749177, -0.17362936204200316, 15, -5, 0.5], 0.01)).toBe(true)

        matrix = Matrix3d.multiply(Matrix3d.scaleIdentity(1, 1, 30), matrix)
        expect(Matrix3d.isApproximatelyEqual(
            matrix,
            [1, 0, 0, 0, -0.17362936204200316, 29.54414375247531, 0, -0.984804791749177, -5.20888086126009470, 15, -5, 15],
            0.01
        )).toBe(true)
    })

    let first: IMatrix3d = [2, -1, 7, 0.5, 1, -4, 5, 0, -1, 0, 6, 4]
    let second: IMatrix3d = [2, -1, -2, 0.5, 1, -4, 5, 0, -1, 3, 6, 4]
    let third: IMatrix3d = [2, -1, -2, 0.5, 1, -4, 5, -1, -1, 3, 0.5, 0.3]
    let fourth: IMatrix3d = [2, 20, -20, 0.5, 1, -4, 5, -30, -1, 3, 0.5, 0.3]
    test('determinant', () => {
        expect(approximately(Matrix3d.determinant(identityMatrix3d), 1)).toBe(true)
        expect(approximately(Matrix3d.determinant([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]), 0))
            .toBe(true)
            
        expect(approximately(
            Matrix3d.determinant(first), -17.5)
        ).toBe(true)

        expect(approximately(
            Matrix3d.determinant(second), 27.5
        )).toBe(true)

        expect(approximately(
            Matrix3d.determinant(third), 20.5
        )).toBe(true)


        expect(approximately(
            Matrix3d.determinant(fourth), -232
        )).toBe(true)
    })

    test('invertion', () => {
        expect(Matrix3d.isApproximatelyEqual(identityMatrix3d, Matrix3d.invert(identityMatrix3d))).toBe(true)
        expect(Matrix3d.isApproximatelyEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            Matrix3d.invert([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]))).toBe(true)

        expect(Matrix3d.isApproximatelyEqual(
            Matrix3d.invert(first),
            [2/35, 2/35, 6/35, 39/35, 74/35, -23/35, 2/7, 2/7, -1/7, -(7 * 35 + 29)/35, -(13 * 35 + 29)/35, (4 * 35 + 18)/35]
        )).toBe(true)

        expect(Matrix3d.isApproximatelyEqual(
            Matrix3d.invert(second),
            [-2/55, -2/55, 12/55, -39/55, 16/55, 14/55, -2/11, -2/11, 1/11, (5 * 11 + 1)/11, -10/11, -(2 * 11 + 6)/11]
        )).toBe(true)


        expect(Matrix3d.isApproximatelyEqual(
            Matrix3d.invert(third),
            [-10/41, 2/41, 12/41, -39/41, 16/41, 14/41, -11/41, -6/41, 5/41, 264/205, -61/205, -89/82]
        )).toBe(true)

        expect(Matrix3d.isApproximatelyEqual(
            Matrix3d.invert(fourth),
            [121/232, -(2 * 58 + 39)/58, 15/58, 39/464, -49/116, 1 / 116, 5/ 58, -20/29, 1/29, -(928 + 587)/928, (8 * 232 + 101)/232, -917/1160]
        )).toBe(true)
 
    })
})