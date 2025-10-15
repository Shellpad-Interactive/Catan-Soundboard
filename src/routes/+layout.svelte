<script lang="ts">
	import { asset } from '$app/paths';
	import '../app.scss';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={asset('/favicon.jpg')} />
</svelte:head>

{@render children?.()}
