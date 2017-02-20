import {Component} from './component';
import {IManifest} from '../lib/manifest';
import {JSONLoader} from './json-loader';
import {Hotspots} from '../lib/hotspots';
import {MarkerData} from '../lib/marker-data';


class App {
    canvas: HTMLElement;
    container: HTMLElement;
    hotspots: Hotspots;
    markerData: MarkerData;

    constructor (canvas, container) {
        this.canvas = canvas;
        this.container = container;
        this.hotspots = new Hotspots(canvas, container);
        this.markerData = new MarkerData(canvas, {
            lower:  [47, 144, 211],
            higher:  [242, 0, 0]
        });
    }

    buttonData (buttons, stats) {
        let data = [];

        for (let i = 0, len = buttons.length; i < len; i++) {
            let button = buttons[i];

            for (let s = 0; s < stats.length; s++) {
                if (button.id === stats[s].creative_component.name) {
                    data.push(stats[s].presses);
                }
            }
        }

        return data;
    }

    renderCreative (element: HTMLElement, manifest: IManifest) {
        let component = new Component(manifest);

        component.render(element);
    }

    render (manifest_id: number) {
        let $this = this,
            container = this.container,
            manifestLoader: JSONLoader = new JSONLoader(),
            statsLoader: JSONLoader = new JSONLoader();

        statsLoader.onload((stats) => {
            manifestLoader.onload(function (manifests) {
                let manifest = manifests[manifest_id];

                $this.renderCreative(container, manifest);
                container.style.width = manifest.css.width;
                container.style.height = manifest.css.height;

                let buttons = Array.prototype.slice.call(document.getElementsByClassName('button')),
                    buttonData = $this.buttonData(buttons, stats.data),
                    markers = $this.markerData.getData(buttons, buttonData);

                $this.hotspots.generate(markers);
            });

            manifestLoader.open('src/json/manifest_mock.json');
        });

        statsLoader.open('src/json/interactions_mock.json');
    }

    clear () {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        this.hotspots._clear();
    }
}

let canvas: HTMLElement = <HTMLElement>document.getElementsByClassName('Canvas')[0],
    container: HTMLElement = <HTMLElement>document.getElementsByClassName('Container')[0],
    app = new App(canvas, container),
    clearButton = document.getElementsByClassName('clear')[0],
    render1Button = document.getElementsByClassName('render1')[0],
    render2Button = document.getElementsByClassName('render2')[0];

render1Button.addEventListener('click', function () {
    app.clear();
    app.render(0);
}, false);

render2Button.addEventListener('click', function () {
    app.clear();
    app.render(1);
}, false);

clearButton.addEventListener('click', function () {
    app.clear();
}, false);

app.render(0);
