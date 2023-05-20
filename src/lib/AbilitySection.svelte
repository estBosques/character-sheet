<script>
	import Ability from './Ability.svelte';
</script>

<section
	class="abilitySection col-8 border border-rounded rounded-3 border-black"
>
	<h2 class="sectionTitle px-2 bg-white">Abilities</h2>

	<div class="row justify-content-around">
		<Ability title={'Strength'} value={0} modifier={0} />
		<Ability title={'Dexterity'} value={0} modifier={5} />
		<Ability title={'Constitution'} value={0} modifier={0} />
		<Ability title={'Intelligence'} value={0} modifier={0} />
		<Ability title={'Wisdom'} value={0} modifier={0} />
		<Ability title={'Charisma'} value={0} modifier={-1} />
	</div>
</section>

<style lang="scss">
	.abilitySection {
		position: relative;
		padding: 1rem;
		margin: 1rem;

		.sectionTitle {
			top: -0.8rem;
			position: absolute;
		}
	}
</style>
