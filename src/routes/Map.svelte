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
    const transport_colors = {
        0: 'blue',
        1: 'green',
        2: 'yellow',
        3: 'red',
        4: 'pink',
        5: 'purple'
    }

    let mapElement;
    let map;
    let markers = []; // Array to store marker references

    let socket;
    let leaflet;

    onMount(async () => {
        if(browser) {
            leaflet = await import('leaflet');
            import.meta.env.VITE_SERVER_URL
            const websocket_address = "ws://" + import.meta.env.VITE_SERVER_URL + ":" + import.meta.env.VITE_ENDPOINT_PORT

            socket = new WebSocket(websocket_address);

            map = leaflet.map(mapElement).setView([55.797496, 49.243416], 18);

            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            }).addTo(map);

            socket.onmessage = function (event) {
                const data = JSON.parse(event.data);
                // console.log(data)

                // remove previous points
                map.eachLayer(function (layer) {
                    if (layer instanceof leaflet.Marker) {
                        map.removeLayer(layer);
                    }
                });


                data['cars'].forEach(car => {
                    // console.log(car['coords'][0], car['coords'][1], car['transport_type'])
                    const class_name = transport_classes[car['transport_type']]
                    const color = transport_colors[car['transport_type']]
                    console.log(class_name)

                    const marker = leaflet.marker([car['coords'][0], car['coords'][1]], {
                        icon: leaflet.divIcon({
                            className: "transport " + transport_classes[car['transport_type']].toLowerCase(),
                            html: `<div class=${class_name} style="background: ${color}; border-radius: 100%; display: block; width: 8px; height: 8px"></div>`, // Use template literals for dynamic class name
                            iconSize: "auto",
                            iconAnchor: [4, 5],
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

<style global>
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
        /*height: 5px;*/
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

    /*.car-marker {*/
    /*    background-color: red; !* Change this to your desired color *!*/
    /*    border-radius: 50%; !*Remove or comment out this line to make the marker a rectangle*!*/
    /*}*/

</style>