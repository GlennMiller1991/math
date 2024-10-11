import { denormalize, normalize } from "../utils.js";

export function normalizeShade(value: number) {
    return normalize(value, 255)
}

export function denormalizeShade(value: number) {
    return denormalize(value, 255)
}