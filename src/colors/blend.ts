import {Color} from "./color.ts";

/**
 * Смешение цветов
 */
export function blend(background: Color, ...foregrounds: Color[]) {
    let premulBgAlpha: number;
    let red, green, blue: number;

    for (let foreground of foregrounds) {
        const fgAlpha = foreground.alpha;
        const bgAlpha = background.alpha;
        let alpha = 1 - (1 - fgAlpha) * (1 - bgAlpha);

        if (alpha <= 0) {
            background = new Color(0, 0, 0, 0);
            continue;
        }

        premulBgAlpha = bgAlpha * (1 - fgAlpha);
        red = Math.floor((foreground.red * fgAlpha + background.red * premulBgAlpha) / alpha);
        green = Math.floor((foreground.green * fgAlpha + background.green * premulBgAlpha) / alpha);
        blue = Math.floor((foreground.blue * fgAlpha + background.blue * premulBgAlpha) / alpha);

        background = new Color(red, green, blue, alpha);
    }

    return background;
}