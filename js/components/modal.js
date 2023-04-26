export const Modal = (mensaje) => `
<div class="modal__container">
  <input type="checkbox" id="open-modal" class="modal__toggler "  checked/>
  <label class="modal__mask" for="open-modal"></label>
  <div class="modal">
    <label class="modal__close" for="open-modal"></label>
    <div class="modal__content">
      <h1 class="modal__title">${mensaje}</h1>
    </div>
  </div>
</div>`