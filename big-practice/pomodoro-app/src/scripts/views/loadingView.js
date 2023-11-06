class LoadingView {
  hide() {
    this.loadingOverlayElement = document.querySelector('.loading-overlay');
    this.loadingOverlayElement.classList.add('hidden');
  }

  show() {
    this.loadingOverlayElement = document.querySelector('.loading-overlay');
    this.loadingOverlayElement.classList.remove('hidden');
  }
}

export default LoadingView;
