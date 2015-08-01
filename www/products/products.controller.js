function ProductsController ($scope, $resource) {
    this.$scope = $scope;
    $scope.vm = this;
    this.$resource = $resource;

    this.keyword = 'Iphone';

    var local = 'http://localhost:5000/api/products';
    var remoteSouq = 'https://api.souq.com/v1/products';
    var remote = 'https://secure-cliffs-9529.herokuapp.com/api/products';

    this.items = $resource(local, {

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
            },
            cache: true
        }
    });

    this.search(this.keyword);

    $scope.$watch(function () {
        return this.keyword;
    }.bind(this), function (newVal, oldVal) {
        if (newVal === oldVal) return;
        this.search(newVal);
    }.bind(this));
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