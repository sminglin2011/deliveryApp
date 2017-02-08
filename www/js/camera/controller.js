(function(angular) {
    'use strict';

    angular
        .module('camera')
        .controller('cameraController', controller);

    controller.$inject = [];

    function controller() {
        /* jshint validthis: true */
        var vm = this;
        var _video = null,
            patData = null;

        vm.showDemos = false;
        vm.edgeDetection = false;
        vm.mono = false;
        vm.invert = false;

        vm.patOpts = {x: 0, y: 0, w: 25, h: 25};

        // Setup a channel to receive a video property
        // with a reference to the video element
        // See the HTML binding in main.html
        vm.channel = {};

        vm.webcamError = false;

        vm.myChannel = {
            // the fields below are all optional
            videoHeight: 800,
            videoWidth: 600,
            video: null // Will reference the video element on success
        };
        vm.onError = function (err) {
            vm.$apply(
                function () {
                    vm.webcamError = err;
                }
            );
        }
        vm.onStream = function (stream) {
            // The video element contains the captured camera data
            _video = vm.channel.video;
            vm.$apply(function() {
                vm.patOpts.w = _video.width;
                vm.patOpts.h = _video.height;
                vm.showDemos = true;
            });
        };
        vm.onSuccess = function () {};
        vm.makeSnapshot = function makeSnapshot() {
            console.log("coming");
            if (_video) {
                var patCanvas = document.querySelector('#snapshot');
                if (!patCanvas) return;

                patCanvas.width = _video.width;
                patCanvas.height = _video.height;
                var ctxPat = patCanvas.getContext('2d');

                var idata = getVideoData(vm.patOpts.x, $scope.patOpts.y, vm.patOpts.w, vm.patOpts.h);
                ctxPat.putImageData(idata, 0, 0);

                sendSnapshotToServer(patCanvas.toDataURL());

                patData = idata;
            }
        };
        vm.downloadSnapshot = function downloadSnapshot(dataURL) {
            window.location.href = dataURL;
        };
        var getVideoData = function getVideoData(x, y, w, h) {
            var hiddenCanvas = document.createElement('canvas');
            hiddenCanvas.width = _video.width;
            hiddenCanvas.height = _video.height;
            var ctx = hiddenCanvas.getContext('2d');
            ctx.drawImage(_video, 0, 0, _video.width, _video.height);
            return ctx.getImageData(x, y, w, h);
        };
        /**
         * This function could be used to send the image data
         * to a backend server that expects base64 encoded images.
         *
         * In this example, we simply store it in the scope for display.
         */
        var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
            vm.snapshotData = imgBase64;
        };
        (function() {
            var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            window.requestAnimationFrame = requestAnimationFrame;
        })();
        var start = Date.now();

        /**
         * Apply a simple edge detection filter.
         */
        function applyEffects(timestamp) {
            var progress = timestamp - start;

            if (_video && vm.edgeDetection) {
                var videoData = getVideoData(0, 0, _video.width, _video.height);

                var resCanvas = document.querySelector('#result');
                if (!resCanvas) return;

                resCanvas.width = _video.width;
                resCanvas.height = _video.height;
                var ctxRes = resCanvas.getContext('2d');
                ctxRes.putImageData(videoData, 0, 0);

                // apply edge detection to video image
                Pixastic.process(resCanvas, "edges", {mono:vm.mono, invert:vm.invert});
            }

            if (progress < 20000) {
                requestAnimationFrame(applyEffects);
            }
        }

        requestAnimationFrame(applyEffects);
    }

})(angular);
