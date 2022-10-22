import View from "./View";
import previewView from "./previewView";
import icons from "../../img/icons.svg"

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No Recipe Found For Your Query Please Try Again!`;
  _successMessage = ``;

  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map(result => previewView.render(result, false))
      .join('');
  }

}
export default new ResultsView();




  // _generateMarkupPreview(result) {
  //   const id = window.location.hash.slice(1);

  //   return `
  //    <li class="preview">
  //        <a class="preview__link ${
  //          result.id === id ? `preview__link--active` : ``
  //        }" href="#${result.id}">
  //       <figure class="preview__fig">
  //               <img src="${result.image}" alt="${result.title}" />
  //             </figure>
  //        <div class="preview__data">
  //            <h4 class="preview__title">${result.title}</h4>
  //           <p class="preview__publisher">${result.publisher}</p>
  //             </div>
  //           </a>
  //         </li>
  //   `;
  // }