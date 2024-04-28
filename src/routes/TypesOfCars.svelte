<script>
    import { VisSingleContainer, VisTooltip, VisDonut } from '@unovis/svelte'
    import { Donut } from '@unovis/ts'

    export let data
    export let width = 300
    export let height = 300
    const triggers = { [Donut.selectors.segment]: d => d.data }
    const value = (d) => d
</script>

<div style={`width: 20vw; height: auto`}>
    <VisSingleContainer {data}>
        <VisTooltip {triggers}/>
        <VisDonut {value} />
    </VisSingleContainer>
</div>
