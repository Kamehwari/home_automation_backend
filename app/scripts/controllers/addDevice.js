'use strict';


angular.module('homeAutomationApp')
.controller('addDeviceCtrl', ['$scope', '$rootScope', '$state', 'ngProgressFactory','registerService','commonService',
    function ($scope, $rootScope, $state, ngProgressFactory,registerService, commonService) {
        console.log("inside looooooooooooooooooooooo")
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $scope.buttonTextVisiblity = 'visible';
        
        $scope.addDevice = ()=>{
            let obj = {"name":$scope.name, "state":$scope.state, "created_by":$rootScope.email}
            registerService.addDevice(obj).then(result =>{
                console.log("////////", result.data.data.status)
                if(result.data.data.status){
                    commonService.successToast(result.data.message);
                    $state.go('dashboard');
                }else{
                    commonService.errorToast(result.data.data.error);
                }
            }).catch(error =>{
                console.log(error)
                commonService.errorToast('Something went wrong. Try later.');
            })               
        }
    }
]);