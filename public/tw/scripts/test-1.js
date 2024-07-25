page = new RegExp("&screen=place&try=confirm");
if (document.URL.match(page)) {
    var arrInterval;
    var attInterval;
    // html
    var setArrivalHtml = `<tr>
        <td>
            설정된 도착시간:
        </td>
        <td id="showArrTime">
        </td>
    </tr>`;

    var sendAttackHtml = `<tr>
        <td>
            설정된 출발시간:
        </td>
        <td id="showSendTime">
        </td>
    </tr>
         <td>
             리셋 버튼:
         </td>
         <td style="text-align: left;"><a id="resetButton" class="btn" style="margin-left: 5px;">초기화</a>
         </td>`;
    var buttons = `
    <a id="arrTime" class="btn" style="cursor:pointer;">도착시간 설정</a>
    <a id="sendTime" class="btn" style="cursor:pointer;">출발시간 설정</a>`;
    //html 표시
    document.getElementById("troop_confirm_submit").insertAdjacentHTML("afterend", buttons);
    var parentTable = document.getElementById("date_arrival").parentNode.parentNode;
    parentTable.insertAdjacentHTML("beforeend", setArrivalHtml + sendAttackHtml);
    //함수

    var timed = localStorage.getItem("timed_" + window.game_data.village.id);
    var type = localStorage.getItem("type_" + window.game_data.village.id);
    if (timed) {
        if (type === 'arrTime') {
            timed1 = localStorage.getItem("timed_" + window.game_data.village.id);
            var a = hhmmss(timed1);
            arrInterval = setInterval(setArrivalTime, 1000);
            if (arrInterval) {
                var fixinputMs = a.inputMs + (Timing.offset_from_server - Timing.offset_to_server);
                document.getElementById("showArrTime").innerHTML = a.inputTime + ":" + a.inputMs.toString().padStart(3, "0") + " 조정 오프셋:" + fixinputMs;
                document.getElementById("showSendTime").innerHTML = "";
            }
        } else if (type === 'sendTime') {
            document.getElementById("showSendTime").innerHTML = "";
            document.getElementById("showArrTime").innerHTML = timed;
        }
    }

    document.getElementById("arrTime").onclick = function () {
        timed1 = prompt("출발 시간과 밀리초를 입력하세요 (예: 13:32:16:722)", timed);
        localStorage.setItem("timed" + window.game_data.village.id, timed1);
        localStorage.setItem("type" + window.game_data.village.id, 'arrTime');
        var a = hhmmss(timed1);
        ;console.log("a.inputMs: " + a.inputMs);
        ;console.log("a.total: " + a.total);
        arrInterval = setInterval(setArrivalTime, 1000);
    }

    function setArrivalTime() {
        var timed1 = localStorage.getItem("timed" + window.game_data.village.id)
        var cc = hhmmss(timed1);
        var fixinputMs = cc.inputMs + (Timing.offset_from_server - Timing.offset_to_server);
        var timenow = document.getElementsByClassName("relative_time")[0].textContent.slice(-8);
        console.log("timenow: " + timenow);
        var bb = hhmmss(timenow);
        var diff = cc.total - bb.total;
        console.log("diff :" + diff);

        if (diff <= 0) {
            setTimeout(function() {
                document.forms[0].troop_confirm_submit.click();
            }, cc.inputMs + (Timing.offset_from_server - Timing.offset_to_server));
            clearInterval(arrInterval);
        } else if (5 < diff && diff <= 0) {
            arrInterval = setInterval(setArrivalTime, 10);
        } else if (diff < 10) {
            arrInterval = setInterval(setArrivalTime, 500);
                document.getElementById("showArrTime").innerHTML = cc.inputTime + ":" + cc.inputMs.toString().padStart(3, "0") + " 조정 오프셋:" + fixinputMs;
                document.getElementById("showSendTime").innerHTML = "공격 대기중. 대기해주세요 "
        } else if (15 > diff > 10) {
            clearInterval(arrInterval);
            document.getElementById("showArrTime").innerHTML = cc.inputTime + ":" + cc.inputMs.toString().padStart(3, "0") + " 조정 오프셋:" + fixinputMs;
            document.getElementById("showSendTime").innerHTML = diff + " 초 남았습니다.. 새로고침됩니다 "
                location.reload();
        } else if (diff > 30) {
            arrInterval = setInterval(setArrivalTime, 5000);
            document.getElementById("showArrTime").innerHTML = cc.inputTime + ":" + cc.inputMs.toString().padStart(3, "0") + " 조정 오프셋:" + fixinputMs;
            document.getElementById("showSendTime").innerHTML = diff + " 초 남았습니다.. 새로고침됩니다 "
        }
    }

    function hhmmss(inputfull) {
        var input = inputfull.split(":");
        var inputTime = input.join(":");// 시간 부분 (13:32:16)
        var inputMs = parseInt(input[input.length - 1]); // 밀리초 부분 (722)
        var hours = parseInt(input[0]);
        var minutes = parseInt(input[1]);
        var seconds = parseInt(input[2]);
        var total = hours * 3600 + minutes * 60 + seconds

        return {
            inputTime: inputTime, inputMs: inputMs, hours: hours, minutes: minutes, seconds: seconds, total: total
        };
    }

    function setSendTime() {
        var serverTime;
        attInterval = setInterval(function () {
            serverTime = document.getElementById("serverTime").textContent;
            if (serverTime >= input) {
                setTimeout(function () {
                    document.getElementById("troop_confirm_submit").click();
                }, delay);
                clearInterval(attInterval);
            }
        }, 1);
    }

    document.getElementById("resetButton").onclick = function () {
        delete localStorage["autotime" + window.game_data.village.id];
        location.reload();
    }

}