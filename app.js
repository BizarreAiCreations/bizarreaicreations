// Abdülkadir Altınel Sigorta - Interactive JavaScript
// Corporate Edition with Advanced Features

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// ==================== DARK MODE ====================
const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkModeToggleMobile = document.getElementById('dark-mode-toggle-mobile');
const body = document.body;

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    updateDarkModeIcons();
}

function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
    
    updateDarkModeIcons();
}

function updateDarkModeIcons() {
    const isDark = body.classList.contains('dark-mode');
    const iconClass = isDark ? 'fa-sun' : 'fa-moon';
    
    if (darkModeToggle) {
        darkModeToggle.querySelector('i').className = `fas ${iconClass} text-gray-700`;
    }
    if (darkModeToggleMobile) {
        darkModeToggleMobile.querySelector('i').className = `fas ${iconClass} text-gray-700`;
    }
}

darkModeToggle?.addEventListener('click', toggleDarkMode);
darkModeToggleMobile?.addEventListener('click', toggleDarkMode);

// ==================== BUSINESS HOURS STATUS ====================
function updateBusinessStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    
    // Business hours: Monday-Friday (1-5), 09:00-18:00
    const isWeekday = day >= 1 && day <= 5;
    const openTime = 9 * 60; // 09:00 (9:00 AM)
    const closeTime = 18 * 60; // 18:00 (6:00 PM)
    const isOpen = isWeekday && currentTime >= openTime && currentTime < closeTime;
    
    const statusBadge = document.getElementById('status-badge');
    const statusBadgeMobile = document.getElementById('status-badge-mobile');
    const statusText = document.getElementById('status-text');
    const statusTextMobile = document.getElementById('status-text-mobile');
    
    if (isOpen) {
        // Open status
        statusBadge?.classList.remove('status-closed');
        statusBadge?.classList.add('status-open');
        statusBadgeMobile?.classList.remove('status-closed');
        statusBadgeMobile?.classList.add('status-open');
        
        if (statusText) statusText.textContent = 'Şu an Açığız';
        if (statusTextMobile) statusTextMobile.textContent = 'Şu an Açığız';
    } else {
        // Closed status
        statusBadge?.classList.remove('status-open');
        statusBadge?.classList.add('status-closed');
        statusBadgeMobile?.classList.remove('status-open');
        statusBadgeMobile?.classList.add('status-closed');
        
        if (statusText) statusText.textContent = 'Mesai Dışı';
        if (statusTextMobile) statusTextMobile.textContent = 'Mesai Dışı';
    }
}

// Update status immediately and every minute
updateBusinessStatus();
setInterval(updateBusinessStatus, 60000);

// ==================== MOBILE MENU ====================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn?.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==================== STATS COUNTER ANIMATION ====================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('tr-TR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('tr-TR');
        }
    }, 16);
}

// Intersection Observer for Stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (stat.textContent === '0') {
                    animateCounter(stat);
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stat-number')?.closest('section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==================== FLOATING ACTION BUTTON (FAB) ====================
const fabMain = document.getElementById('fab-main');
const fabMenu = document.getElementById('fab-menu');
const fabIcon = document.getElementById('fab-icon');
let fabOpen = false;

fabMain?.addEventListener('click', function() {
    fabOpen = !fabOpen;
    
    if (fabOpen) {
        fabMenu.classList.add('active');
        fabIcon.classList.remove('fa-plus');
        fabIcon.classList.add('fa-times');
        fabIcon.style.transform = 'rotate(135deg)';
    } else {
        fabMenu.classList.remove('active');
        fabIcon.classList.remove('fa-times');
        fabIcon.classList.add('fa-plus');
        fabIcon.style.transform = 'rotate(0deg)';
    }
});

// Close FAB menu when clicking outside
document.addEventListener('click', function(event) {
    const fabContainer = document.querySelector('.fab-container');
    if (fabOpen && !fabContainer.contains(event.target)) {
        fabMenu.classList.remove('active');
        fabIcon.classList.remove('fa-times');
        fabIcon.classList.add('fa-plus');
        fabIcon.style.transform = 'rotate(0deg)';
        fabOpen = false;
    }
});

// ==================== CHAT WIDGET ====================
const chatToggle = document.getElementById('chat-toggle');
const chatWidget = document.getElementById('chat-widget');
const chatClose = document.getElementById('chat-close');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatBody = document.getElementById('chat-body');

chatToggle?.addEventListener('click', function(e) {
    e.stopPropagation();
    chatWidget.classList.add('active');
    // Close FAB menu
    fabMenu.classList.remove('active');
    fabIcon.classList.remove('fa-times');
    fabIcon.classList.add('fa-plus');
    fabIcon.style.transform = 'rotate(0deg)';
    fabOpen = false;
});

