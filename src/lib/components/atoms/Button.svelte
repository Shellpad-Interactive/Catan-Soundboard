<script lang="ts">
	let className = '';
	export { className as class };

	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled: boolean = false;
	export let variant: 'primary' | 'secondary' = 'primary';
</script>

<button
	on:click
	{type}
	{disabled}
	class={`${className} cursor-pointer rounded-lg px-4 py-2 transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50
    ${variant === 'primary' ? 'bg-catan-yellow text-catan-red' : ''}
    ${variant === 'secondary' ? 'bg-catan-red text-catan-yellow' : ''}
    `}
>
	<slot />
</button>
