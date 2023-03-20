export function renderLoading(isLoading, popup, btn, text) {
  if (isLoading) {
    btn.textContent = 'Сохранение...';
  }
  else {
    btn.textContent = text;
    popup.classList.remove('popup_opened');
  }
}