function MainController ($scope) {
    this.$scope = $scope;
}

angular.extend(MainController.prototype, {

});

ProductsController.$inject = ['$scope'];

angular.module('main', [])
    .controller('controllers.main', MainController);