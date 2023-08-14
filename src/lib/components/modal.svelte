<script>
	export let showModal; // boolean

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- Put this part before </body> tag -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	on:keydown|self={() => dialog.close()}
	class="relative modal-box px-10 pb-11"
>
	<div class="">
		<button
			autofocus
			on:click={() => dialog.close()}
			on:keydown={() => dialog.close()}
			class="btn btn-sm btn-circle absolute right-2 top-2 cursor-pointer">✕</button
		>

		<div on:click|stopPropagation on:keydown|stopPropagation>
			<slot name="header" />
			<slot />
			<!-- <hr /> -->
			<!-- svelte-ignore a11y-autofocus -->
			<!-- <button autofocus on:click={() => dialog.close()} on:keydown={() => dialog.close()}
				>close modal</button
			> -->
		</div>
	</div>
</dialog>
