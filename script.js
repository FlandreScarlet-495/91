window.addEventListener('DOMContentLoaded', function () {
    var menuBtn = document.querySelector('.menu-btn');
    var nav = document.querySelector('.nav');
    var navLinks = document.querySelectorAll('.nav a');
    var sections = document.querySelectorAll('section[id]');
    var revealEls = document.querySelectorAll('.reveal');
    var filterBtns = document.querySelectorAll('.filter-bar button[data-filter]');
    var gallery = document.querySelector('.gallery-masonry');
    var shuffleBtn = document.querySelector('.shuffle-btn');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function () {
            nav.classList.toggle('open');
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (nav) nav.classList.remove('open');
        });
    });

    function setActiveNav() {
        var scrollY = window.pageYOffset;
        sections.forEach(function (section) {
            var top = section.offsetTop - 140;
            var bottom = top + section.offsetHeight;
            var id = section.getAttribute('id');
            if (scrollY >= top && scrollY < bottom) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        revealEls.forEach(function (el) {
            el.classList.add('show');
        });
    }

    function resetGalleryClasses() {
        document.querySelectorAll('.gallery-card').forEach(function (card) {
            card.classList.remove('card-large', 'card-tall', 'card-wide');
        });
        var visibleCards = Array.prototype.slice.call(document.querySelectorAll('.gallery-card:not(.hide)'));
        if (visibleCards[0]) visibleCards[0].classList.add('card-large');
        if (visibleCards[3]) visibleCards[3].classList.add('card-tall');
        if (visibleCards[6]) visibleCards[6].classList.add('card-wide');
    }

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var filter = btn.getAttribute('data-filter');
            var cards = document.querySelectorAll('.gallery-card');
            filterBtns.forEach(function (item) { item.classList.remove('active'); });
            btn.classList.add('active');
            cards.forEach(function (card) {
                var category = card.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
            resetGalleryClasses();
        });
    });

    if (shuffleBtn && gallery) {
        shuffleBtn.addEventListener('click', function () {
            var cards = Array.prototype.slice.call(gallery.children);
            for (var i = cards.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = cards[i];
                cards[i] = cards[j];
                cards[j] = temp;
            }
            cards.forEach(function (card) {
                gallery.appendChild(card);
                card.classList.remove('hide');
            });
            filterBtns.forEach(function (item) { item.classList.remove('active'); });
            var allBtn = document.querySelector('.filter-bar button[data-filter="all"]');
            if (allBtn) allBtn.classList.add('active');
            resetGalleryClasses();
        });
    }

    window.addEventListener('scroll', function () {
        setActiveNav();
    });

    setActiveNav();
    resetGalleryClasses();
});
