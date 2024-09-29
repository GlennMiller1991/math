import { Point, type IPoint2, type IPoint3 } from "../../src";

describe('points test', () => {
    let a2: IPoint2, b2: IPoint2;
    let a3: IPoint3, b3: IPoint3;

    beforeEach(() => {
        a2 = [10, -10]; 
        b2 = [-5, 5];
        a3 = [...a2, -10];
        b3 = [...b2, -5];
    })

    test('sum', () => {
        expect(Point.sum(a2, b2)).toEqual([5, -5])
        expect(Point.sum(a3, b3)).toEqual([5, -5, -15])
    })

    test('dif', () => {
        expect(Point.dif(a2, b2)).toEqual([15, -15])
        expect(Point.dif(a3, b3)).toEqual([15, -15, -5])
    })

    test('abs', () => {
        expect(Point.abs(a2)).toEqual([10, 10])
        expect(Point.abs(a3)).toEqual([10, 10, 10])
    })

    test('scale', () => {
        expect(Point.scale(a2, 2)).toEqual([20, -20])
        expect(Point.scale(a3, -2)).toEqual([-20, 20, 20])
    })
})