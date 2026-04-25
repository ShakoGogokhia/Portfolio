(function () {
    const storageKey = "portfolio-theme";
    const root = document.body;
    const toggleButton = document.getElementById("themeToggle");
    const reveals = document.querySelectorAll(".reveal");

    function getInitialTheme() {
        const saved = window.localStorage.getItem(storageKey);
        if (saved === "light" || saved === "dark") {
            return saved;
        }

        return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        window.localStorage.setItem(storageKey, theme);

        if (toggleButton) {
            const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
            toggleButton.setAttribute("aria-label", label);
        }
    }

    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            applyTheme(nextTheme);
        });
    }

    applyTheme(getInitialTheme());

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.14,
        }
    );

    reveals.forEach(function (element) {
        observer.observe(element);
    });
})();
