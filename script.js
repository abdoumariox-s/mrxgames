document.addEventListener('DOMContentLoaded', function () {
    // Sticky Header
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll to Top
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Hero Badge Pulse Effect
    const badge = document.querySelector('.badge.new-release');
    if (badge) {
        setInterval(() => {
            badge.style.opacity = badge.style.opacity === '0.7' ? '1' : '0.7';
        }, 1000);
    }

    // Simple Console Welcome
    console.log('%cWelcome to MRXGAMES', 'color: #2aa9e0; font-size: 24px; font-weight: bold;');

    // Download Modal Logic
    const modal = document.getElementById("downloadModal");
    const openBtn = document.getElementById("openDownloadModal");
    const closeBtn = document.getElementsByClassName("close-modal")[0];

    if (openBtn && modal && closeBtn) {
        openBtn.onclick = function () {
            modal.style.display = "flex";
        }

        closeBtn.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    // Mobile Menu Logic
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.mobile-sidebar'); // Will be added to HTML
    const closeSidebar = document.querySelector('.close-sidebar'); // Will be added to HTML
    const overlay = document.querySelector('.overlay'); // Will be added to HTML

    function toggleMenu() {
        if (sidebar && overlay) {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        }
    }

    if (mobileBtn) mobileBtn.addEventListener('click', toggleMenu);
    if (closeSidebar) closeSidebar.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // Unified Filtering Logic (Search + Genre)
    let activeGenre = 'all';
    let searchQuery = '';

    const searchTrigger = document.querySelector('.search-trigger');
    const searchOverlay = document.querySelector('.search-overlay');
    const closeSearch = document.querySelector('.close-search');
    const searchInput = document.getElementById('gameSearchInput');
    const filterLinks = document.querySelectorAll('[data-filter]');
    const gameCards = document.querySelectorAll('.game-card');

    function applyFilters() {
        gameCards.forEach(card => {
            const title = card.querySelector('.game-title').innerText.toLowerCase();
            const cardGenres = card.getAttribute('data-genre') || '';

            const matchesSearch = title.includes(searchQuery);
            const matchesGenre = activeGenre === 'all' || cardGenres.includes(activeGenre);

            if (matchesSearch && matchesGenre) {
                card.style.display = "block";
                card.style.animation = "fadeInUp 0.4s ease-out forwards";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Search Overlay Toggling
    if (searchTrigger && searchOverlay) {
        searchTrigger.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            setTimeout(() => searchInput.focus(), 100);
        });
    }

    if (closeSearch && searchOverlay) {
        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            searchQuery = '';
            if (searchInput) searchInput.value = '';
            applyFilters();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            searchQuery = e.target.value.toLowerCase();
            applyFilters();
        });

        // Close search on Escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearch.click();
            }
        });
    }

    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            activeGenre = link.getAttribute('data-filter');

            // Optional: Add active class to links
            filterLinks.forEach(l => l.classList.remove('active-filter'));
            link.classList.add('active-filter');

            // If we're filtering via a link inside search overlay, close the overlay
            if (searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
            }

            applyFilters();

            // Scroll to games section if on home
            const gamesGrid = document.querySelector('.games-grid');
            if (gamesGrid) {
                gamesGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    // Game Detail Page Logic
    if (window.location.pathname.includes('game.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const gameId = urlParams.get('game') || 'gta5';

        const gtaData = {
            title: "Grand Theft Auto V",
            description: "When a young street hustler, a retired bank robber, and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld, the U.S. government, and the entertainment industry, they must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody — least of all each other.",
            poster: "assets/gta_v_poster.jpg",
            heroBg: "assets/gta5_hero.jpg", // Using real asset for authenticity
            stats: {
                year: "2015",
                genre: "Open World / Action",
                size: "110 GB"
            },
            screenshots: [
                "assets/gta5_ss1.jpg",
                "assets/gta5_ss2.jpg",
                "assets/gta5_ss3.jpg",
                "assets/gta5_ss4.jpg"
            ],
            features: [
                "Install necessary apps from Redist or _CommonRedist to ensure the game launches without problems.",
                "Always extract the game in an Antivirus / Defender excluded folder.",
                "Always run the game as administrator.",
                "Experience a dynamic online universe for up to 30 players.",
                "Pull off daring co-operative Heists and adrenaline-fueled Stunt Races."
            ],
            requirements: [
                { label: "OS", value: "Windows 10 / 11 (64-bit)" },
                { label: "Processor", value: "Intel Core i5 3470 / AMD X8 FX-8350" },
                { label: "Memory", value: "8 GB RAM" },
                { label: "Graphics", value: "NVIDIA GTX 660 2GB / AMD HD 7870 2GB" },
                { label: "Storage", value: "110 GB available space" }
            ],
            downloadLink: `download.html?game=${gameId}`
        };

        // Fallback for RDR2 or others (generic)
        const rdr2Data = {
            title: "Red Dead Redemption 2",
            description: "Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.",
            poster: "assets/rdr2_poster.jpg",
            heroBg: "assets/rdr2_ss1.jpg",
            stats: {
                year: "2019",
                genre: "Action / Adventure",
                size: "150 GB"
            },
            screenshots: [
                "assets/rdr2_ss1.jpg",
                "assets/rdr2_ss2.jpg",
                "assets/rdr2_ss3.jpg",
                "assets/rdr2_ss4.jpg"
            ],
            features: [
                "Additional Story Mode content and a fully-featured Photo Mode.",
                "Free access to the shared living world of Red Dead Online.",
                "HDR support and ability to run high-end display setups with 4K resolution.",
                "Multi-monitor configurations and widescreen configurations."
            ],
            requirements: [
                { label: "OS", value: "Windows 10 - 64-bit" },
                { label: "Processor", value: "Intel® Core™ i7-4770K / AMD Ryzen 5 1500X" },
                { label: "Memory", value: "12 GB RAM" },
                { label: "Graphics", value: "Nvidia GeForce GTX 1060 6GB / AMD RX 480 4GB" },
                { label: "Storage", value: "150 GB available space" }
            ],
            downloadLink: `download.html?game=rdr2`
        };

        const data = gameId === 'rdr2' ? rdr2Data : gtaData;

        // Populate Content
        document.getElementById('gameTitle').innerText = data.title;
        document.getElementById('gameDescription').innerText = data.description;
        document.getElementById('gamePoster').src = data.poster;
        document.getElementById('gameHero').style.backgroundImage = `url('${data.heroBg}')`;
        document.getElementById('heroDownloadBtn').href = data.downloadLink;
        document.title = `${data.title} - Free Download - MRXGAMES`;

        // Populate Screenshots
        const screenGrid = document.getElementById('screenshotsGrid');
        if (data.screenshots.length > 0) {
            screenGrid.innerHTML = data.screenshots.map(src => `<img src="${src}" alt="Screenshot">`).join('');
        } else {
            screenGrid.innerHTML = '<p>No screenshots available.</p>';
        }

        // Populate Features
        document.getElementById('featuresList').innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

        // Populate Requirements
        document.getElementById('requirementsTable').innerHTML = data.requirements.map(req => `
            <div class="req-row">
                <span class="req-label">${req.label}</span>
                <span class="req-value">${req.value}</span>
            </div>
        `).join('');
    }
});
