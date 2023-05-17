import { writable } from 'svelte/store';
export const productStore = writable([]);
export const searchStore = writable('');
console.log("search", searchStore);



