import {type IPoint, Point} from "../figures/index.ts";

export function centroid<T extends IPoint>(...ps: T[]): T {
    const sum = Point.sum(...ps);

    return Point.scale(sum, 1 / ps.length);
}