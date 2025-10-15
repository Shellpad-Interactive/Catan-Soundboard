<script lang="ts">
	import { asset } from '$app/paths';
	import '../app.scss';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={asset('/favicon.jpg')} />
	<link rel="manifest" href="/manifest.webmanifest" />
</svelte:head>

{@render children?.()}
