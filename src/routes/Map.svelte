<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    const transport_classes = {
        0: 'motorcycle',
        1: 'car',
        2: 'car-with-trailer',
        3: 'truck',
        4: 'road-train',
        5: 'bus'
    }

    let mapElement;
    let map;
    let markers = []; // Array to store marker references

    let socket;
    let leaflet;

    onMount(async () => {
        if(browser) {
            leaflet = await import('leaflet');
            socket = new WebSocket('ws://localhost:8765');

            map = leaflet.map(mapElement).setView([55.797496, 49.243416], 18);

            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            }).addTo(map);

            socket.onmessage = function (event) {
                const data = JSON.parse(event.data);
                console.log(data)

                // remove previous points
                map.eachLayer(function (layer) {
                    if (layer instanceof leaflet.Marker) {
                        map.removeLayer(layer);
                    }
                });

                data['cars'].forEach(car => {
                    const marker = leaflet.marker([car['coords'][0], car['coords'][1]], {
                        icon: leaflet.divIcon({
                            className: 'transport ' + transport_classes[car['class']],
                            iconSize: "auto",
                            iconAnchor: [5, 5],
                            popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
                        })
                    }).addTo(map);
                });

            };

        }
    });


</script>

<main>
    <div bind:this={mapElement}></div>
</main>

<style>
    @import 'leaflet/dist/leaflet.css';
    main div {
        height: 500px;
        width: 500px;
    }

    .car {
        background: green;
        border-radius: 100%;
    }

    .motorcycle {
        background: lightskyblue;
        height: 5px;
    }

    .car-with-trailer {
        background: mediumpurple;
    }

    .truck {
        background: red;
    }

    .road-train {
        background: pink;
    }

    .bus {
        background: orange;
    }


    .car-marker {
        background-color: red; /* Change this to your desired color */
        border-radius: 50%; /*Remove or comment out this line to make the marker a rectangle*/
    }
</style>