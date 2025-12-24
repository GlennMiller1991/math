import {
    approximately,
    isCorrectNumber,
    isInteger,
    isNatural,
    isNegative,
    isNonNegativeInteger,
    isPositive,
    toPositive
} from "@src"

test('approximately', () => {
    expect(approximately(0, 0)).toBe(true)
    expect(approximately(1 + 1e-8, 1)).toBe(true)
    expect(approximately(-1 - 1e-8, -1)).toBe(true)
    expect(approximately(1 + 1e-8 + 1e-9, 1)).toBe(false)
    expect(approximately(-1 - 1e-8 - 1e-9, -1)).toBe(false)
    expect(approximately(0, 0.1)).toBe(false)
    expect(approximately(0, 0.1, 0.1)).toBe(true)
})

test('toPositive', () => {
    expect(toPositive(-1, 360)).toEqual(359)
    expect(toPositive(1, 360)).toEqual(1)
    expect(toPositive(0, 1)).toEqual(0)
    expect(toPositive(-720, 360)).toEqual(0)
    expect(toPositive(-721, 360)).toEqual(359)
    expect(toPositive(-0, 0)).toEqual(0)
})

test('isCorrectNumber', () => {
    const testCases: Array<{ test: any, result: boolean }> = [
        // === ЧИСЛА (true) ===
        {test: 0, result: true},
        {test: 1, result: true},
        {test: -1, result: true},
        {test: 123.45, result: true},
        {test: -123.45, result: true},
        {test: 1.23e4, result: true},
        {test: -1.23e-4, result: true},
        {test: 0.0, result: true},
        {test: -0, result: true},
        {test: new Number(123), result: true}, // Number object

        // === ЧИСЛА (false) ===
        {test: Infinity, result: false},
        {test: -Infinity, result: false},
        {test: NaN, result: false},

        // === СТРОКИ-ЧИСЛА (true) ===
        {test: "0", result: true},
        {test: "123", result: true},
        {test: "-123", result: true},
        {test: "123.45", result: true},
        {test: "-123.45", result: true},
        {test: ".45", result: true},
        {test: "0.45", result: true},
        {test: "1.23e4", result: true},
        {test: "-1.23e-4", result: true},
        {test: "0123", result: true}, // ведущие нули
        {test: "  123  ", result: true}, // пробелы
        {test: new String("123"), result: true}, // String object

        // === СТРОКИ (false) ===
        {test: "", result: false},
        {test: " ", result: false},
        {test: "abc", result: false},
        {test: "123abc", result: false},
        {test: "abc123", result: false},
        {test: "12.34.56", result: false},
        {test: "--123", result: false},
        {test: "++123", result: false},
        {test: "123-", result: false},
        {test: "123+", result: false},
        {test: "1.2.3", result: false},
        {test: "Infinity", result: false},
        {test: "-Infinity", result: false},
        {test: "NaN", result: false},
        {test: "null", result: false},
        {test: "undefined", result: false},
        {test: "true", result: false},
        {test: "false", result: false},

        // === ПРИМИТИВЫ (false) ===
        {test: null, result: false},
        {test: undefined, result: false},
        {test: true, result: false},
        {test: false, result: false},

        // === ОБЪЕКТЫ  ===
        {test: {}, result: false},
        {test: {a: 1}, result: false},


        // === МАССИВЫ (false) ===
        {test: [], result: false},
        {test: [123], result: false},
        {test: ["123"], result: false},
        {test: [1, 2, 3], result: false},
        {test: [""], result: false},

        // === ФУНКЦИИ (false) ===
        {
            test: () => {
            }, result: false
        },
        {
            test: function () {
            }, result: false
        },
        {test: parseInt, result: false},


        // === ДАТЫ ===
        {test: new Date(), result: false},

        // === СПЕЦИАЛЬНЫЕ СЛУЧАИ ===
        {test: 0xff, result: true}, // hex число
        {test: "0xff", result: false}, // hex строка (parseFloat не понимает hex)
        {test: 0b1010, result: true}, // binary число
        {test: 0o777, result: true}, // octal число
        {test: "   ", result: false}, // только пробелы
        {test: "\t123\n", result: true}, // табы и переносы
        {test: "123 ", result: true}, // пробел в конце
        {test: " 123", result: true}, // пробел в начале
        {test: "1.", result: true}, // точка без дробной части
        {test: "-.5", result: true}, // точка без целой части с минусом
        {test: "+123", result: true}, // плюс в начале строки
        {test: "123e", result: false}, // незавершенная научная запись
        {test: "123e+", result: false}, // незавершенная научная запись
    ];

    for (let {test, result} of testCases) {
        expect(isCorrectNumber(test)).toBe(result);
    }
});

