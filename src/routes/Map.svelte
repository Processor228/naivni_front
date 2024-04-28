<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import {carStyleFactory, transport_colors, transport_classes} from "./MapHelpers"

    let mapElement;
    let map;

    let socket;
    let leaflet;

    onMount(async () => {
        if(browser) {
            leaflet = await import('leaflet');
            import.meta.env.VITE_SERVER_URL
            const websocket_address = "ws://" + import.meta.env.VITE_SERVER_URL + ":" + import.meta.env.VITE_ENDPOINT_PORT

            socket = new WebSocket(websocket_address);

            map = leaflet.map(mapElement).setView([55.797496, 49.243416], 18);  // 18 is zoom bro
            map.attributionControl.setPrefix(false);

            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            }).addTo(map);

            socket.onmessage = function (event) {
                const data = JSON.parse(event.data);

                // remove previous points
                map.eachLayer(function (layer) {
                    if (layer instanceof leaflet.Marker) {
                        map.removeLayer(layer);
                    }
                });

                data['cars'].forEach(car => {
                    const auto_type = car['transport_type']
                    let style = carStyleFactory(auto_type);

                    const marker = leaflet.marker([car['coords'][0], car['coords'][1]], {
                        icon: leaflet.divIcon({
                            className: "transport " + transport_classes[car['transport_type']].toLowerCase(),
                            html: `<div style="${style}"></div>`,
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
</style>