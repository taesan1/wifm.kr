var setArrivalHtml =
            `<tr>
        <td>
            설정된 도착시간:
        </td>
        <td id="showArrTime">
        </td>
    </tr>
<tr>
<td>
 리셋 버튼: 
</td>
<td style="text-align: left;"><a id="resetButton" class="btn" style="margin-left: 5px;">초기화</a></td>`;

        var parentTable = document.getElementById("date_arrival").parentNode.parentNode;
        parentTable.insertAdjacentHTML("beforeend",setArrivalHtml);
        var time =localStorage.getItem("autotime" + window.game_data.village.id);
        if (time){
            var inputFullTime=localStorage.getItem("autotime" + window.game_data.village.id);
            var inputParts = inputFullTime.split(":");
            console.log("inputParts: " + inputParts);
            var inputTime = inputParts.slice(0, -1).join(":");
            console.log("inputTime: " + inputTime);// 시간 부분 (13:32:16)
            var inputMs = parseInt(inputParts[inputParts.length - 1]);
            console.log("inputMs: " + inputMs); // 밀리초 부분 (722)
            document.getElementById("showArrTime").innerHTML = inputTime + ":" + inputMs.toString().padStart(3, "0");
        }else {
            var element = document.querySelector("#command-data-form > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > span > a:nth-child(1)");
            var extractedText = element.textContent;
            var match = extractedText.match(/\((\d+\|\d+)\)/);
            var coord = match[1];
            var autotime = localStorage["autotime" + window.game_data.village.id];
            var inputFullTime = prompt("도착 시간과 밀리초를 같이 입력하세요 (예: 13:32:16:722)", autotime);
            localStorage.setItem("autotime" + window.game_data.village.id, inputFullTime);
            var inputParts = inputFullTime.split(":");
            console.log("inputParts: " + inputParts);
            var inputTime = inputParts.slice(0, -1).join(":");
            console.log("inputTime: " + inputTime);// 시간 부분 (13:32:16)
            var inputMs = parseInt(inputParts[inputParts.length - 1]);
            console.log("inputMs: " + inputMs); // 밀리초 부분 (722)
            document.getElementById("showArrTime").innerHTML = inputTime + ":" + inputMs.toString().padStart(3, "0");
        }
   document.getElementById("resetButton").onclick = function () {
  delete localStorage["autotime" + window.game_data.village.id];
  location.reload();
}
        function setArrivalTime(mmm, sss) {
            var arrivalTime;
            var ssss= sss - Timing.offset_to_server +20
            arrInterval = setInterval(function () {
                arrivalTime = document.getElementsByClassName("relative_time")[0].textContent;
                if (arrivalTime.slice(-8) >= mmm) {
                    setTimeout(function () {
                        document.getElementById("troop_confirm_submit").click();
                        delete localStorage["autotime" + window.game_data.village.id];
                    }, ssss);
                    clearInterval(arrInterval);
                }
            }, 1);
        };
        setArrivalTime(inputTime, inputMs);

