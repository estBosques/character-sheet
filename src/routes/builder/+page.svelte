<script lang="ts">
	import Form from '$lib/characterBuilder/FormBuilder.svelte';
	import ProgressBar from '$lib/ProgressBar.svelte';
  import '$src/app.scss';
	let steps = ['Info', 'Race', 'Payment', 'Confirmation'], currentActive = 2, progressBar: ProgressBar;
	
	const handleProgress = (stepIncrement: number) => {
		progressBar.handleProgress(stepIncrement)
	}
	
</script>

<main class="container-fluid vh-100">
	<div class="col-4">
		<ProgressBar {steps} bind:currentActive bind:this={progressBar}/>
		
		<Form active_step={steps[currentActive-1]}/>

		<div class="step-button">
			<button class="btn" on:click={() => handleProgress(-1)} disabled={currentActive == 1}>Prev</button>
			<button class="btn" on:click={() => handleProgress(1)} disabled={currentActive == steps.length}>Next</button>
		</div>		
	</div>	  
</main>

<style>

	@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');
	
	* {
		box-sizing: border-box;
	}

	main {
		font-family: 'Muli', sans-serif;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
	}

	.btn {
		background-color: #3498db;
		color: #fff;
		border: 0;
		border-radius: 6px;
		cursor: pointer;
		font-family: inherit;
		padding: 8px 30px;
		margin: 5px;
		font-size: 14px;
	}

	.btn:active {
		transform: scale(0.98);
	}

	.btn:focus {
		outline: 0;
	}

	.btn:disabled {
		background-color: #e0e0e0;
		cursor: not-allowed;
	}
	
	.step-button{
		margin-top: 1rem;
		text-align: center;
	}
</style>