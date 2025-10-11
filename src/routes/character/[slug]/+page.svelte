<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/atoms/Button.svelte';

	$: slug = page.params.slug || '';

	function handleClick() {
		alert('Button clicked!');
	}
</script>

<main>
	<h1>Character {slug}</h1>
	<div class="grid-cols-3">
		<Button on:click={handleClick}>Audio 1</Button>
		<Button>Audio 1</Button>
		<Button>Audio 1</Button>
	</div>
</main>
