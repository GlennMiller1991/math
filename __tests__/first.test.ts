import { approximately } from "../src"

test('', () => {
    expect(approximately(2, 1 + 1)).toBe(true)
})