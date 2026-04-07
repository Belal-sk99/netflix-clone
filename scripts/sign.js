helpToggle.onclick = function() {
    helpLinks.classList.toggle('active'); 
    arrow.classList.toggle('open');       
};
loginForm.onsubmit = function(e) {
    e.preventDefault();
    alert("Logging in: " + user_info.value);
};
themeToggle.onclick = function() {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon'); 
    }
};