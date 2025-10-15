<script lang="ts">
	export let character: string;
	import { asset, resolve } from '$app/paths';
</script>

<a
	href={resolve(`/character/${character.toLocaleLowerCase()}`)}
	title={`${character}`}
	class="btn-character group relative aspect-video h-full w-full rounded border-4 border-catan-yellow"
>
	<div class="btn-character__bg absolute h-full w-full saturate-50 transition-all group-hover:saturate-100"></div>
	<img
		src={asset(`/images/${character.toLowerCase()}.png`)}
		alt={character}
		class="absolute left-1/2 h-full -translate-x-1/2"
	/>
	<span
		class="stroke-dark-red absolute bottom-1 w-full stroke-black stroke-2 text-center text-xl font-bold capitalize text-catan-yellow drop-shadow md:text-3xl"
		>{character}</span
	>
</a>

<style lang="scss">
	.btn-character {
		&__bg {
			background-size: 100% 100%;
			background-image: url('/src/lib/assets/images/catan.jpg');
		}
	}
</style>
