/**
 * ============================================
 * KHIMI DELICIAS - SCRIPT PRINCIPAL
 * ============================================
 * Funcionalidades:
 * - Carregamento de produtos
 * - Sistema de idiomas (PT/EN)
 * - Modal de produto
 * - Carregar mais produtos
 * - Integração WhatsApp
 * ============================================
 */

// ============================================
// CONFIGURAÇÕES
// ============================================
const CONFIG = {
  // Número WhatsApp
  whatsappNumber: '258842644335',
  
  // Produtos por carga inicial
  initialLoad: 12,
  
  // Produtos por carga adicional
  loadMoreCount: 8,
  
  // Máximo de produtos por categoria
  maxProducts: 50,
  
  // Idioma padrão
  defaultLang: 'pt'
};

// ============================================
// TRADUÇÕES
// ============================================
const TRANSLATIONS = {
  pt: {
    menu: {
      bolos: 'Bolos',
      doces: 'Doces',
      novidades: 'Novidades',
      contacto: 'Contacto'
    },
    hero: {
      subtitle: 'Confeitaria Artesanal',
      title: 'Khimi Delícias',
      description: 'Bolos, doces e novidades feitos com amor e dedicação. Cada criação é uma obra de arte comestível, preparada especialmente para você.',
      cta1: 'Ver Produtos',
      cta2: 'Encomendar'
    },
    sections: {
      bolos: {
        tag: 'Nossos',
        title: 'Bolos',
        description: 'Bolos artesanais feitos com ingredientes selecionados e muito carinho.'
      },
      doces: {
        tag: 'Deliciosos',
        title: 'Doces',
        description: 'Brigadeiros, trufas, cookies e muito mais para adoçar seu dia.'
      },
      novidades: {
        tag: 'Lançamentos',
        title: 'Novidades',
        description: 'As últimas criações da Khimi Delícias. Experimente algo novo!'
      },
      about: {
        tag: 'Sobre',
        title: 'Khimi Delícias',
        text1: 'Somos uma confeitaria artesanal localizada em Matola Liberdade, dedicada a criar momentos doces e memoráveis para nossos clientes.',
        text2: 'Cada produto é feito com ingredientes de qualidade, muito amor e atenção aos detalhes. Seja para uma ocasião especial ou apenas para se presentear, estamos aqui para adoçar seu dia.',
        owner: 'Confeiteira & Fundadora'
      },
      contact: {
        title: 'Contacto',
        address: 'Matola Liberdade, Rua de Maputo n° 333',
        hours: 'Seg - Sáb: 8h às 18h'
      },
      payment: {
        title: 'Pagamentos'
      },
      social: {
        title: 'Redes Sociais'
      }
    },
    buttons: {
      loadMore: 'Carregar mais'
    },
    modal: {
      size: 'Tamanho:',
      flavor: 'Sabor:',
      whatsapp: 'Pedir via WhatsApp',
      info: 'Pedir informações'
    },
    whatsapp: {
      tooltip: 'Fale connosco'
    },
    footer: {
      slogan: 'Doçura em cada mordida',
      rights: 'Todos os direitos reservados.'
    }
  },
  en: {
    menu: {
      bolos: 'Cakes',
      doces: 'Sweets',
      novidades: 'New Arrivals',
      contacto: 'Contact'
    },
    hero: {
      subtitle: 'Artisan Confectionery',
      title: 'Khimi Delícias',
      description: 'Cakes, sweets and new arrivals made with love and dedication. Each creation is an edible work of art, prepared especially for you.',
      cta1: 'View Products',
      cta2: 'Order Now'
    },
    sections: {
      bolos: {
        tag: 'Our',
        title: 'Cakes',
        description: 'Artisan cakes made with selected ingredients and lots of care.'
      },
      doces: {
        tag: 'Delicious',
        title: 'Sweets',
        description: 'Brigadeiros, truffles, cookies and more to sweeten your day.'
      },
      novidades: {
        tag: 'New Releases',
        title: 'New Arrivals',
        description: 'The latest creations from Khimi Delícias. Try something new!'
      },
      about: {
        tag: 'About',
        title: 'Khimi Delícias',
        text1: 'We are an artisan confectionery located in Matola Liberdade, dedicated to creating sweet and memorable moments for our customers.',
        text2: 'Each product is made with quality ingredients, lots of love and attention to detail. Whether for a special occasion or just to treat yourself, we are here to sweeten your day.',
        owner: 'Pastry Chef & Founder'
      },
      contact: {
        title: 'Contact',
        address: 'Matola Liberdade, Maputo Street n° 333',
        hours: 'Mon - Sat: 8am to 6pm'
      },
      payment: {
        title: 'Payment Methods'
      },
      social: {
        title: 'Social Media'
      }
    },
    buttons: {
      loadMore: 'Load more'
    },
    modal: {
      size: 'Size:',
      flavor: 'Flavor:',
      whatsapp: 'Order via WhatsApp',
      info: 'Request information'
    },
    whatsapp: {
      tooltip: 'Talk to us'
    },
    footer: {
      slogan: 'Sweetness in every bite',
      rights: 'All rights reserved.'
    }
  }
};

