import * as React from 'react';
import './QRCode.css';
import 'https://rawgit.com/sitepoint-editors/jsqrcode/master/src/qr_packed.js';

const Solve = () => {
    const qrcode = window.qrcode;

    const video = document.createElement("video");
    const canvasElement = document.getElementById("qr-canvas");
    const canvas = canvasElement.getContext("2d");

    const qrResult = document.getElementById("qr-result");
    const outputData = document.getElementById("outputData");
    const btnScanQR = document.getElementById("btn-scan-qr");

    let scanning = false;

    qrcode.callback = (res) => {
        if (res) {
            outputData.innerText = res;
            scanning = false;

            video.srcObject.getTracks().forEach(track => {
                track.stop();
            });

            qrResult.hidden = false;
            btnScanQR.hidden = false;
            canvasElement.hidden = true;
        }
    };

    btnScanQR.onclick = () => {
        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "environment" } })
            .then(function (stream) {
                scanning = true;
                qrResult.hidden = true;
                btnScanQR.hidden = true;
                canvasElement.hidden = false;
                video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
                video.srcObject = stream;
                video.play();
                Tick();
                Scan();
            });
    };

    const Tick = () => {
        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

        scanning && requestAnimationFrame(Tick);
    }

    const Scan = () => {
        try {
            qrcode.decode();
        } catch (e) {
            setTimeout(Scan, 300);
        }
    }
}

const QRCode = () => {
    return (
        <>
            <div id="container">
                <h3>QR Code Scanner</h3>
                <a id="btn-scan-qr">
                    <img src="https://uploads.sitepoint.com/wp-content/uploads/2017/07/1499401426qr_icon.svg" />
                </a >

                <canvas hidden="" id="qr-canvas"></canvas>

                <div id="qr-result" hidden="">
                    <b>Data:</b> <span id="outputData"></span>
                </div>

            </div>
        </>
    )
}

export default QRCode;