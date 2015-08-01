function ProductsController ($scope) {
    this.$scope = $scope;
}

angular.extend(ProductsController.prototype, {
    fetch: function (items) {
        this.$scope.items = items || [
                {
                    image: 'http://cf5.souqcdn.com/item/2014/09/14/72/74/96/6/item_M_7274966_5621616.jpg',
                    caption: 'iphone',
                    desc: 'rgrg erg egeg'
                },
                {
                    image: 'http://cf5.souqcdn.com/item/2014/09/14/72/74/96/6/item_M_7274966_5621616.jpg',
                    caption: 'iphone',
                    desc: 'rgrg erg egeg'
                },
                {
                    image: 'http://cf5.souqcdn.com/item/2014/09/14/72/74/96/6/item_M_7274966_5621616.jpg',
                    caption: 'iphone',
                    desc: 'rgrg erg egeg'
                },
                {
                    image: 'http://cf5.souqcdn.com/item/2014/09/14/72/74/96/6/item_M_7274966_5621616.jpg',
                    caption: 'iphone',
                    desc: 'rgrg erg egeg'
                }
            ];
    }
});

ProductsController.$inject = ['$scope'];

angular.module('products', [])
    .controller('controllers.products', ProductsController);