test('isPositive', () => {
    const testCases = [
        // === ПОЛОЖИТЕЛЬНЫЕ ЧИСЛА (true) ===
        {test: 1, result: true},
        {test: 100, result: true},
        {test: 0.1, result: true},
        {test: 0.000001, result: true},
        {test: 999999999, result: true},
        {test: 3.14, result: true},
        {test: 1e10, result: true},
        {test: 0.5, result: true},

        // === НОЛЬ И ОТРИЦАТЕЛЬНЫЕ (false) ===
        {test: 0, result: false},
        {test: -0, result: false},
        {test: -1, result: false},
        {test: -100, result: false},
        {test: -0.1, result: false},
        {test: -0.000001, result: false},
        {test: -999999999, result: false},
        {test: -3.14, result: false},
        {test: -1e10, result: false},
        {test: -0.5, result: false},

        // === СПЕЦИАЛЬНЫЕ ЗНАЧЕНИЯ ===
        {test: Infinity, result: true},
        {test: -Infinity, result: false},
        {test: NaN, result: false},

        // === ГРАНИЧНЫЕ ЗНАЧЕНИЯ ===
        {test: Number.MAX_VALUE, result: true},
        {test: Number.MIN_VALUE, result: true}, // минимальное положительное число > 0
        {test: -Number.MAX_VALUE, result: false},
        {test: -Number.MIN_VALUE, result: false},

        // === НЕОБЫЧНЫЕ СЛУЧАИ ===
        {test: 0.00000000000000000000000000000001, result: true},
        {test: -0.00000000000000000000000000000001, result: false},
        {test: 1.7976931348623157e+308, result: true}, // MAX_VALUE
        {test: -1.7976931348623157e+308, result: false},
        {test: 5e-324, result: true}, // MIN_VALUE
        {test: -5e-324, result: false}
    ];

    for (let {test, result} of testCases) {
        expect(isPositive(test)).toBe(result);
    }
});

test('isNegative', () => {
    const testCases = [
        // === ОТРИЦАТЕЛЬНЫЕ ЧИСЛА (true) ===
        {test: -1, result: true},
        {test: -100, result: true},
        {test: -0.1, result: true},
        {test: -0.000001, result: true},
        {test: -999999999, result: true},
        {test: -3.14, result: true},
        {test: -1e10, result: true},
        {test: -0.5, result: true},

        // === НОЛЬ И ПОЛОЖИТЕЛЬНЫЕ (false) ===
        {test: 0, result: false},
        {test: -0, result: false},
        {test: 1, result: false},
        {test: 100, result: false},
        {test: 0.1, result: false},
        {test: 0.000001, result: false},
        {test: 999999999, result: false},
        {test: 3.14, result: false},
        {test: 1e10, result: false},
        {test: 0.5, result: false},

        // === СПЕЦИАЛЬНЫЕ ЗНАЧЕНИЯ ===
        {test: Infinity, result: false},
        {test: -Infinity, result: true},
        {test: NaN, result: false},

        // === ГРАНИЧНЫЕ ЗНАЧЕНИЯ ===
        {test: Number.MAX_VALUE, result: false},
        {test: Number.MIN_VALUE, result: false},
        {test: -Number.MAX_VALUE, result: true},
        {test: -Number.MIN_VALUE, result: true},

        // === НЕОБЫЧНЫЕ СЛУЧАИ ===
        {test: 0.00000000000000000000000000000001, result: false},
        {test: -0.00000000000000000000000000000001, result: true},
        {test: 1.7976931348623157e+308, result: false},
        {test: -1.7976931348623157e+308, result: true},
        {test: 5e-324, result: false},
        {test: -5e-324, result: true}
    ];

    for (let {test, result} of testCases) {
        expect(isNegative(test)).toBe(result);
    }
});

test('isInteger', () => {
    const testCases = [
        // === ЦЕЛЫЕ ЧИСЛА (true) ===
        {test: 0, result: true},
        {test: 1, result: true},
        {test: -1, result: true},
        {test: 100, result: true},
        {test: -100, result: true},
        {test: 999999999, result: true},
        {test: -999999999, result: true},
        {test: 1e10, result: true},
        {test: -1e10, result: true},

        // === НЕЦЕЛЫЕ ЧИСЛА (false) ===
        {test: 0.1, result: false},
        {test: 0.000001, result: false},
        {test: 0.5, result: false},
        {test: 3.14, result: false},
        {test: -0.1, result: false},
        {test: -0.000001, result: false},
        {test: -0.5, result: false},
        {test: -3.14, result: false},
        {test: 1.5, result: false},
        {test: -2.7, result: false},

        // === СПЕЦИАЛЬНЫЕ ЗНАЧЕНИЯ ===
        {test: Infinity, result: false},
        {test: -Infinity, result: false},
        {test: NaN, result: false},

        // === ГРАНИЧНЫЕ ЗНАЧЕНИЯ ===
        {test: Number.MAX_SAFE_INTEGER, result: true},
        {test: Number.MIN_SAFE_INTEGER, result: true},
        {test: Number.MAX_VALUE, result: true},
        {test: Number.MIN_VALUE, result: false},

        // === НЕОБЫЧНЫЕ СЛУЧАИ ===
        {test: 0.0, result: true},
        {test: -0.0, result: true},
        {test: 1.0, result: true},
        {test: -1.0, result: true},
        {test: 0.9999999999999999, result: false}, // округлится до 1
    ];

    for (let {test, result} of testCases) {
        expect(isInteger(test)).toBe(result);
    }
});

