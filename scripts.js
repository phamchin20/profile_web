// ====== Cấu hình ngày sinh ======
const birthdate = new Date('2010-11-29'); // (hoặc bỏ dòng này luôn, vì bạn lấy từ HTML rồi)

// ====== Cập nhật tuổi tự động ======
function updateAge() {
  const birthdateText = document.getElementById('birthdate').textContent.trim();
  const [day, month, year] = birthdateText.split('/').map(Number);
  const birthDate = new Date(year, month - 1, day);

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  document.getElementById('age').textContent = age;
}

// ====== Cập nhật Background theo mode ======
function updateBackground() {
  const body = document.body;
  if (body.classList.contains('dark')) {
    body.style.backgroundImage = "url('assets/backgrounds/dark_bg.jpg')"; // hoặc để sáng tối dark mode tùy bạn
  } else {
    body.style.backgroundImage = "url('assets/backgrounds/light_bg.jpg')";
  }
}



// ====== Load nội dung từ sub_html/ ======
function loadContent(section) {
  const content = document.getElementById('content');
  content.style.opacity = 0;
  fetch(`sub_html/${section}.html`)
    .then(response => response.text())
    .then(data => {
      setTimeout(() => {
        content.innerHTML = data;
        content.style.opacity = 1;
      }, 300);
    })
    .catch(error => {
      console.error('Error loading section:', error);
    });
}

// ====== Chuyển active nút menu + play sound ======
const buttons = document.querySelectorAll('.menu-btn');
const clickSound = document.getElementById('click-sound');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    clickSound.currentTime = 0;
    clickSound.play();

    const section = button.getAttribute('data-section');
    loadContent(section);
  });
});

// ====== Chuyển Light / Dark mode ======
const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  updatePrimaryColor(currentColor);
  updateBackground();
});

// ====== Color Picker ======
const colorPicker = document.getElementById('color-picker');
let currentColor = colorPicker.value;

colorPicker.addEventListener('input', (e) => {
  currentColor = e.target.value;
  updatePrimaryColor(currentColor);
});

// ====== Update màu chủ đạo ======
function updatePrimaryColor(color) {
  if (document.body.classList.contains('dark')) {
    document.documentElement.style.setProperty('--primary-color', invertColor(color));
  } else {
    document.documentElement.style.setProperty('--primary-color', color);
  }
}

// ====== Hàm invert màu hex ======
function invertColor(hex) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('');
  }
  if (hex.length !== 6) {
    return '#000000';
  }
  let r = (255 - parseInt(hex.substr(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.substr(2, 2), 16)).toString(16),
      b = (255 - parseInt(hex.substr(4, 2), 16)).toString(16);
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str) {
  return (str.length === 1) ? '0' + str : str;
}

// ====== Gọi các hàm khởi động ======
updateAge();
updateBackground();
loadContent('introduce');  // <<< Sửa chỗ này, không phải 'intro'!
