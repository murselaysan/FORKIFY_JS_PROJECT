import {showRecipe, clearRecipe} from './recipeView.js';
import {renderResults, clearSearch} from './searchView.js';
import {controlList} from './listView.js';


// Page Elements
const input = document.querySelector('.search__field');
const submitBtn = document.querySelector('.search__btn');
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shoppingBtn: document.querySelector('.recipe__btn'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};
export let state = [];
const url = 'https://forkify-api.herokuapp.com/api/v2/recipes';
const endpoint = "?search=";
const apiKey = "6cc69053-3d96-4b0d-947e-ef15200e0aa5";


// Add AJAX functions here:
const getRecipe = async () => {
    const recipe = input.value;
    const urlToFetch = `${url}${endpoint}${recipe}&key=${apiKey}`;
    console.log(urlToFetch);
    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        const recipes = jsonResponse.data.recipes;
        console.log(recipes);
        renderResults(recipes);
        }
        else {
        throw new Error('Request failed with Heroku!');
        }
    }
    catch(error) {
        console.log(error.message);
    }
    }

submitBtn.addEventListener("click", ()=>{
    clearSearch();
    getRecipe();
})

// take one from search results and print in to the DOM
elements.searchResList.addEventListener('click', e => {
    clearRecipe();
    console.log(e.target.closest('a'));
    const recipe_id=e.target.closest('a').id;
    console.log(window.location.hash.replace('#', ''));
    return getOneRecipe(recipe_id);
})

let selectedRecipe={};  // for sending selected rescipe to shopping list
const getOneRecipe = async (id) => {
    const urlToFetch = `${url}/${id}?key=${apiKey}`;
    console.log(urlToFetch);
    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse.data.recipe);
        selectedRecipe = jsonResponse.data.recipe;  // assign selected recipe
        showRecipe(jsonResponse.data.recipe);
    }
    else {
        throw new Error('Request failed with Heroku!');
    }
}
catch(error) {
    console.log(error.message);
}
    }


// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        console.log(selectedRecipe);
        controlList(selectedRecipe);
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controller
        controlLike();
    }
});


// // take one from shopping list and print in to the DOM
// elements.shopping.addEventListener('click', e => {
//     clearRecipe();
//     console.log(e.target.closest('a'));
//     const recipe_id=e.target.closest('a').id;
//     return getOneRecipe(recipe_id);
// })


// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const element = e.target.closest('.shopping__item');
    console.log(element);
    const id = element.dataset.itemid;
console.log(e.target);
    if (e.target.matches('.shopping__description, .results__data, results__link, shopping__item *')) {
        clearRecipe();
        getOneRecipe(id);
    }


    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.forEach(item=>{
            if(item===id){
                state.splice(item, 1); 
            }
        });
        // Delete from UI
        element.parentElement.removeChild(element);;
    } 
});

