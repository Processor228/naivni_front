<script>
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';
    import {browser} from "$app/environment";

    let socket;
    let chart;

    onMount(() => {
        const ctx = document.getElementById('types-of-cars').getContext('2d');
        chart = new Chart(ctx, {
            type: 'doughnut', // or any other type of chart you prefer
            data:{
                labels: [
                    'Red',
                    'Blue',
                    'Yellow'
                ],
                datasets: [{
                    label: 'My First Dataset',
                    data: [300, 50, 100],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                maintainAspectRatio: false
            }
        });

        if (browser) {

            import.meta.env.VITE_SERVER_URL
            const port = Number(import.meta.env.VITE_ENDPOINT_PORT) + 10
            const websocket_address = "ws://" + import.meta.env.VITE_SERVER_URL + ":" + (port)
            console.log(websocket_address)

            socket = new WebSocket(websocket_address);

            // socket.onmessage = function (event) {
            //     const data = JSON.parse(event.data);
            //
            //     if (!chart.data.labels.includes(data.timestamp)) {
            //         chart.data.labels.push(data.timestamp);
            //         chart.data.datasets[0].data.push(data.average_load);
            //         chart.update(); // Update the chart to reflect the new data
            //     }
            //
            // }


        }


    });



</script>

<div>
    <canvas id="types-of-cars" style="width: 200px; height: 200px"></canvas>
</div>