test('isNatural', () => {
    const testCases = [
        // === НАТУРАЛЬНЫЕ ЧИСЛА (true) ===
        {test: 1, result: true},
        {test: 2, result: true},
        {test: 100, result: true},
        {test: 999999999, result: true},
        {test: 1e10, result: true},

        // === НЕ НАТУРАЛЬНЫЕ (false) ===
        {test: 0, result: false},
        {test: -0, result: false},
        {test: -1, result: false},
        {test: -100, result: false},
        {test: -999999999, result: false},
        {test: -1e10, result: false},
        {test: 0.1, result: false},
        {test: 0.000001, result: false},
        {test: 0.5, result: false},
        {test: 3.14, result: false},
        {test: -0.1, result: false},
        {test: -0.000001, result: false},
        {test: -0.5, result: false},
        {test: -3.14, result: false},
        {test: 1.5, result: false},
        {test: -2.7, result: false},

        // === СПЕЦИАЛЬНЫЕ ЗНАЧЕНИЯ ===
        {test: Infinity, result: false},
        {test: -Infinity, result: false},
        {test: NaN, result: false},

        // === ГРАНИЧНЫЕ ЗНАЧЕНИЯ ===
        {test: Number.MAX_SAFE_INTEGER, result: true},
        {test: Number.MIN_SAFE_INTEGER, result: false},

        // === ОЧЕНЬ БОЛЬШИЕ/МАЛЕНЬКИЕ ЧИСЛА ===
        {test: Number.MAX_VALUE, result: true},
        {test: -Number.MAX_VALUE, result: false},
        {test: Number.MIN_VALUE, result: false},
        {test: -Number.MIN_VALUE, result: false},

        // === НЕОБЫЧНЫЕ СЛУЧАИ ===
        {test: 0.0, result: false},
        {test: -0.0, result: false},
        {test: 1.0, result: true},
        {test: -1.0, result: false},
        {test: 1.0000000000001, result: false},
        {test: 9007199254740991, result: true},
        {test: -9007199254740991, result: false},
        {test: 9007199254740992, result: true},
        {test: -9007199254740992, result: false},
        {test: 0.9999999999999999, result: false},
    ];

    for (let {test, result} of testCases) {
        expect(isNatural(test)).toBe(result);
    }
});

test('isNonNegativeInteger', () => {
    const testCases = [
        // === ЦЕЛЫЕ НЕОТРИЦАТЕЛЬНЫЕ (true) ===
        {test: 0, result: true},
        {test: 1, result: true},
        {test: 2, result: true},
        {test: 100, result: true},
        {test: 999999999, result: true},
        {test: 1e10, result: true},

        // === ОТРИЦАТЕЛЬНЫЕ ИЛИ НЕЦЕЛЫЕ (false) ===
        {test: -1, result: false},
        {test: -100, result: false},
        {test: -999999999, result: false},
        {test: -1e10, result: false},
        {test: 0.1, result: false},
        {test: 0.000001, result: false},
        {test: 0.5, result: false},
        {test: 3.14, result: false},
        {test: -0.1, result: false},
        {test: -0.000001, result: false},
        {test: -0.5, result: false},
        {test: -3.14, result: false},
        {test: 1.5, result: false},
        {test: -2.7, result: false},

        // === СПЕЦИАЛЬНЫЕ ЗНАЧЕНИЯ ===
        {test: Infinity, result: false},
        {test: -Infinity, result: false},
        {test: NaN, result: false},

        // === ГРАНИЧНЫЕ ЗНАЧЕНИЯ ===
        {test: Number.MAX_SAFE_INTEGER, result: true},
        {test: Number.MIN_SAFE_INTEGER, result: false},

        // === ОЧЕНЬ БОЛЬШИЕ/МАЛЕНЬКИЕ ЧИСЛА ===
        {test: Number.MAX_VALUE, result: true},
        {test: -Number.MAX_VALUE, result: false},
        {test: Number.MIN_VALUE, result: false},
        {test: -Number.MIN_VALUE, result: false},

        // === НЕОБЫЧНЫЕ СЛУЧАИ ===
        {test: 0.0, result: true},
        {test: -0.0, result: true}, // -0 это 0
        {test: 1.0, result: true},
        {test: -1.0, result: false},
        {test: 1.0000000000001, result: false},
        {test: 9007199254740991, result: true},
        {test: -9007199254740991, result: false},
        {test: 0.9999999999999999, result: false},
    ];

    for (let {test, result} of testCases) {
        expect(isNonNegativeInteger(test)).toBe(result);
    }
});