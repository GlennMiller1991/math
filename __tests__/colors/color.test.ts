import {Color} from './../../index.js'

describe('Color', () => {
    let color: Color;


    test('contructor', () => {
        color = new Color(0.1, 0.1, 0.1)
        expect(color.red).toBe(0)
        expect(color.green).toBe(0)
        expect(color.blue).toBe(0)

        color = new Color(-54, -43, -54)
        expect(color.red).toBe(0)
        expect(color.green).toBe(0)
        expect(color.blue).toBe(0)

        color = new Color(4353, 3242, 4321)
        expect(color.red).toBe(255)
        expect(color.green).toBe(255)
        expect(color.blue).toBe(255)

    })

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

        const regexp = /rgb\(\d*,\d*,\d*\)/
        function testRegexp(test: string) {
            return regexp.test(test)
        }

        color = new Color(125, 32, 4)

        expect(testRegexp(color.toCSS())).toBe(true)
        expect(color.toCSS()).toBe('rgb(125,32,4)')

        color = new Color(255, 0, 34)
        expect(testRegexp(color.toCSS())).toBe(true)
        expect(color.toCSS()).toBe('rgb(255,0,34)')
    })
})