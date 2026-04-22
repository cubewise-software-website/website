(function () {
  var checkbox = document.getElementById('license-accept');
  if (!checkbox) return;
  var buttons = document.querySelectorAll('.download-btn[data-gated]');
  function sync() {
    var accepted = checkbox.checked;
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-disabled', accepted ? 'false' : 'true');
      if (accepted) {
        btn.removeAttribute('tabindex');
      } else {
        btn.setAttribute('tabindex', '-1');
      }
    });
  }
  sync();
  checkbox.addEventListener('change', sync);
})();
