angular.module('routes', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    /**
     * Here two routes share the same controller
     * as two similar views have almost the same functionality
     * so it prevents from copy-pasting.
     */
    $routeProvider
        .when('/', {
            templateUrl: 'main/main.html',
            controller: 'controllers.main',
            resolve: { // dont copy that
                admin: function () {
                    return false;
                }
            }
        })
        .when('/products', {
            templateUrl: 'products/products.html',
            controller: 'controllers.products',
            resolve: { // dont copy that
                admin: function () {
                    return false;
                }
            }
        })
        .otherwise({redirectTo: '/'});
}]);