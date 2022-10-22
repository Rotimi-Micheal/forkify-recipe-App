import * as model from './model';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// if(module.hot){
//   module.hot.accept()
// }
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0)update result view to mark selected result
    resultView.update(model.getSearchResultPage())
    bookmarkView.update(model.state.bookmarks)

    // 1) loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    console.log(model.state.recipe);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }

};

const controlSearchResult = async function () {
  try {
    resultView.renderSpinner();
    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load Search Results
    await model.loadSearchResult(query);

    //  3) render result
    // resultView.render(model.state.search.result);
    resultView.render(model.getSearchResultPage());

    // 4) render pagination
    paginationView.render(model.state.search)
  } catch (err) {
    // resultView.renderError()
    console.log(err);
  }
};

const controlPagination = function(gotoPage){
  // 1) render new result
  resultView.render(model.getSearchResultPage(gotoPage))

  //  2) render new pagination
  paginationView.render(model.state.search)
  
}

const controlServings = function(newServings){
  // update the recipe servings (in state)
  model.updateServings(newServings)

  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

}

const controlAddbookmark = function(){
  // 1) add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) update recipe view
  recipeView.update(model.state.recipe)

  // 3) render bookmark
  bookmarkView.render(model.state.bookmarks)
}

const controlBookmarks =function(){
  bookmarkView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newrecipe){
  try{
    console.log(newrecipe);
    // show spinner
    addRecipeView.renderSpinner()
  
    // upload form
    await  model.UploadRecipe(newrecipe)
    console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe)

    // success message
    addRecipeView.renderMessage()

    // render bookmarkView
    bookmarkView.render(model.state.bookmarks)

    // change id inUrl
    window.history.pushState(null,"",`#${model.state.recipe.id}`)

    // close form Window
    setTimeout(function(){
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000)
  } catch(err){
    console.log(`......`,err);
    addRecipeView.renderError(err.message)
  }
}

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddbookmark)
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe)
};
init();

const clearBookMarks = function(){
  localStorage.clear(`bookmarks`)
}
// clearBookMarks()
