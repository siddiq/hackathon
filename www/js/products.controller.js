function ProductsController ($scope) {
    this.$scope = $scope;
}

angular.extend(ProductsController.prototype, {
    fetch: function (items) {
        this.$scope.items = items || [

            ];
    }
});

ProductsController.$inject = ['$scope'];