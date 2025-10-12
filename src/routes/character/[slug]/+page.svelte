<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/atoms/Button.svelte';
	import { getRandomInt } from '$lib/util/random.util';
	import { onMount } from 'svelte';

	$: slug = page.params.slug || '';

	let audioFileEntries: { src: string; path: string }[];
	let audio: { [category: string]: HTMLAudioElement[] } = {};
	let lastPlayedIndices: { [category: string]: number } = {};

	onMount(() => {
		const audioFileRecords: Record<string, { default: string }> = import.meta.glob(
			'$lib/assets/audio/**/*.{mp3,wav,ogg}',
			{
				query: 'query',
				eager: true
			}
		);
		audioFileEntries = Object.entries(audioFileRecords).map((x) => ({ src: x[0], path: x[1].default }));

		console.log(audioFileEntries);
	});

	function loadAudioCategory(category: string) {
		const categoryPaths = audioFileEntries.filter((x) => x.src.includes(`${slug}/${category}`));
		audio[category] = categoryPaths.map((x) => new Audio(x.path));
	}

	function getAudioOptions(category: string) {
		if (!audio[category]) {
			loadAudioCategory(category);
		}

		return audio[category];
	}

	function playRandomAudio(category: string) {
		const audioOptions = getAudioOptions(category);

		let randomIndex = getRandomInt(0, audioOptions.length);

		// Make sure we don't play the same index twice in a row
		const lastPlayedIndex = lastPlayedIndices[category];
		if (lastPlayedIndex >= 0) {
			randomIndex = (lastPlayedIndex + getRandomInt(1, audioOptions.length)) % audioOptions.length;
		}
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
