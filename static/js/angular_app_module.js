var uberCCApp = angular.module('uberCCApp', ['ngResource']);

uberCCApp.config(function ($httpProvider) {
    $httpProvider.defaults.headers.post['X-CSRFToken'] = csrftoken;
});
