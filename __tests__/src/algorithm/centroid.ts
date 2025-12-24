import {centroid, type IPoint2, type IPoint3} from "@src";

describe('Centroid', () => {

    test('Two dimensions should be correct', () => {
        type ITestSet = {
            points: IPoint2[],
            result: IPoint2
        };

        const sets: ITestSet[] = [
            {points: [[0, 0]], result: [0, 0]},
            {points: [[-50, -50], [50, 50]], result: [0, 0]},
            {points: [[-50, 50], [50, -50]], result: [0, 0]},
            {points: [[-50, -50], [-25, -25], [0, 0], [25, 25], [50, 50]], result: [0, 0]},
        ];

        for (let {points, result} of sets) {
            expect(centroid(...points)).toEqual(result);
        }
    });

    test('Three dimensions should be correct', () => {
        type ITestSet = {
            points: IPoint3[],
            result: IPoint3
        };

        const sets: ITestSet[] = [
            {points: [[0, 0, 0]], result: [0, 0, 0]},
            {points: [[-50, -50, -50], [50, 50, 50]], result: [0, 0, 0]},
            {points: [[-50, 50, -50], [50, -50, 50]], result: [0, 0, 0]},
            {points: [[-50, -50, -50], [-25, -25, -25], [0, 0, 0], [25, 25, 25], [50, 50, 50]], result: [0, 0, 0]},
        ];

        for (let {points, result} of sets) {
            expect(centroid(...points)).toEqual(result);
        }
    });
});