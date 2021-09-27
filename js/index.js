let msg = document.getElementById('show-msg');
let searchResults = document.getElementById('search-results');
let loading = document.getElementById('loading');
let bookCount = 0;
// Search book arrow function
const searchBook = () => {
    let searchField = document.getElementById('search-field');
    let searchText = searchField.value;
    // clear searchField 
    searchField.value = "";
    bookCount = 0;
    if (searchText == "") {
        loading.style.display = "none";
        msg.innerText = `Invalid search key.`;
        searchResults.textContent = "";
        bookCount = 0;
    } else {

        msg.innerText = "";
        loading.style.display = "inline-block";
        searchResults.textContent = "";
        bookCount = 0;
        // fetch book data from api
        let url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayBook(data));

    }



};

// display Book arrow function
const displayBook = books => {
    console.log(books);
    console.log(books.numFound);

    if (books.docs == []) {
        msg.innerText = `${bookCount} results found...`;
        loading.style.display = "none";
    } else {

        for (const book of books.docs) {
            // console.log(book.title);
            let publish_year = "NONE";
            let publisher = "NONE";
            if (book.publish_year != null && book.publisher != null) {
                publish_year = book.publish_year[0];
                publisher = book.publisher[0];
            }
            let div = document.createElement('div');
            div.classList.add('col');

            div.innerHTML = `
                <div onclick="bookDetails(${book.title})" class="card">
                    <img style="width:100%" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">Name: ${book.title}</h5>
                        <p class="card-text">Author: ${book.author_name}</p>
                        <p class="card-text">Publisher: ${publisher}</p>
                        <p class="card-text">Publish Date: ${publish_year}</p>
                    </div>
                </div>
            `;

            searchResults.appendChild(div);
            bookCount++;
        }
        msg.innerText = `${bookCount} results of ${books.numFound}`;
        loading.style.display = "none";
    }


}