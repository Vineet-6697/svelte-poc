<script>
  import { productStore } from "./stores";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { onMount } from "svelte";
  let productsdetail = null;

  async function fetchDetail(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    productsdetail = await response.json();
    productStore.set(productsdetail);
    // console.log({ productsdetail });
    // const unsub = productStore.subscribe((settings) => {
    //   console.log("settings sub", settings);
    // });
  }

  onMount(() => {
    const location = window.location.hash;
    const p = location.split("/");

    fetchDetail(p[2]);
  });
</script>

{#if productsdetail}
  <div class="container my-5">
    <div class="row">
      <div class="col-md-6">
        <img class="img-fluid" src={productsdetail.image} alt="img" />
      </div>
      <div class="col-md-6">
        <h1>{productsdetail.title}</h1>
        <h2>
          <span class="badge bg-teal">${productsdetail.price}</span>
        </h2>
        <h3 class="text-brown">{productsdetail.category}</h3>
        <p>{productsdetail.description}</p>
        <button class="btn btn-primary btn-lg " type="button">
          <i class="fas fa-shopping-cart me-2"></i>
          Add to Cart
        </button>
        <a href="/">
          <button class="btn btn-secondary btn-lg" type="button">
            Go Back !
          </button>
        </a>
      </div>
    </div>
  </div>
{/if}

