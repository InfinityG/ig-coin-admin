/**
 * Created by grant on 16/09/2014.
 */
(function () {

    var nameFilter = function () {

        return function (customers, filterValue) {
            if (!filterValue) return customers;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < customers.length; i++) {
                var cust = customers[i];
                if (cust.first_name.toLowerCase().indexOf(filterValue) > -1 ||
                    cust.last_name.toLowerCase().indexOf(filterValue) > -1  ||
                    cust.id.toString().indexOf(filterValue) > -1) {

                    matches.push(cust);
                }
            }
            return matches;
        };
    };

    angular.module('adminApp').filter('nameFilter', nameFilter);

}());