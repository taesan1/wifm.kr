var blockedMessage = document.querySelector("#error > div.center > div.content.box-border.red > div.inner > div.full-content > h2");
if (blockedMessage && blockedMessage.textContent.includes("Blocked request")) {
    setTimeout(function() {
        window.location.reload(true); // 페이지 새로고침
    }, 5000); // 5초 대기
}
//버튼 설정
var com = localStorage.cmd + "/cmd.js";
var box = document.createElement("div");
box.style.width = "30px";
box.style.height = "30px";
box.style.padding = "0";
box.style.border = "none";
box.style.background = "transparent";

box.style.cursor = "pointer";
box.style.position = "absolute";
box.style.top = "0";
box.style.left = "0";
box.style.zIndex = "9999";

box.addEventListener("click", function() {
    $.getScript(com);
});

var targetElement = document.querySelector("#header_info > tbody > tr > td:nth-child(4) > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td.box-item.icon-box.firstcell");
targetElement.style.position = "relative";
targetElement.appendChild(box);


//플레이어 정보
//이름, 플레이어id, 부족id, 빌라id, 빌라좌표, 현재 그룹, 월드, 유닛, 스크린
var message;
var name=game_data.player.name;var pid=game_data.player.id; var tid=game_data.player.ally; var vid=game_data.village.id; var vcoord=game_data.village.coord;
var world=game_data.world;localStorage.setItem("world",world);var screen=game_data.screen; var unit=game_data.unit; var sitter=game_data.player.sitter;

//페이지,메시지,인커밍 메인
var stop=localStorage.stop; if(!stop){stop="0";localStorage.stop=0};
var page,page1,page2,page3,page4;var tim="";
var dd = Date.parse(Date());
localStorage.incoming_date = dd;
var incoming_open=Date.parse(Date())-localStorage.incoming_date;
var inc=game_data.player.incomings;
var ia=localStorage["ia_"+pid];
if(!ia){ia=inc;localStorage.setItem("ia_"+pid,inc);}console.log("incoming은 "+inc+"  ia는 "+ia);
//딜레이
var delay=localStorage["delay"];
if (!delay){delay=0};
var del=Math.floor((Math.random() * delay));

//모드와 상태
var rec = localStorage.getItem("rec_" + vid);
if (!rec) {
    rec = 0;
    localStorage.setItem("rec_" + vid, "0");
}
var lmode=localStorage.lmode;if(!lmode){lmode="0";localStorage.lmode="0"};
var farmrest=localStorage.farmrest;if(!farmrest){farmrest="5";localStorage.farmrest="5"};
var sstop=localStorage.sstop;if(!sstop){sstop="0";localStorage.sstop="0"};
var cgroup=localStorage.cgroup;if(!cgroup){cgroup="0";localStorage.cgroup="0"}
var scavon = localStorage.getItem('scavon') || '1';
var stop=localStorage.stop; if(!stop){stop="1";localStorage.stop=1};
var rstop=localStorage.rstop; if(!rstop){rstop="0";localStorage.rstop=0};
var lstop=localStorage.lstop; if(!lstop){lstop="0";localStorage.lstop=0};
var cstop=localStorage.cstop; if(!cstop){cstop="1";localStorage.cstop=1};
var mode=localStorage["mode"]; if(!mode){mode="X";localStorage.mode="평시";};
var now=localStorage.now; if(!now){now="대기";localStorage.now="대기";};
if(!now=="대기"){UI.InfoMessage('현재 '+now+'중     모드는 '+mode,2000,'error');}

// 닷지 방어모드 설정
var dip=""; var dodgeid="";
var pla;


// 봇
var add;
var al=localStorage.getItem('al') || '0';
//시터
var cw=window.location.href;
var siiter ="";
console.log(message+ ' ' +name+ '님 현재 빌리지는 '+ vcoord+ ' 입니다. 현재 스크린 위치는 '+screen+' 입니다. \n 모드는 '+mode+' 상태는 '+now+' 모드 실행 여부는 '+stop);
function bot() {
    if (document.getElementById('bot_check') || document.getElementById('label')||document.getElementById("#botprotection_quest") ) {
        localStorage.setItem("now", "bot");clearInterval()
    }
}
bot()
//봇 stop
if(now=="bot"&&document.getElementById('bot_check') == null&&!document.getElementById('label')){
    setTimeout(function (){localStorage.now="대기";},2000)
}

bot();

