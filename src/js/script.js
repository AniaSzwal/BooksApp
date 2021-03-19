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
      form: '.filters',
    },
    book: {
      image: '.books-list',
      favorite: '.favorite',
    },
  };

  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };

  const booksListContainer = document.querySelector(select.containerOf.booksList); // referencja do listy ksiażek
  const filteredBooks = document.querySelector(select.containerOf.form)
  const favoriteBooks = [];
  const filters = [];

  //  Dodaj nową funkcję render

  const render = function () {
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
  };

  const initActions = function() {

    booksListContainer.addEventListener('dblclick', function (event) { //nasłuchiwacz
      event.preventDefault(); // zatrzymanie domyślnych
      const bookCover = event.target.offsetParent; // Element, od którego obliczane są wszystkie przesunięcia

      if (bookCover.classList.contains('book__image')) {
        const id = bookCover.getAttribute('data-id'); // pobieranie atrybutu

        // Jeśli nie jest w "favoriteBooks", to funkcja ma dodać klasę favorite i zapisać id książki w tablicy favoriteBooks
        if (favoriteBooks.includes(id)) {
          const indexBooks = favoriteBooks.indexOf(id);
          bookCover.classList.remove('favorite');
          favoriteBooks.splice(indexBooks, 1);
          //Jeśli jest, to usuń id takiej książki z tablicy favoriteBooks i usun takiemu elementowi klasę favorite.

        } else {
          bookCover.classList.add('favorite');
          favoriteBooks.push(id);
        }
      }
    });

    filteredBooks.addEventListener('change', function (event) {
      event.preventDefault();
      const clickedElem = event.target;
      if (clickedElem.type === 'checkbox') {
        if (clickedElem.checked) {
          filters.push(clickedElem.value);
          console.log(filters);
        } else {
          const filterIndex = filters.indexOf(clickedElem.value);
          filters.splice(filterIndex, 1);
          console.log(filters);
        }
      }
      filterBooks();
    });

    const filterBooks = function () {
      for (let elem of dataSource.books) {
        let shouldBeHidden = false;
        for (let filter of filters) {
          if (!elem.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          const bookCover = document.querySelector('.book__image[data-id="' + elem.id + '"]');
          console.log('bookCover:', bookCover);
          bookCover.classList.add('hidden');
        } else {
          const bookCover = document.querySelector('.book__image[data-id="' + elem.id + '"]');
          bookCover.classList.remove('hidden');
        }
      }
    };
  };


  render();
  initActions();
}
