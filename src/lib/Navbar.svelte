<script>
	import { searchStore } from './stores';
	function handleSearchInput(event) {
		//search = event.target.value;
		searchStore.set(event.target.value);
	}
</script>

<nav class="navbar navbar-light bg-light justify-content-right p-3">
	<a class="navbar-brand d-flex">e-Store</a>

	<div class="mt-3">
		<label for="search ">Search:</label>
		<input type="text" id="search" on:input={handleSearchInput} />
	</div>
</nav>
