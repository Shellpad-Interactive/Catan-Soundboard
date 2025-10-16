<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import AudioButton from '$lib/components/atoms/AudioButton.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import { getRandomInt } from '$lib/util/random.util';
	import { onMount } from 'svelte';

	$: slug = page.params.slug || '';
	$: character = slug.toLocaleLowerCase();

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
	});

	function loadAudioCategory(category: string) {
		const categoryPaths = audioFileEntries.filter((x) => x.src.includes(`${character}/${category}`));
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

<main class="container relative mx-auto flex flex-col items-center justify-center px-2 pb-5">
	<a href={resolve('/')}><Button class="absolute left-2 top-2">↩ Back</Button></a>

	<div class="relative mb-5">
		<img src={asset(`/images/${character.toLowerCase()}.png`)} alt={character} class="h-40" />
		<h1
			class="stroke-dark-red absolute bottom-0 left-1/2 -translate-x-1/2 text-nowrap text-center capitalize drop-shadow"
		>
			{character}
		</h1>
	</div>
	<div class="grid auto-rows-[120px] grid-cols-2 gap-5 md:grid-cols-3">
		<AudioButton on:click={() => playRandomAudio('super')}>Super!</AudioButton>
		<AudioButton on:click={() => playRandomAudio('wat een ellende')}>Wat een ellende</AudioButton>
		<AudioButton on:click={() => playRandomAudio('och nee')}>Och nee...</AudioButton>
		<AudioButton on:click={() => playRandomAudio('ik denk na')}>Ik denk na...</AudioButton>
		<AudioButton on:click={() => playRandomAudio('ik waarschuw jullie allen')}>Ik waarschuw jullie allen</AudioButton>
		<AudioButton on:click={() => playRandomAudio('wacht even')}>Wacht even!</AudioButton>
		<AudioButton on:click={() => playRandomAudio('schiet eens op zeg')}>Schiet eens op, zeg!</AudioButton>
		<AudioButton on:click={() => playRandomAudio('ik wil met jou handelen')}>Ik wil met jou handelen!</AudioButton>
		<AudioButton on:click={() => playRandomAudio('je bent een')}>Je bent een #!</AudioButton>
		<AudioButton on:click={() => playRandomAudio('hartelijk dank')}>Hartelijk dank!</AudioButton>
	</div>
</main>
