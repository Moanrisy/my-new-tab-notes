$(document).ready(function() {

  function doc_keyUp(e) {
    if (e.ctrlKey && e.code === 'KeyL') {
      // prevent c-l firefox builtin shortcut
      e.preventDefault();
      $("#dialog").dialog();
    }
  }

  document.addEventListener('keydown', doc_keyUp, false);
})
