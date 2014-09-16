(function () {

    var injectParams = ['config', '$http'];

    var customersFactory = function (config, $http) {
        var serviceBase = config.apiHost + '/users', factory = {};

        factory.getCustomerById = function (customerId) {
            return $http.get(serviceBase + '/' + customerId).then(function (response) {
                var cust = response.data;
                return {
                    results: cust
                };
            });
        };

        factory.getCustomers = function () {
            return $http.get(serviceBase).then(function (response) {
                var custs = response.data;
                return {
                    results: custs
                };
            });
        };

        factory.getCustomerBalance = function (customerId) {
            return $http.get(serviceBase + '/' + customerId + '/balance').then(function (response) {
                var balance = response.data;
                return {
                    results: balance
                };
            });
        };

        factory.getCustomerTransactions = function (customerId) {
            return $http.get(serviceBase + '/' + customerId + '/transactions').then(function (response) {
                var transactions = response.data;
                return {
                    results: transactions
                };
            });
        };

        factory.createCustomer = function (customer) {
            return $http.post(serviceBase, customer).then(function (response) {
                var result = response.data;
                return {
                    results: result
                };
            });
        };

        // factory.getCustomersSummary = function (pageIndex, pageSize) {
        //     return getPagedResource('customersSummary', pageIndex, pageSize);
        // };

        // factory.getCustomer = function (id) {
        //     //then does not unwrap data so must go through .data property
        //     //success unwraps data automatically (no need to call .data property)
        //     return $http.get(serviceBase + id).then(function (results) {
        //         extendCustomers([results.data]);
        //         return results.data;
        //     });
        // };


        return factory;
    };

    customersFactory.$inject = injectParams;

    angular.module('adminApp').factory('customersService', customersFactory);

}());