const addButtons = document.querySelectorAll(".add-btn");
const homeMyListContainer = document.getElementById("homeMyList");
const myListContainer = document.getElementById("myListContainer");

function getMyList() {
    let myList = localStorage.getItem("myList");

    if (myList === null) {
    return [];
    } else {
    return JSON.parse(myList);
    }
}

function setMyList(list) {
    localStorage.setItem("myList", JSON.stringify(list));
}

function isMovieAdded(title) {
    let list = getMyList();

    for (let i = 0; i < list.length; i++) {
    if (list[i].title === title) {
        return true;
    }
    }

    return false;
}

function addMovie(movie) {
    let list = getMyList();

    if (isMovieAdded(movie.title) === false) {
    list.push(movie);
    setMyList(list);
    renderAll();
    }
}

function removeMovie(title) {
    let list = getMyList();
    let updatedList = [];

    for (let i = 0; i < list.length; i++) {
    if (list[i].title !== title) {
        updatedList.push(list[i]);
    }
    }

    setMyList(updatedList);
    renderAll();
}

function updateButtons() {
    for (let i = 0; i < addButtons.length; i++) {
    let button = addButtons[i];
    let movieTitle = button.dataset.title;

    if (isMovieAdded(movieTitle)) {
        button.textContent = "✓ Added";
        button.classList.add("added");
        button.disabled = true;
    } else {
        button.textContent = "+ My List";
        button.classList.remove("added");
        button.disabled = false;
    }
    }
}

function renderHomeMyList() {
    if (!homeMyListContainer) {
    return;
    }

    let list = getMyList();
    let content = "";

    if (list.length === 0) {
    homeMyListContainer.innerHTML = '<p class="empty-home-list">No movies added yet.</p>';
    return;
    }

    for (let i = 0; i < list.length; i++) {
    content += `
        <div class="card saved-card">
        <img src="${list[i].image}" alt="${list[i].title}" />

        <div class="card-info">
            <h4>${list[i].title}</h4>
            <p>${list[i].year} • ${list[i].duration}</p>
        </div>

        <button class="remove-home-btn" data-title="${list[i].title}">✖</button>
        </div>
    `;
    }

    homeMyListContainer.innerHTML = content;

    let removeHomeButtons = document.querySelectorAll(".remove-home-btn");

    for (let i = 0; i < removeHomeButtons.length; i++) {
    removeHomeButtons[i].addEventListener("click", function (event) {
        event.stopPropagation();
        removeMovie(this.dataset.title);
    });
    }
}

function renderMyListPage() {
    if (!myListContainer) {
    return;
    }

    let list = getMyList();
    let content = "";

    if (list.length === 0) {
    myListContainer.innerHTML = '<p class="empty-message">Your list is empty.</p>';
    return;
    }

    for (let i = 0; i < list.length; i++) {
    content += `
        <div class="list-item">
        <img src="${list[i].image}" alt="${list[i].title}" />
        <div class="movie-title">${list[i].title}</div>
        <div class="movie-year">${list[i].year}</div>
        <div class="age-tag">${list[i].age}</div>
        <div class="movie-duration">${list[i].duration}</div>
        <button class="remove-btn" data-title="${list[i].title}">&times;</button>
        </div>
    `;
    }

    myListContainer.innerHTML = content;

    let removeButtons = document.querySelectorAll(".remove-btn");

for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", function () {
    removeMovie(this.dataset.title);
    });
}
}

function renderAll() {
    renderHomeMyList();
    renderMyListPage();
    updateButtons();
}

for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", function (event) {
    event.stopPropagation();

    let movie = {
        title: this.dataset.title,
        year: this.dataset.year,
        age: this.dataset.age,
        duration: this.dataset.duration,
        image: this.dataset.image
    };

    addMovie(movie);
    });
}

renderAll();