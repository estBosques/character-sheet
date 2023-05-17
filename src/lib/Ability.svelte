<script lang="ts">
	export let title: string;
	export let value: number;
	export let modifier: number;
</script>

<div class="ability">
	<h2 class="title">{title}</h2>
	<p class="value">{value}</p>
	<p class="modifier">{modifier}</p>
</div>

<style lang="scss">
.ability {
	border: 1px solid black;
	border-radius: 5px;
	padding: 10px;
	margin: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	text-align: center;

	.title {
		font-size: 1.5rem;
		font-weight: bold;
	}

	.value {
		font-size: 2rem;
		font-weight: bold;
	}
	
	.modifier {
		font-size: 1rem;
		font-weight: bold;
		color: gray;
		font-style: italic;
		text-transform: uppercase;
		letter-spacing: 1px;
	}
}
</style>