//incoming
page=new RegExp("screen=overview_villages&mode=incomings&subtype=attacks&group=0");
page1=new RegExp("mode=incomings&action=process&type=unignored&subtype=attacks");
page2=new RegExp("screen=overview_villages&mode=incomings&type=unignored&subtype=attacks");
if(document.URL.match(page)||document.URL.match(page1)||document.URL.match(page2)){
    var monitor_incoming = localStorage["monitor_incoming"];
    if (!monitor_incoming) {
        monitor_incoming = 15;
    };  var dod = localStorage.dodn;
    if(!dod) {
        dod = 4;
        localStorage.dod = 4;
    };
    console.log("checking");
    $.getScript("https://wifm.site/0/tw/tw/ckinc.js");}
//파밍
if(document.URL.match("&screen=am_farm")&&lstop==0&&lmode==0){$.getScript("https://wifm.site/0/tw/enhancer/enhancerAltb4.js");}
else if(document.URL.match("&screen=am_farm")&&lstop==0&&lmode==1){
    var l;
    function farmgod() {
        if (now !== "대기") {
            UI.InfoMessage("현재 상태는 " + now + " 잠시만 기다려주세요.", 5000);
            l = setInterval(farmgod, 10000);
        } else {
            var storedOptions = localStorage.getItem('farmGod_options');
            if (!storedOptions) {
                storedOptions = JSON.stringify({
                    optionGroup: 0,
                    optionDistance: 30,
                    optionTime: 5,
                    optionLosses: true,
                    optionMaxloot: true,
                    optionNewbarbs: false
                });
                localStorage.setItem('farmGod_options', storedOptions);
            }
            bot();
            var farmrest=localStorage.getItem('farmrest') || '5';
            if (farmrest === "done") {
                let parsedOptions = JSON.parse(storedOptions);
                let optionTime1 = parsedOptions ? parsedOptions.optionTime : null;
                if (optionTime1 !== null) {
                    let optionTimeNumber = parseInt(optionTime1, 10) || 5;
                    let result = (optionTimeNumber * 2) + (Math.floor(Math.random() * 16) + 20);
                    localStorage.setItem('farmrest', result);
                }
                UI.InfoMessage("동줍을 재설정합니다 ", 2000);
                l = setInterval(farmgod, 30000);
            } else if (farmrest !== "done" && farmrest === "0" && now == "대기") {
                UI.InfoMessage("동줍이 시작됩니다.. ", 3000);
                clearInterval(l);
                $.getScript("https://wifm.site/0/tw/starting/farmgod.js");
                localStorage.setItem('farmrest', "start");
            } else if (farmrest !== "done" && farmrest !== "0" && farmrest !== "start"&& farmrest !== "wait") {
                let cu = parseInt(localStorage.getItem('farmrest'), 10) || 0;
                if (cu > 0) {
                    localStorage.setItem('farmrest', cu - 1);
                }
                l = setInterval(farmgod, 30000);
                UI.InfoMessage("스크립트 실행까지 " + farmrest + " 번 남았습니다", 20000);
            } else if (farmrest == "start" && now == "대기" &&(!document.querySelector("#popup_box_FarmGod")||!document.querySelector("#content_value > div.vis.farmGodContent"))) {
                clearInterval(l);
                UI.InfoMessage(farmrest + " 시작되지 않고 있습니다.. 대기 후 다시 시작됩니다..", 29000);
                setTimeout(() => {
                    location.reload();
                    localStorage.setItem('farmrest', "0");
                }, 10000);
            } else if(farmrest == "wait" && now == "대기"&&(!document.querySelector("#popup_box_FarmGod")||!document.querySelector("#content_value > div.vis.farmGodContent"))){
                clearInterval(l);
                UI.InfoMessage(farmrest + " 실행되었지만 오류가 생겼습니다.. 대기 후 다시 시작됩니다..", 29000);
                console.log("스크립트 실행 중 자동 새로고침");
                setTimeout(() => {
                    location.reload();
                    localStorage.setItem('farmrest', "done");
                }, 10000);
            }
        }}
    farmgod();


}
bot()
//rally confirmed 화면
page=new RegExp("&screen=place&try=confirm");
if(document.URL.match(page)){
    bot();
    var autovilla=localStorage["auto" + window.game_data.village.id];
    if(!autovilla){autovilla="0";localStorage["auto" + window.game_data.village.id]="0"}
    var autovillasss=localStorage["autosss" + window.game_data.village.id];
    var autovillammm=localStorage["autommm" + window.game_data.village.id];
    var autotime = localStorage["autotime" + window.game_data.village.id];
    var autodelay = localStorage["autodelay" + window.game_data.village.id];
    var inputMs;
    var input;
    var delay;
    var arrInterval;
    var attInterval;
    var delayTime = parseInt(localStorage.delayTime);
    if (isNaN(delayTime)) {
        delayTime = 0;
        localStorage.delayTime = JSON.stringify(delayTime);
    }

    var offsetHtml =
        `<tr>
        <td>
            <style>
            .tooltip .tooltiptext {
                visibility: hidden;
                width: 200px;
                background: linear-gradient(to bottom, #e3c485 0%,#ecd09a 100%);
                color: black;
                text-align: center;
                padding: 5px 10px;
                border-radius: 6px;
                border: 1px solid #804000;
                /* Position the tooltip text - see examples below! */
                position: absolute;
                z-index: 1;
            }

            .tooltip:hover .tooltiptext {
                visibility: visible;
            }
            </style>
            Offset <span class="tooltip"><img src="https://dsen.innogamescdn.com/asset/2661920a/graphic/questionmark.png" style="max-width:13px"/><span class="tooltiptext">Adjusts milliseconds. If you set 500ms and it arrives with 520ms, put "-20" into the offset. Play around with this offset until the time is right.</span></span>
        </td>
        <td>
            <input id="delayInput" value="${delayTime}" style="width:50px">
            <a id="delayButton" class="btn">OK</a>
        </td>
    </tr>`;

    var setArrivalHtml =
        `<tr>
        <td>
            Set arrival:
        </td>
        <td id="showArrTime">
        </td>
    </tr>`;

    var sendAttackHtml =
        `<tr>
        <td>
            Send at:
        </td>
        <td id="showSendTime">
        </td>
    </tr>`;

    var buttons =
        `<a id="arrTime" class="btn" style="cursor:pointer;">Set arrival time</a>
    <a id="sendTime" class="btn" style="cursor:pointer;">Set send time</a>`;

    document.getElementById("troop_confirm_submit").insertAdjacentHTML("afterend", buttons);


    var parentTable = document.getElementById("date_arrival").parentNode.parentNode;
    parentTable.insertAdjacentHTML("beforeend", offsetHtml + setArrivalHtml + sendAttackHtml);

    if (!sessionStorage.setArrivalData) {
        sessionStorage.setArrivalData = "true";
    }

    function setArrivalTime() {
        var arrivalTime;
        arrInterval = setInterval(function () {
            arrivalTime = document.getElementsByClassName("relative_time")[0].textContent;
            if (arrivalTime.slice(-8) >= autovillammm) {
                setTimeout(function () {
                    document.getElementById("troop_confirm_submit").click();
                }, autodelay);
                clearInterval(arrInterval);
            }
        }, 1);
    };
    function setSendTime() {
        var serverTime;
        attInterval = setInterval(function() {
            serverTime = document.getElementById("serverTime").textContent;
            if (serverTime >= input) {
                setTimeout(function() {
                    document.getElementById("troop_confirm_submit").click();
                },  delay);
                clearInterval(attInterval);
            }
        }, 1);
    }
    function ab() {
        var autovillammm = localStorage["autommm" + window.game_data.village.id];
        var arrivalTime;
        arrInterval = setInterval(function() {
            arrivalTime = document.getElementsByClassName("relative_time")[0].textContent;
            if (arrivalTime.slice(-8) >= autovillammm) {
                setTimeout(function() {
                    document.getElementById("troop_confirm_submit").click();
                }, delay);
                clearInterval(arrInterval);
            }
        }, 1);
        localStorage.setItem("auto" + window.game_data.village.id,"1") }
    document.getElementById("arrTime").onclick = function () {
        clearInterval(attInterval)
        var element = document.querySelector("#command-data-form > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > span > a:nth-child(1)");
        var extractedText = element.textContent;
        var match = extractedText.match(/\((\d+\|\d+)\)/);
        var coord = match[1];
        localStorage["auto" + window.game_data.village.id] = coord;
        console.log(coord); // 결과: "248|489"

        var autotime = localStorage["autotime" + window.game_data.village.id];
        var inputFullTime = prompt("출발 시간과 밀리초를 입력하세요 (예: 13:32:16:722)", autotime);
        localStorage.setItem("autotime" + window.game_data.village.id, inputFullTime);

        var inputParts = inputFullTime.split(":");
        var inputTime = inputParts.slice(0, -1).join(":"); // 시간 부분 (13:32:16)
        var inputMs = parseInt(inputParts[inputParts.length - 1]); // 밀리초 부분 (722)

        localStorage["autommm" + window.game_data.village.id] = inputTime;
        localStorage["autosss" + window.game_data.village.id] = inputMs;

        localStorage["autodelay" + window.game_data.village.id] = parseInt(delayTime) + parseInt(inputMs);
        document.getElementById("showArrTime").innerHTML = inputTime + ":" + inputMs.toString().padStart(3, "0");
        document.getElementById("showSendTime").innerHTML = "";

        var arr;
        var interval = 1000; // 초기 간격은 1초로 설정

        arr = setTimeout(function run() {
            delay = parseInt(delayTime) + parseInt(inputMs);
            var time = document.getElementsByClassName("relative_time")[0].textContent.slice(-8);
            localStorage["autommm" + window.game_data.village.id] = inputTime;
            // autovillammm 시간에서 10초를 뺀 값을 생성
            var autovillammmTime = inputTime.split(":");
            var hours = parseInt(autovillammmTime[0]);
            var minutes = parseInt(autovillammmTime[1]);
            var seconds = parseInt(autovillammmTime[2]);
            // 여기 seconds 뒤에 -5 로 되어있는거 변경하심 돼요
            var totalSeconds = hours * 3600 + minutes * 60 + seconds - 10;

            if (totalSeconds < 0) {
                totalSeconds += 86400; // 하루는 24시간 * 60분 * 60초
            }

            hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            minutes = Math.floor(totalSeconds / 60);
            seconds = totalSeconds % 60;

            var autovillammmAdjusted = [
                hours.toString().padStart(2, "0"),
                minutes.toString().padStart(2, "0"),
                seconds.toString().padStart(2, "0")
            ].join(":");

            // arrivalTime의 마지막 8자리와 autovillammmAdjusted를 비교
            if (time.slice(-8) === autovillammmAdjusted) {
                location.reload();
            } else if (time.slice(-8) > autovillammmAdjusted) {
                console.log("작아요");
                ab();
                interval = 10000; // 실행 간격을 5ms로 설정


            }

            // 다음 실행 간격에 따라 재귀 호출
            arr = setTimeout(run, interval);
        }, interval);
    };

    document.getElementById("delayButton").onclick = function () {
        delayTime = parseInt($("#delayInput").val());
        localStorage.delayTime = JSON.stringify(delayTime);
        delay = parseInt(delayTime) + parseInt(inputMs); // setTimeout time
        if (delay < 0) {
            delay = 0;
        }
    }

    document.getElementById("sendTime").onclick = function() {
        clearInterval(arrInterval);
        var time = document.getElementById("serverTime").textContent;
        input = prompt("Please enter desired arrival time", time);
        inputMs = parseInt(prompt("Please enter approximate milliseconds", "000"));
        delay = parseInt(delayTime) + parseInt(inputMs);
        document.getElementById("showSendTime").innerHTML = input + ":" + inputMs.toString().padStart(3, "0");
        document.getElementById("showArrTime").innerHTML ="";
        setSendTime();
    };


    if(autovilla.length > 6){
        clearInterval(attInterval);
        document.getElementById("showArrTime").innerHTML =autotime;
        document.getElementById("showSendTime").innerHTML = "";
        setArrivalTime();
        localStorage.setItem("auto" + window.game_data.village.id,"1")};

//해당 모드일 시에 sumit버튼
    var group = localStorage.group;
    if (mode == "페이크"&&stop==0) {
        document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1"> 페이크 그룹= ' + group + '</FONT><br>';
        console.log("페이크 클릭");
        setTimeout(function () {
            document.forms[0].troop_confirm_submit.click();
        }, del)
    };
    var dodgevilla = localStorage["dodge" + window.game_data.village.id];

    if (mode == "방어"&&stop==0) {
        if (dodgevilla.length > 6) {
            setTimeout(function () {
                document.forms[0].troop_confirm_submit.click();
            }, (1 + Math.random() * 3) * 1000);
        }
    }


}
bot();
//place
if (document.URL.match(/screen=place/i)&&stop==0&& mode !== "OP") {
    var pcount = 0;
    place();
    dip = localStorage["dodge" + window.game_data.village.id];
    if ((!dip || dip == undefined)) {
        var pla = setInterval(place, 5000);
    }
    function place() {
        console.log("command " + pcount + "dip=" + dip);
        pcount++;
        bot();
        now = localStorage.now;
        document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1>  현재 모드는 ' + mode + ' 현재 상태는 ' + now + '</FONT> '

        if (mode == "방어"&&stop==0) {
            clearInterval(pla);
            $.getScript("https://wifm.site/0/tw/tw/casdodge.js");
        };
        if (now == "대기" && document.URL.match(/screen=place/i) && !document.URL.match(/try=confirm/i) && !document.URL.match(/mode=units/i)) {

            if (document.getElementsByTagName("h2")[0].innerHTML == "Rally point (not constructed)") {
                console.log("no rally");
            }
            if (mode == "페이크") {
                clearInterval(pla); console.log("페이크 실행");
                $.getScript("https://wifm.site/0/tw/tw/load.js");
            };
        }}};
bot();