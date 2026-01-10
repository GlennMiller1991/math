import {Color} from "../color.ts";
import {denormalizeShade} from "../utils.ts";

export abstract class BaseGradient {
    protected colors: { percentage: number, color: Color }[]

    constructor(...colors: typeof this.colors) {
        this.colors = [...colors].sort((a, b) => a.percentage - b.percentage);
    }

    /**
     * Получить цвет по углу от оси X по часовой стрелке
     * @param percentage единица измерения угла должна быть той же самой, что и углы всех передаваемых в констурктор цветов
     */
    getColorAtPercentage(percentage: number) {
        let prev = undefined
        let next = undefined
        for (let entry of this.colors) {
            if (entry.percentage === percentage) return entry.color
            if (entry.percentage < percentage) prev = entry
            if (entry.percentage > percentage) {
                next = entry
                break
            }
        }

        if (!prev || !next) return undefined

        const coef = (percentage - prev.percentage) / (next.percentage - prev.percentage)

        return new Color(
            Math.floor((next.color.red - prev.color.red) * coef + prev.color.red),
            Math.floor((next.color.green - prev.color.green) * coef + prev.color.green),
            Math.floor((next.color.blue - prev.color.blue) * coef + prev.color.blue),
            (next.color.alpha - prev.color.alpha) * coef + prev.color.alpha
        )
    }

    getPercentageByColor(color: Color) {
        let prev: typeof this.colors[number]
        let next = this.colors[0]
        if (color.isEqual(next.color)) return next.percentage
        for (let i = 1; i < this.colors.length; i++) {
            next = this.colors[i]
            prev = this.colors[i - 1]
            if (color.isEqual(next.color)) return next.percentage;

            let redDif = next.color.red - prev.color.red
            let greenDif = next.color.green - prev.color.green
            let blueDif = next.color.blue - prev.color.blue
            let alphaDif = denormalizeShade(next.color.alpha) - denormalizeShade(prev.color.alpha);
            let redDifColor = color.red - prev.color.red
            let greenDifColor = color.green - prev.color.green
            let blueDifColor = color.blue - prev.color.blue
            let alphaDifColor = denormalizeShade(color.alpha) - denormalizeShade(prev.color.alpha);

            if (
                ((redDifColor >= 0 && redDifColor <= redDif) || (redDifColor <= 0 && redDifColor >= redDif)) &&
                ((greenDifColor >= 0 && greenDifColor <= greenDif) || (greenDifColor <= 0 && greenDifColor >= greenDif)) &&
                ((blueDifColor >= 0 && blueDifColor <= blueDif) || (blueDifColor <= 0 && blueDifColor >= blueDif)) &&
                ((alphaDifColor >= 0 && alphaDifColor <= alphaDif) || (alphaDifColor <= 0 && alphaDifColor >= alphaDif))
            ) {

                const redCoef = ((color.red - prev.color.red) / (next.color.red - prev.color.red))
                const greenCoef = ((color.green - prev.color.green) / (next.color.green - prev.color.green))
                const blueCoef = ((color.blue - prev.color.blue) / (next.color.blue - prev.color.blue))
                const alphaCoef = ((color.alpha - prev.color.alpha) / (next.color.alpha - prev.color.alpha));
                const coefs = [redCoef, greenCoef, blueCoef, alphaCoef].filter(Boolean)
                return (next.percentage - prev.percentage) * Math.min(...coefs) + prev.percentage
            }
        }
        return undefined
    }

    isColorInRange(color: Color): boolean {
        return Boolean(this.getPercentageByColor(color));
    }


    abstract toCanvas(ctx: CanvasRenderingContext2D, ...args: any): CanvasGradient;
    abstract toCSS(...args: any): string;
}