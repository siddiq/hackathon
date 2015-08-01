/*global ionic, angular, Camera, ProductsController, FileUploadOptions, FileTransfer */

var debug = true;

function MainController ($scope, $http, $timeout, $location) {
    this.$scope = $scope;
    $scope.vm = this;

    this.$http = $http;
    this.$timeout = $timeout;
    this.$location = $location;

    this.result = {"name":"asdkasdkahsdkahsjdkas"};

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

    /**
     * Run the camera and take a picture.
     * Then call the cloud sight API.
     */
    initcamera: function () {
        var that = this;

        /**
         * Upload to a temp server.
         */
        function uploadPhoto(imageURI, win, fail) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;
            options.chunkedMode = false;

            var ft = new FileTransfer();
            ft.upload(imageURI, "http://siddiq.email/hackathon/upload.php", win, fail, options);
        }

        if (navigator.camera) {

            navigator.camera.getPicture(function (imageURI) {
                var src;
                if (/^file:/.test(imageURI)) {
                    src = imageURI;
                } else {
                    src = 'data:image/jpg;base64,' + imageURI;
                }

                // Display the picture.
                document.getElementById('myimage').src = src;

                // Upload the picture.
                uploadPhoto(src, function (r) {
                    // success
                    console.log('Image uploaded at temp server');
                    var url = JSON.parse(r.response).url;

                    // Use api to recognize image.
                    that.cloudSightClient({url: url, success: function (data) {
                        console.log(data);
                        navigator.notification.alert('sedfsewfswe');
                        document.getElementById('results').innerHTML = data.name;
                        that.$location.path('products');
                        that.$scope.$root.keyword = data.name;
                        that.$scope.$root.$emit('keyword1', data.name);
                    }, error: function (err) {
                        //
                    }});
                }, function (error) {
                    // fail
                    navigator.notification.alert("An error has occurred: Code = " + error.code, 'Error');
                });
            }, function (err) {
                // Ruh-roh, something bad happened
                navigator.notification.alert(err, 'Error');
            }, {
                quality: 75,
                //destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,

                //allowEdit: true,     // its not working in iphone anyway
                encodingType: Camera.EncodingType.JPEG,     // we probably dont need this but just in case

                // Make the picture a bit smaller and easy to send over to API.
                targetWidth: 600,
                targetHeight: 600,

                //popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            });

        } else {
            // desktop
            var url = "http://siddiq.email/hackathon/uploaded-images/2015-08-01-11-48-19-065414.jpg";
            document.getElementById('myimage').src = url;
            that.cloudSightClient({url: url, success: function (data) {
                //that.result = {"name": data.name};
                document.getElementById('results').innerHTML = data.name;
                that.$location.path('products');
                that.$scope.$root.keyword = data.name;
                that.$scope.$root.$emit('keyword1', data.name);
            }});
        }
    },

    /**
     * Cloud Sight Client
     * @param {Object} cfg
     * @param {String} cfg.url
     * @param {Function} cfg.success
     * @param {Function} cfg.error
     * @param {Object} cfg.scope (optional)
     */
    cloudSightClient: function name(cfg) {
        /*
            // Typical API session from curl

            // image_requests
            // curl -i -X POST -H "Authorization: CloudSight bZBDqGjCmsIg1Q7TUDDToA" -F "image_request[image]=@smalljoke.jpg" -F "image_request[locale]=en-US" https://api.cloudsightapi.com/image_requests
            // {"token":"xrCr_w4k_1-zhm9ZQ0PlYg","url":"//d1spq65clhrg1f.cloudfront.net/uploads/image_request/image/28/28021/28021996/smalljoke.jpg"}

            // image_responses
            // curl -i -H "Authorization: CloudSight bZBDqGjCmsIg1Q7TUDDToA" https://api.cloudsightapi.com/image_responses/xrCr_w4k_1-zhm9ZQ0PlYg
            // {"status":"completed","name":"blue bird illustration"}
        */
        cfg.scope = cfg.scope || this;
        cfg.success = cfg.success || function() {};
        cfg.error = cfg.error || function() {};

        var BASE_URL = 'https://api.cloudsightapi.com',
            apikey = 'bZBDqGjCmsIg1Q7TUDDToA',
            that = this;

        if (debug) {
            // {"token":"L4b2l5FwO2glI3EgFlDApA","url":"//d1spq65clhrg1f.cloudfront.net/uploads/image_request/image/28/28024/28024513/2015-08-01-11-48-19-065414.jpg"}
            var token = "L4b2l5FwO2glI3EgFlDApA";
            console.log("my token=" + token);
            pollResponse(token);
        } else {
            this.$http({
                method: 'POST',
                url: BASE_URL + '/image_requests',
                headers: {
                    "Authorization": "CloudSight " + apikey,
                },
                data: JSON.stringify({
                    "remote_image_url": cfg.url,
                    "locale": "en-US"
                })
            }).success(function (data, status, headers, config) {
                console.log('cloudsight:image_requests:success');
                var token = data.token;
                console.log("data=" + data);
                console.log("token=" + token);
                pollResponse(token);
            }).error(function(data, status, headers, config) {
                console.log('cloudsight:image_requests:error....' + JSON.stringify(arguments));
            });            
        }

        function pollResponse(token) {
            if (debug) {
                that.$timeout(function () {
                    cfg.success && cfg.success.call(cfg.scope, {
                        "status": "completed",
                        "name": "silver aviator frame sunglasses",
                        "categories": [
                        "fashion"
                    ]
                    });
                }, 1000);
            } else {
                that.$timeout(function () {
                    that.$http({
                        method: 'GET',
                        url: debug ? '/dummy/cloudsight-rec2.json' : BASE_URL + '/image_responses/' + token,
                        headers: {
                            "Authorization": "CloudSight " + apikey
                        }
                    }).success(function (data, status, headers, config) {
                        console.log('cloudsight:image_responses:success');
                        console.log(data.status);
                        if (data.status === "completed") {
                            console.log(data.name);
                            //console.log(JSON.stringify(data, null, 3));
                            cfg.success && cfg.success.call(cfg.scope, data);
                        } else {
                            // try again
                            pollResponse(token);
                        }
                    }).error(function(data, status, headers, config) {
                        console.log('cloudsight:image_responses:error');
                    });
                }, 1000);
            }

        }
    }
});

ProductsController.$inject = ['$scope'];

angular.module('main', ['ngResource'])
    .controller('controllers.main', ['$scope', '$http', '$timeout', '$location', MainController]);