// ============================================
// ESTADO DA APLICAÇÃO
// ============================================
const state = {
  // Idioma atual
  currentLang: CONFIG.defaultLang,
  
  // Contadores de produtos por categoria
  productCounts: {
    bolos: 0,
    doces: 0,
    novidades: 0
  },
  
  // Produto atual no modal
  currentProduct: null,
  
  // Opções selecionadas no modal
  selectedOptions: {
    size: null,
    flavor: null
  }
};

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

/**
 * Obtém produtos por categoria
 */
function getProductsByCategory(category) {
  return PRODUTOS.filter(p => p.categoria === category);
}

/**
 * Obtém um produto pelo slug
 */
function getProductBySlug(slug) {
  return PRODUTOS.find(p => p.slug === slug);
}

/**
 * Obtém um produto pelo ID
 */
function getProductById(id) {
  return PRODUTOS.find(p => p.id === id);
}

/**
 * Formata o preço
 */
function formatPrice(price) {
  return price;
}

/**
 * Obtém o texto traduzido
 */
function getText(key) {
  const keys = key.split('.');
  let value = TRANSLATIONS[state.currentLang];
  
  for (const k of keys) {
    if (value && value[k] !== undefined) {
      value = value[k];
    } else {
      return key;
    }
  }
  
  return value;
}

// ============================================
// SISTEMA DE IDIOMAS
// ============================================

/**
 * Alterna o idioma
 */
function toggleLanguage() {
  state.currentLang = state.currentLang === 'pt' ? 'en' : 'pt';
  updateLanguage();
  saveLanguagePreference();
}

/**
 * Atualiza todos os textos da página
 */
function updateLanguage() {
  // Atualiza botão de idioma
  const langBtn = document.getElementById('langBtn');
  if (langBtn) {
    langBtn.querySelector('.lang-current').textContent = state.currentLang.toUpperCase();
  }
  
  // Atualiza todos os elementos com data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const text = getText(key);
    
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.placeholder = text;
    } else {
      element.textContent = text;
    }
  });
  
  // Recarrega os produtos para atualizar nomes
  loadAllCategories();
}

/**
 * Salva preferência de idioma
 */
function saveLanguagePreference() {
  localStorage.setItem('khimi-lang', state.currentLang);
}

/**
 * Carrega preferência de idioma
 */
function loadLanguagePreference() {
  const saved = localStorage.getItem('khimi-lang');
  if (saved && TRANSLATIONS[saved]) {
    state.currentLang = saved;
    updateLanguage();
  }
}

// ============================================
// CARREGAMENTO DE PRODUTOS
// ============================================

/**
 * Cria o HTML de um card de produto
 */
function createProductCard(product) {
  const name = state.currentLang === 'pt' ? product.nome_pt : product.nome_en;
  const description = state.currentLang === 'pt' ? product.descricao_pt : product.descricao_en;
  const isNew = product.categoria === 'novidades';
  
  return `
    <article class="product-card" data-id="${product.id}" data-slug="${product.slug}" onclick="openProductModal('${product.slug}')">
      <div class="product-image">
        <img src="${product.imagens[0]}" alt="${name}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
        ${isNew ? '<span class="product-badge">NOVIDADE</span>' : ''}
      </div>
      <div class="product-info">
        <span class="product-category">${product.categoria}</span>
        <h3 class="product-name">${name}</h3>
        <p class="product-price">${product.preco}</p>
      </div>
    </article>
  `;
}

/**
 * Carrega produtos de uma categoria
 */
