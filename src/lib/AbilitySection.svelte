<script>
	import Ability from './Ability.svelte';
</script>

<section
	class="abilitySection col-12 col-md-8 mt-3 pt-3 border border-rounded rounded-3 border-black"
>
	<h2 class="sectionTitle px-2 bg-white">Abilities</h2>

	<div class="container-fluid px-0 mx-auto row justify-content-evenly">
		<Ability title={'Strength'} value={0} modifier={0} />
		<Ability title={'Dexterity'} value={0} modifier={5} />
		<Ability title={'Constitution'} value={0} modifier={0} />
		<Ability title={'Intelligence'} value={0} modifier={0} />
		<Ability title={'Wisdom'} value={0} modifier={0} />
		<Ability title={'Charisma'} value={0} modifier={-1} />
	</div>
</section>

<style lang="scss">
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

	.abilitySection {
		position: relative;

		.sectionTitle {
			top: -0.8rem;
			left: 1rem;
			position: absolute;
			
			@include media-breakpoint-up(md) {
				top: -1rem;
			}
		}
	}
</style>
