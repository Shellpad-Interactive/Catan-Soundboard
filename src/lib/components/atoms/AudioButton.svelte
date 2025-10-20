<script lang="ts">
	let className = '';
	export { className as class };
</script>

<button
	on:click
	type="button"
	class={`cursor-pointer rounded-lg border-2 border-catan-red-dark bg-catan-yellow px-5 py-2 text-2xl font-bold text-catan-red transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50 ${className}
    `}
>
	<slot />
</button>
