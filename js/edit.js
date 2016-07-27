function load() {

  $("#writeField").select(function() {
    markyEditor('writeField','previewField');
  });

  autosize.update(document.querySelectorAll('textarea'));

  autosize(document.querySelectorAll('textarea'));

}
