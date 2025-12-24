import {type IPoint, Point} from "../figures/index.ts";

export function centroid(...ps: IPoint[]) {
    const sum = Point.sum(...ps);

    return Point.scale(sum, 1 / ps.length);
}