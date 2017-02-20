import { SVG } from './svg';

export class Filters {

    defs: SVG;

    constructor () {
        this.defs = new SVG('defs');
    }

    dropShadow (): SVG {
        let filter = new SVG('filter'),
            feColorMatrix = new SVG('feColorMatrix'),
            feGaussianBlur = new SVG('feGaussianBlur'),
            feMerge = new SVG('feMerge'),
            feMergeNodeBlur = new SVG('feMergeNode'),
            feMergeNodeBluGraphic = new SVG('feMergeNode');

        filter.attr('id', 'black-glow');
        feColorMatrix.attrs({
            'type': 'matrix',
            'values': `0 0 0 0 0
                       0 0 0 0 0
                       0 0 0 0 0
                       0 0 0 0.5 0`
        });
        feGaussianBlur.attrs({
            'stdDeviation': 1,
            'in': 'SourceAlpha',
            'result': 'colouredBlur'
        });
        feMergeNodeBlur.attr('in', 'colouredBlur');
        feMergeNodeBluGraphic.attr('in', 'SourceGraphic');

        feMergeNodeBlur.appendTo(feMerge.element);
        feMergeNodeBluGraphic.appendTo(feMerge.element);
        feColorMatrix.appendTo(filter.element);
        feGaussianBlur.appendTo(filter.element);
        feMerge.appendTo(filter.element);

        filter.appendTo(this.defs.element);

        return filter;
    }

    appendTo(element: SVGElement) {
        element.appendChild(this.defs.element);
    }
}