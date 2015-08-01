function ProductsController ($scope, $resource) {
    this.$scope = $scope;
    $scope.vm = this;
    this.$resource = $resource;

    this.items = $resource('/dummy/iphone.json', {

    }, {
        search: {
            method: 'GET',
            params: {
                page:1,
                show:10,
                show_attributes:0,
                country:'ae',
                language:'en',
                format:'json',
                'app_id':7875262,
                'app_secret': 'YxpMgQJiVLQGNUclUX5M'
            }
        }
    });

    this.search('rfe');
}

ProductsController.prototype.display = function (items) {
        this.$scope.items = items;
    };

ProductsController.prototype.search = function (q) {
        this.items.search({q: q}, function (data) {
            this.display(data.data.products);
        }.bind(this));
    };

angular.module('products', ['ngResource'])
    .controller('controllers.products', ['$scope', '$resource', ProductsController]);