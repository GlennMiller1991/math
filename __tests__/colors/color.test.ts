import {Color} from './../../index.js'

describe('Color', () => {
    let color: Color;

    test('ofNumber', () => {
        color = Color.ofNumber(0)
        expect(color.red + color.blue + color.green).toBe(0)

        color = Color.ofNumber(0xffffff)
        expect(color.red).toBe(0xff)
        expect(color.green).toBe(0xff)
        expect(color.blue).toBe(0xff)

        color = Color.ofNumber(0xaf0330)
        expect(color.red).toBe(0xaf)
        expect(color.green).toBe(0x03)
        expect(color.blue).toBe(0x30)
    })

    test('toCss', () => {
        color = new Color(125, 32, 4)

        expect(color.toCSS()).toBe('rgb(125,32,4)')


        color = new Color(255, 0, 34)
        expect(color.toCSS()).toBe('rgb(255,0,34)')
    })
})