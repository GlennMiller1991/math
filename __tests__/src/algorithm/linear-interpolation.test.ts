import { approximately, LinearInterpolation, type IControlPoint } from '@src';

describe('linear interpolation', () => {

    test('interpolate between', () => {
        let a: IControlPoint
        let b: IControlPoint

        const method = LinearInterpolation.interpolateBetween
        a = { controlPoint: 0, value: 0 }; b = { controlPoint: 100, value: 100 }

        expect(approximately(method(a, b, 50), 50)).toBe(true)
        expect(approximately(method(a, b, 30), 30)).toBe(true)
        expect(approximately(method(a, b, 9.5), 9.5)).toBe(true)

        a = { controlPoint: -100, value: 0 }; b = { controlPoint: 100, value: 100 }
        expect(approximately(method(a, b, 0), 50)).toBe(true)
        expect(approximately(method(a, b, -50), 25)).toBe(true)
        expect(approximately(method(a, b, -200), -50)).toBe(true)

        a = { controlPoint: 100, value: 0 }; b = { controlPoint: -100, value: 100 }
        expect(approximately(method(a, b, 0), 50)).toBe(true)
        expect(approximately(method(a, b, 100), 0)).toBe(true)
        expect(approximately(method(a, b, -100), 100)).toBe(true)
        expect(approximately(method(a, b, -50), 75)).toBe(true)
    })

    test('interpolate', () => {
        let a: IControlPoint
        let b: IControlPoint
        let c: IControlPoint
        let d: IControlPoint

        const method = LinearInterpolation.interpolateArray
        a = { controlPoint: 0, value: 0 }; b = { controlPoint: 100, value: 100 }

        expect(approximately(method(50, [a, b])!, 50)).toBe(true)
        expect(approximately(method(30, [a, b])!, 30)).toBe(true)
        expect(approximately(method(9.5, [a, b])!, 9.5)).toBe(true)

        a = { controlPoint: -100, value: 0 }; b = { controlPoint: 100, value: 100 }
        expect(approximately(method(0, [a, b])!, 50)).toBe(true)
        expect(approximately(method(-50, [a, b])!, 25)).toBe(true)
        expect(method(-200, [a, b])).toBe(undefined)

        a = { controlPoint: 100, value: 0 }; b = { controlPoint: -100, value: 100 }
        expect(approximately(method(0, [a, b])!, 50)).toBe(true)
        expect(approximately(method(100, [a, b])!, 0)).toBe(true)
        expect(approximately(method(-100, [a, b])!, 100)).toBe(true)
        expect(approximately(method(-50, [a, b])!, 75)).toBe(true)

        a = {controlPoint: 0, value: 0}; b = {controlPoint: 10, value: 90}; c = {controlPoint: 90, value: 95}; d = {controlPoint: 100, value: 100}
        expect(approximately(method(0, [a, b, c, d])!, 0)).toBe(true)
        expect(approximately(method(100, [a, b, c, d])!, 100)).toBe(true)
        expect(approximately(method(10, [a, b, c, d])!, 90)).toBe(true)
        expect(approximately(method(90, [a, b, c, d])!, 95)).toBe(true)
        expect(approximately(method(50, [a, b, c, d])!, 92.5)).toBe(true)
        expect(method(-50, [a, b, c, d])).toBe(undefined)
        

    })
})