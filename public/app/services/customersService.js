(function () {

    var injectParams = ['config', '$http'];

    var customersFactory = function (config, $http) {
        var serviceBase = config.apiHost + '/users', factory = {};

        factory.getCustomerById = function (customerId) {
            return $http.get(serviceBase + '/' + customerId).then(processResponse, processError);
        };

        factory.getCustomers = function (index, count) {
            return $http.get(serviceBase + '?index=' + index + '&count=' + count).then(processResponse, processError);
        };

        factory.getCustomerBalance = function (customerId) {
            return $http.get(serviceBase + '/' + customerId + '/balance').then(processResponse, processError);
        };

        factory.getCustomerTransactions = function (customerId) {
            return $http.get(serviceBase + '/' + customerId + '/transactions').then(processResponse, processError);
        };

        factory.createCustomer = function (customer) {
            return $http.post(serviceBase, customer).then(processResponse, processError);
        };

        function processResponse(response){
            var result = response.data;
            return {
                results: result
            };
        }

        function processError(err){
            if(err.status == 0)
                throw 'No response from API!';
            throw err.message;
        }

        return factory;
    };

    customersFactory.$inject = injectParams;

    angular.module('adminApp').factory('customersService', customersFactory);

}());