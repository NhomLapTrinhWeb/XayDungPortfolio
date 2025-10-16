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

    // ================== Navbar Toggler for Mobile ==================
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

    // ================== Back to Top Button ==================
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
