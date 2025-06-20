document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Hero Animation
    const heroTl = gsap.timeline();
    heroTl
        .from('.hero-title', {
            duration: 1.2,
            y: 100,
            opacity: 0,
            scale: 0.8,
            ease: 'power4.out'
        })
        .from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.8')
        .from('.social-btn', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'back.out(1.7)',
            stagger: 0.1
        }, '-=0.6')
        .from('.cta-button', {
            duration: 1,
            scale: 0,
            ease: 'elastic.out(1, 0.5)'
        }, '-=0.4');
    gsap.to('.particle', {duration:6, y:-20, x:10, ease:'power1.inOut', yoyo:true, repeat:-1, stagger:0.5});
    gsap.to('.gradient-bg', {backgroundPosition:'200% center', duration:20, ease:'none', repeat:-1});

    // Repeating hero text animation
    gsap.timeline({repeat:-1, repeatDelay:0.5})
        .to('#hero-title-text', {text:'Full Stack Developer', duration:2, ease:'none'})
        .to({}, {duration:1})
        .to('#hero-title-text', {text:'', duration:0.5, ease:'none'});

    // Section animations
    animateProfile();
    animateSkillsProjects();
    animateHobbyGallery();
});


function animateProfile() {
    gsap.from('#profile img, #profile h2, #profile ul li', {
        scrollTrigger: '#profile',
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.2
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
        duration: 1,
        y: 60,
        scale: 0.8,
        rotation: -5,
        opacity: 0,
        ease: 'power3.out',
        stagger: 0.2
    });

    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('click', () => {
            const skill = card.dataset.skill;
            document.querySelectorAll('.project-card').forEach(proj => {
                const match = skill === 'all' || proj.dataset.skill === skill;
                if (match) {
                    proj.style.display = 'block';
                    gsap.fromTo(proj, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.6});
                } else {
                    gsap.to(proj, {
                        opacity: 0,
                        y: 30,
                        duration: 0.3,
                        onComplete: () => { proj.style.display = 'none'; }
                    });
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
        y: 80,
        scale: 0.5,
        rotation: -10,
        opacity: 0,
        ease: 'back.out(1.4)',
        stagger: { amount: 1, from: 'random' },
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
