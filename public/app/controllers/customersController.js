(function(){

	var injectParams = ['$scope', '$location', '$filter', '$window', '$timeout', 'dataService'];

	var CustomersController = function($scope, $location, $filter, $window, $timeout, dataService){

		$scope.customers = [];
		$scope.orderBy = 'lastName';
		$scope.reverse = false;
		$scope.searchText = null;

		//paging
		$scope.totalRecords = 0;
		$scope.pageSize = 10;
		$scope.currentPage = 1;

		$scope.pageChanged = function(page){
			$scope.currentPage = page;
			getCustomersSummary();
		};

		$scope.navigate = function(url){
			$location.path(url);
		};

		function init(){
			getCustomers();
		}

		function getCustomers(){
			dataService.getCustomers()
			.then(function(data){
					$scope.customers = data.results;
				}, function(error){
					$window.alert('An error occurred: ' + error);
				});
		}

		// function getCustomersSummary() {
		// 	dataService.getCustomersSummary($scope.currentPage - 1, $scope.pageSize)
		// 	.then(function (data) {
		// 		$scope.customers = data.results;
	 //                // filterCustomers(''); //Trigger initial filter

	 //                // $timeout(function () {
	 //                //     $scope.cardAnimationClass = ''; //Turn off animation since it won't keep up with filtering
	 //                // }, 1000);

		// 	}, function (error) {
		// 		$window.alert('Sorry, an error occurred: ' + error.data.message);
		// 	});
		// };

        // function filterCustomers(filterText) {
        //     $scope.filteredCustomers = $filter("nameCityStateFilter")($scope.customers, filterText);
        //     $scope.filteredCount = $scope.filteredCustomers.length;
        // }

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