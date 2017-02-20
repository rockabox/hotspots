[![Build Status](https://travis-ci.org/rockabox/hotspots.svg?branch=master)](https://travis-ci.org/rockabox/hotspots)

# Hotspots
Draggable Hotspots library

## Installation
Install all the local node required packages.
```
npm install
```

## Development
```
npm start
```
Will automatically build, watch `.ts` files within `src` folder and run a `lite-server` on `:7000`.

## Testing
```
npm test
```

## Example
```js
let data = [
        {
            creative_component: {
                id: 1,
                component_type: 'button',
                name: 'button_1'
            },
            presses: 123
        },
        {
            creative_component: {
                id: 1,
                component_type: 'button',
                name: 'button_2'
            },
            presses: 567
        }
    ],
    buttonOne = document.getElementById('button_1'),
    buttonTwo = document.getElementById('button_2'),
    // Canvas is the location where hotspots should appear
    canvas = document.getElementById('Canvas'),
    // Element containing the components
    container = document.getElementById('Container'),
    markerData = new MarkerData(canvas, {
        higher: [242, 0, 0],
        lower: [47, 144, 211]
    }),
    hotspots = new Hotspots(canvas, container),
    markers = markerData.getData([buttonOne, buttonTwo], data);

// Render hotspots for the first time
hotspots.generate(markers);

// Render with new set of data
let newData = [
            {
            creative_component: {
                id: 1,
                component_type: 'button',
                name: 'button_1'
            },
            presses: 888
        },
        {
            creative_component: {
                id: 1,
                component_type: 'button',
                name: 'button_2'
            },
            presses: 999
        }
    ],
    newMarkers = markerData.getData([buttonOne, buttonTwo], newData);

hotspots.generate(newMarkers);

// Clear
hotspots._clear();
```
