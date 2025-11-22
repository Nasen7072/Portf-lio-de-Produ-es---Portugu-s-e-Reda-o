// ===== FUNÇÃO 1: MENU HAMBURGUER =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active'); // Alterna classe active
});

// Fechar menu ao clicar nos links
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== FUNÇÃO 2: MODAL INTERATIVO =====
const modal = document.getElementById('production-modal');
const closeModal = document.getElementById('close-modal');

// Abrir modal
function openModal(id) {
    const production = productions.find(p => p.id === id);
    if (production) {
        modalTitle.textContent = production.title;
        modalBody.innerHTML = production.content;
        modal.style.display = 'flex'; // Mostra modal
    }
}

// Fechar modal
function closeModalFunc() {
    modal.style.display = 'none'; // Esconde modal
}

// Event listeners para modal
closeModal.addEventListener('click', closeModalFunc);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc(); // Fecha ao clicar fora
    }
});

// ===== FUNÇÃO 3: CONTADORES ANIMADOS =====
function calculateTotals() {
    const totalPages = productions.reduce((sum, production) => sum + production.pages, 0);
    const totalWords = productions.reduce((sum, production) => sum + production.words, 0);
    
    // Anima os contadores
    animateCounter(pageCount, totalPages);
    animateCounter(wordCount, totalWords);
}

// Animação dos números
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20); // Animação de 20ms
}

// ===== FUNÇÃO 4: RENDERIZAÇÃO DINÂMICA =====
function renderProductions() {
    productionsContainer.innerHTML = '';
    
    productions.forEach(production => {
        const card = document.createElement('div');
        card.className = 'production-card';
        card.innerHTML = `
            <img src="${production.image}" alt="${production.title}" class="production-img">
            <div class="production-content">
                <h3>${production.title}</h3>
                <p>${production.description}</p>
                <a href="#" class="read-more" data-id="${production.id}">Ler mais</a>
            </div>
        `;
        productionsContainer.appendChild(card);
    });
    
    // Adiciona event listeners dinamicamente
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.getAttribute('data-id'));
            openModal(id); // Abre modal com dados específicos
        });
    });
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    renderProductions();    // Renderiza produções
    calculateTotals();      // Inicia contadores
});
