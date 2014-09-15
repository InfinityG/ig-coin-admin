(function () {

    var injectParams = ['customersService'];

    var dataService = function (customersService) {
        return customersService;
    };

    dataService.$inject = injectParams;

    angular.module('adminApp').factory('dataService', dataService);

}());