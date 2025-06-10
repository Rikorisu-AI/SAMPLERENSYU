document.addEventListener('DOMContentLoaded', function() {
  // Material Design Componentsの初期化
  initializeMDC();
  
  // スムーズスクロールの設定
  setupSmoothScroll();
  
  // FAQアコーディオンの設定
  setupFAQAccordion();
  
  // モバイルメニューの設定
  setupMobileMenu();
  
  // スクロールアニメーションの設定
  setupScrollAnimations();
  
  // フォーム送信の処理
  setupFormSubmission();
});

/**
 * Material Design Componentsの初期化
 */
function initializeMDC() {
  // トップアプリバーの初期化
  const topAppBarElement = document.querySelector('.mdc-top-app-bar');
  if (topAppBarElement) {
    const topAppBar = new mdc.topAppBar.MDCTopAppBar(topAppBarElement);
  }
  
  // ボタンの初期化
  const buttons = document.querySelectorAll('.mdc-button');
  buttons.forEach(button => {
    new mdc.ripple.MDCRipple(button);
  });
  
  // カードの初期化
  const cards = document.querySelectorAll('.mdc-card__primary-action');
  cards.forEach(card => {
    new mdc.ripple.MDCRipple(card);
  });
}

/**
 * スムーズスクロールの設定
 */
function setupSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const headerOffset = 64; // ヘッダーの高さ
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/**
 * FAQアコーディオンの設定
 */
function setupFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('h3');
    const answer = item.querySelector('p');
    
    // 初期状態では回答を隠す
    if (answer) {
      answer.style.display = 'none';
    }
    
    if (question) {
      // アイコンを追加
      question.innerHTML += '<i class="material-icons faq-icon">expand_more</i>';
      
      question.addEventListener('click', function() {
        // アクティブクラスの切り替え
        this.classList.toggle('active');
        
        // アイコンの切り替え
        const icon = this.querySelector('.faq-icon');
        if (icon) {
          icon.textContent = this.classList.contains('active') ? 'expand_less' : 'expand_more';
        }
        
        // 回答の表示/非表示
        if (answer) {
          answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        }
      });
    }
  });
}

/**
 * モバイルメニューの設定
 */
function setupMobileMenu() {
  // モバイルメニューボタンの追加
  const header = document.querySelector('.mdc-top-app-bar__section--align-end');
  const nav = document.querySelector('.header-nav');
  
  if (header && nav) {
    const menuButton = document.createElement('button');
    menuButton.className = 'mdc-icon-button material-icons mobile-menu-button';
    menuButton.textContent = 'menu';
    
    // 小さい画面のみで表示
    menuButton.style.display = 'none';
    
    header.insertBefore(menuButton, nav);
    
    // メニューボタンのイベントリスナー
    menuButton.addEventListener('click', function() {
      nav.classList.toggle('open');
      this.textContent = nav.classList.contains('open') ? 'close' : 'menu';
    });
    
    // ウィンドウサイズ変更時の処理
    window.addEventListener('resize', function() {
      if (window.innerWidth <= 768) {
        menuButton.style.display = 'block';
        nav.classList.remove('open');
        menuButton.textContent = 'menu';
      } else {
        menuButton.style.display = 'none';
        nav.classList.remove('open');
      }
    });
    
    // 初期状態の設定
    if (window.innerWidth <= 768) {
      menuButton.style.display = 'block';
    }
  }
}

/**
 * スクロールアニメーションの設定
 */
function setupScrollAnimations() {
  // アニメーション対象の要素
  const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .faq-item, .cta-card');
  
  // Intersection Observerの設定
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  // 要素の監視を開始
  animatedElements.forEach(element => {
    element.classList.add('will-animate');
    observer.observe(element);
  });
}

/**
 * フォーム送信の処理
 */
function setupFormSubmission() {
  // お問い合わせボタンのイベントリスナー
  const contactButtons = document.querySelectorAll('button:contains("お問い合わせ")');
  
  contactButtons.forEach(button => {
    button.addEventListener('click', function() {
      showContactModal();
    });
  });
  
  // 「今すぐ始める」「無料で試す」ボタンのイベントリスナー
  const startButtons = document.querySelectorAll('button:contains("今すぐ始める"), button:contains("無料で試す")');
  
  startButtons.forEach(button => {
    button.addEventListener('click', function() {
      showSignupModal();
    });
  });
}

/**
 * お問い合わせモーダルの表示
 */
