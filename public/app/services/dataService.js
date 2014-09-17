(function () {

    var injectParams = ['customersService', 'configurationService'];

    var dataService = function (customersService, configurationService) {
        return {customers : customersService, configuration : configurationService};
    };

    dataService.$inject = injectParams;

    angular.module('adminApp').factory('dataService', dataService);

}());