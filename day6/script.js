const swiper = document.querySelector('.slide_wrapper');
const prevButtons = document.querySelectorAll('.slide_prev');
const nextButtons = document.querySelectorAll('.slide_next');
const bullets = document.querySelectorAll('.slide_number');

let currentSlide = 0;

function showSlide(slideIndex) {
    swiper.style.transform = `translateX(-${slideIndex * 400}px)`; 
    currentSlide = slideIndex;

    bullets.forEach((bullet, index) => {
        if (index === currentSlide) {
            bullet.classList.add('active'); 
        } else {
            bullet.classList.remove('active'); 
        }
    });
}


// 이전 버튼 클릭 
prevButtons.forEach((prevButton) => {
    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    });
});

// 다음 버튼 클릭 
nextButtons.forEach((nextButton) => {
    nextButton.addEventListener('click', () => {
        if (currentSlide < 3) {
            showSlide(currentSlide + 1);
        } else {
            showSlide(0); // 마지막 슬라이드에서 다음 버튼을 클릭하면 첫 번째 슬라이드로 이동
        }
    });
});


// 페이징 버튼 클릭 
bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', () => {
        showSlide(index);
    });
});

showSlide(0);
