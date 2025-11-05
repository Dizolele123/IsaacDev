// Navigation mobile
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Fermer le menu mobile en cliquant sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Animation des barres de compétences
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const level = item.getAttribute('data-level');
        const progressBar = item.querySelector('.skill-progress');
        
        setTimeout(() => {
            progressBar.style.width = level + '%';
        }, 500);
    });
}

// Filtrage des designs
function initDesignFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const designCards = document.querySelectorAll('.design-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            designCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.add('show'), 50);
                } else {
                    card.classList.remove('show');
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// Modal pour les designs
function openModal(designId) {
    const modal = document.getElementById('designModal');
    const modalBody = document.getElementById('modal-body');
    
    // Contenu du modal basé sur le design
    const designContent = {
        design1: `
            <h2>Application Mobile Modern</h2>
            <div class="modal-image">
                <img src="assets/images/a2.png" alt="Application Mobile Modern">
            </div>
            <div class="modal-details">
                <p><strong>Catégorie:</strong> UI/UX Design</p>
                <p><strong>Année:</strong> 2024</p>
                <p><strong>Description:</strong> Design d'application mobile moderne avec interface utilisateur intuitive et expérience utilisateur optimisée.</p>
                <p><strong>Outils:</strong> Figma, Adobe XD, Illustrator</p>
            </div>
        `,
        design2: `
            <h2>Poster Artistique</h2>
            <div class="modal-image">
                <img src="assets/images/a3.png" alt="Poster Artistique">
            </div>
            <div class="modal-details">
                <p><strong>Catégorie:</strong> Design Graphique</p>
                <p><strong>Année:</strong> 2024</p>
                <p><strong>Description:</strong> Poster artistique créé avec une approche moderne et des couleurs vibrantes.</p>
                <p><strong>Outils:</strong> Photoshop, Illustrator</p>
            </div>
        `,
        design3: `
            <h2>Identité Visuelle</h2>
            <div class="modal-image">
                <img src="assets/images/a4.png" alt="Identité Visuelle">
            </div>
            <div class="modal-details">
                <p><strong>Catégorie:</strong> Branding</p>
                <p><strong>Année:</strong> 2024</p>
                <p><strong>Description:</strong> Création complète d'identité visuelle incluant logo, palette de couleurs et guidelines.</p>
                <p><strong>Outils:</strong> Illustrator, InDesign</p>
            </div>
        `,
        design4: `
            <h2>Dashboard Analytics</h2>
            <div class="modal-image">
                <img src="assets/images/a4.png" alt="Dashboard Analytics">
            </div>
            <div class="modal-details">
                <p><strong>Catégorie:</strong> UI/UX Design</p>
                <p><strong>Année:</strong> 2024</p>
                <p><strong>Description:</strong> Dashboard analytique avec visualisation de données et interface administrateur.</p>
                <p><strong>Outils:</strong> Figma, Sketch</p>
            </div>
        `
    };
    
    modalBody.innerHTML = designContent[designId] || '<p>Contenu non disponible</p>';
    modal.style.display = 'block';
    
    // Empêcher le défilement du body
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('designModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fermer le modal en cliquant à l'extérieur
window.addEventListener('click', (e) => {
    const modal = document.getElementById('designModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Gestion des formulaires
function initForms() {
    const generalForm = document.getElementById('generalForm');
    const designForm = document.getElementById('designForm');
    
    if (generalForm) {
        generalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulation d'envoi
            showNotification('Message envoyé avec succès! Je vous répondrai dans les plus brefs délais.', 'success');
            generalForm.reset();
        });
    }
    
    if (designForm) {
        designForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulation d'envoi
            showNotification('Demande de design envoyée! Je vous contacte rapidement pour discuter de votre projet.', 'success');
            designForm.reset();
        });
    }
}

// Notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-color)' : '#e74c3c'};
        color: var(--dark-bg);
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: var(--shadow);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animer les compétences quand la section est visible
                if (entry.target.id === 'skills') {
                    animateSkills();
                }
            }
        });
    }, observerOptions);
    
    // Observer les sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observer les cartes de design
    document.querySelectorAll('.design-card').forEach(card => {
        observer.observe(card);
    });
}

