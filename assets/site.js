
(() => {
    const html = document.documentElement;
    const themeButton = document.getElementById("theme-toggle");
    const menuButton = document.getElementById("menu-toggle");
    const nav = document.getElementById("primary-navigation");

    // Theme switcher
    function updateThemeButton() {
        if (!themeButton) return;

        const dark = html.dataset.theme === "dark";

        themeButton.setAttribute(
            "aria-label",
            dark ? "Switch to light theme" : "Switch to dark theme"
        );

        themeButton.setAttribute(
            "title",
            dark ? "Switch to light theme" : "Switch to dark theme"
        );

        themeButton.innerHTML = dark
            ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l-1.42 1.42m11.3-11.3 1.42-1.42"></path></svg>'
            : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.7 8.7 0 1 0 20.5 14.2Z"></path></svg>';
    }

    updateThemeButton();

    themeButton?.addEventListener("click", () => {
        html.dataset.theme =
            html.dataset.theme === "dark" ? "light" : "dark";

        try {
            localStorage.setItem("fcobiwundu-theme", html.dataset.theme);
        } catch (_) {}

        updateThemeButton();
    });


    // Mobile navigation
    function closeMenu() {
        if (!menuButton || !nav) return;

        nav.classList.remove("is-open");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");

        menuButton.innerHTML =
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>';
    }

    function openMenu() {
        if (!menuButton || !nav) return;

        nav.classList.add("is-open");

        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Close navigation menu");

        menuButton.innerHTML =
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"></path></svg>';
    }

    // Toggle menu on hamburger click
    menuButton?.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!nav || !menuButton) return;

        const clickedInsideMenu = nav.contains(event.target);
        const clickedMenuButton = menuButton.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {
            closeMenu();
        }
    });

    // Close menu when scrolling
    window.addEventListener("scroll", () => {
        closeMenu();
    }, { passive: true });

    // Close menu when selecting a navigation link
    nav?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });


    // Automatic copyright year
    document.querySelectorAll("[data-year]").forEach(el => {
        el.textContent = new Date().getFullYear();
    });


    // Scroll reveal animations
    const revealEls = document.querySelectorAll(".reveal");

    if (
        "IntersectionObserver" in window &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach(el => observer.observe(el));

    } else {
        revealEls.forEach(el => el.classList.add("is-visible"));
    }


    // Project filters
    const filters = document.querySelectorAll("[data-filter]");
    const projects = document.querySelectorAll("[data-category]");

    filters.forEach(button => {
        button.addEventListener("click", () => {
            const selected = button.dataset.filter;

            filters.forEach(item => {
                item.setAttribute(
                    "aria-pressed",
                    String(item === button)
                );
            });

            projects.forEach(card => {
                card.hidden =
                    selected !== "all" &&
                    !card.dataset.category.split(" ").includes(selected);
            });
        });
    });


    // Web3Forms contact submission
    const form = document.getElementById("contact-form");

    form?.addEventListener("submit", async event => {
        event.preventDefault();

        const status = document.getElementById("form-status");
        const submit = document.getElementById("send-button");

        if (!status || !submit) return;

        // Status message and colour
        function setStatus(message, type = "neutral") {
            status.textContent = message;

            status.classList.remove(
                "status-success",
                "status-error",
                "status-sending",
                "status-neutral"
            );

            status.classList.add(`status-${type}`);
        }

        // Browser form validation
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const values = Object.fromEntries(formData.entries());

        // Honeypot spam protection
        if (values.website || values.botcheck) {
            return;
        }

        submit.disabled = true;
        submit.textContent = "Sending...";

        setStatus("Sending your message...", "sending");

        try {
            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(values)
                }
            );

            const responseText = await response.text();

            if (!responseText) {
                throw new Error(
                    "The email service returned an empty response. Please try again."
                );
            }

            let result;

            try {
                result = JSON.parse(responseText);
            } catch (_) {
                throw new Error(
                    "The email service returned an unexpected response. Please try again."
                );
            }

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                    "Your message could not be sent. Please try again."
                );
            }

            setStatus(
                "Your message has been sent successfully. Thank you for getting in touch.",
                "success"
            );

            form.reset();

        } catch (error) {
            console.error("Contact form error:", error);

            setStatus(
                error.message ||
                "Your message could not be sent. Please email fcobiwundu@gmail.com.",
                "error"
            );

        } finally {
            submit.disabled = false;
            submit.textContent = "Send message >";
        }
    });

})();
