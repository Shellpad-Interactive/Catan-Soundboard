<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled: boolean = false;
	export let variant: 'primary' | 'secondary' | 'danger' = 'primary';
</script>

<button
	on:click
	{type}
	{disabled}
	class={`cursor-pointer rounded-lg px-4 py-2 font-medium transition disabled:cursor-not-allowed disabled:opacity-50
    ${variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
    ${variant === 'secondary' ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : ''}
    ${variant === 'danger' ? 'bg-red-600 text-white hover:bg-red-700' : ''}
    `}
>
	<slot />
</button>
