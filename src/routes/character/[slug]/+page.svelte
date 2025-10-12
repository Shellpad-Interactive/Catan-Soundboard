<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/atoms/Button.svelte';
	import { onMount } from 'svelte';

	$: slug = page.params.slug || '';

	let audioFilePaths: string[];
	let audio: { [category: string]: HTMLAudioElement[] } = {};
	let lastPlayedIndices: { [category: string]: number } = {};

	onMount(() => {
		const audioFileRecords = import.meta.glob('$lib/assets/audio/**/*.{mp3,wav,ogg}', { as: 'query', eager: true });
		audioFilePaths = Object.keys(audioFileRecords);

		console.log({ audioFilePaths });

		loadAudioCategory('angry');
	});

	function loadAudioCategory(category: string) {
		const categoryPaths = audioFilePaths.filter((x) => x.includes(`${slug}/${category}`));
		audio[category] = categoryPaths.map((path) => new Audio(path));
	}

	function playRandomAudio(category: string) {
		const audioOptions = audio[category];

		// Make sure we don't play the same index twice in a row (WIP)
		const lastPlayedIndex = lastPlayedIndices[category] || 0;
		const randomIndex =
			(lastPlayedIndex + Math.floor(Math.random() * (audioOptions.length - 1)) + 1) % audioOptions.length;
		lastPlayedIndices[category] = randomIndex;

		const randomSample = audioOptions[randomIndex];
		randomSample.play();
	}
</script>

<main class="container mx-auto flex flex-col items-center justify-center py-5">
	<h1 class="mb-5 capitalize">{slug}</h1>
	<div class="grid-cols-3">
		<Button on:click={() => playRandomAudio('angry')}>Angry</Button>
		<Button>Audio 1</Button>
		<Button>Audio 1</Button>
	</div>
</main>
