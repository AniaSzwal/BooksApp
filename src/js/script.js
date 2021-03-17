//utworzenie i wywołanie funkcji, która przejdzie po wszystkich książkach
//z dataSource.books i wyrenderuje dla nich reprezentacje HTML w liście .books-list

// Przygotuj referencję do szablonu oraz listy .books-list.
{
  'use strict';

  const select = {
    templateOf: {
      booksTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
  };

  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };

//  Dodaj nową funkcję render

  function render(){
    for (let books of dataSource.books){

      // wygenerowanie kodu HTML na podstawie szablonu
      const generatedHTML = templates.booksTemplate(books);
      // wygeneruj element DOM z kodu HTML
      const element = utils.createDOMFromHTML(generatedHTML);
      //find books container
      const booksContainer = document.querySelector(select.containerOf.booksList);
      //add element to list - Wygenerowany element DOM dołącz jako nowe dziecko DOM do listy .books-list.
      booksContainer.appendChild(element);
    }
  }
  render();

}
