<script>
	import CharacterButton from '$lib/components/atoms/CharacterButton.svelte';
</script>

<main class="container mx-auto flex flex-col items-center justify-center py-5">
	<h1 class="mb-5 text-center">Catan Soundboard</h1>

	<div class="grid max-w-3xl auto-rows-[100px] grid-cols-2 gap-2 md:auto-rows-[150px]">
		<CharacterButton character="Bernadette"></CharacterButton>
		<CharacterButton character="Chi Lu"></CharacterButton>
		<CharacterButton character="Elisabeth"></CharacterButton>
		<CharacterButton character="Louis"></CharacterButton>
		<CharacterButton character="Marianne"></CharacterButton>
		<CharacterButton character="Siegfried"></CharacterButton>
		<CharacterButton character="Vicky"></CharacterButton>
		<CharacterButton character="Vincent"></CharacterButton>
	</div>
</main>
