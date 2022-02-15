export default class ImageSlider {
  #currentPostion = 0;

  #slideNumder = 0;

  #slideWidth = 0;

  #intervalId;

  #autoPlay = true;

  sliderWrapEl;

  sliderListEl;

  nextBtnEl;

  previousBtnEl;

  indicatorWrapEl;

  controlWrapEl;

  constructor() {
    this.assignElement();
    this.initSliderNumder();
    this.intiSliderWidth();
    this.intiSliderListWidth();
    this.addEvent();
    this.createIndicator();
    this.setIndicator();
    this.initAotoPlay();
  }

  assignElement() {
    this.sliderWrapEl = document.getElementById('slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.previousBtnEl = this.sliderWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
    this.controlWrapEl = this.sliderWrapEl.querySelector('#control-wrap');
  }

  initAotoPlay() {
    this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
  }

  initSliderNumder() {
    this.#slideNumder = this.sliderListEl.querySelectorAll('li').length;
  }

  intiSliderWidth() {
    this.#slideWidth = this.sliderListEl.clientWidth;
  }

  intiSliderListWidth() {
    this.sliderListEl.style.width = `${this.#slideNumder * this.#slideWidth}px`;
  }

  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    this.indicatorWrapEl.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    );
    this.controlWrapEl.addEventListener('click', this.togglePlay.bind(this));
  }

  togglePlay(event) {
    if (event.target.dataset.status === 'play') {
      this.#autoPlay = true;
      this.controlWrapEl.classList.add('play');
      this.controlWrapEl.classList.remove('pause');
      this.initAotoPlay();
    } else if (event.target.dataset.status === 'pause') {
      this.#autoPlay = false;
      this.controlWrapEl.classList.remove('play');
      this.controlWrapEl.classList.add('pause');
      clearInterval(this.#intervalId);
    }
  }

  onClickIndicator(event) {
    const indexPosition = parseInt(event.target.dataset.index, 10);
    if (Number.isInteger(indexPosition)) {
      this.#currentPostion = indexPosition;
      this.sliderListEl.style.left = `-${
        this.#slideWidth * this.#currentPostion
      }px`;
      this.setIndicator();
    }
  }

  moveToRight() {
    this.#currentPostion += 1;
    if (this.#currentPostion === this.#slideNumder) {
      this.#currentPostion = 0;
    }
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPostion
    }px`;
    if (this.#autoPlay) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    }
    this.setIndicator();
  }

  moveToLeft() {
    this.#currentPostion -= 1;
    if (this.#currentPostion === -1) {
      this.#currentPostion = this.#slideNumder - 1;
    }
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPostion
    }px`;
    if (this.#autoPlay) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    }
    this.setIndicator();
  }

  createIndicator() {
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#slideNumder; i += 1) {
      const li = document.createElement('li');
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    this.indicatorWrapEl.querySelector('ul').appendChild(docFragment);
  }

  setIndicator() {
    this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');
    this.indicatorWrapEl
      .querySelector(`ul li:nth-child(${this.#currentPostion + 1})`)
      .classList.add('active');
  }
}
