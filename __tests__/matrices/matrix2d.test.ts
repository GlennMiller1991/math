import type { IPoint2, IMatrix2d } from '../../index.js'
import { approximately, identityMatrix2d, Matrix2d } from "../../index.js"

describe('Matrix2d', () => {
    let matrix: IMatrix2d

    test('identity matrix should be freezed', () => {
        matrix = [...identityMatrix2d]
        const assign = () => {
            identityMatrix2d[1] = 4
        }
        expect(assign).toThrow()
        expect(matrix).toEqual(identityMatrix2d)
    })

    test('should be the same', () => {
        matrix = identityMatrix2d
        matrix = Matrix2d.multiply(matrix, identityMatrix2d)
        expect(matrix).toEqual(identityMatrix2d)
        expect(matrix).not.toBe(identityMatrix2d)
    })

    test('transform', () => {
        matrix = identityMatrix2d

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

    test('apply', () => {
        const p: IPoint2 = [1, 1];

        const transforms: { transform: IMatrix2d, output: IPoint2 }[] = [
            { transform: identityMatrix2d, output: p },
            { transform: Matrix2d.rotateIdentity(90), output: [-1, 1] },
            { transform: Matrix2d.rotateIdentity(-90), output: [1, -1] },
            { transform: Matrix2d.scaleIdentity(2), output: [2, 2] },
            { transform: Matrix2d.scaleIdentity(-2), output: [-2, -2] },
            { transform: Matrix2d.scaleIdentity(2, -2), output: [2, -2] },
            { transform: Matrix2d.skewIdentity(-45, 0), output: [2, 1] }
        ]


        let res: IPoint2
        for (let { transform, output } of transforms) {
            res = Matrix2d.apply(transform, p)
            expect(approximately(res[0], output[0])).toBe(true)
            expect(approximately(res[1], output[1])).toBe(true)
        }
    })
})