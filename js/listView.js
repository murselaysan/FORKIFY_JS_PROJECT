import { elements, state } from './index.js';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */


//first controls if the item in the shopping chart
export const controlList = (item) => {
    // Create a new list IF there in none yet
    console.log(item)
    if (!state.find(element => element===item.id)) {
        state.push(item.id)
        // Add item to the list
        addShopping (item);
    }
}


 const addShopping = item => {
    const markup = `
        <li class="shopping__item" data-itemid=${item.id}>
            <a class="results__link" id=${item.id} href="#${item.id}">
                <div class="results__data">
                    <p class="shopping__description">${item.title}</p>
                </div>
            </a>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    elements.shopping.insertAdjacentHTML('beforeend', markup);
};


