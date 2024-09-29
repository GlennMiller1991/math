/**
 * Точка/вектор
 */
export type IPoint2 = [number, number]
export type IPoint3 = [number, number, number]
export type IPoint = IPoint2 | IPoint3

export class Point {
    static sum<T extends IPoint>(p1: T, p2: T): T {
        return p1.map((c, i) => c + p2[i]) as T
    }

    static scale<T extends IPoint>(p: T, scale: number): T {
        return p.map((c) => c * scale) as T
    }

    static dif<T extends IPoint>(p1: T, p2: T): T {
        return p1.map((c, i) => c - p2[i]) as T
    }

    static abs<T extends IPoint>(p: T): T {
        return p.map(Math.abs) as T
    }

}