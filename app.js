// ============================================================
// PORTFOLIO — Main Application
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    // ===== LOADER =====
    const loader = document.getElementById('loader');
    const loaderPercent = document.getElementById('loaderPercent');
    let progress = 0;

    const loaderInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loaderInterval);
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
                startRevealAnimations();
                // Scroll to hash if present (e.g. from sub-page "Back to Portfolio")
                if (window.location.hash) {
                    const target = document.querySelector(window.location.hash);
                    if (target) {
                        setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
                    }
                }
            }, 400);
        }
        loaderPercent.textContent = Math.floor(progress) + '%';
    }, 120);

    // ===== CUSTOM CURSOR =====
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let cursorX = 0, cursorY = 0, followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    function animateCursor() {
        followerX += (cursorX - followerX) * 0.12;
        followerY += (cursorY - followerY) * 0.12;

        cursor.style.left = cursorX - 4 + 'px';
        cursor.style.top = cursorY - 4 + 'px';
        follower.style.left = followerX - 18 + 'px';
        follower.style.top = followerY - 18 + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effect on interactive elements
    document.querySelectorAll('a, button, [data-tilt], [data-magnetic], input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });

    // ===== NAVIGATION =====
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const sections = document.querySelectorAll('.section');

    // Scroll tracking
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Nav style on scroll
        nav.classList.toggle('scrolled', scrollY > 60);

        // Active section tracking
        let current = 'home';
        sections.forEach(sec => {
            if (scrollY >= sec.offsetTop - 150) {
                current = sec.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === current);
        });
    });

    // Smooth scroll for nav links
    [...navLinks, ...mobileLinks].forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu
            mobileMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // ===== REVEAL ANIMATIONS =====
    function startRevealAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, i * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    }

    // ===== COUNT-UP ANIMATION =====
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const nums = entry.target.querySelectorAll('[data-count]');
                nums.forEach(num => {
                    const target = parseInt(num.dataset.count);
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    const update = () => {
                        current += step;
                        if (current < target) {
                            num.textContent = Math.floor(current);
                            requestAnimationFrame(update);
                        } else {
                            num.textContent = target;
                        }
                    };
                    update();
                });
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) countObserver.observe(heroStats);

    // ===== SKILL LEVEL ANIMATION =====
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-level').forEach(bar => {
                    bar.style.setProperty('--level', bar.dataset.level + '%');
                    bar.classList.add('animated');
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

    // ===== 3D TILT EFFECT =====
    document.querySelectorAll('[data-tilt]').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotX = ((y - cy) / cy) * -6;
            const rotY = ((x - cx) / cx) * 6;

            el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.01)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
            el.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
            setTimeout(() => { el.style.transition = ''; }, 500);
        });
    });

    // ===== MAGNETIC BUTTONS =====
    document.querySelectorAll('[data-magnetic]').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const dx = e.clientX - rect.left - rect.width / 2;
            const dy = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transition = 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)';
            el.style.transform = '';
            setTimeout(() => { el.style.transition = ''; }, 400);
        });
    });

    // ===== PROJECT FILTER =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const tag = card.dataset.tag || '';
                if (filter === 'all' || tag.split(' ').includes(filter)) {
                    card.classList.remove('filter-hidden');
                    card.style.animation = 'slideIn 0.4s cubic-bezier(0.16,1,0.3,1)';
                } else {
                    card.classList.add('filter-hidden');
                }
            });
        });
    });

    // ===== ABOUT ME TABS =====
    const tabLinks = document.querySelectorAll('.tab-links');
    const tabContents = document.querySelectorAll('.tab-contents');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabname = link.dataset.tab;
            tabLinks.forEach(l => l.classList.remove('active-link'));
            tabContents.forEach(c => c.classList.remove('active-tab'));
            link.classList.add('active-link');
            document.getElementById(tabname).classList.add('active-tab');
        });
    });

    // ===== CONTACT FORM (Google Sheets) =====
    const scriptURL = 'https://script.google.com/macros/s/AKfycby2DyFAzAxBUaTSNuOPdzriNZxtUWw7QHFCEVmQntWLbqCn3C7cfN531m0fDRsAUWn4/exec';
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const msg = document.getElementById('formMsg');
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    msg.innerHTML = '<span style="color: var(--accent-2);">Message sent successfully!</span>';
                    setTimeout(() => { msg.innerHTML = ''; }, 5000);
                    form.reset();
                })
                .catch(error => {
                    msg.innerHTML = '<span style="color: #ff4757;">Error sending message. Please try again.</span>';
                    console.error('Error!', error.message);
                });
        });
    }

    // ===== SCROLL TO TOP =====
    const scrollUpBtn = document.getElementById('scrollUpBtn');
    if (scrollUpBtn) {
        window.addEventListener('scroll', () => {
            scrollUpBtn.classList.toggle('visible', window.scrollY > 400);
        });
        scrollUpBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== THREE.JS SCENES =====
    initBackgroundParticles();
    initHeroGlobe();

    // ===== BACKGROUND PARTICLES =====
    function initBackgroundParticles() {
        const canvas = document.getElementById('bgCanvas');
        if (!canvas || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Particles
        const count = 800;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        const cols = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 120;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 120;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
            sizes[i] = Math.random() * 1.5 + 0.3;

            const t = Math.random();
            if (t < 0.4) {
                cols[i * 3] = 0.42; cols[i * 3 + 1] = 0.39; cols[i * 3 + 2] = 1.0;
            } else if (t < 0.7) {
                cols[i * 3] = 0.0; cols[i * 3 + 1] = 0.83; cols[i * 3 + 2] = 0.67;
            } else {
                cols[i * 3] = 0.66; cols[i * 3 + 1] = 0.33; cols[i * 3 + 2] = 0.97;
            }
        }

        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));

        const mat = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uScroll: { value: 0 }
            },
            vertexShader: `
                attribute vec3 color;
                varying vec3 vColor;
                varying float vAlpha;
                uniform float uTime;
                uniform vec2 uMouse;
                uniform float uScroll;

                void main() {
                    vColor = color;
                    vec3 p = position;
                    p.x += sin(uTime * 0.2 + p.y * 0.03) * 3.0;
                    p.y += cos(uTime * 0.15 + p.x * 0.03) * 3.0;
                    p.y -= uScroll * 0.01;

                    vec4 mv = modelViewMatrix * vec4(p, 1.0);
                    gl_Position = projectionMatrix * mv;
                    gl_PointSize = (2.0 + sin(uTime + p.x) * 0.5) * (200.0 / -mv.z);
                    vAlpha = smoothstep(100.0, 10.0, -mv.z) * 0.5;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vAlpha;
                void main() {
                    float d = length(gl_PointCoord - 0.5);
                    if (d > 0.5) discard;
                    float glow = 1.0 - smoothstep(0.0, 0.5, d);
                    gl_FragColor = vec4(vColor, glow * vAlpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geo, mat);
        scene.add(particles);

        // Connection lines
        const lineCount = 300;
        const lineGeo = new THREE.BufferGeometry();
        const linePos = new Float32Array(lineCount * 6);
        const lineCol = new Float32Array(lineCount * 6);
        lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
        lineGeo.setAttribute('color', new THREE.BufferAttribute(lineCol, 3));
        const lineMat = new THREE.LineBasicMaterial({
            vertexColors: true, transparent: true, opacity: 0.08,
            blending: THREE.AdditiveBlending
        });
        const lines = new THREE.LineSegments(lineGeo, lineMat);
        scene.add(lines);

        let time = 0;
        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        function animate() {
            requestAnimationFrame(animate);
            time += 0.005;

            mat.uniforms.uTime.value = time;
            mat.uniforms.uMouse.value.set(mouseX, mouseY);
            mat.uniforms.uScroll.value = window.scrollY;

            particles.rotation.y = time * 0.03 + mouseX * 0.05;
            particles.rotation.x = mouseY * 0.03;

            // Update connection lines (every 3 frames)
            if (Math.floor(time * 200) % 3 === 0) {
                const p = geo.attributes.position.array;
                let li = 0;
                for (let i = 0; i < count && li < lineCount; i += 3) {
                    for (let j = i + 3; j < count && li < lineCount; j += 3) {
                        const dx = p[i * 3] - p[j * 3];
                        const dy = p[i * 3 + 1] - p[j * 3 + 1];
                        const dz = p[i * 3 + 2] - p[j * 3 + 2];
                        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                        if (dist < 15) {
                            const a = 1 - dist / 15;
                            const idx = li * 6;
                            linePos[idx] = p[i * 3]; linePos[idx + 1] = p[i * 3 + 1]; linePos[idx + 2] = p[i * 3 + 2];
                            linePos[idx + 3] = p[j * 3]; linePos[idx + 4] = p[j * 3 + 1]; linePos[idx + 5] = p[j * 3 + 2];
                            lineCol[idx] = 0.42 * a; lineCol[idx + 1] = 0.39 * a; lineCol[idx + 2] = 1.0 * a;
                            lineCol[idx + 3] = 0.0 * a; lineCol[idx + 4] = 0.83 * a; lineCol[idx + 5] = 0.67 * a;
                            li++;
                        }
                    }
                }
                for (let i = li * 6; i < lineCount * 6; i++) { linePos[i] = 0; lineCol[i] = 0; }
                lineGeo.attributes.position.needsUpdate = true;
                lineGeo.attributes.color.needsUpdate = true;
                lineGeo.setDrawRange(0, li * 2);
            }

            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // ===== HERO GLOBE =====
    function initHeroGlobe() {
        const canvas = document.getElementById('heroGlobe');
        if (!canvas || typeof THREE === 'undefined') return;

        const parent = canvas.parentElement;
        const w = parent.offsetWidth;
        const h = parent.offsetHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h);

        // Wireframe sphere
        const sphereGeo = new THREE.IcosahedronGeometry(10, 3);
        const sphereMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0.42, 0.39, 1.0),
            wireframe: true,
            transparent: true,
            opacity: 0.08
        });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        scene.add(sphere);

        // Dots on sphere
        const dotCount = 600;
        const dotGeo = new THREE.BufferGeometry();
        const dotPos = new Float32Array(dotCount * 3);
        const dotCols = new Float32Array(dotCount * 3);

        for (let i = 0; i < dotCount; i++) {
            const phi = Math.acos(2 * Math.random() - 1);
            const theta = Math.random() * Math.PI * 2;
            const r = 10;
            dotPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            dotPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            dotPos[i * 3 + 2] = r * Math.cos(phi);

            const t = Math.random();
            if (t < 0.5) {
                dotCols[i * 3] = 0.42; dotCols[i * 3 + 1] = 0.39; dotCols[i * 3 + 2] = 1.0;
            } else {
                dotCols[i * 3] = 0.0; dotCols[i * 3 + 1] = 0.83; dotCols[i * 3 + 2] = 0.67;
            }
        }

        dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3));
        dotGeo.setAttribute('color', new THREE.BufferAttribute(dotCols, 3));

        const dotMat = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        const dots = new THREE.Points(dotGeo, dotMat);
        scene.add(dots);

        // Orbit rings
        const ring1 = new THREE.Mesh(
            new THREE.TorusGeometry(13, 0.04, 8, 100),
            new THREE.MeshBasicMaterial({ color: 0x6c63ff, transparent: true, opacity: 0.12 })
        );
        ring1.rotation.x = Math.PI * 0.4;
        scene.add(ring1);

        const ring2 = ring1.clone();
        ring2.material = ring1.material.clone();
        ring2.material.color = new THREE.Color(0x00d4aa);
        ring2.rotation.x = Math.PI * 0.6;
        ring2.rotation.y = Math.PI * 0.3;
        scene.add(ring2);

        const ring3 = ring1.clone();
        ring3.material = ring1.material.clone();
        ring3.material.color = new THREE.Color(0xa855f7);
        ring3.material.opacity = 0.08;
        ring3.geometry = new THREE.TorusGeometry(16, 0.03, 8, 100);
        ring3.rotation.x = Math.PI * 0.3;
        ring3.rotation.z = Math.PI * 0.2;
        scene.add(ring3);

        // Orbiting particles
        const orbitCount = 30;
        const orbitGeo = new THREE.BufferGeometry();
        const orbitPos = new Float32Array(orbitCount * 3);
        const orbitAngles = [];

        for (let i = 0; i < orbitCount; i++) {
            orbitAngles.push({
                angle: Math.random() * Math.PI * 2,
                radius: 12 + Math.random() * 5,
                speed: 0.005 + Math.random() * 0.01,
                y: (Math.random() - 0.5) * 10,
                tilt: Math.random() * 0.5
            });
        }

        orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPos, 3));
        const orbitMat = new THREE.PointsMaterial({
            color: 0x00d4aa,
            size: 0.3,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        const orbitParticles = new THREE.Points(orbitGeo, orbitMat);
        scene.add(orbitParticles);

        let time = 0;
        let mx = 0, my = 0;

        document.addEventListener('mousemove', (e) => {
            mx = (e.clientX / window.innerWidth) * 2 - 1;
            my = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        function animate() {
            requestAnimationFrame(animate);
            time += 0.005;

            const targetRy = mx * 0.5 + time * 0.2;
            const targetRx = my * 0.3;

            sphere.rotation.y += (targetRy - sphere.rotation.y) * 0.02;
            sphere.rotation.x += (targetRx - sphere.rotation.x) * 0.02;
            dots.rotation.copy(sphere.rotation);

            ring1.rotation.z = time * 0.3;
            ring2.rotation.z = -time * 0.2;
            ring3.rotation.z = time * 0.15;

            // Update orbit particles
            for (let i = 0; i < orbitCount; i++) {
                const o = orbitAngles[i];
                o.angle += o.speed;
                orbitPos[i * 3] = Math.cos(o.angle) * o.radius;
                orbitPos[i * 3 + 1] = o.y + Math.sin(o.angle * o.tilt) * 3;
                orbitPos[i * 3 + 2] = Math.sin(o.angle) * o.radius;
            }
            orbitGeo.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            const w2 = parent.offsetWidth;
            const h2 = parent.offsetHeight;
            camera.aspect = w2 / h2;
            camera.updateProjectionMatrix();
            renderer.setSize(w2, h2);
        });
    }
});
