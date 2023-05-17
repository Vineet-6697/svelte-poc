<script>
	import { productStore } from './stores';
	import { searchStore } from './stores';
	import { onMount } from 'svelte';
	let search = '';
	let item = [];
	let filteredItems = [];
	

	// onMount(() => {
	// 	setTimeout(() => {
	// 		item = $productStore;
	// 	}, 1000);
		
	// });

	// const updateFilter = () => {
	// 	// filteredItems = item.filter((item) =>
	// 	// 	Object.values(item).some(
	// 	// 		(value) =>
	// 	// 			typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())
	// 	// 	)
	// 	// );
	// 	productStore.set(filteredItems);
	// 	searchStore.set(search);
	// 	console.log('filteredItems', filteredItems);
	// };
	
	function handleSearchInput(event) {
		//search = event.target.value;
		searchStore.set(event.target.value);
		//updateFilter();
	}
	// function handleSearchInput(event) {
	// 	console.log('event', event);

	// 	search = event.target.value;

	// 	console.log(search.length);

	// 	if (search.trim().split(/\s+/).length > 3) updateFilter();
	// 	else {
	// 		if (search.trim().split(/\s+/).length <= 3) {
	// 			productStore.set(item);
	// 		}
	// 	}
	// }

	// const fetchProducts = async () => {
	// 	const response = await fetch('https://fakestoreapi.com/products');
	// 	const data = await response.json();
	// 	productStore.set(data);
	// };

	// onMount(fetchProducts);
</script>

<nav class="navbar navbar-light bg-light justify-content-right p-3">
	<a class="navbar-brand d-flex">e-Store</a>

	<div class="mt-3">
		<label for="search ">Search:</label>
		<input type="text" id="search" on:input={handleSearchInput} />
	</div>
</nav>
