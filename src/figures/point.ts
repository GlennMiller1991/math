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

    static dotProduct<T extends IPoint>(p1: T, p2: T): number {
        return p1.reduce((acc, c, index) => {
            return acc + c * p2[index]
        }, 0)
    }

    /**
     * Векторное произведение. 
     * @returns вектор, перпендикулярный плоскости, образованной двумя переданными векторами.
     *  Модуль вектора численно равен площади параллелорамма, построенного на переданных векторах.
     *  На этом факте формула и построена.
     */
    static crossProduct(a: IPoint3, b: IPoint3): IPoint3 {
        return [
            a[1] * b[2] - b[1] * a[2],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - b[0] * a[1],
        ]
    }

    /**
     * Смешанное произведение векторов.
     * Скалярное произведение вектора dotFactor на векторное произведение векторов
     * crossFactorA и crossFactorB
     * 
     * @return скаляр, равный объёму ориентированного параллелограмма, 
     * построенного на переданных векторах
     */
    static tripleProduct(crossFactorA: IPoint3, crossFactorB: IPoint3, dotFactor): number {
        return Point.dotProduct(
            Point.crossProduct(crossFactorA, crossFactorB),
            dotFactor
        )
    }

    /**
     *  Нормаль к поверхности, образованной тремя переданными точками
     *  @returns вектор
     */
    static normal(p1: IPoint3, p2: IPoint3, p3: IPoint3): IPoint3 {
        return Point.crossProduct(Point.dif(p2, p1), Point.dif(p3, p1))
    }

}