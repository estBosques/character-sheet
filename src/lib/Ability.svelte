<script lang="ts">
	export let title: string;
	export let value: number;
	export let modifier: number;
</script>

<div class="ability col-6 col-md-4 col-xl-2 pt-3 pb-4">
	<div class="border border-rounded rounded-4">
		<h3 class="title h5 pt-2">{title}</h3>
		<p class="value">{value}</p>
		<span class="modifier mx-auto border border-rounded rounded-circle"
			>{modifier >= 0 ? '+' : ''}{modifier}</span
		>
	</div>
</div>

<style lang="scss">
	.ability {
		justify-content: space-between;
		align-items: center;
		text-align: center;
		position: relative;

		.modifier {
			position: absolute;
			bottom: 0.5rem;
			left: 0;
			right: 0;
			font-size: 1rem;
			font-weight: bold;
			color: gray;
			font-style: italic;
			background: white;
			aspect-ratio: 1/1;
			width: 2rem;
			height: 2rem;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
