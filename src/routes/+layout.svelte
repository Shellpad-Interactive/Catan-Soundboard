<script lang="ts">
	/// <reference types="vite-plugin-pwa/client" />
	import { asset, base } from '$app/paths';
	import { onMount } from 'svelte';
	import { registerSW } from 'virtual:pwa-register';
	import '../app.scss';

	let { children } = $props();

	onMount(() => {
		registerSW({ immediate: true });
	});
</script>

<svelte:head>
	<link rel="icon" href={asset('/favicon.jpg')} />
	<link rel="manifest" href={`${base}/manifest.webmanifest`} />
</svelte:head>

{@render children?.()}
