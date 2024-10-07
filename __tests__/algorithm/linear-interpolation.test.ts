import { LinearInterpolation } from '../../src/algorithm/linear-interpolation';
import type { IControlPoint } from '../../src/algorithm/linear-interpolation';
import { approximately } from '../../src/utils';

describe('linear interpolation', () => {
    let a: IControlPoint
    let b: IControlPoint 


    test('interpolate between', () => {
        const method = LinearInterpolation.interpolateBetween
        a = {controlPoint: 0, value: 0}; b = {controlPoint: 100, value: 100}

        expect(approximately(method(a, b, 50), 50)).toBe(true)
        expect(approximately(method(a, b, 30), 30)).toBe(true)
        expect(approximately(method(a, b, 9.5), 9.5)).toBe(true)

        a = {controlPoint: -100, value: 0}; b = {controlPoint: 100, value: 100}
        expect(approximately(method(a, b, 0), 50)).toBe(true)
        expect(approximately(method(a, b, -50), 25)).toBe(true)
        expect(approximately(method(a, b, -200), -50)).toBe(true)

        a = {controlPoint: 100, value: 0}; b = {controlPoint: -100, value: 100}
        expect(approximately(method(a, b, 0), 50)).toBe(true)
        expect(approximately(method(a, b, 100), 0)).toBe(true)
        expect(approximately(method(a, b, -100), 100)).toBe(true)
        expect(approximately(method(a, b, -50), 75)).toBe(true)
    })
})