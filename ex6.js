class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    // create book list
    const list = document.getElementById("book-list");
    //create tr element
    const row = document.createElement("tr");
    //insert cols

    row.innerHTML = `
        <td scope='row'>${book.title}</td>
        <td scope='row'>${book.author}</td>
        <td scope='row'>${book.isbn}</td>
        <td scope='row'><a href="#" class='delete' style='color:red;font-weight:700;padding:0px 7px'>X</a></td>
    `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    //create div
    const div = document.createElement("div");
    //add class
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector(".container2");
    //get form
    const form = document.getElementById("#book-form");

    //insert alert
    container.insertBefore(div, form);

    // timeout after 3s
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI();

      //add book to ui
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//Dom LOAD

document.addEventListener("DOMContentLoaded", Store.displayBooks);

// EVENT LISTENERS
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  // Instantiate book
  const book = new Book(title, author, isbn);

  // Intantiate UI
  const ui = new UI();

  //validate
  if (title === "" || author === "" || isbn === "") {
    //Error

    ui.showAlert("Please Fill In All Inputs", "error");
  } else {
    //Add new book
    ui.addBookToList(book);

    //add book to local storage
    Store.addBook(book);

    //show success

    ui.showAlert("Book Added", "success");

    //Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

//Event LISTENERS for Delete

document.getElementById("book-list").addEventListener("click", function (e) {
  // Intantiate UI
  const ui = new UI();

  //delete book
  ui.deleteBook(e.target);

  //remove from local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //show Alert
  ui.showAlert("Book Removed", " success");

  e.preventDefault();
});
