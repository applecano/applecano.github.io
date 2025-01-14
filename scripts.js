const translations = {
    en: {
        download: "Download",
        footerButton: "Privacy",
        carousel: [
            { headline: "Your Complete Pregnancy Journey in One App", text: "Your complete pregnancy journey at your fingertips — track your baby’s growth week by week with clear and personalized updates", button: "Sign up today" },
            { headline: "All-in-One Tools for Every Mom-to-Be", text: "All the tools you need in one app — from shopping lists and pregnancy journals to tracking mom and baby’s progress, we’re here for you", button: "Learn more" },
            { headline: "Smart Reminders for a Stress-Free Pregnancy", text: "Smart reminders for peace of mind — never miss a checkup, vitamin, or vaccination with timely alerts", button: "Browse gallery" },
            { headline: "Bond with Your Baby Through Heartwarming Stories", text: "Bond with your baby through meaningful stories that relax and inspire early development", button: "Discover more" },
            { headline: "Fully Prepared for Your Baby’s Arrival", text: "Get everything ready with ease — complete your shopping checklist to ensure nothing is missed for your baby’s arrival.", button: "Join now" }
        ]
    },
    vi: {
        download: "Tải về",
        footerButton: "Điều khoản",
        carousel: [
            { headline: "Hành trình thai kỳ trọn vẹn trong tầm tay", text: "Dễ dàng theo dõi sự phát triển của bé yêu qua từng tuần với thông tin chi tiết và dễ hiểu", button: "Đăng ký ngay" },
            { headline: "Mọi tiện ích cho mẹ, tất cả trong một ứng dụng", text: "Từ danh sách đồ cần mua, lưu giữ nhật ký, đến theo dõi sự thay đổi của mẹ và bé — ứng dụng này luôn đồng hành cùng bạn", button: "Tìm hiểu thêm" },
            { headline: "Nhắc nhở thông minh, mẹ bầu an tâm mỗi ngày", text: "Không bỏ sót lịch khám, uống vitamin hay tiêm phòng — mọi thứ đều được nhắc nhở đúng lúc, đúng cách", button: "Xem thư viện" },
            { headline: "Gắn kết cùng bé qua những câu chuyện ý nghĩa", text: "Thư giãn và kết nối với bé qua những câu chuyện giàu cảm xúc, giúp kích thích sự phát triển từ sớm", button: "Khám phá thêm" },
            { headline: "Chuẩn bị đầy đủ, sẵn sàng chào đón bé yêu", text: "Dễ dàng kiểm tra và hoàn thành danh sách đồ cần mua, đảm bảo không thiếu sót cho ngày đặc biệt.", button: "Tham gia ngay" }
        ]
    }
};

function setLanguage(lang) {
    // Store the selected language in localStorage
    localStorage.setItem('selectedLanguage', lang);

    // Update download button text
    const downloadButton = document.getElementById('download-button');
    downloadButton.textContent = translations[lang].download;

    // Update footer button text
    const footerPriButton = document.getElementById('footer-button');
    footerPriButton.textContent = translations[lang].footerButton;

    // Update carousel content
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselIndicators = document.querySelector('.carousel-indicators');
    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';

    translations[lang].carousel.forEach((slide, index) => {
        const isActive = index === 0 ? 'active' : '';
        const imgSrc = `assets/${lang.toUpperCase()}/screen${index + 1}.png`;
        carouselIndicators.innerHTML += `<button type="button" data-bs-target="#myCarousel" data-bs-slide-to="${index}" class="${isActive}" aria-current="true" aria-label="Slide ${index + 1}"></button>`;
        carouselInner.innerHTML += `
            <div class="carousel-item ${isActive}">
                <div class="container">
                    <div class="carousel-caption">
                        <img src="${imgSrc}" alt="Slide ${index + 1}" style="max-height: 60vh; width: 100%; object-fit: contain;">
                        <h1 style="color: #FF76CE;">${slide.headline}</h1>
                        <p class="opacity-75" style="color: black;">${slide.text}</p>
                    </div>
                </div>
            </div>
        `;
    });

    // Update image sources based on language
    const appstoreImg = document.getElementById('appstoreSvg');
    const googleplayImg = document.getElementById('googleplaySvg');
    const demoImg = document.getElementById('demo-img');
    
    if (lang === 'vi') {
        appstoreImg.src = 'assets/images/AsVI.svg';
        googleplayImg.src = 'assets/images/gg-01.svg';
        demoImg.src = 'assets/images/demoVI.png';
    } else {
        appstoreImg.src = 'assets/images/AsEN.svg';
        googleplayImg.src = 'assets/images/gg-02.svg';
        demoImg.src = 'assets/images/demoEN.png';
    }
}

function updateDownloadLink() {
    const downloadButton = document.getElementById('download-button');
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        downloadButton.href = 'https://play.google.com/store/apps/details?id=com.example.app';
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        downloadButton.href = 'https://apps.apple.com/us/app/example-app/id123456789';
    } else if (/Macintosh/.test(userAgent)) {
        downloadButton.href = 'https://apps.apple.com/us/app/example-app/id123456789';
    } else {
        downloadButton.href = 'https://play.google.com/store/apps/details?id=com.example.app';
    }
}

// Call the function to set the download link on page load
updateDownloadLink();

document.getElementById('language-select').addEventListener('change', (event) => {
    setLanguage(event.target.value);
});

// Set default language based on stored language or browser language
const storedLanguage = localStorage.getItem('selectedLanguage');
const browserLanguage = navigator.language.startsWith('vi') ? 'vi' : 'en';
setLanguage(storedLanguage || browserLanguage);
