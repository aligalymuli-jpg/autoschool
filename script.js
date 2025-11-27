document.addEventListener("DOMContentLoaded", () => {
    // === Показать ещё товары ===
    const showMoreBtn = document.getElementById("showMoreBtn");
    const extraProducts = document.getElementById("extraProducts");

    if (showMoreBtn && extraProducts) {
        showMoreBtn.addEventListener("click", () => {
            extraProducts.classList.toggle("hidden");
            showMoreBtn.textContent =
                extraProducts.classList.contains("hidden") ? "Показать ещё" : "Скрыть";
        });
    }

    // === Классы для корзины ===
    class Product {
        constructor(name, price) {
            this.name = name;
            this.price = price;
            this.quantity = 1;
        }
    }

    class Cart {
        constructor() {
            this.items = [];
        }

        add(product) {
            const existing = this.items.find(item => item.name === product.name);
            if (existing) {
                existing.quantity++;
            } else {
                this.items.push(product);
            }
            this.render();
        }

        remove(productName) {
            this.items = this.items.filter(item => item.name !== productName);
            this.render();
        }

        updateQuantity(productName, qty) {
            const item = this.items.find(item => item.name === productName);
            if (item) item.quantity = qty;
            this.render();
        }

        getTotal() {
            return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }

        render() {
            const cartContainer = document.getElementById("cart");
            if (!cartContainer) return;
            cartContainer.innerHTML = "<h2>Корзина</h2>";
            if (this.items.length === 0) {
                cartContainer.innerHTML += "<p>Корзина пуста</p>";
                return;
            }
            this.items.forEach(item => {
                const div = document.createElement("div");
                div.style.display = "flex";
                div.style.justifyContent = "space-between";
                div.style.alignItems = "center";
                div.style.margin = "8px 0";

                div.innerHTML = `
                    <span>${item.name} x${item.quantity} - ${item.price * item.quantity} ₸</span>
                    <input type="number" min="1" value="${item.quantity}" style="width:50px;">
                    <button style="background:#ff5722;color:white;border:none;padding:5px 10px;border-radius:5px;">Удалить</button>
                `;

                const input = div.querySelector("input");
                input.addEventListener("change", () => {
                    const val = parseInt(input.value);
                    if (val > 0) this.updateQuantity(item.name, val);
                });

                const removeBtn = div.querySelector("button");
                removeBtn.addEventListener("click", () => {
                    this.remove(item.name);
                });

                cartContainer.appendChild(div);
            });

            const totalDiv = document.createElement("div");
            totalDiv.style.marginTop = "10px";
            totalDiv.style.fontWeight = "bold";
            totalDiv.textContent = `Итого: ${this.getTotal()} ₸`;
            cartContainer.appendChild(totalDiv);
        }
    }

    const cart = new Cart();

    // === Кнопки купить ===
    const buyButtons = document.querySelectorAll(".buy-btn");
    buyButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".card");
            const name = card.querySelector("h3").textContent;
            const priceText = card.querySelector("strong") ? card.querySelector("strong").textContent : "0";
            const price = parseInt(priceText.replace(/\D/g, ""));
            const product = new Product(name, price);
            cart.add(product);
            alert(`${name} добавлен в корзину 🛒`);
        });
    });

    // === Кнопки регистрация/вход ===
    document.querySelectorAll(".btn-outline").forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.href = "register.html";
        });
    });

    // === Форма регистрации ===
    const form = document.getElementById("registrationForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Форма регистрации успешно отправлена!");
        });
    }

    // === Анимация fade-in ===
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    });
    fadeElements.forEach(el => observer.observe(el));

    // === Black Friday Countdown Timer ===
    const bfBanner = document.getElementById('blackFriday');
    const bfTimer = document.getElementById('bf-timer');
    const bfClose = document.getElementById('bf-close');

    const bfEndDate = new Date('November 29, 2025 00:00:00').getTime();

    function updateBFTimer() {
        const now = new Date().getTime();
        const distance = bfEndDate - now;

        if (distance <= 0) {
            bfTimer.textContent = "Акция закончилась";
            clearInterval(bfInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        bfTimer.textContent = `${days}д ${hours}ч ${minutes}м ${seconds}с`;
    }

    window.addEventListener('load', () => {
        bfBanner.classList.add('visible');
        updateBFTimer();
    });

    const bfInterval = setInterval(updateBFTimer, 1000);

    bfClose.addEventListener('click', () => {
        bfBanner.classList.remove('visible');
    });

});
