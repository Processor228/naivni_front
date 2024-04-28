<script>
import TypesOfCars from "./TypesOfCars.svelte";
import AverageLoadGraph from "./AverageLoadGraph.svelte";
import {browser} from "$app/environment";

let socket;
let data = [];
let labels = [];
let chart;

if (browser) {
    import.meta.env.VITE_SERVER_URL
    const port = Number(import.meta.env.VITE_ENDPOINT_PORT) + 10
    const websocket_address = "ws://" + import.meta.env.VITE_SERVER_URL + ":" + (port)
    console.log(websocket_address)

    socket = new WebSocket(websocket_address);

    socket.onmessage = function (event) {
        const socket_data = JSON.parse(event.data);

        console.log(labels);
        if (labels.indexOf(socket_data.timestamp) === -1) {
            labels.push(socket_data.timestamp);
            data.push(socket_data.average_load);
            if (chart) chart.update();
        }
    }
}
</script>

<AverageLoadGraph data={data} labels={labels} bind:chart={chart}/>
<TypesOfCars/>
