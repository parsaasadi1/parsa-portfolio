// ===== منوی موبایل =====
const menuToggle = document.getElementById('menuToggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

// ===== فرم سفارش =====
const orderForm = document.getElementById('orderForm');
const formMessage = document.getElementById('formMessage');

// 📱 شماره واتساپ (با کد ایران، بدون 0)
const WHATSAPP_NUMBER = '989933373955';

// 📨 آیدی ایتا
const EITA_USERNAME = 'parsaasadi2019';

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    // اعتبارسنجی
    if (!name || !phone || !service) {
        showMessage('❌ لطفاً همه فیلدهای ضروری را پر کنید.', 'error');
        return;
    }

    const phoneRegex = /^09[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
        showMessage('❌ شماره تماس معتبر نیست. مثلاً: 09123456789', 'error');
        return;
    }

    // ساخت متن پیام
    const text =
        `سلام پارسا جان 👋\n\n` +
        `📌 نام: ${name}\n` +
        `📞 شماره: ${phone}\n` +
        `🛠️ خدمت: ${service}\n` +
        `📝 توضیحات: ${message || 'ندارد'}`;

    // ذخیره اطلاعات برای استفاده در دکمه‌ها
    window._orderText = text;

    // نمایش دکمه‌های انتخاب پیام‌رسان
    showMessengerChoice(name);

    console.log('Order:', { name, phone, service, message });
});

// نمایش دکمه‌های واتساپ و ایتا
function showMessengerChoice(name) {
    formMessage.className = 'form-message success';
    formMessage.innerHTML = `
        <p>✅ <strong>${name}</strong> عزیز، سفارش شما آماده ارسال است!</p>
        <p style="margin-top: 10px;">روی یکی از دکمه‌های زیر بزن تا سفارشت ارسال بشه:</p>
        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 15px; flex-wrap: wrap;">
            <button onclick="sendToWhatsApp()" class="btn-whatsapp">
                📱 ارسال با واتساپ
            </button>
            <button onclick="sendToEita()" class="btn-eita">
                📨 ارسال با ایتا
            </button>
        </div>
    `;

    // ریست فرم بعد از 5 ثانیه
    setTimeout(() => {
        if (confirm('آیا سفارش رو ارسال کردی؟')) {
            orderForm.reset();
            formMessage.className = 'form-message';
        }
    }, 5000);
}

// ارسال به واتساپ (با پیام آماده)
function sendToWhatsApp() {
    const text = window._orderText || '';
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

// ارسال به ایتا
function sendToEita() {
    const text = window._orderText || '';
    
    // کپی متن توی کلیپ‌بورد
    navigator.clipboard.writeText(text).then(() => {
        alert('📋 متن سفارش کپی شد!\n\nحالا توی ایتا پیام رو Paste (Ctrl+V) کن و بفرست.');
    }).catch(() => {
        alert('⚠️ لطفاً متن سفارش رو دستی کپی کن.');
    });
    
    // باز کردن چت ایتا
    const url = `https://eitaa.com/${EITA_USERNAME}`;
    window.open(url, '_blank');
}

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;
    
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// ===== اسکرول نرم =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== انیمیشن کارت‌ها =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .service-card, .info-box, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});