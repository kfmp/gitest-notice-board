import { savePost, getPostList } from '../api/post.js';

export default function Post() {
  this.posts = [];
  this.nextId = 0; // 시퀀스번호

  this.init = () => {
    this.initData();
    this.initEventListeners();
  };

  this.addPost = (e) => {
    e.preventDefault();

    const titleEl = document.querySelector('#input-title');
    const usernameEl = document.querySelector('#input-username');
    const contentEl = document.querySelector('#input-content');

    const idx = this.posts.length;

    const data = {
      idx: this.nextId++,
      title: titleEl.value,
      username: usernameEl.value,
      content: contentEl.value,
    };

    // 폼 유효성 검사
    if (!this.isPostFormValidate(data)) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    // 상태값 저장
    this.posts.unshift(data);
    savePost(this.posts);

    // 빈 값으로 초기화
    titleEl.value = '';
    usernameEl.value = '';
    contentEl.value = '';

    this.render();
  };

  // 게시판 상태 초기화
  this.initData = () => {
    this.posts = getPostList() || [];
    this.render();
  };

  // 게시글 목록 렌더링
  this.render = () => {
    if (this.posts.length === 0) {
      return;
    }
    const postEls = this.posts
      .map(({ idx, title, username, content }) => {
        return `<li class="list-group-item d-flex justify-content-between align-items-start"  data-id="${idx}">
                  <div class="w-10 fw-bold">${idx}</div>
                  <div class="w-10 fw-bold">${title}</div>
                  <div style="width: 50%">${content}</div>
                  <div>${username}</div>
              </li>`;
      })
      .join('');
    document.querySelector('#post-list').innerHTML = postEls;
  };

  /**
   * 1. 배열 posts 인덱스로 제어
   * 2. 리스트의 내용을 인덱스에 맞는걸 post-detail 요소에 넣어줌
   */
  this.getDetailPost = (event) => {
    const listItem = event.target.closest('.list-group-item');

    const id = parseInt(listItem.getAttribute('data-id'), 10);

    const post = this.posts.find((p) => p.idx === id);

    const noEl = document.querySelector('#detail-post-no');
    const titleEl = document.querySelector('#post-title');
    const usernameEl = document.querySelector('#post-username');
    const contentEl = document.querySelector('#post-content');

    noEl.className = 'd-inline';
    noEl.innerText = `${post.idx}번`;
    titleEl.value = post.title;
    usernameEl.value = post.username;
    contentEl.value = post.content;

    titleEl.disabled = true;
    usernameEl.disabled = true;
    contentEl.disabled = true;
  };

  /**
   * 게시글 수정
   * 1. 게시글 정보 갱신
   * 2. 입력값 활성 상태 변경
   */
  this.updatePost = (event) => {
    // 게시글 정보 갱신하기

    const noEl = document.querySelector('#detail-post-no');
    // const postIdx = noEl.getAttribute

    // 입력값 활성 상태 false로 변경하기
  };

  // 게시판 이벤트 초기화
  this.initEventListeners = () => {
    document.querySelector('#add-btn').addEventListener('click', this.addPost);
    document
      .querySelector('#post-list')
      .addEventListener('click', this.getDetailPost);
    document
      .querySelector('#edit-btn')
      .addEventListener('click', this.updatePost);
  };

  // 유효성 판별
  this.isPostFormValidate = ({ title, username, content }) => {
    if (
      title.trim() === '' ||
      username.trim() === '' ||
      content.trim() === ''
    ) {
      return false;
    }
    return true;
  };
}
