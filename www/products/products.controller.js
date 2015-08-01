function ProductsController ($scope, $resource, $rootScope, $ionicLoading) {
    this.$scope = $scope;
    $scope.vm = this;
    this.$resource = $resource;
    this.$rootScope = $rootScope;
    this.keyword = $rootScope.keyword;
    this.$ionicLoading = $ionicLoading;

    var local = 'http://localhost:5000/api/products';
    var remoteSouq = 'https://api.souq.com/v1/products';
    var remote = 'https://secure-cliffs-9529.herokuapp.com/api/products';

    this.items = $resource(remote, {

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

    if (this.keyword) {
        this.search(this.keyword);
    }
/*
    $scope.$watch(function () {
        return $rootScope.keyword;
    }.bind(this), function (newVal, oldVal) {
        this.keyword = newVal;
        this.search(newVal);
    }.bind(this));*/

    $scope.$watch(function () {
        return this.keyword
    }.bind(this), function (newVal, oldVal) {
            if (newVal === oldVal || newVal === $rootScope.keyword) return;
            $rootScope.keyword = newVal;
            this.search(newVal);
        }.bind(this)
    );

    $rootScope.$on('keyword1', function (e, word) {
        $rootScope.keyword = word;
        this.search(word);
    }.bind(this));
}

ProductsController.prototype.display = function (items) {
        this.$scope.items = items;
    };

ProductsController.prototype.search = function (q) {
    this.$ionicLoading.show({
        template: 'Loading from Souq.ae'
    });
    this.items.search({q: q}, function (data) {
            this.display(data.data.products);
            this.$ionicLoading.hide();
        }.bind(this));
    };

angular.module('products', ['ngResource'])
    .controller('controllers.products', ['$scope', '$resource', '$rootScope', '$ionicLoading', ProductsController]);