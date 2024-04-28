<script>
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';
    import {browser} from "$app/environment";

    let socket;
    let chart;

    onMount(() => {
        const ctx = document.getElementById('chart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line', // or any other type of chart you prefer
            data: {
                labels: [], // This will be populated with timestamps
                datasets: [{
                    label: 'Average Load',
                    data: [], // This will be populated with avg_load values
                    backgroundColor: 'whitesmoke',
                    borderColor: 'green',
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false, // Important for setting custom size
                scales: {
                    // y: {
                    //     beginAtZero: true
                    // }
                }
            }
        });

        if (browser) {

            import.meta.env.VITE_SERVER_URL
            const port = Number(import.meta.env.VITE_ENDPOINT_PORT) + 10
            const websocket_address = "ws://" + import.meta.env.VITE_SERVER_URL + ":" + (port)
            console.log(websocket_address)

            socket = new WebSocket(websocket_address);

            socket.onmessage = function (event) {
                const data = JSON.parse(event.data);

                if (!chart.data.labels.includes(data.timestamp)) {
                    chart.data.labels.push(data.timestamp);
                    chart.data.datasets[0].data.push(data.average_load);
                    chart.update(); // Update the chart to reflect the new data
                }

            }


        }


    });



</script>

<div>
    <canvas id="chart" style="width: 400px; height: 300px"></canvas>
</div>
