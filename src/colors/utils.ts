import {denormalize, normalize} from "../utils.ts";

export function normalizeShade(value: number) {
    return normalize(value, 255)
}

export function denormalizeShade(value: number) {
    return Math.floor(denormalize(value, 255));
}
