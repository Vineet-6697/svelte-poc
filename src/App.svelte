<script>
  import Navbar from "./lib/Navbar.svelte";
  import ProductListing from "./lib/ProductListing.svelte";
  import Footer from "./lib/Footer.svelte";
  import ProductDetail from "./lib/ProductDetail.svelte";

  console.log("in App");
  let page = "";
  let id;
  function onRouteChange() {
	console.log("window.location.hash",window.location.hash);
	const location = window.location.hash;
	const p = location.split('/');
	console.log("page in aoo", p);
    const path = p[1];
    page = path;
  }

 
</script>

<svelte:window on:hashchange={onRouteChange} />

{#if page === "ProductDetail"}
  <ProductDetail />
  {:else}
<Navbar />
<ProductListing />
<Footer />
{/if}
