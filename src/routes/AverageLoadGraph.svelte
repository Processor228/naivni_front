<script>
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';

    export let chart;
    export let data
    export let labels


    onMount(() => {
        const ctx = document.getElementById('chart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line', // or any other type of chart you prefer
            data: {
                labels: labels, // This will be populated with timestamps
                datasets: [{
                    label: 'Average Load',
                    data: data, // This will be populated with avg_load values
                    backgroundColor: 'whitesmoke',
                    borderColor: 'green',
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false
            }
        });
    });
    $: {
        if (chart) chart.update();
    }
</script>

<div>
    <canvas id="chart" style="width: 400px; height: 300px"></canvas>
</div>
