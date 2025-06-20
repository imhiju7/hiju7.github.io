document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animation
    const heroTl = gsap.timeline();
    heroTl
        .from('.hero-title', {duration:1.2, y:100, opacity:0, scale:0.8, ease:'power4.out'})
        .from('.hero-subtitle', {duration:1, y:50, opacity:0, ease:'power3.out'}, '-=0.8')
        .from('.social-btn', {duration:0.8, scale:0, rotation:360, opacity:0, ease:'back.out(1.7)', stagger:0.1}, '-=0.6')
        .from('.cta-button', {duration:1, scale:0, ease:'elastic.out(1,0.5)'}, '-=0.4');
    gsap.to('.particle', {duration:6, y:-20, x:10, ease:'power1.inOut', yoyo:true, repeat:-1, stagger:0.5});

    // Character card animation
    animateCharacterCard();
    animateHobbyGallery();
});

function animateCharacterCard() {
    const tl = gsap.timeline({
        scrollTrigger: { trigger: '.character-card', start: 'top 80%', toggleActions: 'play none none reverse' }
    });
    tl.from('.character-card', {duration:0.8, scale:0.8, opacity:0, y:50, ease:'back.out(1.7)'})
      .from('.avatar', {duration:1, scale:0, rotation:360, ease:'elastic.out(1,0.5)'}, '-=0.5')
      .from('.level-badge', {duration:0.6, scale:0, ease:'back.out(2)'}, '-=0.3');

    document.querySelectorAll('.stat-fill').forEach((fill, index) => {
        const value = fill.dataset.value;
        gsap.to(fill, {duration:1.5, width:`${value}%`, ease:'power2.out', delay:index*0.2, scrollTrigger:{trigger:fill,start:'top 80%',toggleActions:'play none none reverse'}});
    });
}

function animateHobbyGallery() {
    gsap.from('.hobby-card', {
        duration:1,
        y:100,
        opacity:0,
        scale:0.8,
        ease:'power3.out',
        stagger:{amount:1.2, from:'random'},
        scrollTrigger:{trigger:'.hobby-grid', start:'top 80%', end:'bottom 20%', toggleActions:'play none none reverse'}
    });

    document.querySelectorAll('.hobby-card').forEach(card => {
        card.addEventListener('click', () => {
            const hobby = card.dataset.hobby;
            window.location.href = `interests/${hobby}.html`;
        });
    });
}
    const skillCards = document.querySelectorAll('[data-skill]');
    const projects = document.querySelectorAll('.project');

    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const skill = card.dataset.skill;
            projects.forEach(p => {
                const skills = p.dataset.skills.split(' ');
                p.style.display = skills.includes(skill) ? 'block' : 'none';
            });
        });
    });
});
