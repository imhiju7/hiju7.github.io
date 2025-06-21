document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    animateHero();
    animateProfile();
    animateCertificates();
    setupSkillFiltering();
    animateHobbies();
    setupButtonRipple();
    setupScrollButton();
    setupCarousels();
    initAlienScene();
});

function animateHero() {
    gsap.to('.gradient-bg', {backgroundPosition: '200% center', duration: 20, ease: 'none', repeat: -1});

    const tl = gsap.timeline();
    tl.from('.hero-title', {duration: 1, y: 80, opacity: 0, ease: 'power4.out'})
      .from('.hero-subtitle', {duration: 0.8, y: 40, opacity: 0, ease: 'power3.out'}, '-=0.6')
      .from('.social-btn', {duration: 0.6, scale: 0, opacity: 0, stagger: 0.1, ease: 'back.out(1.7)'}, '-=0.4')

    gsap.timeline({repeat: -1, repeatDelay: 0.5})
        .to('#hero-title-text', {text: 'AI Researcher', duration: 2, ease: 'none'})
        .to({}, {duration: 1})
        .to('#hero-title-text', {text: '', duration: 0.5, ease: 'none'});
}

function animateProfile() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#profile-card',
            start: 'top 80%'
        }
    });
    tl.from('#profile-card', {y: 50, opacity: 0, duration: 0.8});
    tl.from('#profile-card .profile-image', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
    }, '-=0.4');
    tl.from('#profile-card .profile-info li', {
        x: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6
    }, '-=0.6');
}

function animateCertificates() {
    const certCards = document.querySelectorAll('.certificate-card');
    if (!certCards.length) return;
    gsap.from(certCards, {
        scrollTrigger: '.certificate-grid',
        y: 80,
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
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
    initAlienScene();
    document.querySelectorAll('.gallery-container').forEach(container => {
        enableDragScroll(container);
    });
}
function initAlienScene() {
    const canvas = document.getElementById('alien-canvas');
    if (!canvas) return;
    const wrapper = canvas.parentElement;
    const scene = new THREE.Scene();
    function getSize() {
        return { width: wrapper.clientWidth, height: wrapper.clientHeight };
    }
    let { width, height } = getSize();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        canvas: canvas
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    const composer = new THREE.EffectComposer(renderer);
    const renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(width, height), 2.0, 0.3, 0.9);
    composer.addPass(bloomPass);

    const simplex = new SimplexNoise();
    const geometry = new THREE.PlaneGeometry(100, 100, 128, 128);
    const material = new THREE.MeshStandardMaterial({
        color: 0x333333,
        emissive: 0x1a1a1a,
        metalness: 0.9,
        roughness: 0.1,
        wireframe: false,
        flatShading: true
    });
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i] / 20;
        const y = vertices[i + 1] / 20;
        vertices[i + 2] = simplex.noise2D(x, y) * 6 + simplex.noise2D(x * 2, y * 2) * 3 + simplex.noise2D(x * 4, y * 4) * 1.5 + simplex.noise2D(x * 8, y * 8) * 0.75;
    }
    geometry.computeVertexNormals();
    const terrain = new THREE.Mesh(geometry, material);
    terrain.rotation.x = -Math.PI / 2;
    scene.add(terrain);

    const particleCount = Math.min(2000, window.innerWidth < 768 ? 1000 : 2000);
    const snowflakes = [];
    const particleSpeeds = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
        const c = document.createElement('canvas');
        c.width = 32;
        c.height = 32;
        const ctx = c.getContext('2d');
        ctx.font = '24px Arial';
        ctx.fillStyle = `rgb(${Math.random() * 127 + 128}, ${Math.random() * 204 + 51}, 255)`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('❄', 16, 16);
        const texture = new THREE.CanvasTexture(c);
        texture.needsUpdate = true;
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, blending: THREE.AdditiveBlending }));
        sprite.position.set(Math.random() * 100 - 50, Math.random() * 50 + 20, Math.random() * 100 - 50);
        particleSpeeds[i] = Math.random() * 0.15 + 0.05;
        sprite.scale.set(0.5, 0.5, 0.5);
        snowflakes.push(sprite);
        scene.add(sprite);
    }

    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xff3366, 1.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0x66ffff, 3);
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0xff66ff, 2);
    pointLight2.position.set(0, 15, 0);
    scene.add(pointLight2);
    scene.fog = new THREE.FogExp2(0x000000, 0.015);
    camera.position.set(0, 10, 20);
    let time = 0;
    let animationFrameId;
    const timeline = gsap.timeline({ repeat: -1, yoyo: true });
    timeline.to(pointLight.color, { r: 1, g: 0, b: 1, duration: 2 }).to(pointLight.color, { r: 0, g: 1, b: 1, duration: 2 });
    const timeline2 = gsap.timeline({ repeat: -1, yoyo: true });
    timeline2.to(pointLight2.color, { r: 0, g: 1, b: 1, duration: 1.5 }).to(pointLight2.color, { r: 1, g: 0, b: 1, duration: 1.5 });

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        time += 0.002;
        camera.position.x = Math.sin(time) * 35;
        camera.position.z = Math.cos(time) * 35;
        camera.position.y = 12 + Math.sin(time * 0.5) * 6;
        camera.lookAt(Math.sin(time * 0.25) * 10, 0, Math.cos(time * 0.25) * 10);
        const positions = geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i] / 20;
            const y = positions[i + 1] / 20;
            positions[i + 2] = simplex.noise2D(x + time * 0.2, y) * 6 + simplex.noise2D((x + time * 0.4) * 2, y * 2) * 3 + simplex.noise2D((x + time * 0.8) * 4, y * 4) * 1.5 + simplex.noise2D((x + time * 1.2) * 8, y * 8) * 0.75;
        }
        geometry.attributes.position.needsUpdate = true;
        geometry.computeVertexNormals();
        snowflakes.forEach((snowflake, index) => {
            snowflake.position.y -= particleSpeeds[index];
            snowflake.position.x += Math.sin(time + index) * 0.02;
            snowflake.position.z += Math.cos(time + index) * 0.02;
            snowflake.rotation.z += 0.01;
            if (snowflake.position.y < 0) {
                snowflake.position.set(Math.random() * 100 - 50, 50, Math.random() * 100 - 50);
            }
        });
        pointLight.position.x = Math.sin(time) * 20;
        pointLight.position.z = Math.cos(time) * 20;
        pointLight2.position.x = Math.sin(time * 1.5) * 15;
        pointLight2.position.z = Math.cos(time * 1.5) * 15;
        composer.render();
    }
    animate();

    function onWindowResize() {
        ({ width, height } = getSize());
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        composer.setSize(width, height);
    }
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId);
        } else {
            animate();
        }
    });
}
