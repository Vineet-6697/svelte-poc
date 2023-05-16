<script>
	import { onMount } from 'svelte';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { productStore } from '../lib/productStore';
	//import ProductDetail from './ProductDetail.svelte';

	let search = '';
	let filteredItems = [];

	let selectedCategories = [];
	const setCategoryFilter = (event) => {
		const selectedCategory = event.target.value;
		if (event.target.checked) {
			selectedCategories = [...selectedCategories, selectedCategory];
			
		} else {
			selectedCategories = selectedCategories.filter(
				(category) => category !== selectedCategory
			);
		}
		updateFilter();
	};

	async function fetchData() {
		const response = await fetch('https://fakestoreapi.com/products');
		const data = await response.json();

		productStore.set(data);

		updateFilter();
	}
	console.log({ productStore });

	const updateFilter = () => {
		filteredItems = $productStore.filter(
			(item) =>
				Object.values(item).some(
					(value) =>
						typeof value === 'string' &&
						value.toLowerCase().includes(search.toLowerCase())
				) &&
				(selectedCategories.length === 0 ||
					selectedCategories.some((category) => item.category === category))
		);
		const length = selectedCategories.length;
		console.log({ filteredItems });
		console.log({ length });
	};

	function handleSearchInput(event) {
		search = event.target.value;
		updateFilter();
	}

	onMount(() => {
		fetchData();
	});

	$: filteredItems = $productStore;
	$: categories = [...new Set($productStore.map((item) => item.category))];

</script>

<div class="mt-3">
	<label for="search ">Search:</label>
	<input type="text" id="search" on:input={handleSearchInput} />
</div>
<div class=" mt-4">
	<div class="d-flex">
		<h6 class="ps-2">Categories :</h6>
		{#each categories as category}
			<div class="form-check d-flex ms-3">
				<input
					class="form-check-input"
					type="checkbox"
					value={category}
					id={`checkbox-${category}`}
					on:change={setCategoryFilter}
				/>
				<label class="form-check-label ms-1" for={`checkbox-${category}`}>{category}</label>
			</div>
		{/each}
	</div>
</div>

<div class="row mt-4">
	{#each filteredItems as item}
		<!-- {console.log("2nd time ", filteredItems)} -->
		<div class="col-md-3">
			<a href="#/ProductDetail/{item.id}" class="card-link">
				<div class="card mb-4 box-shadow">
					<img
						class="card-img-top"
						src={item.image}
						alt={item.title}
						height="250"
						width="200"
					/>
					<div class="card-body">
						<h5 class="card-title" style="height: 50px;">{item.title.substr(0, 25)}</h5>
						<p class="card-text">$ {item.price}</p>
						<p class="card-text">{item.category}</p>
					</div>
				</div>
			</a>
		</div>
	{:else}
		<p>No items found</p>
	{/each}
</div>

<style>
	a {
		color: black;
		text-decoration: none;
	}
</style>
