import {Color} from "./color.ts";

/**
 * Смешение цветов
 */
export function blend(background: Color, ...foregrounds: Color[]) {
    let temp: number;
    let red, green, blue: number;

    for (let foreground of foregrounds) {
        const fgAlpha = foreground.alpha;
        const bgAlpha = background.alpha;
        let alpha = 1 - (1 - fgAlpha) * (1 - bgAlpha);

        if (alpha <= 0) {
            background = new Color(0, 0, 0, 0);
            continue;
        }

        temp = bgAlpha * (1 - fgAlpha) / alpha;
        red = Math.floor(foreground.red * fgAlpha / alpha + background.red * temp);
        green = Math.floor(foreground.green * fgAlpha / alpha + background.green * temp);
        blue = Math.floor(foreground.blue * fgAlpha / alpha + background.blue * temp);

        background = new Color(red, green, blue, alpha);
    }

    return background;
}