class commonService{
	constructor($mdToast, $http, $q, userStore){
        this.$mdToast = $mdToast
        this.$http = $http
        this.$q = $q
        this.userStore = userStore;
    }
    successToast(msg) {
        this.$mdToast.show(
            this.$mdToast.simple().textContent(msg).hideDelay(3000).position('top right').theme('success-toast')
        );
    };
    errorToast(msg) {
        this.$mdToast.show(
            this.$mdToast.simple().textContent(msg).hideDelay(3000).position('top right').theme('error-toast')
        );
    };
    persistToast(msg, data){
        this.$mdToast.show(
            this.$mdToast.simple().textContent(msg).hideDelay(15000).position('top right').theme('success-toast')
        ).then((result)=>{
        })
    }
}

commonService.$inject = ['$mdToast', '$http', '$q']
angular.module('homeAutomationApp').service('commonService', commonService)