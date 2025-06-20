document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    animateHero();
    animateProfile();
    setupSkillFiltering();
    animateHobbies();
    setupButtonRipple();
    setupScrollButton();
    setupCarousels();
});

function animateHero() {
    gsap.to('.gradient-bg', {backgroundPosition: '200% center', duration: 20, ease: 'none', repeat: -1});

    const tl = gsap.timeline();
    tl.from('.hero-title', {duration: 1, y: 80, opacity: 0, ease: 'power4.out'})
      .from('.hero-subtitle', {duration: 0.8, y: 40, opacity: 0, ease: 'power3.out'}, '-=0.6')
      .from('.social-btn', {duration: 0.6, scale: 0, opacity: 0, stagger: 0.1, ease: 'back.out(1.7)'}, '-=0.4')

    gsap.timeline({repeat: -1, repeatDelay: 0.5})
        .to('#hero-title-text', {text: 'Full Stack Developer', duration: 2, ease: 'none'})
        .to({}, {duration: 1})
        .to('#hero-title-text', {text: '', duration: 0.5, ease: 'none'});
}

function animateProfile() {
    gsap.from('#profile > div', {
        scrollTrigger: '#profile',
        y: 50,
        opacity: 0,
        duration: 1
    });
}

function setupSkillFiltering() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectContainer = document.querySelector('.project-grid');

    gsap.from(projectCards, {
        scrollTrigger: '.project-grid',
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    });

    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('click', () => {
            const skill = card.dataset.skill;
            projectCards.forEach(proj => {
                const show = skill === 'all' || proj.dataset.skill === skill;
                if (show) {
                    // Ensure gallery items keep their inline layout when shown
                    proj.style.display = 'inline-block';
                    gsap.fromTo(proj, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.5});
                } else {
                    gsap.to(proj, {opacity: 0, y: 30, duration: 0.3, onComplete: () => {proj.style.display = 'none';}});
                }
            });

            if (projectContainer) {
                const visible = Array.from(projectContainer.children).filter(el => getComputedStyle(el).display !== 'none');
                if (visible.length) {
                    const first = visible[0];
                    const last = visible[visible.length - 1];
                    const start = first.offsetLeft;
                    const end = last.offsetLeft + last.offsetWidth;
                    const width = end - start;
                    const pos = start - (projectContainer.clientWidth - width) / 2;
                    projectContainer.scrollTo({left: pos, behavior: 'smooth'});
                }
            }
        });
    });

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.project;
            window.location.href = `projects/${id}.html`;
        });
    });
}

function animateHobbies() {
    const hobbyCards = document.querySelectorAll('.hobby-card');
    gsap.from(hobbyCards, {
        scrollTrigger: '.hobby-grid',
        y: 80,
        scale: 0.8,
        opacity: 0,
        stagger: {amount: 1, from: 'random'},
        duration: 1,
        ease: 'power3.out'
    });

    hobbyCards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.hobby;
            window.location.href = `interests/${id}.html`;
        });
    });
}

function setupButtonRipple() {
    document.querySelectorAll('.social-btn, #scroll-button, #download-cv').forEach(btn => {
        const ripple = btn.querySelector('.ripple');
        if (!ripple) return;
        btn.addEventListener('mouseenter', () => {
            gsap.fromTo(ripple, {scale: 0, opacity: 0.3}, {scale: 1.5, opacity: 0, duration: 0.6, ease: 'power1.out'});
        });
    });

    const dl = document.getElementById('download-cv');
    if (dl) {
        gsap.to(dl, {scale: 1.05, duration: 1.2, ease: 'power1.inOut', repeat: -1, yoyo: true});
    }
}

function setupScrollButton() {
    const scrollBtn = document.getElementById('scroll-button');
    const arrowIcon = document.getElementById('arrow-icon');
    if (!scrollBtn) return;
    const sections = document.querySelectorAll('section');
    let currentIndex = 0;

    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        }
    }

    scrollBtn.addEventListener('click', () => {
        if (currentIndex < sections.length - 1) {
            currentIndex++;
            scrollToSection(currentIndex);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            currentIndex = 0;
        }
    });

    window.addEventListener('scroll', () => {
        for (let i = 0; i < sections.length; i++) {
            const rect = sections[i].getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentIndex = i;
                break;
            }
        }

        if (arrowIcon) {
            const atLast = currentIndex === sections.length - 1;
            arrowIcon.style.transform = atLast ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    });
}

function enableDragScroll(container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', e => {
        isDown = true;
        container.classList.add('dragging');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('dragging');
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('dragging');
    });

    container.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = x - startX;
        container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener('touchstart', e => {
        isDown = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchmove', e => {
        if (!isDown) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = x - startX;
        container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener('touchend', () => {
        isDown = false;
    });

    container.addEventListener('wheel', e => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        container.scrollLeft += e.deltaY;
    }, { passive: false });
}

function setupCarousels() {
    document.querySelectorAll('.gallery-container').forEach(container => {
        enableDragScroll(container);
    });
}
