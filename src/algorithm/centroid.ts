import {type IPoint, IPoint2, IPoint3, Point} from "../figures/index.ts";

export function centroid(...ps: IPoint2[]): IPoint2;
export function centroid(...ps: IPoint3[]): IPoint3;
export function centroid(...ps: IPoint[]) {
    const sum = Point.sum(...ps);

    return Point.scale(sum, 1 / ps.length);
}