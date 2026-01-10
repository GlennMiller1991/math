import {Color, blend, approximately} from "@src";

test('blend', () => {
    const cases = [
        // Базовые случаи
        {bg: new Color(255, 255, 255, 1), fg: new Color(0, 0, 0, 1), res: new Color(0, 0, 0, 1)},
        {bg: new Color(0, 0, 0, 1), fg: new Color(255, 255, 255, 1), res: new Color(255, 255, 255, 1)},
        {bg: new Color(255, 0, 0, 1), fg: new Color(0, 255, 0, 1), res: new Color(0, 255, 0, 1)},

        // Полупрозрачный поверх непрозрачного
        {bg: new Color(255, 255, 255, 1), fg: new Color(0, 0, 0, 0.5), res: new Color(128, 128, 128, 1)},
        {bg: new Color(0, 0, 0, 1), fg: new Color(255, 255, 255, 0.5), res: new Color(128, 128, 128, 1)},
        {bg: new Color(255, 0, 0, 1), fg: new Color(0, 0, 255, 0.5), res: new Color(128, 0, 128, 1)},
        // Полностью прозрачный foreground
        {bg: new Color(100, 150, 200, 1), fg: new Color(255, 0, 0, 0), res: new Color(100, 150, 200, 1)},
        {bg: new Color(0, 0, 0, 0.5), fg: new Color(255, 255, 255, 0), res: new Color(0, 0, 0, 0.5)},

        // Полупрозрачный фон
        {bg: new Color(255, 255, 255, 0.5), fg: new Color(0, 0, 0, 1), res: new Color(0, 0, 0, 1)},
        {bg: new Color(255, 0, 0, 0.5), fg: new Color(0, 255, 0, 1), res: new Color(0, 255, 0, 1)},

        // Оба полупрозрачных
        {bg: new Color(255, 255, 255, 0.5), fg: new Color(0, 0, 0, 0.5), res: new Color(85, 85, 85, 0.75)},
        {bg: new Color(255, 0, 0, 0.5), fg: new Color(0, 255, 0, 0.5), res: new Color(85, 170, 0, 0.75)},
        {bg: new Color(0, 0, 255, 0.2), fg: new Color(255, 255, 0, 0.8), res: new Color(243, 243, 12, 0.84)},
        // Граничные значения цветов
        {bg: new Color(0, 0, 0, 1), fg: new Color(255, 255, 255, 0), res: new Color(0, 0, 0, 1)},
        {bg: new Color(255, 255, 255, 0), fg: new Color(0, 0, 0, 1), res: new Color(0, 0, 0, 1)},
        {bg: new Color(0, 0, 0, 0), fg: new Color(0, 0, 0, 0), res: new Color(0, 0, 0, 0)},

        // Специфичные значения альфа
        {bg: new Color(100, 100, 100, 1), fg: new Color(200, 200, 200, 0.25), res: new Color(125, 125, 125, 1)},
        {bg: new Color(50, 100, 150, 0.75), fg: new Color(200, 150, 100, 0.25), res: new Color(96, 115, 135, 0.8125)},
        {bg: new Color(0, 255, 128, 0.3), fg: new Color(255, 128, 0, 0.7), res: new Color(226, 142, 15, 0.79)},

        // Крайние случаи прозрачности
        {bg: new Color(255, 255, 255, 0.01), fg: new Color(0, 0, 0, 0.99), res: new Color(0, 0, 0, 0.9901)},
        {bg: new Color(0, 0, 0, 0.99), fg: new Color(255, 255, 255, 0.01), res: new Color(3, 3, 3, 0.9901)},
    ]

    let tempColor: Color;
    for (let {bg, fg, res} of cases) {
        tempColor = blend(bg, fg);
        expect(approximately(tempColor.red, res.red, 1)).toBe(true);
        expect(approximately(tempColor.green, res.green, 1)).toBe(true);
        expect(approximately(tempColor.blue, res.blue, 1)).toBe(true);
        expect(approximately(tempColor.alpha, res.alpha)).toBe(true);
    }
});
