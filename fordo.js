// DOM 요소들
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const submitBtn = document.getElementById('submitBtn');
const myModal = document.getElementById('myModal');
const titleInput = document.getElementById('titleInput');
const userInput = document.getElementById('userInput');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const titleList = document.getElementById('titleList').querySelector('ul');
const contentText = document.getElementById('contentText');
const selectedTitle = document.getElementById('selectedTitle');
const selectedImage = document.getElementById('selectedImage');

// 모달 열기
openModalBtn.addEventListener('click', () => {
  myModal.style.display = 'flex';
});

// 모달 닫기
closeModalBtn.addEventListener('click', () => {
  myModal.style.display = 'none';
});

// 사진 미리보기
imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

// 제출 버튼 클릭
submitBtn.addEventListener('click', () => {
  const title = titleInput.value;
  const content = userInput.value;
  const imageSrc = imagePreview.src;

  if (title && content) {
    const newsItem = {
      title: title,
      content: content,
      image: imageSrc
    };

    // 로컬 스토리지에 저장
    let newsList = JSON.parse(localStorage.getItem('newsList')) || [];
    newsList.push(newsItem);
    localStorage.setItem('newsList', JSON.stringify(newsList));

    // 제목 목록 업데이트
    updateTitleList();
    
    // 입력값 초기화
    titleInput.value = '';
    userInput.value = '';
    imageInput.value = '';
    imagePreview.src = '';
    imagePreview.style.display = 'none';

    myModal.style.display = 'none';
  } else {
    alert('제목과 내용을 입력해주세요!');
  }
});

// 제목 목록 클릭 시 내용 표시
titleList.addEventListener('click', (e) => {
  const index = e.target.dataset.index;
  const newsList = JSON.parse(localStorage.getItem('newsList')) || [];
  const selectedItem = newsList[index];

  selectedTitle.innerText = selectedItem.title;
  contentText.innerText = selectedItem.content;

  if (selectedItem.image) {
    selectedImage.src = selectedItem.image;
    selectedImage.style.display = 'block';
  } else {
    selectedImage.style.display = 'none';
  }
});

// 제목 목록 업데이트 함수
function updateTitleList() {
  titleList.innerHTML = '';
  const newsList = JSON.parse(localStorage.getItem('newsList')) || [];

  newsList.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.innerText = item.title;
    listItem.dataset.index = index;
    titleList.appendChild(listItem);
  });
}

// 페이지 로드 시 제목 목록 불러오기
window.addEventListener('load', () => {
  updateTitleList();
});
