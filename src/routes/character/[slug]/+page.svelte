<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import AudioButton from '$lib/components/atoms/AudioButton.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import type { AudioManifest } from '$lib/models/audio-manifest.model';
	import { getRandomInt } from '$lib/util/random.util';
	import { onMount } from 'svelte';

	$: slug = page.params.slug || '';
	$: character = slug.toLocaleLowerCase();

	let audioManifest: AudioManifest;
	let audio: { [category: string]: HTMLAudioElement[] } = {};
	let lastPlayedIndices: { [category: string]: number } = {};

	let lastPlayedSample: HTMLAudioElement;
	let categories: string[] = [];

	onMount(async () => {
		const res = await fetch(asset('/audio-manifest.json'));
		audioManifest = await res.json();

		categories = Object.keys(audioManifest[character] ?? []);
	});

	function loadAudioCategory(category: string) {
		const categoryPaths = audioManifest[character][category];
		audio[category] = categoryPaths.map((path) => new Audio(asset(path)));
	}

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

	function getAudioOptions(category: string) {
		if (!audio[category]) {
			loadAudioCategory(category);
		}

		return audio[category];
	}

	function playAudioFromCategory(category: string) {
		const audioOptions = getAudioOptions(category);

		let randomIndex = getRandomInt(0, audioOptions.length);

		// Make sure we don't play the same index twice in a row
		const lastPlayedIndex = lastPlayedIndices[category];
		if (lastPlayedIndex >= 0) {
			randomIndex = (lastPlayedIndex + getRandomInt(1, audioOptions.length)) % audioOptions.length;
		}
		lastPlayedIndices[category] = randomIndex;

		const randomSample = audioOptions[randomIndex];
		lastPlayedSample?.pause();
		randomSample.play();

		lastPlayedSample = randomSample;
	}

	function playLastPlayedAudio() {
		if (!lastPlayedSample) {
			return;
		}
		lastPlayedSample.play();
	}

	function playRandomAudio() {
		const randomCategory = categories[getRandomInt(0, categories.length)];
		playAudioFromCategory(randomCategory);
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
		{#each categories as category}
			<AudioButton on:click={() => playAudioFromCategory(category)} class="capitalize"
				>{getCategoryLabel(category)}</AudioButton
			>
		{/each}
	</div>

	{#if categories?.length}
		<div class="flew-wrap mt-10 flex h-[120px] justify-center gap-5">
			<AudioButton on:click={() => playLastPlayedAudio()}>
				<div class="flex flex-col items-center">
					Repeat
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="h-16">
						<path
							fill="currentColor"
							d="M534.6 182.6C547.1 170.1 547.1 149.8 534.6 137.3L470.6 73.3C461.4 64.1 447.7 61.4 435.7 66.4C423.7 71.4 416 83.1 416 96L416 128L256 128C150 128 64 214 64 320C64 337.7 78.3 352 96 352C113.7 352 128 337.7 128 320C128 249.3 185.3 192 256 192L416 192L416 224C416 236.9 423.8 248.6 435.8 253.6C447.8 258.6 461.5 255.8 470.7 246.7L534.7 182.7zM105.4 457.4C92.9 469.9 92.9 490.2 105.4 502.7L169.4 566.7C178.6 575.9 192.3 578.6 204.3 573.6C216.3 568.6 224 556.9 224 544L224 512L384 512C490 512 576 426 576 320C576 302.3 561.7 288 544 288C526.3 288 512 302.3 512 320C512 390.7 454.7 448 384 448L224 448L224 416C224 403.1 216.2 391.4 204.2 386.4C192.2 381.4 178.5 384.2 169.3 393.3L105.3 457.3z"
						/>
					</svg>
				</div>
			</AudioButton>

			<AudioButton on:click={() => playRandomAudio()}>
				<div class="flex flex-col items-center">
					Random
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="h-16">
						<path
							fill="currentColor"
							d="M467.8 98.4C479.8 93.4 493.5 96.2 502.7 105.3L566.7 169.3C572.7 175.3 576.1 183.4 576.1 191.9C576.1 200.4 572.7 208.5 566.7 214.5L502.7 278.5C493.5 287.7 479.8 290.4 467.8 285.4C455.8 280.4 448 268.9 448 256L448 224L416 224C405.9 224 396.4 228.7 390.4 236.8L358 280L318 226.7L339.2 198.4C357.3 174.2 385.8 160 416 160L448 160L448 128C448 115.1 455.8 103.4 467.8 98.4zM218 360L258 413.3L236.8 441.6C218.7 465.8 190.2 480 160 480L96 480C78.3 480 64 465.7 64 448C64 430.3 78.3 416 96 416L160 416C170.1 416 179.6 411.3 185.6 403.2L218 360zM502.6 534.6C493.4 543.8 479.7 546.5 467.7 541.5C455.7 536.5 448 524.9 448 512L448 480L416 480C385.8 480 357.3 465.8 339.2 441.6L185.6 236.8C179.6 228.7 170.1 224 160 224L96 224C78.3 224 64 209.7 64 192C64 174.3 78.3 160 96 160L160 160C190.2 160 218.7 174.2 236.8 198.4L390.4 403.2C396.4 411.3 405.9 416 416 416L448 416L448 384C448 371.1 455.8 359.4 467.8 354.4C479.8 349.4 493.5 352.2 502.7 361.3L566.7 425.3C572.7 431.3 576.1 439.4 576.1 447.9C576.1 456.4 572.7 464.5 566.7 470.5L502.7 534.5z"
						/>
					</svg>
				</div>
			</AudioButton>
		</div>
	{/if}
</main>
