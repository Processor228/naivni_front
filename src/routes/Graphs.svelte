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

const load_graph_buffer_len = 12;

let types_data = [];

function add_zero_if_needed(value) {
    if (value >= 10)
        return value
    return "0" + value
}

onMount(() => {
    if (browser) {
        import.meta.env.VITE_SERVER_URL
        const port = Number(import.meta.env.VITE_ENDPOINT_PORT) + 10
        const websocket_address = "ws://" + import.meta.env.VITE_SERVER_URL + ":" + (port)
        console.log(websocket_address)

        socket = new WebSocket(websocket_address);

        socket.onmessage = function (event) {
            const data = JSON.parse(event.data);
            const unix_ms = data.timestamp
            const date = new Date(unix_ms); // Multiply by 1000 to convert seconds to milliseconds

            const hours = add_zero_if_needed(date.getHours());
            const minutes = add_zero_if_needed(date.getMinutes());
            const seconds = add_zero_if_needed(date.getSeconds());

            const readable_stamp = `${hours}:${minutes}:${seconds}`

            if (!load_chart.data.labels.includes(readable_stamp)) {
                while (load_chart.data.labels.length > load_graph_buffer_len) {
                    load_chart.data.datasets[0].data.shift();
                    load_chart.data.labels.shift();
                }

                load_chart.data.labels.push(readable_stamp);
                load_chart.data.datasets[0].data.push(data.average_load);
                types_data = data.transport_types;
                load_chart.update(); // Update the chart to reflect the new data
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