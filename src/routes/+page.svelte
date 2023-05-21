<script lang="ts">
	import AbilitySection from '$lib/AbilitySection.svelte';
	import BasicInfo from '$lib/BasicInfo.svelte';
	import '../app.scss';
</script>

<div class="w-full">
	<div class="sheet container-fluid">
		<BasicInfo />
		<AbilitySection />
	</div>
</div>
