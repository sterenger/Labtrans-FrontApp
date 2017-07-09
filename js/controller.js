var App = angular.module('controllers', []);

App.controller('ReadCtrl', function($scope, Reservations, $route) {
    $scope.reservations = [];
    $scope.notFound = false;

    //Get reservations list
    Reservations.read().then(function(data) {
        $scope.reservations = data.data;
        if (data.data.length == 0) {
            $scope.notFound = true;
        }
    }, function(data) {

        console.log("data", data);
    });


    // Delete selected reservations 
    $scope.deleteMultiple = function() {
        var arraySelected = [];
        var valueSelected = $("input[name=checkElement]:checked").map(function() {
            return this.value;
        }).get();
        if (valueSelected == 0) {
            bootbox.alert("Please select a reservation to delete :) ");
        } else {
            bootbox.confirm({
                message: "You want to remove this reservation definitely ?",
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'No',
                        className: 'btn-danger'
                    }
                },
                callback: function(result) {
                    if (result == true) {
                        for (var i = 0; i <= valueSelected.length - 1; i++) {
                            console.log(valueSelected[i]);
                            Reservations.delete(valueSelected[i]).then(function(data) {

                                //console.log(data);
                                $route.reload();
                            });

                        }

                    } else {

                    }
                }
            });
        }

    }

    //Delete one reservation
    $scope.delete = function(id) {
        bootbox.confirm({
            message: "You want to remove this reservation definitely ?",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: function(result) {
                if (result == true) {
                    Reservations.delete(id).then(function(data) {
                        console.log(data);
                        $route.reload();
                    });
                } else {

                }
            }
        });

    }

});

App.controller('CreateCtrl', function($scope, Reservations, $location) {
    
    //Insert a new reservation
    $scope.addReservation = function(responsable, local, room, startDate, finishDate, personsNumber, description) {
        var data = {
            responsable: responsable,
            local: local,
            room: room,
            startDate: startDate,
            finishDate: finishDate,
            personsNumber: personsNumber,
            description: description
        };
        var curDate = new Date();

  		// Verifying the date of reservation
        if ((startDate >= curDate - 1) && (finishDate >= startDate)) {

            Reservations.create(data).then(function(data) {
                console.log(data);
                $location.path('/');
            });
        } else {
            bootbox.alert("Please verify the Date :) ");
            document.getElementById("startDate").style.backgroundColor = "yellow";
            document.getElementById("finishDate").style.backgroundColor = "yellow";
        }

    }
});

App.controller('EditCtrl', function($scope, Reservations, $routeParams, $location) {

	//Update existing reservation
    var id = $routeParams.id;
    Reservations.profile(id).then(function(data, startDate, finishDate) {
        $scope.item = data.data;
        $scope.item.startDate = new Date($scope.item.startDate);
        $scope.item.finishDate = new Date($scope.item.finishDate);
    })
    $scope.update = function(item) {
        var curDate = new Date();
        console.log(item);

        // Verifying date
        if ((item.startDate >= curDate) && (item.finishDate >= item.startDate)) {

            Reservations.update(item, item.id).then(function(data) {
                $location.path('/');

            });
        } else {
            bootbox.alert("Please verify the Date :) ");
            document.getElementById("startDate").style.backgroundColor = "yellow";
            document.getElementById("finishDate").style.backgroundColor = "yellow";
        }
    }
});
