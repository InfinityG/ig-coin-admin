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

        $scope.depositAmount = 0;
        $scope.withdrawalAmount = 0;

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
        $scope.totalPages = 0;
        $scope.pageRecords = 0;
        $scope.pageSize = 3;
        $scope.pageIndex = 1;
        $scope.startIndex = 0;
        $scope.endIndex = 0;

        $scope.navigate = function (url) {
            $location.path(url);
        };

        $scope.searchTextChanged = function () {
            filterCustomers($scope.searchText);
        };

        $scope.pageChanged = function (page) {
            if ($scope.pageIndex == 1 && page == -1)
                return;

            $scope.pageIndex += page;
            getCustomers();
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
                    $window.alert('An error occurred: ' + error);
                });

        };

        $scope.createDeposit = function(){
            dataService.transactions.createDeposit({user_id:$scope.selectedCustomer.id, amount:$scope.depositAmount})
                .then(function(data){
                    $scope.depositAmount = 0;
                    getCustomerBalance($scope.selectedCustomer.id)
                },
                function(error){
                    $window.alert('An error occurred: ' + error);
                }
            )
        };

        function init() {
            getCustomers();
        }

        function getCustomers() {
            $scope.currentPageSize = 0;

            dataService.customers.getCustomers($scope.pageIndex, $scope.pageSize)
                .then(function (data) {
                    $scope.customers = data.results['users'];
                    $scope.totalPages = data.results['total_page_count'];
                    $scope.pageIndex = data.results['current_page'];
                    $scope.totalRecords = data.results['total_record_count'];
                    $scope.pageRecords = data.results['page_record_count'];
                    $scope.startIndex = data.results['start_index'] + 1;
                    $scope.endIndex = data.results['end_index'] + 1;
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