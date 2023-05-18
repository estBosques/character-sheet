<script lang="ts">
	export let title: string;
	export let value: number;
	export let modifier: number;
</script>

<div class="ability relative flex flex-col basis-1/6 border-2 rounded-lg pt-2 pb-4">
	<h3 class="title">{title}</h3>
	<p class="value">{value}</p>
	<span class="modifier p-1 border rounded-full">{modifier >= 0 ? '+' : ''}{modifier}</span>
</div>

<style lang="scss">
.ability {	
	justify-content: space-between;
	align-items: center;
	text-align: center;

	.modifier {
		position: absolute;
		bottom: -0.75rem;
		font-size: 1rem;
		font-weight: bold;
		color: gray;
		font-style: italic;
		background: white;
		height: 2rem;
		aspect-ratio: 1/1;
	}
}
</style>
