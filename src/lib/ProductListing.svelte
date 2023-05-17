<script>
	import { onMount } from 'svelte';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { productStore } from './stores';
	import { searchStore } from './stores';
	console.log($searchStore);

	let search = '';
	let items = [];
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
	}
	console.log(filteredItems);

	const updateFilter = () => {
		filteredItems = items.filter(
			(item) =>
			(search.length <= 3 || Object.values(item).some( 
					(value) =>
						typeof value === 'string' &&
						value.toLowerCase().includes(search.toLowerCase())
				)) &&
				(selectedCategories.length === 0 ||
					selectedCategories.some((category) => item.category === category))
		);
		console.log({ filteredItems });
	};

	searchStore.subscribe((sarchInput) => {
		console.log({ sarchInput });
		search = sarchInput;
		updateFilter();
	});

	onMount(() => {
		fetchData();
		setTimeout(() => {
			items = $productStore;
			search = $searchStore;
			console.log('search', $searchStore);
		}, 1000);
	});
	

		// if (search.trim().split(/\s+/).length > 3) updateFilter();
		// else {
		// 	if (search.trim().split(/\s+/).length <= 3) {
		// 		productStore.set(items);
		// 	}
		// }
	

	$: filteredItems = $productStore;
	$: categories = [...new Set(items.map((item) => item.category))];
	$: search = $searchStore;
</script>

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
