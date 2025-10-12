<script>
	import Button from '$lib/components/atoms/Button.svelte';
</script>

<main class="container mx-auto flex flex-col items-center justify-center py-5">
	<h1 class="mb-5 text-center">Catan Soundboard</h1>

	<div class="grid grid-cols-1 gap-2 font-bold sm:grid-cols-2 md:grid-cols-3">
		<a href="character/bernadette" class="contents"><Button>Bernadette</Button></a>
		<a href="character/chi lu" class="contents"><Button>Chi Lu</Button></a>
		<a href="character/liz" class="contents"><Button>Liz</Button></a>
		<a href="character/louis" class="contents"><Button>Louis</Button></a>
		<a href="character/mara" class="contents"><Button>Mara</Button></a>
		<a href="character/siegfried" class="contents"><Button>Siegfried</Button></a>
		<a href="character/vicky" class="contents"><Button>Vicky</Button></a>
		<a href="character/vincent" class="contents"><Button>Vincent</Button></a>
	</div>
</main>
