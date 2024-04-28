<script>
import AverageLoadGraph from "./AverageLoadGraph.svelte";
import {browser} from "$app/environment";
import {onMount} from "svelte";
import Chart from "chart.js/auto";
import TypesOfCars from "./TypesOfCars.svelte";

let socket;
let load_data = [];
let load_labels = [];
let load_chart;

let types_data = [];

onMount(() => {
    if (browser) {
        import.meta.env.VITE_SERVER_URL
        const port = Number(import.meta.env.VITE_ENDPOINT_PORT) + 10
        const websocket_address = "ws://" + import.meta.env.VITE_SERVER_URL + ":" + (port)
        console.log(websocket_address)

        socket = new WebSocket(websocket_address);

        socket.onmessage = function (event) {
            const socket_data = JSON.parse(event.data);

            if (!load_labels.includes(socket_data.timestamp)) {
                load_labels.push(socket_data.timestamp);
                load_data.push(socket_data.average_load);
                types_data = socket_data.transport_types;
                if (load_chart) load_chart.update();
            }
        }
    }
});
</script>

<div id="graphs">
    <TypesOfCars data={types_data}/>
    <div id="labels">
        <div style="background: green; width: 50px; height: 50px;"></div>
    </div>
    <AverageLoadGraph data={load_data} labels={load_labels} bind:chart={load_chart}/>

</div>

<style>
    #graphs {
        margin: 5vh;
        width: 50vw;
        height: 80vh;
        display: flex;
        flex-wrap: wrap;
        gap: 5vh;
    }
    #labels {
        width: 10vw;
    }
</style>