const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const searchInput = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-btn');

themeToggle.onclick = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.className = 'fa-solid fa-sun';
}

const handleSearch = () => {
    const query = searchInput.value.trim();
    if (query !== "") {
        alert("Searching for: " + query);
    } else {
        alert("Please describe your issue first!");
    }
};

searchBtn.onclick = handleSearch;
searchInput.onkeypress = (e) => {
    if (e.key === 'Enter') handleSearch();
};