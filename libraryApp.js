//LIBRARY STORE SCRIPTS

//BOOK CONSTRUCTOR
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI CONSTRUCTOR
function UI() {}

//Add book to list

UI.prototype.addBookToList = function (book) {
  // create book list
  const list = document.getElementById("book-list");
  //create tr element
  const row = document.createElement("tr");
  //insert cols

  row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class='delete' style='color:red'>X</a></td>
    `;

  list.appendChild(row);
};

//Show Alert

UI.prototype.showAlert = function (message, className) {
  //create div
  const div = document.createElement("div");
  //add class
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const container = document.querySelector(".container");
  //get form
  const form = document.getElementById("#book-form");

  //insert alert
  container.insertBefore(div, form);

  // timeout after 3s
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 2000);
};

// Delete Books
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

//Clear fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

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

  //show Alert
  ui.showAlert("Book Removed", " success");

  e.preventDefault();
});















