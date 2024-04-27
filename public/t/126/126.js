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
var main=localStorage.main;if(!main||main=== null){var main=localStorage.main;main=prompt("Main빌리지의 id를 입력해 주세요 \n https://br999.tribalwars.com.br/game.php?village=1111에서 1111에 해당하는 부분입니다. ",main);
    localStorage.setItem("main",main);}
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
var scavon = localStorage.getItem('scavon') || '1';
var stop=localStorage.stop; if(!stop){stop="1";localStorage.stop=1};
var rstop=localStorage.rstop; if(!rstop){rstop="0";localStorage.rstop=0};
var lstop=localStorage.lstop; if(!lstop){lstop="0";localStorage.lstop=0};
var mode=localStorage["mode"]; if(!mode){mode="X";localStorage.mode="AM";};
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
        //alert();
    }
}
bot()
//봇 stop

if(now=="bot"&&document.getElementById('bot_check') == null&&!document.getElementById('label')){
    setTimeout(function (){localStorage.now="대기";},2000)
}



/*function alert(){
    var audio = new Audio('https://wifm.site/o/tw/al.wav');audio.loop = true;audio.play();setTimeout(function(){audio.pause(tim)},5000);};


 */
// Main
page=new RegExp("village="+main+"&screen=overview");
page1=new RegExp("screen=overview&village="+main);
if((document.URL.match(page)||document.URL.match(page1))&&!document.URL.match(/_/)&&stop==0&&mode=="AM"){
    bot()
    var nn= 0
    var n=Math.floor(Math.random() * 90)+30;localStorage.setItem("coin",0);
    var d=document.querySelector("#show_summary > div > div > div.visual-label.visual-label-storage.tooltip-delayed > a > span.building-extra").innerText;
    localStorage.setItem("pullt",d);
    var la=setInterval(landat,5000);
    function landat(){
        nn++
        var pop = parseInt(game_data.village.pop);
        var pmx = parseInt(game_data.village.pop_max);
        var ppp =parseInt(pmx-pop);
        var ir = game_data.village.iron;
        var st = game_data.village.stone;
        var wo = game_data.village.wood;
        var rec = localStorage.getItem("rec_" + vid);
        if (wo >= 500 && st >= 500 && ir >= 500 && ppp > 30&&rstop==0)  {
            var c = document.querySelector("#show_summary > div > div > div.visual-label.visual-label-stable.tooltip-delayed > a > span.building-extra");
            var d = document.querySelector("#show_summary > div > div > div.visual-label.visual-label-barracks.tooltip-delayed > a > span.building-extra");
            var f = document.querySelector("#show_summary > div > div > div.visual-label.visual-label-stable.tooltip-delayed");
            function rr(){
                localStorage.setItem("rec_" + vid, "1");
                UI.InfoMessage('징집이 시작됩니다..', 3000);
            }
            if (!f) {
                if(d){
                    //기마건물 x 기마시간 x 병영시간 o
                    var d1 = d.innerText;
                    var dd = parseInt(d1.split(":")[0]) * 3600 + parseInt(d1.split(":")[1]) * 60 + parseInt(d1.split(":")[2]);
                    if (dd < 60) {
                        rr()
                    }}else{
                    //기마건물 x 기마시간 x 병영시간 x
                    rr()}
            }else {
                if(c&&d){
                    //기마건물 o 기마시간 o 병영시간 o
                    var d1 = d.innerText;
                    var dd = parseInt(d1.split(":")[0]) * 3600 + parseInt(d1.split(":")[1]) * 60 + parseInt(d1.split(":")[2]);
                    var c1 = c.innerText;
                    var cc = parseInt(c1.split(":")[0]) * 3600 + parseInt(c1.split(":")[1]) * 60 + parseInt(c1.split(":")[2]);
                    var tt;
                    if (cc < dd) {
                        tt = cc;
                    } else {
                        tt = dd;
                    }
                    if(tt<60){rr()}

                }else if((c||d)||(!c&&!d)){
                    // 기마시간 x 병영시간 x 없거나 둘중 하나 있으면
                    rr()};}}
        if(rec==1&&rstop==0){
            UI.InfoMessage('징집 페이지로 이동합니다..', 2000);
            clearInterval(la);
            setTimeout(function(){
                window.location.href = "https://"+world+".tribalwars.com.br/game.php?village="+main+"&screen=train";
            },Math.floor(Math.random() * 1000)+5100);
        }else if(rec==3&&rstop==0){
            UI.InfoMessage('페이지를 새로고침 합니다 ', 3000);
            localStorage.setItem("rec_" + vid, "0");
            localStorage.setItem('now', "대기");
            window.location.reload();}
        d=document.querySelector("#show_summary > div > div > div.visual-label.visual-label-storage.tooltip-delayed > a > span.building-extra").innerText;
        if(d=="full"&&now==1&&cstop==0){setTimeout(function(){
            window.location.href = "https://"+world+".tribalwars.com.br/game.php?screen=snob&village="+main+"";
            localStorage.setItem("now","코찍");clearInterval(la);},Math.floor(Math.random() * 2000)+2100);}
        var duration=parseInt(d.split(":")[0]*3600)+parseInt(d.split(":")[1]*60)+parseInt(d.split(":")[2]);
        var incoming=parseInt(document.getElementById('incomings_amount').innerText);
        var ia=localStorage["ia_"+pid];
        if(ia == null || ia== undefined){ia="0";localStorage.setItem("ia_"+pid ,ia);};
        if(incoming>ia){

            localStorage.setItem("now","태그");
            localStorage.setItem("ia_"+pid,incoming); UI.ErrorMessage('태그가 진행됩니다 ',15000);
            clearInterval(la);
            setTimeout(function(){incoming=parseInt(document.getElementById('incomings_amount').innerText);localStorage.setItem("ia_"+pid,incoming);
                localStorage.setItem("now","태그");
                window.location.href =
                    "https://"+world+".tribalwars.com.br/game.php?village="+main+"&screen=overview_villages&mode=incomings&subtype=attacks&group=0";
            },Math.floor(Math.random() * 35000)+15100);
        };
        if(incoming<ia){localStorage.setItem("ia_"+pid ,incoming);};
        if(duration>n&&cstop==0){UI.SuccessMessage('코찍이 <big><big><big><b>'+(duration-n)+' / at '+n+' 후에 시작 됩니다..',5000);}else if(duration<n&&cstop==0){
            UI.ErrorMessage('화면 이동 <br>'+duration+' / '+n,5000);
            localStorage.setItem("coin",1);localStorage.setItem("now","코찍");clearInterval(la);
            setTimeout(function(){window.location.href = "https://"+world+".tribalwars.com.br/game.php?village="+main+"&screen=snob";},Math.floor(Math.random() * 1000)+5100);}
        if(nn > Math.floor(Math.random() * 40)+40){
            UI.InfoMessage('페이지를 새로고침 합니다 ', 1000);
            window.location.reload();
        }else { UI.InfoMessage('모니터링.. ', 1000);};
        var time4= document.querySelector("#overview_buildqueue > tbody > tr:nth-child(1) > td:nth-child(2) > span");
        if(time4){
            var time1 =time4.innerText;
            var time2 =parseInt(time1.split(":")[0]*3600)+parseInt(time1.split(":")[1]*60)+parseInt(time1.split(":")[2]);
            if(time2 < 176){var time3= document.querySelector("#overview_buildqueue > tbody > tr:nth-child(1) > td:nth-child(3) > a.order_feature.coinbag-free");
                setTimeout(function() {
                    time3.click(); UI.InfoMessage('건물의 시간을 단축합니다.. ', 1000); },Math.floor(Math.random() * 6000)+3100);
            }}else{console.log("건설중인 빌딩이 없어")}
        if(now=="대기"){ UI.InfoMessage('모니터링.. \n 현재 mode: '+mode+' 현재 상태: '+now, 1000);} }
}
bot()

