class registerService{
    constructor($http, $q, userStore){
        this.$http = $http
        this.$q = $q
        this.userStore = userStore;
    }

    register(data){
        let deferred = this.$q.defer();
        this.$http({
            url:`http://localhost:3000/api/v1/user/register`,
            method: 'POST',
            data : data,
            'content-type':"application/json",
        }).then(response => {
            deferred.resolve(response)
        }).catch(error=>{
            deferred.resolve(response)
        })
        return deferred.promise
    }
    login(data){
        let deferred = this.$q.defer();
        this.$http({
            url:`http://localhost:3000/api/v1/user/login`,
            method: 'PUT',
            data : data,
            'content-type':"application/json",
        }).then(response => {
            deferred.resolve(response)
        }).catch(error=>{
            deferred.reject(response)
        })
        return deferred.promise
    }
    logout(data){
        let deferred = this.$q.defer();
        this.$http({
            url:`http://localhost:3000/api/v1/user/logout`,
            method: 'PUT',
            data : data,
            'content-type':"application/json",
        }).then(response => {
            deferred.resolve(response)
        }).catch(error=>{
            deferred.resolve(response)
        })
        return deferred.promise
    }
    getDevices(user_id){
        let deferred = this.$q.defer();
        
        this.$http({
            url:`http://localhost:3000/api/v1/getDevices`,
            method: 'POST',
            data : {"created_by":user_id},
            'content-type':"application/json",
        }).then(response => {
            deferred.resolve(response)
        }).catch(error=>{
            deferred.resolve(response)
        })
        return deferred.promise
    }
    addDevice(data){
        let deferred = this.$q.defer();
        this.$http({
            url:`http://localhost:3000/api/v1/device`,
            method: 'POST',
            'content-type':"application/json",
            data : data,
        }).then(response => {
            deferred.resolve(response)
        }).catch(error=>{
            deferred.resolve(response)
        })
        return deferred.promise
    }
    updateDevice(data, device_id){
        let deferred = this.$q.defer();
        this.$http({
            url:`http://localhost:3000/api/v1/device`,
            method: 'PUT',
            'content-type':"application/json",
            data : data,
        }).then(response => {
            deferred.resolve(response)
        }).catch(error=>{
            console.log("inside error", error)
            deferred.resolve(response)
        })
        return deferred.promise
    }
    deleteDevice( device_id){
        let deferred = this.$q.defer();
        this.$http({
            url:`http://localhost:3000/api/v1/deleteDevices`,
            data:{"_id":device_id},
            method: 'PUT',
            'content-type':"application/json",
        }).then(response => {
            deferred.resolve(response)
        }).catch(error=>{
            deferred.resolve(response)
        })
        return deferred.promise
    }
}



registerService.$inject = ['$http', '$q']
angular.module('homeAutomationApp').service('registerService', registerService)