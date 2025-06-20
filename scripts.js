document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Hero Animation
    const heroTl = gsap.timeline();
    heroTl
        .from('.hero-title', {duration:1.2, y:100, opacity:0, scale:0.8, ease:'power4.out'})
        .from('.hero-subtitle', {duration:1, y:50, opacity:0, ease:'power3.out'}, '-=0.8')
        .from('.social-btn', {duration:0.8, scale:0, rotation:360, opacity:0, ease:'back.out(1.7)', stagger:0.1}, '-=0.6')
        .from('.cta-button', {duration:1, scale:0, ease:'elastic.out(1,0.5)'}, '-=0.4');

    gsap.to('.particle', {
        duration: 6,
        y: -20,
        x: 10,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
    });

    // Repeating hero text animation
    gsap.timeline({repeat: -1, repeatDelay: 0.5})
        .to('#hero-title-text', {text: 'Full Stack Developer', duration: 2, ease: 'none'})
        .to({}, {duration: 1})
        .to('#hero-title-text', {text: '', duration: 0.5, ease: 'none'});

    // Download CV button entrance and pulse
    gsap.from('#download-cv', {
        scrollTrigger: '#download-cv',
        duration: 1,
        scale: 0,
        opacity: 0,
        ease: 'back.out(1.7)'
    });

    gsap.to('#download-cv', {
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut'
    });

    // Character card animation
    animateCharacterCard();

    // Skills and Projects animation
    animateSkillsProjects();

    // Hobby Gallery animation
    animateHobbyGallery();
});

function animateCharacterCard() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.character-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    tl.from('.character-card', {
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        y: 50,
        ease: 'back.out(1.7)'
    })
    .from('.avatar', {
        duration: 1,
        scale: 0,
        rotation: 360,
        ease: 'elastic.out(1, 0.5)'
    }, '-=0.5')
    .from('.level-badge', {
        duration: 0.6,
        scale: 0,
        ease: 'back.out(2)'
    }, '-=0.3');

    document.querySelectorAll('.stat-fill').forEach((fill, index) => {
        const value = fill.dataset.value;
        gsap.to(fill, {
            duration: 1.5,
            width: `${value}%`,
            ease: 'power2.out',
            delay: index * 0.2,
            scrollTrigger: {
                trigger: fill,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

function animateSkillsProjects() {
    gsap.from('.skill-card', {
        scrollTrigger: '.skill-grid',
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2
    });
    gsap.from('.project-card', {
        scrollTrigger: '.project-grid',
        duration: 0.8,
        y: 80,
        opacity: 0,
        stagger: 0.2
    });

    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('click', () => {
            const skill = card.dataset.skill;
            document.querySelectorAll('.project-card').forEach(proj => {
                if (skill === 'all') {
                    proj.style.display = 'block';
                } else {
                    proj.style.display = proj.dataset.skill === skill ? 'block' : 'none';
                }
            });
        });
    });

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.project;
            window.location.href = `projects/${id}.html`;
        });
    });
}

function animateHobbyGallery() {
    gsap.from('.hobby-card', {
        duration: 1,
        y: 100,
        opacity: 0,
        scale: 0.8,
        ease: 'power3.out',
        stagger: {amount: 1.2, from: 'random'},
        scrollTrigger: {
            trigger: '.hobby-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    document.querySelectorAll('.hobby-card').forEach(card => {
        card.addEventListener('click', () => {
            const hobby = card.dataset.hobby;
            window.location.href = `interests/${hobby}.html`;
        });
    });
}