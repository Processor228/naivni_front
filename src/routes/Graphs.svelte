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
        <div class="label-for-cars">
        <div style="background: #fced01;" class="label-square"/>
            Motorcycles
        </div>
        <div class="label-for-cars">
            <div style="background: #3e7d22;" class="label-square"/>
            Cars
        </div>
        <div class="label-for-cars">
            <div style="background: #3a0464;" class="label-square"/>
            Cars with trailers
        </div>
        <div class="label-for-cars">
            <div style="background: #053971;" class="label-square"/>
            Trucks
        </div>
        <div class="label-for-cars">
            <div style="background: #04a8ab;" class="label-square"/>
            Road trains
        </div>
        <div class="label-for-cars">
            <div style="background: #ffa711;" class="label-square"/>
            Buses
        </div>
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
        display: flex;
        flex-wrap: wrap;
        width: 20vw;
        height: 20vw;
        gap: 0.5vh;
    }
    .label-for-cars {
        margin-left: 3%;
        margin-top: 10%;
        width: 46%;
        height: 20%;
        font-size: 1.3em;
        display: flex;
        text-align: left;
        gap: 1vw;
        align-items: center;
    }
    .label-square {
        width: 20px;
        height: 20px;
    }
</style>