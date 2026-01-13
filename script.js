// Navigation tab switching using data-target -> scroll to matching section id
const navItems = document.querySelectorAll('.nav-list li');
const sections = document.querySelectorAll('.section');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active from all nav items
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Determine target section id from data-target
        const targetId = item.getAttribute('data-target');
        if (targetId) {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                // Remove active from all sections and set target active
                sections.forEach(s => s.classList.remove('active'));
                targetSection.classList.add('active');
                // Smooth scroll to section
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Resume tabs
const resumeTabs = document.querySelectorAll('.resume-list');
const resumeBoxes = document.querySelectorAll('.resume-box');

resumeTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        resumeTabs.forEach(t => t.classList.remove('active'));
        resumeBoxes.forEach(box => box.classList.remove('active'));

        tab.classList.add('active');
        resumeBoxes[index].classList.add('active');
    });
});

// Portfolio tabs
const portfolioTabs = document.querySelectorAll('.portfolio-list');
const portfolioBoxes = document.querySelectorAll('.portfolio-box');

portfolioTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        portfolioTabs.forEach(t => t.classList.remove('active'));
        portfolioBoxes.forEach(box => box.classList.remove('active'));

        tab.classList.add('active');
        portfolioBoxes[index].classList.add('active');
    });
});

// Theme toggle
const toggleThemeCheckbox = document.getElementById('toggle-theme');

toggleThemeCheckbox.addEventListener('change', () => {
    if (toggleThemeCheckbox.checked) {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
});

// Typed effect for name and role (simple version)
const typedName = document.getElementById('typed-name');
const typedRole = document.getElementById('typed-role');

const roles = ['Engagement Manager', 'Frontend Developer', 'Full Stack Developer', 'UI/UX Designer'];
const roleDescriptions = {
    'Engagement Manager': 'I align teams and stakeholders, build roadmaps, and keep communication crisp so projects ship smoothly. I surface risks early and keep everyone focused on impact.',
    'Frontend Developer': 'I craft responsive, accessible UIs with modern JavaScript, clean CSS, and component-driven architecture. I sweat the micro-interactions that make products feel polished.',
    'Full Stack Developer': 'I design APIs, manage data flow, and connect performant backends with intuitive frontends. I prioritize reliability, observability, and maintainable delivery pipelines.',
    'UI/UX Designer': 'I design flows, wireframes, and visuals that make products easy, delightful, and consistent across devices. I test, iterate, and ship designs grounded in real user feedback.'
};
const descEl = document.querySelector('.home .desc');
let roleIndex = 0;
let charIndex = 0;
let typingDelay = 150;
let erasingDelay = 100;
let newTextDelay = 2000;

function typeRole() {
    // Set description when starting a new role
    if (charIndex === 0 && descEl) {
        descEl.textContent = roleDescriptions[roles[roleIndex]] || descEl.textContent;
    }

    if (charIndex < roles[roleIndex].length) {
        typedRole.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeRole, typingDelay);
    } else {
        setTimeout(eraseRole, newTextDelay);
    }
}

function eraseRole() {
    if (charIndex > 0) {
        typedRole.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseRole, erasingDelay);
    } else {
        roleIndex++;
        if (roleIndex >= roles.length) roleIndex = 0;
        setTimeout(typeRole, typingDelay + 1100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (roles.length) setTimeout(typeRole, newTextDelay + 250);
});

// Portfolio Filter Tabs
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item[data-category]');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.6s ease-out forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Contact Form Handler with EmailJS
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Using EmailJS to send email
        const templateParams = {
            from_name: name,
            from_email: email,
            phone_number: phone,
            subject: subject,
            message: message,
            to_email: 'aviral.mishra2k25@gmail.com' // Change to your email
        };

        // Send email using EmailJS
        emailjs.send('service_xxxxxxx', 'template_xxxxxxx', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                formStatus.textContent = '✓ Message sent successfully!';
                formStatus.classList.add('form-success');
                formStatus.classList.remove('form-error');
                contactForm.reset();

                // Clear status after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.classList.remove('form-success');
                }, 5000);
            }, function (error) {
                console.log('FAILED...', error);
                formStatus.textContent = '✗ Failed to send message. Please try again.';
                formStatus.classList.add('form-error');
                formStatus.classList.remove('form-success');

                // Clear status after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.classList.remove('form-error');
                }, 5000);
            });
    });
}

// Intersection Observer for smooth scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.achievement-card, .skill-item, .testimonial-card, .blog-card, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// (Removed index-based scroll handler; navigation uses data-target attributes now)

// Scroll Progress Bar
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// Floating Particles Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size between 2-6px
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';

        // Random color from gradient
        const colors = [
            'rgba(0, 212, 255, 0.3)',
            'rgba(91, 134, 229, 0.3)',
            'rgba(54, 209, 220, 0.3)',
            'rgba(67, 233, 123, 0.3)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.background}`;

        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Add parallax effect to home section
const homeSection = document.getElementById('home');
if (homeSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const homeInfo = homeSection.querySelector('.home-info');
        const imgWrapper = homeSection.querySelector('.img-wrapper');

        if (homeInfo && scrolled < window.innerHeight) {
            homeInfo.style.transform = `translateY(${scrolled * 0.3}px)`;
            if (imgWrapper) {
                imgWrapper.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        }
    });
}

// Add cursor trail effect (optional, can be disabled)
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    // Only on desktop
    if (window.innerWidth > 768) {
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }

        // Remove old trail points
        cursorTrail = cursorTrail.filter(point => Date.now() - point.time < 500);
    }
});

// Add smooth reveal animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    sectionObserver.observe(section);
});

// Enhanced button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
