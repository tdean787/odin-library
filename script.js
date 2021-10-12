let booksDiv = document.querySelector("#books");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let title = document.querySelector("#title");
let read = document.querySelector("#read");
let addBookForm = document.querySelector("#addBookForm");
let bookFormControl = document.querySelector("#bookFormControl");

function Book(title, author, pages, read, dataIndex) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.dataIndex = dataIndex;

  this.info = function () {
    return `${title} by ${author} has ${pages} pages, ${read}`;
  };
}

function addBook(event) {
  let parsed = JSON.parse(localStorage.getItem("library"));
  event.preventDefault();

  //create new Book object form values
  let addedBook = new Book(
    title.value,
    author.value,
    pages.value,
    read.checked,
    Math.floor(Math.random() * (999999 - 1) + 1)
  );

  //add to library array
  parsed.push(addedBook);
  localStorage.setItem("library", JSON.stringify(parsed));

  //always call display function to update UI
  displayBooks();
}

function displayBooks() {
  booksDiv.innerHTML = "";
  for (let book of JSON.parse(localStorage.getItem("library"))) {
    //conditional check of read status to update button text
    let buttonReadText = book.read === true ? "Mark Not Read" : "Mark Read";
    let bookListItem = document.createElement("div");

    //render each book in the library to separate div
    bookListItem.innerHTML = `<div class="book">
    <p>${book.title} by ${book.author} </p> 
    <p>Number of pages: ${book.pages} </p>
    <p>Read: ${book.read}</p>
    <button onclick="deleteBook('${book.dataIndex}')" data-index=${book.dataIndex}>Delete Book</button>
    <button onclick="toggleRead(${book.dataIndex})">${buttonReadText} </button>
    </div>`;
    booksDiv.appendChild(bookListItem);
  }
}

function toggleRead(e) {
  let parsed = JSON.parse(localStorage.getItem("library"));

  //find index of book with button clicked
  bookIndex = parsed.findIndex((book) => book.dataIndex == parseInt(e));

  //set boolean of read to opposite
  parsed[bookIndex].read = !parsed[bookIndex].read;

  localStorage.setItem("library", JSON.stringify(parsed));
  //render the list of books again to update the read value
  displayBooks();
}

function displayForm() {
  if (addBookForm.style.visibility === "hidden") {
    addBookForm.style.visibility = "visible";
    bookFormControl.innerHTML = "Hide Book Form";
  } else {
    addBookForm.style.visibility = "hidden";
    bookFormControl.innerHTML = "Show Book Form";
  }
}

function deleteBook(e) {
  let parsed = JSON.parse(localStorage.getItem("library"));

  //update the library array and filter out the book which index matches the button
  parsed = parsed.filter((book) => book.dataIndex !== parseInt(e));

  localStorage.setItem("library", JSON.stringify(parsed));
  displayBooks();
}
displayBooks();