// Navigation scroll
function initScrollNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Fonction de défilement fluide
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 70; // Compensation pour la navbar fixe
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Gestion du thème (pour future implémentation dark/light)
function initTheme() {
    // Stocker la préférence de thème
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDesignFilters();
    initForms();
    initScrollAnimations();
    initScrollNavigation();
    
    // Animation initiale des skills
    setTimeout(animateSkills, 1000);
    
    // Ajouter le CSS pour les notifications
    const notificationStyles = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification button {
            background: none;
            border: none;
            color: inherit;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-image {
            margin: 1rem 0;
            text-align: center;
        }
        
        .modal-image img {
            max-width: 100%;
            border-radius: 10px;
            border: 1px solid var(--border-color);
        }
        
        .modal-details {
            margin-top: 1.5rem;
        }
        
        .modal-details p {
            margin-bottom: 0.5rem;
            color: var(--text-muted);
        }
        
        .modal-details strong {
            color: var(--text-light);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
});

// Gestion du scroll de la navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 15, 28, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';

        // Fonctions pour le CV
function downloadCV() {
    showNotification('Préparation du téléchargement du CV...', 'success');
    
    // Simulation de téléchargement
    setTimeout(() => {
        // Dans une vraie implémentation, vous utiliseriez une bibliothèque comme jsPDF
        // ou auriez un fichier PDF prêt au téléchargement
        const link = document.createElement('a');
        link.href = 'assets/cv-Dizolele_Isaac.pdf'; // Chemin vers votre PDF
        link.download = 'cv-Dizolele_Isaac.pdf';
        link.click();
    }, 1500);
}

function printCV() {
    const cvContent = document.getElementById('cv-content');
    const originalContents = document.body.innerHTML;
    
    // Créer une version imprimable
    const printContents = cvContent.innerHTML;
    
    document.body.innerHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>CV - Dizolele Isaac</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    color: black; 
                    background: white;
                    padding: 20px;
                }
                .cv-container { 
                    max-width: 1000px; 
                    margin: 0 auto;
                    background: white;
                }
                .cv-header {
                    background: #f0f0f0 !important;
                    color: black !important;
                    padding: 2rem;
                    margin-bottom: 2rem;
                }
                .section-title {
                    color: #00a884 !important;
                    -webkit-text-fill-color: #00a884 !important;
                }
                @media print {
                    body { padding: 0; }
                    .no-print { display: none !important; }
                }
            </style>
        </head>
        <body>
            <div class="cv-container">${printContents}</div>
            <div class="no-print" style="text-align: center; margin-top: 2rem;">
                <button onclick="window.close()">Fermer</button>
                <button onclick="window.print()">Imprimer</button>
            </div>
        </body>
        </html>
    `;
    
    window.print();
    
    // Restaurer le contenu original après l'impression
    setTimeout(() => {
        document.body.innerHTML = originalContents;
        // Réinitialiser les event listeners si nécessaire
        initTheme();
        initDesignFilters();
        initForms();
        initScrollAnimations();
        initScrollNavigation();
    }, 500);
}

// Ajouter le lien CV à la navigation
function addCVToNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    const cvLink = document.createElement('a');
    cvLink.href = '#cv';
    cvLink.className = 'nav-link';
    cvLink.textContent = 'CV';
    cvLink.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
        }
    });
    
    // Insérer avant le lien Contact
    const contactLink = document.querySelector('a[href="#contact"]');
    contactLink.parentNode.insertBefore(cvLink, contactLink);
}

// Initialiser le CV
function initCV() {
    addCVToNavigation();
    
    // Animation des timelines au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observer les éléments de timeline
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// Ajouter l'initialisation du CV au chargement
document.addEventListener('DOMContentLoaded', () => {
    // ... autres initialisations existantes
    initCV(); // Ajouter cette ligne
});