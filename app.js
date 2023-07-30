$(document).ready(function () {

  var noteCount = 0;
  var activeNote = null;

  // Function to render a note in the notepad
  function renderNote(id, title, date, body, color) {
    $('#listed').append('<div id="' + id + '" style="background-color: ' + color + '"><div class="list-title">' + title + '</div> <div class="list-date">' + date + '</div> <div class="list-text">' + body + '</div> </div>');
    noteCount = Math.max(noteCount, id);
  }

  // Load notes from localStorage on initial load
  var notes = JSON.parse(localStorage.getItem('notes') || '[]');
  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];
    // console.log("d: load notes");
    // console.log("d: " + JSON.stringify(note));
    renderNote(note.id, note.title, note.created, note.body, note.color);
  }

  // Load the active-note ID from localStorage on initial load
  var activeNoteId = JSON.parse(localStorage.getItem('active-note'));
  if (activeNoteId) {
    activeNote = activeNoteId;
    // Set the edit mode with the loaded active note
    $('#edit-mode').removeClass('no-display').addClass('display');
    var titleSel = $('#' + activeNote)[0].children[0].innerHTML;
    var bodySel = $('#' + activeNote)[0].children[2].innerHTML;
    var colorSel = $('#' + activeNote)[0].style.backgroundColor;
    $('#title-field').val(titleSel);
    $('#body-field').val(bodySel);
    $('notepad').css('background-color', colorSel);
    $('#title-field').css('background-color', colorSel);
    $('#body-field').css('background-color', colorSel);
  }

  $('.color-box').click(function () {
    var color = $(this).css('background-color');
    $('notepad').css('background-color', color);
    $('#title-field').css('background-color', color);
    $('#body-field').css('background-color', color);
  })

  $('#btn-save').click(function () {
    var title = $('#title-field').val();
    var body = $('#body-field').val();
    if (title === '' && body === '') {
      alert('Please add a title or body to your note.');
      return;
    }
    var created = new Date();
    var color = $('notepad').css('background-color');
    var id = noteCount + 1;

    // Save the note to local storage
    var notes = JSON.parse(localStorage.getItem('notes') || '[]');
    var note = {
      id: id,
      title: title,
      body: body,
      created: created.toLocaleString('en-US'),
      color: color,
    };

    if (activeNote) {
      $('#' + activeNote)[0].children[0].innerHTML = title;
      $('#' + activeNote)[0].children[1].innerHTML = created.toLocaleString("en-US");
      $('#' + activeNote)[0].children[2].innerHTML = body;
      $('#' + activeNote)[0].style.backgroundColor = color;
      $('#edit-mode').removeClass('display').addClass('no-display');

      note.id = parseInt(activeNote, 10);
      // console.log("d: before edit and save note " + JSON.stringify(notes));
      // notes[activeNote] = note;
      notes.forEach((currentNote, index) => {
        if (currentNote.id === note.id) {
          // Update the content of the matching note
          notes[index] = note;
        }
      });
      // console.log("d: after edit and save note " + JSON.stringify(notes));

      activeNote = null;
    } else {
      var created = new Date();
      $('#listed').append('<div id="' + id + '" style="background-color: ' + color + '"><div class="list-title">' + title + '</div> <div class="list-date">' + created.toLocaleString("en-US") + '</div> <div class="list-text">' + body + '</div> </div>');
      noteCount++;

      console.log("d: saved notes " + JSON.stringify(note));

      notes.push(note);
    };

    localStorage.setItem('notes', JSON.stringify(notes));

    $('#title-field').val('');
    $('#body-field').val('');
    $('notepad').css('background-color', 'white');
    $('#title-field').css('background-color', 'white');
    $('#body-field').css('background-color', 'white');
  });

  $('#btn-delete').click(function () {
    if (activeNote) {
      $('#' + activeNote)[0].remove();
      activeNote = null;
      $('#edit-mode').removeClass('display').addClass('no-display');
    }
    $('#title-field').val('');
    $('#body-field').val('');
    $('notepad').css('background-color', 'white');
    $('#title-field').css('background-color', 'white');
    $('#body-field').css('background-color', 'white');
  });

  $('#listed').click(function (e) {
    var id = e.target.parentElement.id;
    console.log("d: id is " + id);
    var color = e.target.parentElement.style.backgroundColor;
    activeNote = id;
    $('#edit-mode').removeClass('no-display').addClass('display');
    var titleSel = $('#' + id)[0].children[0].innerHTML;
    var bodySel = $('#' + id)[0].children[2].innerHTML;
    $('#title-field').val(titleSel);
    $('#body-field').val(bodySel);
    $('notepad').css('background-color', color);
    $('#title-field').css('background-color', color);
    $('#body-field').css('background-color', color);

    console.log("d: active note id " + id);
    localStorage.setItem('active-note', JSON.stringify(id));
  })

})
