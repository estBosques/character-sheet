<script>
	import Ability from './Ability.svelte';
</script>

<section class="abilitySection relative flex flex-row flex-wrap w-full gap-3 border rounded-lg border-black">
	<h2 class="px-2 absolute bg-white">Abilities</h2>

	<Ability title={'Strength'} value={0} modifier={0} />
	<Ability title={'Dexterity'} value={0} modifier={5} />
	<Ability title={'Constitution'} value={0} modifier={0} />
	<Ability title={'Intelligence'} value={0} modifier={0} />
	<Ability title={'Wisdom'} value={0} modifier={0} />
	<Ability title={'Charisma'} value={0} modifier={-1} />
</section>

<style lang="scss">
	.abilitySection {
		padding: 1rem;
    margin: 1rem;

		h2 {
			top: -0.8rem;
		}
	}
</style>