function loadProducts(category, containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const products = getProductsByCategory(category);
  const currentCount = state.productCounts[category];
  const endIndex = Math.min(currentCount + count, products.length, CONFIG.maxProducts);
  
  // Limpa o container se for a primeira carga
  if (currentCount === 0) {
    container.innerHTML = '';
  }
  
  // Adiciona os produtos
  for (let i = currentCount; i < endIndex; i++) {
    const product = products[i];
    const cardHTML = createProductCard(product);
    container.insertAdjacentHTML('beforeend', cardHTML);
  }
  
  // Atualiza o contador
  state.productCounts[category] = endIndex;
  
  // Verifica se deve esconder o botão "Carregar mais"
  const loadMoreBtn = document.querySelector(`.load-more-btn[data-category="${category}"]`);
  if (loadMoreBtn) {
    if (endIndex >= products.length || endIndex >= CONFIG.maxProducts) {
      loadMoreBtn.classList.add('hidden');
    } else {
      loadMoreBtn.classList.remove('hidden');
    }
  }
}

/**
 * Carrega todas as categorias
 */
function loadAllCategories() {
  // Reseta os contadores
  state.productCounts = {
    bolos: 0,
    doces: 0,
    novidades: 0
  };
  
  // Carrega cada categoria
  loadProducts('bolos', 'bolosGrid', CONFIG.initialLoad);
  loadProducts('doces', 'docesGrid', CONFIG.initialLoad);
  loadProducts('novidades', 'novidadesGrid', CONFIG.initialLoad);
}

/**
 * Carrega mais produtos de uma categoria
 */
function loadMore(category) {
  const containerId = `${category}Grid`;
  loadProducts(category, containerId, CONFIG.loadMoreCount);
}

// ============================================
// MODAL DO PRODUTO
// ============================================

/**
 * Abre o modal do produto
 */
function openProductModal(slug) {
  const product = getProductBySlug(slug);
  if (!product) return;
  
  state.currentProduct = product;
  
  // Reseta opções selecionadas
  state.selectedOptions = {
    size: product.tamanhos ? product.tamanhos[0] : null,
    flavor: product.sabores ? product.sabores[0] : null
  };
  
  // Preenche o modal
  fillModal(product);
  
  // Abre o modal
  const modal = document.getElementById('productModal');
  modal.classList.add('active');
  
  // Previne scroll do body
  document.body.style.overflow = 'hidden';
  
  // Atualiza URL
  history.pushState({ product: slug }, '', `#produto/${slug}`);
}

/**
 * Fecha o modal
 */
function closeModal() {
  const modal = document.getElementById('productModal');
  modal.classList.remove('active');
  
  // Restaura scroll do body
  document.body.style.overflow = '';
  
  // Limpa o hash da URL
  history.pushState(null, '', window.location.pathname + window.location.search);
}

/**
 * Preenche o modal com dados do produto
 */
function fillModal(product) {
  const name = state.currentLang === 'pt' ? product.nome_pt : product.nome_en;
  const description = state.currentLang === 'pt' ? product.descricao_pt : product.descricao_en;
  
  // Imagem principal
  const mainImage = document.getElementById('modalMainImage');
  mainImage.src = product.imagens[0];
  mainImage.alt = name;
  
  // Miniaturas
  const thumbnailsContainer = document.getElementById('modalThumbnails');
  thumbnailsContainer.innerHTML = product.imagens.map((img, index) => `
    <div class="modal-thumbnail ${index === 0 ? 'active' : ''}" onclick="changeModalImage('${img}', this)">
      <img src="${img}" alt="${name} - ${index + 1}" onerror="this.src='images/placeholder.jpg'">
    </div>
  `).join('');
  
  // Informações
  document.getElementById('modalCategory').textContent = product.categoria;
  document.getElementById('modalTitle').textContent = name;
  document.getElementById('modalPrice').textContent = product.preco;
  document.getElementById('modalDescription').textContent = description;
  
  // Tamanhos
  const sizeContainer = document.getElementById('sizeButtons');
  const sizeOption = document.getElementById('sizeOption');
  
  if (product.tamanhos && product.tamanhos.length > 0) {
    sizeOption.style.display = 'block';
    sizeContainer.innerHTML = product.tamanhos.map((size, index) => `
      <button class="option-btn ${index === 0 ? 'active' : ''}" onclick="selectOption('size', '${size}', this)">
        ${size}
      </button>
    `).join('');
  } else {
    sizeOption.style.display = 'none';
  }
  
  // Sabores
  const flavorContainer = document.getElementById('flavorButtons');
  const flavorOption = document.getElementById('flavorOption');
  
  if (product.sabores && product.sabores.length > 0) {
    flavorOption.style.display = 'block';
    flavorContainer.innerHTML = product.sabores.map((flavor, index) => `
      <button class="option-btn ${index === 0 ? 'active' : ''}" onclick="selectOption('flavor', '${flavor}', this)">
        ${flavor}
      </button>
    `).join('');
  } else {
    flavorOption.style.display = 'none';
  }
  
  // Atualiza link do WhatsApp
  updateWhatsAppLink();
}

