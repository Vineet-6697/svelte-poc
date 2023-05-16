
<script>
    import { productStore } from '../lib/productStore';
    //import { selectedCategories } from '../lib/productStore';
    let search = '';
    let filteredItems = [];

    const updateFilter = () => {
		filteredItems = $productStore.filter(
			(item) =>
				Object.values(item).some(
					(value) =>
						typeof value === 'string' &&
						value.toLowerCase().includes(search.toLowerCase())
                )
				// ) &&
				// ($selectedCategories.length === 0 ||
				// 	$selectedCategories.some((category) => item.category === category))
		);
		productStore.set(filteredItems);
		console.log('filteredItems',filteredItems);	
	};

function handleSearchInput(event) {
		search = event.target.value;
		updateFilter();
	};

	
	
</script>
<nav class="navbar navbar-light bg-light justify-content-right p-3">
    <a class="navbar-brand d-flex">e-Store</a>
   
	<div class="mt-3">
		<label for="search ">Search:</label>
		<input type="text" id="search" on:input={handleSearchInput} />
	</div>
  </nav>