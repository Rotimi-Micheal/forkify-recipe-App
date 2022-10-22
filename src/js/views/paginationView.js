import View from "./View";
import icons from "../../img/icons.svg"

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener("click",function(e){
            const btn = e.target.closest('.btn--inline');
            console.log(btn);
            if(!btn)return

            const gotoPage = +btn.dataset.goto
            console.log(gotoPage);
            handler(gotoPage)
        })
    }


  _generateMarkup(){
    const curPage = this._data.page;
    const numPages = Math.ceil( this._data.result.length / this._data.resultPerPage)
    console.log(numPages);
    // page1, there are otherpages
    if(curPage === 1 && numPages > 1){
     return `
      <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
     `;
    }
    
    //last page
    if(curPage === numPages && numPages > 1){
        return `
        <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
        `;
    }
    //other page
    if(curPage < numPages){
         return `
        <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
        `;
    }
    //on pg 1 no other pages
    return ``
  }
  
}

export default new PaginationView()