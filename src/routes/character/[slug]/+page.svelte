<script lang="ts">
	import { page } from '$app/state';

	$: slug = page.params.slug || '';
</script>

<main>
	<h1>Character {slug}</h1>
</main>
