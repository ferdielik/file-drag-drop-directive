angular.module('demo', ['fileDragDrop'])
    .controller('DragDropController', function ($scope) {
        $scope.files = [];

        $scope.onFileSelect = function (files) { // do upload
            angular.forEach(files, function (f) {
                $scope.files.push(f);
                console.log('file: ' + f.name);
            });
            $scope.$apply();
        };
    });

