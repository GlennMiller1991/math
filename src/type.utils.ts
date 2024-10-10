/**
 * Non empty array of T
 */
export type INonEmptyArray<T = any> = [T, ...T[]]


type IFixedLengthArrayUtil<TLength extends number, TItem extends any, TArray extends Array<TItem>> =
    TArray['length'] extends TLength ? TArray : IFixedLengthArrayUtil<TLength, TItem, [TItem, ...TArray]>

/**
 * Array of T of fixed length
 */
export type IFixedLengthArray<TLength extends number, TItem> =
    number extends TLength ? never :
    TLength extends number ? IFixedLengthArrayUtil<TLength, TItem, [TItem]> :
    never

export function validateType(value: never): never {
    throw new Error('Wrong type passed into')
}