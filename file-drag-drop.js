angular.module('fileDragDrop', []).directive('fileDragDrop', [function () {
    'use strict';
    return {
        scope: {
            onFileSelect: '=',
            accept: '='
        },
        link: function (scope, element) {
            var isOk = function (file) { // todo
                return file.type.match(scope.accept) != null;
            };

            element.bind('dragover', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                element.addClass('over');
            });

            element.bind('dragleave', function (evt) {
                evt.preventDefault();
                element.removeClass('over');
            });

            element.bind('drop', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                element.removeClass('over');

                var files = evt.dataTransfer.files;
                if (files.length > 0) {
                    scope.files = [];
                    angular.forEach(files, function (file) {
                        if (isOk(file)) {
                            scope.files.push(file);
                        }
                    });

                    scope.onFileSelect(scope.files);
                }
            });
        }
    }
}]);