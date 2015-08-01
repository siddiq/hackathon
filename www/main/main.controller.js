/*global ionic, angular, Camera, ProductsController */

function MainController ($scope, $http) {
    this.$scope = $scope;
    $scope.vm = this;

    function onDeviceReady() {
        $scope.vm.initcamera();
    }

    if (navigator.camera) {
        console.log('Plugin found');
        onDeviceReady();
    } else {
        console.log('Plugin not found, wait for device ready');
        document.addEventListener('deviceready', onDeviceReady, false);
    }
}

angular.extend(MainController.prototype, {
    initcamera: function () {
        if (navigator.camera) {

            navigator.camera.getPicture(function (imageURI) {
                document.getElementById('myimage').src = 'data:image/jpg;base64,' + imageURI;
            }, function (err) {
                // Ruh-roh, something bad happened
                navigator.notification.alert(err, 'Error');
            }, {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,

                //allowEdit: true,     // its not working in iphone anyway
                encodingType: Camera.EncodingType.JPEG,     // we probably dont need this but just in case

                // Make the picture a bit smaller and easy to send over to API.
                targetWidth: 600,
                targetHeight: 600,

                //popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            });

            this.$scope;
        } else {
            // desktop
            alert('camera started');
        }
    }
});

angular.module('main', ['ngResource'])
    .controller('controllers.main', ['$scope', '$http', MainController]);
