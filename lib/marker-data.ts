import { Point } from './point';

export interface IGradient {
    higher: Array<number>;
    lower: Array<number>;
}

export interface IMarkerData {
    point: Point;
    color: string;
    data: number;
}

export class MarkerData {
    canvas: HTMLElement;
    gradient: IGradient;

    constructor (canvas: HTMLElement, gradient: IGradient) {
        this.canvas = canvas;
        this.gradient = gradient;
    }

    _min (values: Array<number>) {
        return Math.min.apply(null, values);
    }

    _max (values: Array<number>) {
        return Math.max.apply(null, values);
    }

    _color (min: number, max: number, value: number) {
        let percent = (value - min) / (max - min),
            colorMax = this.gradient.higher,
            colorMin = this.gradient.lower,
            percMax = 0.5,
            percMin = 0.5,
            rgb = [];

        if (!isNaN(percent)) {
            percMax = ((percent * 2 - 1) / 1 + 1) / 2;
            percMin = 1 - percMax;
        }

        rgb = [
            Math.round(colorMax[0] * percMax + colorMin[0] * percMin),
            Math.round(colorMax[1] * percMax + colorMin[1] * percMin),
            Math.round(colorMax[2] * percMax + colorMin[2] * percMin)
        ];

        return 'rgb(' + rgb.join(',') + ')';
    }

    _relativePoint (element: Element): Point {
        let canvasRect: ClientRect = this.canvas.getBoundingClientRect(),
            rect: ClientRect = element.getBoundingClientRect(),
            x = this.canvas.offsetLeft + (rect.left - canvasRect.left) + (rect.width / 2),
            y = this.canvas.offsetTop + (rect.top - canvasRect.top) + (rect.height / 2);

        return new Point(x, y);
    }

    /**
     * Get position of button relative to canvas area
     */
    getData (elements: Array<Element>, data: Array<number>): Array<IMarkerData> {
        let points: Array<IMarkerData> = [],
            min = this._min(data),
            max = this._max(data);

        for (let i = 0, len = elements.length; i < len; i++) {
            points.push({
                color: this._color(min, max, data[i]),
                point: this._relativePoint(elements[i]),
                data: data[i]
            });
        }

        return points;
    }
}
