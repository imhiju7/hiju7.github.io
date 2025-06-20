document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    animateHero();
    animateProfile();
    setupSkillFiltering();
    animateHobbies();
    setupButtonRipple();
    setupScrollButton();
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
                    proj.style.display = 'block';
                    gsap.fromTo(proj, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.5});
                } else {
                    gsap.to(proj, {opacity: 0, y: 30, duration: 0.3, onComplete: () => {proj.style.display = 'none';}});
                }
            });
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
    document.querySelectorAll('.social-btn, #scroll-btn, #download-cv').forEach(btn => {
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
    const btn = document.getElementById("scroll-btn");
    if (!btn) return;
    const sections = document.querySelectorAll("section");
    btn.addEventListener("click", () => {
        const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
        if (atBottom) {
            window.scrollTo({top: 0, behavior: "smooth"});
        } else {
            const index = [...sections].findIndex(s => s.getBoundingClientRect().top <= 1 && s.getBoundingClientRect().bottom > 1);
            const next = Math.min(index + 1, sections.length - 1);
            sections[next].scrollIntoView({behavior: "smooth"});
        }
    });
    window.addEventListener("scroll", () => {
        const icon = btn.querySelector("svg");
        const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
        icon.classList.toggle("rotate-180", atBottom);
    });
}