/**
 * Muda a imagem do modal
 */
function changeModalImage(src, thumbnail) {
  const mainImage = document.getElementById('modalMainImage');
  mainImage.src = src;
  
  // Atualiza classe ativa
  document.querySelectorAll('.modal-thumbnail').forEach(t => t.classList.remove('active'));
  thumbnail.classList.add('active');
}

/**
 * Seleciona uma opção (tamanho ou sabor)
 */
function selectOption(type, value, button) {
  state.selectedOptions[type] = value;
  
  // Atualiza classe ativa
  const container = type === 'size' ? document.getElementById('sizeButtons') : document.getElementById('flavorButtons');
  container.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  
  // Atualiza link do WhatsApp
  updateWhatsAppLink();
}

/**
 * Atualiza o link do WhatsApp
 */
function updateWhatsAppLink() {
  const product = state.currentProduct;
  if (!product) return;
  
  const name = state.currentLang === 'pt' ? product.nome_pt : product.nome_en;
  const url = window.location.href;
  const size = state.selectedOptions.size || '-';
  const flavor = state.selectedOptions.flavor || '-';
  
  let message;
  if (state.currentLang === 'pt') {
    message = `Olá, gostaria de encomendar este produto:\nNome: ${name}\nLink: ${url}\nTamanho: ${size}\nSabor: ${flavor}`;
  } else {
    message = `Hello, I would like to order this product:\nName: ${name}\nLink: ${url}\nSize: ${size}\nFlavor: ${flavor}`;
  }
  
  const whatsappBtn = document.getElementById('whatsappBtn');
  whatsappBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// ============================================
// NAVEGAÇÃO E MENU
// ============================================

/**
 * Toggle do menu mobile
 */
function toggleMobileMenu() {
  const menu = document.getElementById('navMenu');
  const toggle = document.getElementById('menuToggle');
  
  menu.classList.toggle('active');
  toggle.classList.toggle('active');
}

/**
 * Fecha o menu mobile
 */
function closeMobileMenu() {
  const menu = document.getElementById('navMenu');
  const toggle = document.getElementById('menuToggle');
  
  menu.classList.remove('active');
  toggle.classList.remove('active');
}

/**
 * Adiciona classe ao header ao scrollar
 */
function handleScroll() {
  const header = document.getElementById('header');
  
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// ============================================
// INICIALIZAÇÃO
// ============================================

/**
 * Verifica URL para abrir produto diretamente
 */
function checkUrlForProduct() {
  const hash = window.location.hash;
  
  if (hash.startsWith('#produto/')) {
    const slug = hash.replace('#produto/', '');
    const product = getProductBySlug(slug);
    
    if (product) {
      setTimeout(() => openProductModal(slug), 500);
    }
  }
}

/**
 * Inicializa todos os event listeners
 */
function initEventListeners() {
  // Menu mobile
  document.getElementById('menuToggle').addEventListener('click', toggleMobileMenu);
  
  // Fechar menu ao clicar em um link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Troca de idioma
  document.getElementById('langBtn').addEventListener('click', toggleLanguage);
  
  // Botões "Carregar mais"
  document.querySelectorAll('.load-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.category;
      loadMore(category);
    });
  });
  
  // Fechar modal
  document.querySelector('.modal-close').addEventListener('click', closeModal);
  document.querySelector('.modal-overlay').addEventListener('click', closeModal);
  
  // Fechar modal com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  
  // Scroll do header
  window.addEventListener('scroll', handleScroll);
  
  // Voltar no histórico
  window.addEventListener('popstate', (e) => {
    if (!e.state || !e.state.product) {
      closeModal();
    }
  });
}

/**
 * Inicializa a aplicação
 */
function init() {
  // Carrega preferência de idioma
  loadLanguagePreference();
  
  // Carrega os produtos
  loadAllCategories();
  
  // Inicializa event listeners
  initEventListeners();
  
  // Verifica URL
  checkUrlForProduct();
  
  // Scroll inicial
  handleScroll();
  
  console.log('🧁 Khimi Delícias - Site carregado com sucesso!');
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);
