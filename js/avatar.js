'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('input[type="file"][name="avatar"]');
  var preview = document.querySelector('.setup-user-pic');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (type) {
        return fileName.endsWith(type);
      });
      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  });
})();
