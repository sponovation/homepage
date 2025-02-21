Solid State by HTML5 UP
html5up.net | @ajlkn

## 홈페이지

- https://www.sponovation.com/

## 피그마

- https://www.figma.com/design/ztiszrJJ6g3W61hM8AUPjx/Sponovation_WebProto(1)-0704?node-id=0-1&p=f&t=E8DsCt4J3oSDByu8-0

## 기술 스택

- 스타일링: scss

## 주의사항

- 스타일링 하기전 터미널에 `sass --watch assets/sass:assets/css` 입력 후 scss 파일 수정할 것. 그래야 scss 스타일 수정 반영됌

## 개발

### 1. 미디어 기사 추가해달라고 하면

(1) /images/index/media에 이미지 추가

- 클로이한테 피그마에 미디어 이미지 만들어달라고 요청하거나
- 피그마에서 아래 부분에 이미지 교체해서 다운받으면 됌

   	<img width="355" alt="Image" src="https://github.com/user-attachments/assets/8298ceb5-ce07-47e7-830f-dd8d3124655c" />

(2) index.html 페이지에서 `<!-- 미디어 -->` 부분 찾아서 아래부분 복붙

```html
<article>
  <a
    href="https://m.sports.naver.com/general/article/117/0003906567"
    class="image"
    ><img src="images/index/media/6.webp" alt="" loading="lazy"
  /></a>
  <div class="text-box">
    <h3 class="major">
      '女펜싱 샛별' 모별이, 2025년 첫 전국대회서 개인전 은메달+단체전 금메달
    </h3>

    <a
      href="https://m.sports.naver.com/general/article/117/0003906567"
      class="special"
      >Learn more</a
    >
  </div>
</article>
```

3. href, img url, 타이틀 교체

### 2. 매니지먼트 추가해달라고 하면

- 아래사진 코드로 안되어있음

![Image](https://github.com/user-attachments/assets/d061500c-721c-4418-8d2b-5d0f66ea5c0c)

(1) 클로이한테 피그마로 만들어달라고 하기

(2) 이미지 다운 받아서 /images/managenment/mobile, /images/managenment/pc에 각각 이미지 넣기

(3) management.html에
pc 카드는
`<div id="player">`
밑에 아래 태그 src,alt 바꿔서 추가

```html
<img src="images/management/pc/Byeol_Mo.webp" alt="모별이" class="player-img" />
```

mobile카드는
`<div id="player_mobile">` 밑에 아래 태그 src,alt 바꿔서 추가

```html
<img
  src="images/management/mobile/mobile_Byeol_Mo.webp"
  alt="모별이"
  class="player-img"
/>
```
