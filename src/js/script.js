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

    class: {
      favoriteBooks: 'favorite',
    },

    book: {
      bookImage: '',
    }
  };

  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };

  //  Dodaj nową funkcję render

  function render() {
    for (let books of dataSource.books) {

      // wygenerowanie kodu HTML na podstawie szablonu
      const generatedHTML = templates.booksTemplate(books);
      // wygeneruj element DOM z kodu HTML
      const element = utils.createDOMFromHTML(generatedHTML);
      //find books container
      const booksListContainer = document.querySelector(select.containerOf.booksList);
      //add element to list - Wygenerowany element DOM dołącz jako nowe dziecko DOM do listy .books-list.
      booksListContainer.appendChild(element);
    }
  }

  render();

  const favoriteBooks = [];

  const initActions = function(){

    const booksListContainer = document.querySelector(select.containerOf.booksList); //referencja do listy książek

    booksListContainer.addEventListener('dblclick', function(event){ //nasłuchiwacz
      event.preventDefault(); // zatrzymanie domyślnych
      const clickedElement = event.target.offsetParent; //najbliższy kliknięty
      const id = clickedElement.getAttribute('data-id'); // pobieranie atrybutu

      // Jeśli nie jest, to funkcja ma dodać klasę favorite i zapisać id książki w tablicy favoriteBooks
      if(!clickedElement.classList.contains('favorite')){
        favoriteBooks.push(id); //dodanie identyfikatora do favbooks
        clickedElement.classList.add('favorite');

        //Jeśli jest, to usuń id takiej książki z tablicy favoriteBooks i usun takiemu elementowi klasę favorite.
      }else{
        favoriteBooks.splice(favoriteBooks.indexOf(id), 1); //usunięcie id z tablicy
        clickedElement.classList.remove('favorite');
      }
    });
  };
  initActions();
}
