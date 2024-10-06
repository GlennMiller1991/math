import { identityMatrix3d, type IMatrix3d } from "../../src"

describe('Matrix3d', () => {
    let matrix: IMatrix3d

    test('identity matrix should be freezed', () => {
        matrix = [...identityMatrix3d]
        const assign = () => identityMatrix3d[1] = 4
        expect(assign).toThrow();
        expect(matrix).toEqual(identityMatrix3d)
    }) 
})