function showContactModal() {
  // モーダルの作成
  const modal = createModal('お問い合わせ', createContactForm());
  
  // モーダルを表示
  document.body.appendChild(modal);
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

/**
 * サインアップモーダルの表示
 */
function showSignupModal() {
  // モーダルの作成
  const modal = createModal('アカウント登録', createSignupForm());
  
  // モーダルを表示
  document.body.appendChild(modal);
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

/**
 * モーダルの作成
 */
function createModal(title, content) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${title}</h2>
        <button class="modal-close material-icons">close</button>
      </div>
      <div class="modal-body">
        ${content}
      </div>
    </div>
  `;
  
  // 閉じるボタンのイベントリスナー
  const closeButton = modal.querySelector('.modal-close');
  closeButton.addEventListener('click', function() {
    closeModal(modal);
  });
  
  // モーダル外クリックで閉じる
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
  
  return modal;
}

/**
 * モーダルを閉じる
 */
function closeModal(modal) {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.remove();
  }, 300);
}

/**
 * お問い合わせフォームの作成
 */
function createContactForm() {
  return `
    <form id="contact-form" class="form">
      <div class="form-group">
        <label for="name">お名前</label>
        <input type="text" id="name" name="name" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="email">メールアドレス</label>
        <input type="email" id="email" name="email" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="company">会社名</label>
        <input type="text" id="company" name="company" class="form-control">
      </div>
      <div class="form-group">
        <label for="message">お問い合わせ内容</label>
        <textarea id="message" name="message" class="form-control" rows="5" required></textarea>
      </div>
      <button type="submit" class="mdc-button mdc-button--raised primary-button">
        <span class="mdc-button__label">送信する</span>
      </button>
    </form>
  `;
}

/**
 * サインアップフォームの作成
 */
function createSignupForm() {
  return `
    <form id="signup-form" class="form">
      <div class="form-group">
        <label for="signup-name">お名前</label>
        <input type="text" id="signup-name" name="name" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="signup-email">メールアドレス</label>
        <input type="email" id="signup-email" name="email" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="signup-password">パスワード</label>
        <input type="password" id="signup-password" name="password" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="signup-password-confirm">パスワード（確認）</label>
        <input type="password" id="signup-password-confirm" name="password_confirm" class="form-control" required>
      </div>
      <div class="form-check">
        <input type="checkbox" id="terms" name="terms" class="form-check-input" required>
        <label for="terms" class="form-check-label">利用規約に同意します</label>
      </div>
      <button type="submit" class="mdc-button mdc-button--raised primary-button">
        <span class="mdc-button__label">アカウント作成</span>
      </button>
    </form>
  `;
}

/**
 * CSSの追加（モーダル用）
 */
function addModalStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s, visibility 0.3s;
    }
    
    .modal.show {
      opacity: 1;
      visibility: visible;
    }
    
    .modal-content {
      background-color: white;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transform: translateY(20px);
      transition: transform 0.3s;
    }
    
    .modal.show .modal-content {
      transform: translateY(0);
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid #eee;
    }
    
    .modal-close {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 24px;
      color: #666;
    }
    
    .modal-body {
      padding: 24px;
    }
    
    .form-group {
      margin-bottom: 16px;
    }
    
    .form-control {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    
    .form-check {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .form-check-input {
      margin-right: 8px;
    }
    
    /* モバイルメニュー用スタイル */
    @media (max-width: 768px) {
      .header-nav {
        position: absolute;
        top: 64px;
        right: 0;
        background-color: white;
        width: 200px;
        flex-direction: column;
        padding: 16px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform 0.3s;
        z-index: 100;
      }
      
      .header-nav.open {
        transform: translateX(0);
      }
      
      .header-nav .mdc-button {
        margin: 8px 0;
        width: 100%;
        justify-content: flex-start;
      }
    }
    
    /* アニメーション用スタイル */
    .will-animate {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s, transform 0.5s;
    }
    
    .animate {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* FAQアコーディオン用スタイル */
    .faq-item h3 {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .faq-icon {
      transition: transform 0.3s;
    }
    
    .faq-item h3.active .faq-icon {
      transform: rotate(180deg);
    }
  `;
  
  document.head.appendChild(style);
}

// モーダル用のスタイルを追加
addModalStyles();

// ユーティリティ関数: テキストを含むボタンを選択
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

if (!HTMLCollection.prototype.forEach) {
  HTMLCollection.prototype.forEach = Array.prototype.forEach;
}

// :contains セレクタの代替
document.querySelectorAll = function(selector) {
  if (selector.includes(':contains')) {
    const parts = selector.split(':contains');
    const baseSelector = parts[0];
    const textContent = parts[1].replace(/['"()]/g, '');
    
    const elements = document.querySelectorAll(baseSelector);
    const result = [];
    
    elements.forEach(element => {
      if (element.textContent.includes(textContent)) {
        result.push(element);
      }
    });
    
    return result;
  } else {
    return document.querySelectorAll(selector);
  }
}; 