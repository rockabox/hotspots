import { Point } from './point';
import { SVG } from './svg';

export class Marker {
    'use strict';

    baseColor: string = 'white';
    baseOpacity: number = 0.2;
    baseShadowColor: string = 'black';

    anchorPoint: Point;
    color: string;
    headPoint: Point;

    head: SVG;
    path: SVG;
    shadowPath: SVG;
    anchor: SVG;
    text: SVG;

    constructor (head: Point, anchor: Point, color: string) {
        this.anchorPoint = anchor;
        this.color = color;
        this.headPoint = head;

        this.path = this._pathSVG(2, this.baseColor, head, anchor);

        this.shadowPath = this._pathSVG(4, this.baseShadowColor, head, anchor);
        this.shadowPath.attr('stroke-opacity', this.baseOpacity);

        this.anchor = this._anchorSVG(anchor);

        this.head = this._headSVG(head);
    }

    _anchorSVG (point: Point): SVG {
        let element: SVG = new SVG('circle');

        element.attrs({
            'class': 'Marker--anchor',
            'r': 4,
            'cx': 0,
            'cy': 0,
            'fill': this.baseColor,
            'transform': 'translate(' + point.x + ',' + point.y + ')',
            'stroke-width': 1,
            'stroke': this.baseShadowColor,
            'stroke-opacity': this.baseOpacity
        });

        return element;
    }

    _focus (parent: SVGElement) {
        this.shadowPath.appendTo(parent);
        this.path.appendTo(parent);
        this.anchor.appendTo(parent);
        this.head.appendTo(parent);
    }

    _headSVG (point: Point): SVG {
        let element: SVG = new SVG('g'),
            shadow: SVG = new SVG('circle'),
            circle: SVG = new SVG('circle');

        circle.attrs({
            'class': 'Marker--circle',
            'r': 20,
            'cx': 0,
            'cy': 0,
            'fill': this.color,
            'stroke': this.baseColor,
            'stroke-width': 3
        });

        shadow.attrs({
            'class': 'Marker--circle',
            'r': 20,
            'cx': 0,
            'cy': 0,
            'fill': this.baseShadowColor,
            'stroke': this.baseShadowColor,
            'stroke-width': 5,
            'stroke-opacity': this.baseOpacity
        });

        element.attrs({
            'class': 'Marker--head',
            'transform': 'translate(' + point.x + ',' + point.y + ')'
        });

        shadow.appendTo(element.element);
        circle.appendTo(element.element);

        return element;
    }

    _pathSVG (stroke: number, color: string, head: Point, anchor: Point): SVG {
        let element: SVG = new SVG('path'),
            path = ['M', head.x, ',', head.y,
                ' L', anchor.x, ',', anchor.y];

        element.attrs({
            'class': 'Marker--path',
            'stroke': color,
            'stroke-width': stroke,
            'd': path.join('')
        });

        return element;
    }

    drag () {
        let $this = this,
            element: SVGElement = this.head.element,
            parent: SVGElement = <SVGElement>this.head.element.parentNode;

        this.head.attr('style', 'pointer-events:all;cursor:pointer;');

        element.onmousedown = (event: MouseEvent) => {
            event.preventDefault();

            $this._focus(parent);

            document.body.onmousemove = (event) => {
                let rect = parent.getBoundingClientRect(),
                    x = event.clientX - rect.left,
                    y = event.clientY - rect.top,
                    d = [
                        'M', x, ',', y, ' ',
                        'L', $this.anchorPoint.x, ',', $this.anchorPoint.y
                    ].join('');

                this.head.attr('transform', 'translate(' + x + ',' + y + ')');
                $this.shadowPath.attr('d', d);
                $this.path.attr('d', d);
            };

            document.body.onmouseup = document.body.onmouseleave = (event) => {
                document.body.onmousemove = null;
                document.body.onmouseleave = null;
                document.body.onmouseup = null;
            };
        };
    }

    addText (data: string) {
        let text = new SVG('text');

        text.attrs({
            'dy': 4,
            'class': 'Marker--text',
            'text-anchor': 'middle',
            'fill': 'white',
            'font-size': 12
        });

        text.element.textContent = data;
        text.appendTo(this.head.element);

        this.text = text;

        return text.element;
    }

    appendTo (element: SVGElement) {
        this.shadowPath.appendTo(element);
        this.path.appendTo(element);
        this.anchor.appendTo(element);
        this.head.appendTo(element);
    }

    remove () {
        this.shadowPath.remove();
        this.path.remove();
        this.anchor.remove();
        this.head.remove();
    }
}
