var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope, $http) {
    $http.get('/api/sites')
        .then(function(response) {
            $scope.myData = response.data.sites;
        }, function() {
            console.log(response.error);
    });

    $scope.refresh = function () {
        $http.get('/api/sites')
            .then(function(response) {
                $scope.myData = response.data.sites;
            }, function() {
                //console.log(response.error);
        });
    };

    $scope.remove = function(site_id) {
        swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(function() {
            $http.delete('/api/sites/' + site_id, {params: {site_id: site_id}})
                .then(function(response) {
                    console.log("delete posted");
                    $scope.refresh();
                    //$scope.myData = response.data.sites;
                }, function() {
                    console.log(response.error);
            });
            swal(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );
        })
    };

    $scope.formData = {};
    $scope.update = function(site_id) {
        $http.put('/api/sites/' + site_id, $scope.formData)
            .then(function(response) {
                console.log($scope.formData);
                $scope.refresh();
                //$scope.myData = response.data.sites;
            }, function() {
               console.log(response.error);
        });
    };
});

app.controller('FormCtrl', function($scope, $http) {
    $scope.formData = {};

    $scope.addSite = function() {
        $http.post('/api/sites', $scope.formData)
            .then(function(data) {
                console.log($scope.formData);
                $scope.formData = {}; // clear the form so our user is ready to enter another
                swal(
                    'Good job!',
                    'Site was added!',
                    'success'
                );
            });
    };
});

// .then(function successCallback(response) {
//     // this callback will be called asynchronously
//     // when the response is available
//   }, function errorCallback(response) {
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//   });