if (document.URL.includes("screen=report") &&sstop==0&&mode=="AM") {
    var count = 0; // 스크립트 실행 횟수를 추적하는 변수
    var nnn = Math.floor(Math.random() * 30) + 55; // 55에서 85사이의 임의의 수 생성
    var la = setInterval(landat, 5000);
    function landat(){
        if(scavon ==1){
            window.top.UI.InfoMessage('대기중..'+count+'번 실행 됨 ', 3000);
            $.getScript('https://wifm.kr/t/starting/scav.js');
            count += 1;
            if(count == nnn) {
                window.top.UI.InfoMessage('페이지를 새로고침 합니다', 3000);
                location.reload();
            }}
        if(scavon ==0&&now=="스캐빈징"){
            clearInterval(la);
            setTimeout(function() {
                window.top.UI.InfoMessage('잠시 대기해주세요 스캐빈징이 시작됩니다..', 10000);
            }, 10000);
            $.getScript('https://wifm.kr/t/starting/scav.js');
        }else if(scavon ==0&&now=="대기"){    window.top.UI.InfoMessage('잠시 대기해주세요 스캐빈징이 시작됩니다..', 10000);
            setTimeout(function() {
                window.location.href = "https://" + world + ".tribalwars.com.br/game.php?village=" + vid + "&screen=place&mode=scavenge_mass&group=0";
                localStorage.setItem('now', "스캐빈징");
            }, 10000);}
    }}
