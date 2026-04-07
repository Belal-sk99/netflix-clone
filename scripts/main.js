tailwind.config = {
    theme: {
        extend: {
            colors: {
                "nf-red": "#E50914",
                "nf-red-hover": "#C11119",
                "nf-black": "#000000",
                "nf-bg": "#141414",
                'nf-card': '#192133',
                'nf-card-hover': '#1F2A3D',
                "nf-border": "#404040",
                "nf-gray": "#ffffffb3",
                "nf-light-gray": "#B3B3B3",
            },
        },
    },
};
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    themeToggle.innerText = "Dark Mode";
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        themeToggle.innerText = "Dark Mode";
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.innerText = "Light Mode";
        localStorage.setItem('theme', 'dark');
    }
});

document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('svg');

        document.querySelectorAll('.accordion-content').forEach(other => {
            if (other !== content) {
                other.style.maxHeight = null;
                other.previousElementSibling.querySelector('svg').classList.remove('rotate-45');
            }
        });

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.classList.remove('rotate-45');
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.classList.add('rotate-45');
        }
    });
});

const scrollContainer = document.getElementById('scrollContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (scrollContainer && nextBtn && prevBtn) {
    const getScrollAmount = () => scrollContainer.clientWidth * 0.8;
    nextBtn.onclick = () => { scrollContainer.scrollLeft += getScrollAmount(); };
    prevBtn.onclick = () => { scrollContainer.scrollLeft -= getScrollAmount(); };

    scrollContainer.addEventListener('scroll', () => {
        const scrollLeft = scrollContainer.scrollLeft;
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

        if (scrollLeft > 20) {
            prevBtn.classList.remove('opacity-0', 'pointer-events-none');
            prevBtn.classList.add('group-hover:opacity-100', 'pointer-events-auto');
        } else {
            prevBtn.classList.add('opacity-0', 'pointer-events-none');
        }

        if (scrollLeft >= maxScroll - 20) {
            nextBtn.classList.add('opacity-0', 'pointer-events-none');
        } else {
            nextBtn.classList.remove('opacity-0', 'pointer-events-none');
        }
    });
}