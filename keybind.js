$(document).ready(function() {

  function doc_keyUp(e) {
    if (e.shiftKey && e.ctrlKey && e.code === 'KeyL') {
      // if not handled, if block using c-l will catch c-s-l too
    } else if (e.ctrlKey && e.code === 'KeyL') {
      // prevent c-l firefox builtin shortcut
      e.preventDefault();
      $("#dialog").dialog();
    }
  }

  document.addEventListener('keydown', doc_keyUp, false);
})
