angular.module('fileDragDrop', []).directive('fileDragDrop', [function () {
    'use strict';
    return {
        scope: {
            onFileSelect: '=',
            overClass: '@',
            accept: '@'
        },
        link: function (scope, element) {
            var isOk = function (file) { // todo
                return file.type.match(scope.accept) != null;
            };

            element.bind('dragover', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                element.addClass(scope.overClass);
            });

            element.bind('dragleave', function (evt) {
                evt.preventDefault();
                element.removeClass(scope.overClass);
            });

            element.bind('drop', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                element.removeClass(scope.overClass);

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