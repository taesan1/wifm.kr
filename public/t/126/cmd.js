javascript:
    var group = localStorage.group;
if (group == "null") {
    group = 1;
}
var md = localStorage.mdt;
if (md == "null") {
    md = 0;
}
var now = localStorage.now;
var mode = localStorage.mode;
var stop = localStorage.stop;
if (!stop) {
    stop = "0";
    localStorage.stop = "0";
}

//모드 세팅
var mdd = prompt("1= 중지/실행 \n5= 동줍 설정\n66= 자원밸런스 \n666= 자원보내기(그룹) \n77= 코찍자원당기기 \n9= 랠리포인트 초기화 \n11= 메인빌리지 설정 \n111= 팜갓 동줍재설정 \n99= 대기 상태  \n12= 전체 초기화", md);
localStorage.setItem("mdt", mdd);
if (mdd == 1) {
    if (stop == 0) {
        localStorage.setItem("stop", "1");
        UI.ErrorMessage('중지 ', 1000);
    } else {
        localStorage.setItem("stop", "0");
        UI.SuccessMessage('시작 ', 1000);
    }
    ;
}
else if (mdd == 5) {
    UI.SuccessMessage('AM 모드가 활성 되었습니다.\n모드를 다른 모들 변경을 하여도 설정은 유지되며,\n메인빌리지에 위치하면 작동됩니다', 3000);
    var lstop = localStorage.lstop;
    if (!lstop) {lstop = "1";}
    g1 = prompt("동줍기능을 켜시겠습니까? \n 예: 0 \n 아니오: 1 ", lstop);
    localStorage.lstop=g1;
    var rstop = localStorage.rstop;
    if (!rstop) {rstop = "1";}
    g2 = prompt("징집기능을 켜시겠습니까? \n 예: 0 \n 아니오: 1 ", rstop);
    localStorage.rstop=g2;
    g5 = prompt("스캐빈징기능을 켜시겠습니까? \n 예: 0 \n 아니오: 1 ", sstop);
    localStorage.sstop=g5;
    localStorage.setItem("now", "대기");localStorage.setItem("mode", "AM");
    var main = localStorage.main;
    if (!main || main === null) {
        main = localStorage.main;
        main = prompt("Main빌리지의 id를 입력해 주세요 \n https://en999.tribalwars.net/game.php?village=1111에서 1111에 해당하는 부분입니다. ", main);
        localStorage.setItem("main", main);
    }
    var sitter = "";
    var link = window.location.href;
    var villageid = game_data.village.id;
    if (/t=/g.test(link)) {
        sitter = "t=" + (link.split("t=")[1]).split("&")[0];
    }
    if (sitter === "") {
        link = document.URL.split('?')[0] + "?village=" + main + "&screen=overview&group=0";
    } else {
        link = document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid + "&screen=overview&group=0";
    }

    if (link !== window.location.href) {
        window.location.href=link
    }
} else if (mdd == 9){
    delete localStorage["autosss" + window.game_data.village.id];
    delete localStorage["autommm" + window.game_data.village.id];
    delete localStorage["autotime" + window.game_data.village.id];
    delete localStorage["autodelay" + window.game_data.village.id];
    delete localStorage["auto" + window.game_data.village.id];
    delete localStorage["dodge" + window.game_data.village.id];
    delete localStorage["dodger" + window.game_data.village.id];
    delete localStorage["dodget" + window.game_data.village.id];
    delete localStorage["nearcoord_"+window.game_data.village.id];
    delete localStorage["ddd" + window.game_data.village.id];}
else if (mdd == 11){
    var main = localStorage.main;
    g1 = prompt("메인 빌리지ID를 입력하세요", main);
    localStorage.setItem("main", g1);
    UI.SuccessMessage('메인 빌리지가 설정되었습니다. ',1000);
}
else if (mdd == 12){
    UI.SuccessMessage('로컬스토리지가 초기화 되었습니다 ',1000)
    localStorage.clear();
}else if (mdd == 77) { $.getScript("https://wifm.kr/t/starting/respull.js")}
else if (mdd == 66) { $.getScript('https://wifm.kr/t/starting/resb.js');}
else if (mdd == 666) { $.getScript('https://wifm.kr/t/starting/sender.js');}
else if (mdd ==111){localStorage.setItem('farmrest', "0"); location.reload();}
else if (mdd ==99){localStorage.setItem('now', "대기"); location.reload();}