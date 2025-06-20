document.addEventListener('DOMContentLoaded', () => {
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
