<script lang="ts">
	export let character: string;
</script>

<a
	href={`character/${character.toLocaleLowerCase()}`}
	title={`${character}`}
	class="btn-character group relative aspect-video h-20 rounded border-4 border-catan-yellow md:h-32"
>
	<div class="btn-character__bg absolute h-full w-full saturate-50 transition-all group-hover:saturate-100"></div>
	<img src={`/src/lib/assets/images/${character}.png`} alt={character} class="absolute right-0 h-full" />
	<span
		class="absolute bottom-1 w-full stroke-black stroke-2 text-center text-xl font-bold capitalize text-catan-yellow drop-shadow md:text-3xl"
		>{character}</span
	>
</a>

<style lang="scss">
	.btn-character {
		span {
			--stroke-color: #110204;

			text-shadow:
				-1px -1px 0 var(--stroke-color),
				1px -1px 0 var(--stroke-color),
				-1px 1px 0 var(--stroke-color),
				1px 1px 0 var(--stroke-color);
		}
		&__bg {
			background-size: 100% 100%;
			background-image: url('/src/lib/assets/images/catan.jpg');
		}
	}
</style>
