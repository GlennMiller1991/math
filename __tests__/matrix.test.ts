import { approximately, identityMatrix, Matrix2d, type IMatrix2d } from "../index.js"

describe('Matrix', () => {
    let matrix: IMatrix2d

    test('should be the same', () => {
        matrix = identityMatrix
        matrix = Matrix2d.multiply(matrix, identityMatrix)
        expect(matrix).toEqual(identityMatrix)
        expect(matrix).not.toBe(identityMatrix)
    })

    test('transform', () => {
        matrix = identityMatrix

        // translate x 10
        matrix = Matrix2d.translate(matrix, 10)
        expect(matrix).toEqual([1, 0, 0, 1, 10, 0])

        // translate x 10
        matrix = Matrix2d.translate(matrix, 10)
        expect(matrix).not.toEqual([1, 0, 0, 1, 10, 0])
        expect(matrix[4]).toBe(20)

        // translate y 1
        matrix = Matrix2d.translate(matrix, 0, 1)
        expect(matrix[4]).toBe(20)
        expect(matrix[5]).toBe(1)

        // zoom at 0 0 by 2
        matrix = Matrix2d.scale(matrix, 2)
        expect(matrix[0]).toBe(2)
        expect(matrix[1]).toBe(0)
        expect(matrix[2]).toBe(0)
        expect(matrix[3]).toBe(2)
        expect(matrix[4]).toBe(20)
        expect(matrix[5]).toBe(1)

        // rotate at 0 0 by 90 deg
        matrix = Matrix2d.rotate(matrix, 90)
        expect(approximately(matrix[0], 0)).toBe(true)
        expect(approximately(matrix[1], 2)).toBe(true)
        expect(approximately(matrix[2], -2)).toBe(true)
        expect(approximately(matrix[3], 0)).toBe(true)
        expect(approximately(matrix[4], 20)).toBe(true)
        expect(approximately(matrix[5], 1)).toBe(true)

        matrix = Matrix2d.rotateIdentity(45)
        expect(approximately(matrix[0], matrix[1])).toBe(true)
        expect(approximately(matrix[2], -matrix[3])).toBe(true)

        matrix = Matrix2d.skewIdentity(-45, 0)
        expect(approximately(matrix[3], 1)).toBe(true)

    })
})