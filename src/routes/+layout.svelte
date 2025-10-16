<script lang="ts">
	import { asset, base } from '$app/paths';
	import '../app.scss';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={asset('/favicon.jpg')} />
	<link rel="manifest" href={`${base}/manifest.webmanifest`} />
</svelte:head>

{@render children?.()}
