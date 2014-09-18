(function () {

    var injectParams = ['customersService', 'configurationService', 'transactionService'];

    var dataService = function (customersService, configurationService, transactionService) {
        return {customers : customersService, configuration : configurationService, transactions: transactionService};
    };

    dataService.$inject = injectParams;

    angular.module('adminApp').factory('dataService', dataService);

}());