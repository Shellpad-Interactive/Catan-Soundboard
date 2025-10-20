<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import AudioButton from '$lib/components/atoms/AudioButton.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import type { AudioManifest } from '$lib/models/audio-manifest.model';
	import { getRandomInt } from '$lib/util/random.util';
	import { onMount } from 'svelte';

	let slug = page.params.slug || '';
	let isSpamModeEnabled = false;

	let audioManifest: AudioManifest;
	let lastPlayedIndices: { [category: string]: number } = {};

	let lastPlayedSample: HTMLAudioElement;
	let categories: string[] = [];

	$: character = slug.toLocaleLowerCase();

	onMount(async () => {
		const res = await fetch(asset('/audio-manifest.json'));
		audioManifest = await res.json();

		categories = Object.keys(audioManifest[character] ?? []).sort((a, b) => {
			if (a.toLocaleLowerCase() === 'overige') {
				return Number.MAX_SAFE_INTEGER;
			} else if (b.toLocaleLowerCase() === 'overige') {
				return Number.MIN_SAFE_INTEGER;
			}

			return a.localeCompare(b);
		});

		const storedSpamMode = localStorage.getItem('SPAM_MODE');
		if (storedSpamMode) {
			isSpamModeEnabled = JSON.parse(storedSpamMode);
		}
	});

	function getCategoryLabel(category: string) {
		if (category === 'super') {
			return 'Super!';
		} else if (category === 'wat een ellende') {
			return 'Wat een ellende';
		} else if (category === 'och nee') {
			return 'Och nee...';
		} else if (category === 'ik denk na') {
			return 'Ik denk na...';
		} else if (category === 'ik waarschuw jullie allen') {
			return 'Ik waarschuw jullie allen';
		} else if (category === 'wacht even') {
			return 'Wacht even!';
		} else if (category === 'schiet eens op zeg') {
			return 'Schiet eens op, zeg!';
		} else if (category === 'ik wil met jou handelen') {
			return 'Ik wil met jou handelen!';
		} else if (category === 'je bent een') {
			return 'Je bent een #!';
		} else if (category === 'hartelijk dank') {
			return 'Hartelijk dank!';
		} else {
			return category;
		}
	}

	function playAudioFromCategory(category: string) {
		const audioPaths = audioManifest[character][category];

		let randomIndex = getRandomInt(0, audioPaths.length);

		// Make sure we don't play the same index twice in a row
		const lastPlayedIndex = lastPlayedIndices[category];
		if (lastPlayedIndex >= 0) {
			randomIndex = (lastPlayedIndex + getRandomInt(1, audioPaths.length)) % audioPaths.length;
		}
		lastPlayedIndices[category] = randomIndex;

		const randomAudioPath = audioPaths[randomIndex];

		playAudio(randomAudioPath);
	}

	function playLastPlayedAudio() {
		if (!lastPlayedSample) {
			return;
		}

		playAudio(lastPlayedSample.src);
	}

	function playAudio(audioPath: string) {
		if (!audioPath) {
			return;
		}

		if (!isSpamModeEnabled && lastPlayedSample) {
			lastPlayedSample.pause();
		}

		let sample = new Audio(asset(audioPath));
		sample.play();

		lastPlayedSample = sample;
	}

	function playRandomAudio() {
		const randomCategory = categories[getRandomInt(0, categories.length)];
		playAudioFromCategory(randomCategory);
	}

	function setSpamMode(isEnabled: boolean) {
		isSpamModeEnabled = isEnabled;
		localStorage.setItem('SPAM_MODE', JSON.stringify(isSpamModeEnabled));
	}
</script>

<main class="container relative mx-auto flex max-w-3xl flex-col items-center justify-center px-2 pb-5">
	<a class="sticky left-2 top-2 flex h-0 w-full" href={resolve('/')}>
		<Button class="sticky left-2 top-2 z-50 h-10 shadow">
			<i class="fa-solid fa-chevron-left"></i>
		</Button>
	</a>

	<div class="relative mb-5">
		<img src={asset(`/images/${character.toLowerCase()}.png`)} alt={character} class="h-40" />
		<h1
			class="stroke-dark-red absolute bottom-0 left-1/2 -translate-x-1/2 text-nowrap text-center capitalize drop-shadow"
		>
			{character}
		</h1>
	</div>
	<div class="grid w-full auto-cols-max auto-rows-[120px] grid-cols-2 gap-5 md:grid-cols-3">
		{#each categories as category}
			<AudioButton on:click={() => playAudioFromCategory(category)} class="capitalize"
				>{getCategoryLabel(category)}</AudioButton
			>
		{/each}
	</div>

	{#if categories?.length}
		<div class="sticky bottom-1 mt-10 grid auto-rows-[80px] grid-cols-3 justify-center gap-5">
			<AudioButton on:click={() => playLastPlayedAudio()}>
				<div class="flex h-full flex-col items-center justify-between">
					<span>Repeat</span>
					<i class="fa-solid fa-repeat"></i>
				</div>
			</AudioButton>

			<AudioButton on:click={() => playRandomAudio()}>
				<div class="flex h-full flex-col items-center justify-between">
					<span>Random</span>
					<i class="fa-solid fa-shuffle"></i>
				</div>
			</AudioButton>

			<AudioButton class="flex h-full flex-col" on:click={() => setSpamMode(!isSpamModeEnabled)}>
				<div class="flex h-full flex-col items-center justify-between">
					<span>Spam</span>
					{#if isSpamModeEnabled}
						<i class="fa-solid fa-check text-green-500"></i>
					{:else}
						<i class="fa-solid fa-ban"></i>
					{/if}
				</div>
			</AudioButton>
		</div>
	{/if}
</main>
