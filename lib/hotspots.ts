import { Filters } from './filters';
import { IMarkerData } from './marker-data';
import { Marker } from './marker';
import { SVG } from './svg';

export class Hotspots {

    canvas: HTMLElement;
    container: HTMLElement;
    defs: Filters;
    svg: SVG;
    markers: Array<Marker> = [];

    constructor (canvas: HTMLElement, container: HTMLElement) {
        this.canvas = canvas;
        this.svg = new SVG('svg');
        this.svg.attrs({
            'pointer-events': 'none',
            'style': 'position:absolute;top:0;left:0;',
            'xmlns': 'http://www.w3.org/2000/svg'
        });
        this.container = container;
        this.canvas.appendChild(this.svg.element);
    }

    generate (markers: Array<IMarkerData>) {
        let canvasRect = this.canvas.getBoundingClientRect(),
            containerRect = this.container.getBoundingClientRect();

        this._clear();

        this.svg.attrs({
            'width': (this.canvas.offsetLeft * 2) + this.canvas.offsetWidth + 'px',
            'height': (this.canvas.offsetTop * 2) + this.canvas.offsetHeight + 'px'
        });

        for (let i = 0, len = markers.length; i < len; i++) {
            let point = markers[i].point.closestEdge({
                    top: this.canvas.offsetTop + containerRect.top - canvasRect.top,
                    left: this.canvas.offsetLeft + containerRect.left - canvasRect.left,
                    width: containerRect.width,
                    height: containerRect.height
                }, 38),
                marker = new Marker(point, markers[i].point, markers[i].color);

            marker.addText(markers[i].data.toString());
            marker.appendTo(this.svg.element);
            marker.drag();

            this.markers.push(marker);
        }
    }

    _clear () {
        if (this.markers.length) {
            for (let i = 0, len = this.markers.length; i < len; i++) {
                this.markers[i].remove();
            }
            this.markers = [];
            this.markers.length = 0;
        }
    }
}
