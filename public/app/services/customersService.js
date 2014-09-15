(function () {

    var injectParams = ['config', '$http'];

    var customersFactory = function (config, $http) {
        var serviceBase = config.apiHost + '/users', factory = {};

        factory.getCustomers = function () {
            return $http.get(serviceBase).then(function (response) {
                var custs = response.data;
                return {
                    results: custs
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