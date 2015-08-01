function Souq ($resource) {
    this.items = $resource('/dummy/iphone.json', {
        page:1,
        show:10,
        show_attributes:0,
        country:'ae',
        language:'en',
        format:'json',
        'app_id':7875262,
        'app_secret': 'YxpMgQJiVLQGNUclUX5M'
    }, {
        search: {
            method: 'GET'
        }
    });
}
Souq.inject = ['$resource'];
angular.module('API', ['ngResource'])
    .factory('Souq', ['$resource', function ($resource) {

        return Souq.bind(this, $resource);
    }])
    .service('Souq', Souq)
    .config(['$provide', function($provide) {
        $provide.factory('Souq', function($resource) {
            //return Souq.bind(this, $resource);
            return {
                ef:'wef'
            }
        });
    }]);