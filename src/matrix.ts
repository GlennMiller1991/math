import { Angle, AngleUnits, type IPoint2 } from "./index.js";

export type IMatrix2d = [
    number, number, number,
    number, number, number,
]

export const identityMatrix: IMatrix2d = [1, 0, 0, 1, 0, 0]
export function getIdentityMatrix(): IMatrix2d {
    return [1, 0, 0, 1, 0, 0]
}
/**
 * Класс операций над матрицами двумерного пространства.
 * 
 * Матрица двумерного пространства характеризуется тремя столбцами и тремя строками. 
 * Однако в реализации, так как двумерное простраснтво не обладает осью Z, третья строка усечена,
 * оставшиеся две строки и три столбца собраны в плоский массив, где:
 * m[0], m[1] разложение вектора X по осям X/Y
 * m[2], m[3] разложение вектора Y по осям X/Y
 * m[4], m[5] разложение вектора Z по осям X/Y для проективных плоскостей.
 * При этом условное смещение по оси Z для проектинвых плоскостей равна единице
 * То есть полный вид матрицы бы выглядел следующим образом
 * [
 *      [1, 0, 0],
 *      [0, 1, 0],
 *      [0, 0, 1],
 * ],
 * после усечения 
 * [
 *      [1, 0, 0],
 *      [0, 1, 0],
 * ] 
 * и в реализации
 * [
 *      1, 0, 0, 1, 0, 0
 * ]
 */
export class Matrix2d {

    /**
     * Последовательное наложение матриц трансформации к результату
     * предыдущего наложения. По сути, умножение двух и более матриц
     * 
     * Умножение двух матриц суть применение трансформации к трансформации, при этом
     * порядок при умножении важен - m1 * m2 !== m2 * m1
     * 
     * Первая переданная матрица - первый трансформ, и далее последовательное наложение трансформов
     */
    static multiply(matrix: IMatrix2d, ...matrices: IMatrix2d[]) {
        for (let m of matrices) {
            matrix = [
                matrix[0] * m[0] + matrix[2] * m[1],
                matrix[1] * m[0] + matrix[3] * m[1],
                matrix[0] * m[2] + matrix[2] * m[3],
                matrix[1] * m[2] + matrix[3] * m[3],
                matrix[0] * m[4] + matrix[2] * m[5] + matrix[4],
                matrix[1] * m[4] + matrix[3] * m[5] + matrix[5],
            ]
        }

        return matrix
    }

    static apply(matrix: IMatrix2d, point: IPoint2): IPoint2 {
        return [
            matrix[0] * point[0] + matrix[2] * point[1] + matrix[4],
            matrix[1] * point[0] + matrix[3] * point[1] + matrix[5],
        ]
    }

    static scaleIdentity(x: number, y: number = x): IMatrix2d {
        return [x, 0, 0, y, 0, 0]
    }

    static scale(m: IMatrix2d, x: number, y: number = x): IMatrix2d {
        return Matrix2d.multiply(m, Matrix2d.scaleIdentity(x, y))
    }

    static rotateIdentity(angle: number, units = AngleUnits.Deg): IMatrix2d {
        angle = Angle.toRad(angle, units)
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        return [cos, sin, -sin, cos, 0, 0]
    }

    static rotate(m: IMatrix2d, angle: number, units = AngleUnits.Deg): IMatrix2d {
        return Matrix2d.multiply(m, Matrix2d.rotateIdentity(angle, units))
    }

    static translateIdentity(x: number, y: number = 0): IMatrix2d {
        return [1, 0, 0, 1, x, y]
    }

    static translate(m: IMatrix2d, x: number, y: number = 0): IMatrix2d {
        return Matrix2d.multiply(m, Matrix2d.translateIdentity(x, y))
    }

    static translateX(m: IMatrix2d, x: number): IMatrix2d {
        return Matrix2d.multiply(m, this.translateIdentity(x))
    }

    static translateY(m: IMatrix2d, y: number): IMatrix2d {
        return Matrix2d.multiply(m, this.translateIdentity(0, y))
    }

    static skewIdentity(x: number, y: number, units = AngleUnits.Deg): IMatrix2d {
        x = Angle.toRad(x, units)
        y = Angle.toRad(y, units)
        x = Math.tan(x)
        y = Math.tan(y)
        console.log(x, 'tangent')
        return [1, -y, -x, 1, 0, 0]
    } 

    static skewX(m: IMatrix2d, x: number, units = AngleUnits.Deg): IMatrix2d {
        return Matrix2d.multiply(m, Matrix2d.skewIdentity(x, 0, units))
    }

    static skewY(m: IMatrix2d, y: number, units = AngleUnits.Deg): IMatrix2d {
        return Matrix2d.multiply(m, Matrix2d.skewIdentity(0, y, units))
    }

    static skew(m: IMatrix2d, x: number, y = 0, units = AngleUnits.Deg): IMatrix2d {
        return Matrix2d.multiply(m, Matrix2d.skewIdentity(x, y, units))
    }
}