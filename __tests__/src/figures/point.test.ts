import { Point, type IPoint2, type IPoint3 } from "@src";

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

    test('sub', () => {
        expect(Point.sub(a2, b2)).toEqual([15, -15])
        expect(Point.sub(a3, b3)).toEqual([15, -15, -5])
    })

    test('abs', () => {
        expect(Point.abs(a2)).toEqual([10, 10])
        expect(Point.abs(a3)).toEqual([10, 10, 10])
    })

    test('scale', () => {
        expect(Point.scale(a2, 2)).toEqual([20, -20])
        expect(Point.scale(a3, -2)).toEqual([-20, 20, 20])
    })

    test('dot product', () => {
        expect(Point.dotProduct([4, -3], [2, 1])).toBe(5)
        expect(Point.dotProduct([5, -7], [1, -2])).toBe(19)
    })
});

describe('Distance 2dim', () => {
    const testCases: Array<{test: [IPoint2, IPoint2], result: number}> = [
        // === БАЗОВЫЕ ТЕСТЫ ===
         {
             test: [[0, 0], [0, 0]],
             result: 0
         },
         {
             test: [[0, 0], [1, 0]],
             result: 1
         },
         {
             test: [[0, 0], [0, 1]],
             result: 1
         },
         {
             test: [[0, 0], [3, 4]],
             result: 5 // 3-4-5 треугольник
         },

         // === ОТРИЦАТЕЛЬНЫЕ КООРДИНАТЫ ===
         {
             test: [[-1, -1], [-1, -1]],
             result: 0
         },
         {
             test: [[-1, 0], [1, 0]],
             result: 2
         },
         {
             test: [[0, -1], [0, 1]],
             result: 2
         },
         {
             test: [[-3, -4], [0, 0]],
             result: 5 // 3-4-5 треугольник
         },
         {
             test: [[-2, -3], [1, 1]],
             result: 5 // √((3)² + (4)²) = 5
         },

         // === ДРОБНЫЕ ЧИСЛА ===
         {
             test: [[0, 0], [0.5, 0]],
             result: 0.5
         },
         {
             test: [[1.5, 2.5], [1.5, 2.5]],
             result: 0
         },
         {
             test: [[0, 0], [0.3, 0.4]],
             result: 0.5 // 0.3-0.4-0.5 треугольник
         },
         {
             test: [[1.1, 2.2], [3.3, 4.4]],
             result: Math.sqrt(Math.pow(2.2, 2) + Math.pow(2.2, 2)) // √(2.2² + 2.2²)
         },

         // === БОЛЬШИЕ ЧИСЛА ===
         {
             test: [[0, 0], [1000, 0]],
             result: 1000
         },
         {
             test: [[0, 0], [0, 1000000]],
             result: 1000000
         },
         {
             test: [[100, 200], [400, 300]],
             result: Math.sqrt(300*300 + 100*100) // √(300² + 100²)
         },

         // === ТЕСТЫ НА ТОЧНОСТЬ (Пифагоровы тройки) ===
         {
             test: [[0, 0], [6, 8]],
             result: 10 // 6-8-10
         },
         {
             test: [[0, 0], [5, 12]],
             result: 13 // 5-12-13
         },
         {
             test: [[0, 0], [8, 15]],
             result: 17 // 8-15-17
         },
         {
             test: [[0, 0], [7, 24]],
             result: 25 // 7-24-25
         },
         {
             test: [[0, 0], [9, 40]],
             result: 41 // 9-40-41
         },

         // === ТЕСТЫ С ИЗМЕНЕНИЕМ ПО ОБЕИМ ОСЯМ ===
         {
             test: [[1, 2], [4, 6]],
             result: 5 // √(3² + 4²) = 5
         },
         {
             test: [[10, 20], [13, 24]],
             result: 5 // √(3² + 4²) = 5
         },
         {
             test: [[-5, 2], [1, -1]],
             result: Math.sqrt(6*6 + 3*3) // √(36 + 9) = √45
         },

         // === ПРАКТИЧЕСКИЕ ПРИМЕРЫ ===
         {
             test: [[0, 0], [1, 1]],
             result: Math.sqrt(2) // ≈1.4142135623730951
         },
         {
             test: [[-1, -1], [1, 1]],
             result: Math.sqrt(8) // ≈2.8284271247461903
         },
         {
             test: [[2, 3], [5, 7]],
             result: 5 // √(3² + 4²) = 5
         },

         // === ТЕСТЫ НА ГРАНИЦЫ ТОЧНОСТИ ===
         {
             test: [[0.000001, 0], [0, 0]],
             result: 0.000001
         },
         {
             test: [[0, 0], [0.0001, 0.0001]],
             result: Math.sqrt(0.00000002) // очень маленькое число
         },
         {
             test: [[1e6, 2e6], [3e6, 4e6]],
             result: Math.sqrt(Math.pow(2e6, 2) + Math.pow(2e6, 2))
         }
    ];

    for (let {test, result} of testCases) {
        expect(Point.distance(test[0], test[1])).toEqual(result);
    }
})