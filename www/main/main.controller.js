/*global ionic, angular */

function MainController ($scope) {
    this.$scope = $scope;
    $scope.vm = this;

//    ionic.Platform.ready(function() {

        function onDeviceReady() {
            $scope.vm.initcamera();
        }

        if (navigator.camera) {
            console.log('Plugin found');
            onDeviceReady();
        } else {
            console.log('Plugin not found, wait for device ready');
            document.addEventListener("deviceready", onDeviceReady, false);
        }
//    });
}

angular.extend(MainController.prototype, {
    initcamera: function () {
        if (navigator.camera) {
            
            navigator.camera.getPicture(function(imageURI) {
                // imageURI is the URL of the image that we can use for
                // an <img> element or backgroundImage.
                alert(imageURI);
            }, function(err) {
                // Ruh-roh, something bad happened
            }, {});
            
            this.$scope;
        } else {
            // desktop
            alert('camera started');
        }
    }
});

ProductsController.$inject = ['$scope'];

angular.module('main', [])
    .controller('controllers.main', MainController);