chatClose?.addEventListener('click', function() {
    chatWidget.classList.remove('active');
});

// Chat quick replies
document.querySelectorAll('.chat-quick-reply').forEach(button => {
    button.addEventListener('click', function() {
        const message = this.textContent.trim();
        addChatMessage(message, 'user');
        
        // Simulate bot response
        setTimeout(() => {
            let response = '';
            if (message.includes('Kasko')) {
                response = 'Kasko sigortası için size en uygun teklifi hazırlayabilirim. Araç plakası ve model yılını paylaşır mısınız?';
            } else if (message.includes('Sağlık')) {
                response = 'Özel sağlık sigortası için size yardımcı olabilirim. Kaç kişi için sigorta düşünüyorsunuz?';
            } else if (message.includes('Konut')) {
                response = 'Konut sigortası için en uygun paketi bulalım. Konutunuz hangi ilde ve kaç metrekare?';
            } else if (message.includes('Temsilci')) {
                response = 'Hemen temsilcimize bağlayalım! <a href="tel:+902122726657" class="text-primary font-semibold">+90 212 272 66 57</a> numarasından bizi arayabilir veya <a href="https://wa.me/905445726657" class="text-primary font-semibold">WhatsApp</a> üzerinden ulaşabilirsiniz.';
            }
            addChatMessage(response, 'bot');
        }, 1000);
    });
});

// Chat form submission
chatForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    const message = chatInput.value.trim();
    
    if (message) {
        addChatMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const response = 'Mesajınız için teşekkürler! Bir temsilcimiz en kısa sürede size dönüş yapacaktır. WhatsApp üzerinden daha hızlı yanıt almak için: <a href="https://wa.me/905445726657" class="text-primary font-semibold">Buraya tıklayın</a>';
            addChatMessage(response, 'bot');
        }, 1000);
    }
});

function addChatMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'chat-avatar';
    avatar.innerHTML = type === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = `<p class="text-sm">${message}</p>`;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
    
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    formMessage.classList.remove('hidden');
    formMessage.className = 'mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-700';
    formMessage.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-spinner fa-spin mr-3"></i>
            <span>Mesajınız gönderiliyor...</span>
        </div>
    `;
    
    // TODO: Replace with actual API call
    // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
    
    // Mock response
    setTimeout(() => {
        formMessage.className = 'mt-4 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700';
        formMessage.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-check-circle mr-3"></i>
                <span>Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</span>
            </div>
        `;
        this.reset();
        
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }, 1500);
});

// ==================== NEWSLETTER FORM ====================
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');

newsletterForm?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const email = formData.get('newsletter-email');
    
    newsletterMessage.classList.remove('hidden');
    newsletterMessage.className = 'mt-3 text-sm text-blue-400';
    newsletterMessage.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Kaydediliyor...';
    
    // TODO: Replace with actual API call
    // Example: await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
    
    // Mock response
    setTimeout(() => {
        newsletterMessage.className = 'mt-3 text-sm text-green-400';
        newsletterMessage.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Başarıyla abone oldunuz!';
        this.reset();
        
        setTimeout(() => {
            newsletterMessage.classList.add('hidden');
        }, 5000);
    }, 1500);
});

// ==================== GDPR COOKIE BANNER ====================
const gdprBanner = document.getElementById('gdpr-banner');
const gdprAccept = document.getElementById('gdpr-accept');
const gdprDecline = document.getElementById('gdpr-decline');

// Check if user has already accepted/declined cookies
if (!localStorage.getItem('gdprConsent')) {
    setTimeout(() => {
        gdprBanner.classList.add('active');
    }, 2000);
}

gdprAccept?.addEventListener('click', function() {
    localStorage.setItem('gdprConsent', 'accepted');
    gdprBanner.classList.remove('active');
    
    // Initialize analytics or other tracking here
    console.log('GDPR Consent: Accepted');
});

gdprDecline?.addEventListener('click', function() {
    localStorage.setItem('gdprConsent', 'declined');
    gdprBanner.classList.remove('active');
    
    console.log('GDPR Consent: Declined');
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== CONSOLE BRANDING ====================
console.log('%c🛡️ Abdülkadir Altınel Sigorta', 'color: #B91C1C; font-size: 24px; font-weight: bold;');
console.log('%cCorporate Edition - 2024', 'color: #6B7280; font-size: 14px;');
console.log('%c\nBackend Integration Points:', 'color: #0F172A; font-size: 16px; font-weight: bold;');
console.log('1. POST /api/contact - Contact form submission');
console.log('2. POST /api/newsletter - Newsletter subscription');
console.log('3. POST /api/chat - Chat message handling');
console.log('4. GET /api/business-hours - Dynamic business hours (optional)');

