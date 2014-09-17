(function () {

    var injectParams = ['$scope', '$location', '$filter', '$window', '$timeout', 'dataService'];

    var CustomersController = function ($scope, $location, $filter, $window, $timeout, dataService) {

        $scope.customers = [];

        $scope.newCustomer = {
            first_name: null,
            last_name: null,
            username: null,
            password: '1234'
        };

        $scope.selectedCustomer = null;
        $scope.selectedCustomerBalance = null;
        $scope.selectedCustomerTransactions = null;
        $scope.filteredCustomers = [];
        $scope.filteredCount = 0;
        $scope.orderBy = 'lastName';
        $scope.reverse = false;
        $scope.searchText = null;
        $scope.registerSelected = false;

        //paging
        $scope.totalRecords = 0;
        $scope.pageSize = 10;
        $scope.currentPage = 1;

        $scope.navigate = function (url) {
            $location.path(url);
        };

        $scope.searchTextChanged = function () {
            filterCustomers($scope.searchText);
        };

        $scope.customerSelected = function (customerId) {
            if (customerId != null) {
                $scope.selectedCustomer = getCustomerById(customerId);
                getCustomerBalance(customerId);
            }
        };

        $scope.registerCustomer = function () {
            dataService.customers.createCustomer($scope.newCustomer)
                .then(function (data) {
                    $scope.registerSelected = false;
                }, function (error) {
                    $window.alert('An error occurred: ' + error.message);
                });

        };

        function init() {
            getCustomers();
        }

        function getCustomers() {
            dataService.customers.getCustomers()
                .then(function (data) {
                    $scope.customers = data.results;
                    filterCustomers('');
                }, function (error) {
                    $window.alert('An error occurred: ' + error);
                });
        }

        function getCustomerBalance(id) {
            dataService.customers.getCustomerBalance(id)
                .then(function (data) {
                    $scope.selectedCustomerBalance = data.results;
                }, function (error) {
                    $window.alert('An error occurred: ' + error);
                });
        }

        function filterCustomers(filterText) {
            $scope.filteredCustomers = $filter("nameFilter")($scope.customers, filterText);
            $scope.filteredCount = $scope.filteredCustomers.length;
        }

        function getCustomerById(id) {
            for (var i = 0; i < $scope.customers.length; i++) {
                var cust = $scope.customers[i];
                if (cust.id === id) {
                    return cust;
                }
            }
            return null;
        }

        init();
    };

    CustomersController.$inject = injectParams;

    angular.module('adminApp').controller('CustomersController', CustomersController);

}());