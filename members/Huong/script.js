document.addEventListener('DOMContentLoaded', function() {
    // ================== Navbar Active State on Scroll ==================
    const sections = document.querySelectorAll('section[id]'); // Lấy tất cả các section có id
    const navLinks = document.querySelectorAll('.navbar-menu a'); // Lấy tất cả các link trong navbar menu

    function activateNavLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 150 && pageYOffset < sectionTop + sectionHeight - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => link.classList.remove('active'));

        if (current) {
            const activeLink = document.querySelector(`.navbar-menu a[href="#${current}"]`);
            if (activeLink) activeLink.classList.add('active');
        } else {
            const homeLink = document.querySelector('.navbar-menu a[href="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', activateNavLink);
    activateNavLink(); // Kích hoạt ban đầu

    // ================== Tabs cho phần Sở Thích ==================
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Bỏ active ở tất cả tab buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));
    // Ẩn tất cả tab panes
    tabPanes.forEach(pane => pane.classList.remove('active'));

    // Active tab hiện tại
    button.classList.add('active');
    const target = button.getAttribute('data-tab');
    document.getElementById(target).classList.add('active');
  });
});

    //Navbar Toggler for Mobile
    const menuToggle = document.getElementById('menu-toggle');
    const navbarMenu = document.getElementById('navbar-menu');

    if (menuToggle && navbarMenu) {
        menuToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });

        // Đóng menu khi click vào 1 link trên mobile
        navbarMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navbarMenu.classList.remove('active');
                }
            });
        });
    }

//Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

//Morph Slider Controls
const morphSlides = document.querySelectorAll('.morph-slide');
let currentSlide = 0;

// Hàm chuyển slide thủ công (nếu muốn thêm nút điều khiển)
function nextSlide() {
  morphSlides[currentSlide].style.animation = 'none';
  void morphSlides[currentSlide].offsetWidth; // Trigger reflow
  morphSlides[currentSlide].style.animation = null;
  
  currentSlide = (currentSlide + 1) % morphSlides.length;
}

// Tự động pause khi hover (đã có trong CSS)
morphSlides.forEach(slide => {
  slide.addEventListener('mouseenter', function() {
    this.style.animationPlayState = 'paused';
  });
  
  slide.addEventListener('mouseleave', function() {
    this.style.animationPlayState = 'running';
  });
});

// Thêm nút điều khiển nếu muốn (tùy chọn)
function addSliderControls() {
  const slider = document.querySelector('.morph-slider');
  const prevBtn = document.createElement('button');
  const nextBtn = document.createElement('button');
  
  prevBtn.innerHTML = '‹';
  nextBtn.innerHTML = '›';
  prevBtn.className = 'slider-control prev';
  nextBtn.className = 'slider-control next';
  
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + morphSlides.length) % morphSlides.length;
    goToSlide(currentSlide);
  });
  
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % morphSlides.length;
    goToSlide(currentSlide);
  });
  
  slider.appendChild(prevBtn);
  slider.appendChild(nextBtn);
}

function goToSlide(index) {
  morphSlides.forEach((slide, i) => {
    slide.style.animation = 'none';
    void slide.offsetWidth;
    
    if (i === index) {
      slide.style.animation = `morphAnimation 24s infinite ${index * 6}s`;
    } else {
      slide.style.opacity = '0';
      slide.style.animation = 'none';
    }
  });
}
