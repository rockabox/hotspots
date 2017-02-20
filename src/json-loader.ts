export class JSONLoader {
    'use strict';

    private request: XMLHttpRequest;

    constructor () {
        this.request = new XMLHttpRequest();
    }
    onload (callback: Function) {
        this.request.addEventListener('load', function (event) {
            callback(JSON.parse(event.target['responseText']));
        }, false);
    }
    open (url: string) {
        this.request.open('get', url, true);
        this.request.send();
    }
}
