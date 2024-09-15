import { isCorrectNumber, toPositive } from "./utils.js";

export enum AngleUnits {
    Deg = 0,
    Rad = 1,
    Turn = 2,
}


export class Angle {

    // #region Converters

    /**
     * Угол к радианам
     */
    static toRad(angle: number, unit: AngleUnits = AngleUnits.Deg) {
        switch (unit) {
            case AngleUnits.Rad:
                return angle
            case AngleUnits.Deg:
                return angle * Math.PI / 180
            case AngleUnits.Turn:
                return Math.PI * 2 * angle
        }
    }

    /**
     * Угол к оборотам
     */
    static toTurn(angle: number, unit: AngleUnits = AngleUnits.Deg) {
        switch (unit) {
            case AngleUnits.Turn:
                return angle
            case AngleUnits.Deg:
                return angle / 360
            case AngleUnits.Rad:
                return angle / (Math.PI * 2)
        }
    }

    /**
    * Угол к градусам
    */
    static toDeg(angle: number, unit: AngleUnits = AngleUnits.Rad) {
        switch (unit) {
            case AngleUnits.Deg:
                return angle
            case AngleUnits.Turn:
                return angle * 360
            case AngleUnits.Rad:
                return angle * 180 / Math.PI
        }
    }

    /**
     * Привести угол к положительному значению и нормализовать
     */
    static toPositive(angle: number, unit: AngleUnits) {
        switch (unit) {
            case AngleUnits.Deg:
                return toPositive(angle, 360)
            case AngleUnits.Turn:
                return toPositive(angle, 1)
            case AngleUnits.Rad:
                return toPositive(angle, Math.PI * 2)
        }
    }

    /**
     * Привести угол к стандантному диапазону
     * 
     * Для градусов [0; 360)
     * Для радианов [0; Math.Pi * 2)
     * Для оборотов [0; 1)
     */
    static normalize(angle: number, unit: AngleUnits) {
        switch (unit) {
            // 0 - 359.9999
            case AngleUnits.Deg:
                return Angle.toPositive(angle, unit) % 360
            // 0 - Math.PI * 2
            case AngleUnits.Rad:
                return Angle.toPositive(angle, unit) % (Math.PI * 2)
            // 0 - 1
            case AngleUnits.Turn:
                return Angle.toPositive(angle, unit) % 1
        }
    }
    // #endregion Converters

    // #region representation

    /**
     * From angle to string "rotate({angle}{units})"
     */
    static toCSS(angle: number, unit: AngleUnits) {
        if (!isCorrectNumber(angle)) return ''
        return `rotate(${angle}${Angle.angleUnitCorrespondence[unit]})`
    }

    static angleUnitCorrespondence: Record<AngleUnits, string> = {
        [AngleUnits.Rad]: 'rad',
        [AngleUnits.Turn]: 'turn',
        [AngleUnits.Deg]: 'deg',
    }
    // #endregion representation

}