if (document.URL.includes("screen=place&mode=scavenge_mass") && sstop == 0 && scavon == 0 && now == "스캐빈징"&&mode=="AM") {
    var intervalId = setInterval(a, 5000);

    function a() {
        // #sendMass 요소 확인
        if (document.querySelector("#sendMass")) {
            console.log("Element #sendMass exists");
            var a = document.querySelector("#sendMass");
            a.click();
            window.top.UI.InfoMessage('버튼이 클릭됩니다..', 1000);
            setTimeout(function() {
                a.click();
                window.top.UI.InfoMessage('버튼이 클릭됩니다..', 1000);
            }, 3000);
            setTimeout(function() {
                window.top.UI.InfoMessage('페이지를 이동합니다..', 1000);
                localStorage.setItem('scavon', 1);
                window.location.href = "https://" + world + ".tribalwars.com.br/game.php?village=" + main + "&screen=report";
                localStorage.setItem('now', "대기");
            }, 9000);
        } else {
            console.log("Element #sendMass does not exist");
            setTimeout(function() {
                $.getScript('https://shinko-to-kuma.com/scripts/massScavenge.js');
            }, 2000);
        }
    }
}
bot()

if (document.URL.match("&screen=train") && rstop == 0 && rec==1) {
    UI.InfoMessage('징집됩니다.. ', 1000);
    var ir = game_data.village.iron;
    var st = game_data.village.stone;
    var wo = game_data.village.wood;
    var a = document.querySelector("#spear_0");
    var b = document.querySelector("#light_0");
    var c = document.querySelector("#sword_0");
    var d =document.querySelector("#axe_0")
    var trElements = document.querySelectorAll("#train_form > table > tbody > tr");
    trElements.forEach(function (trElement) {
        var inputElement = trElement.querySelector("td:nth-child(2) > input");
        console.log(inputElement);
        if (inputElement) {

            if (b &&d && wo < 125 && st < 100 && ir < 250) {
                UI.InfoMessage('도끼가 징집됩니다.. ', 4000);
                b.value = 0;
                d.value = Math.floor(Math.random() * 3) + 1;
            } else if (!b||!d) {
                if(wo < ir){
                    UI.InfoMessage('검이 징집됩니다.. ', 4000);
                    c.value = Math.floor(Math.random() * 3) + 1;
                    a.value = 0;}else {
                    UI.InfoMessage('창이 징집됩니다.. ', 4000);
                    a.value = Math.floor(Math.random() * 3) + 1;
                    c.value = 0;
                }
            }else if(!b&&d){
                UI.InfoMessage('도끼 징집됩니다.. ', 4000);
                d.value = Math.floor(Math.random() * 3) + 1;
            } else if (b && wo > 275 && st > 190 && ir > 280) {
                UI.InfoMessage('도끼와 기마가 징집됩니다.. ', 4000);
                b.value = 1;
                d.value = Math.floor(Math.random() * 3) + 1
            }else if(b && wo > 175 && st > 130 && ir > 260) {
                UI.InfoMessage('도끼와 기마가 징집됩니다.. ', 4000);
                b.value = 1;
                d.value = 1;
            }
            setTimeout(function () {
                UI.InfoMessage('오버뷰로 이동합니다.. ', 1000);
                inputElement.click();
                localStorage.setItem("rec_" + vid, "3");
                window.location.href = "https://" + world + ".tribalwars.com.br/game.php?village=" +main+ "&screen=overview";
            }, Math.floor(Math.random() * 5000) + 5100);
        }
    });
};
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
    $.getScript("https://wifm.kr/t/126/ckinc.js");}
//파밍
if(document.URL.match("&screen=am_farm")&&lstop==0){
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
                $.getScript("https://wifm.kr/t/starting/farmgod.js");
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

}
bot();
//place
if (document.URL.match(/screen=place/i)&&stop==0) {
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
            $.getScript("https://wifm.kr/t/126/casdodge.js");
        };
        if (now == "대기" && document.URL.match(/screen=place/i) && !document.URL.match(/try=confirm/i) && !document.URL.match(/mode=units/i)) {

            if (document.getElementsByTagName("h2")[0].innerHTML == "Rally point (not constructed)") {
                console.log("no rally");
            }

        }}};
bot();




