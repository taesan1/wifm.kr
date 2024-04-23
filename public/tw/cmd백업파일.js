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
var mdd = prompt("1= 중지/실행 \n2= 모드(페이크/방어/OP/기본) \n3= 페이크 좌표 설정 \n4= op플랜 설정 \n5= 동줍 설정\n66= 자원밸런스 \n666= 자원보내기(그룹) \n7= 유닛 회군 \n77= 코찍자원당기기 \n9= 랠리포인트 초기화 \n10= 자체스택확인 \n11= 메인빌리지 설정  \n12= 전체 초기화", md);
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
else if (mdd == 2) {
    //모드
    var mddd = localStorage.mdddt;
    if (mddd == "null") {
        mddd = 0
    };
    var mdddd = prompt("0= 평시 \n1= 페이크 \n2= 방어(닷지) \n3= OP \n4= AM \n5= 모드/상태 초기화", mddd);
    localStorage.setItem("mdddt", mdddd);
    if (mode != 0) {
        mode = 0
        localStorage.setItem("mode", "기본");
    };
    if (mdddd == 0) {
        var group = localStorage.group;
        localStorage.setItem("mode", "평시");
        localStorage.setItem("now", "대기");
        UI.SuccessMessage('평시 모드가 활성화 되었습니다. ',1000)
    }
    else if (mdddd == 1) {
        var group = localStorage.group;
        g1 = prompt("페이크를 보낼 그룹의 넘버를 입력하세요 = ", group);
        localStorage.setItem("group", g1);
        localStorage.setItem("mode", "페이크");
        localStorage.setItem("now", "대기");
        UI.SuccessMessage('페이크 모드가 활성화 되었습니다. ',1000)
    } else if(mdddd==2){
        var dodn = localStorage["dod"];
        if(!dodn){dodn =4;}
        dodn = prompt("닷지 시간을 입력해 주세요(1~4분 추천)", dodn);
        localStorage["dodn"] = dodn;
        var monitor_incoming = localStorage["monitor_incoming"];
        if (!monitor_incoming) {
            monitor_incoming = 25;
        }
        monitor_incoming = prompt("모니터링 새로고침 (5~25초 추천)", monitor_incoming);
        localStorage["monitor_incoming"] = monitor_incoming;
        localStorage.setItem("mode", "방어");
        localStorage.setItem("now", "대기");
        UI.SuccessMessage('방어 모드가 활성화 되었습니다. ',1000)
    }else if(mdddd==3){
        var opgroup=localStorage.opgroup;
        g1= prompt("op그룹의 넘버를 입력하세요", opgroup);
        localStorage.setItem("opgroup", g1);
        var optype=localStorage.optype;if(!optype){optype="nuke",localStorage.optype="nuke"};
        g2= prompt("op타입을 입력해주세요 nuke/fang ", optype);
        localStorage.setItem("optype", g2);
        localStorage.setItem("now", "대기");localStorage.setItem("mode", "OP");
        UI.SuccessMessage('OP모드가 활성화 되었습니다. ',1000)
    }else if(mdddd==4){
        UI.SuccessMessage('AM 모드가 활성 되었습니다.\n모드를 다른 모들 변경을 하여도 설정은 유지되며,\n메인빌리지에 위치하면 작동됩니다', 3000);
        var lstop = localStorage.lstop;
        if (!lstop) {lstop = "1";}
        g1 = prompt("동줍기능을 켜시겠습니까? 예:0 아니오:1 ", lstop);
        localStorage.lstop=g1;
        var lmode=localStorage.lmode;
        if (!lmode){lmode="0"}
        g7= prompt("어떤 동줍을 사용하시겠습니까? LA런처(기존버전):0 farmgod:1",lmode);
        localStorage.lmode=g7
        var rstop = localStorage.rstop;
        if (!rstop) {rstop = "1";}
        g2 = prompt("징집기능을 켜시겠습니까? 예:0 아니오:1 ", rstop);
        localStorage.rstop=g2;
        var cstop = localStorage.cstop
        if (!cstop) {cstop = "1";}
        g3 = prompt("코찍기능을 켜시겠습니까? 예:0 아니오:1 ", cstop);
        localStorage.cstop=g3;
        var cgroup=localStorage.cgroup;
        if(!cgroup){cgroup="0";}
        g4 = prompt("코찍할 그룹의 id값을 입력해주세요 ", cgroup);
        localStorage.cgroup=g4
        if (!sstop) {sstop = "1";}
        g5 = prompt("스캐빈징기능을 켜시겠습니까? 예:0 아니오:1 ", sstop);
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
    }else if(mdddd==5){
        localStorage.setItem("now", "대기");localStorage.setItem("mode", "평시");
        UI.SuccessMessage('모드와 상태가 초기화 되었습니다. ',1000)
    }
}
else if (mdd == 3) {
    //페이크 그룹 설정
    $.getScript("https://wifm.site/tw/setcoord.js");
}
else if (mdd == 4) {
    //op플랜
    $.getScript("https://wifm.site/tw/op/opplan.js");
}
else if (mdd == 5) {
    var fg = localStorage.fg; if(!fg){fg="0"};
    g1 = prompt("동줍에 사용할 그룹의 id를 입력해주세요 URL에 group= 다음 숫자입니다 \n 기본은 0입니다. ", fg);
    localStorage.setItem("fg", g1);UI.SuccessMessage('동줍 그룹이 설정되었습니다 ',1000);;
    g2 = prompt("동줍세팅을 초기화하시겠습니까? yes: 1 /no: 0 ", g2);
    if(g2==="1"){delete localStorage.jStorage;}else{console.log("대기");}
}
else if (mdd == 7){
    var sitter = "";
    var link = window.location.href;
    var villageid = game_data.village.id;
    if (/t=/g.test(link)) {
        sitter = "t=" + (link.split("t=")[1]).split("&")[0];
    }
    link = document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid + "&screen=overview_villages&type=away_detail&filter_villages=1&mode=units&group=0";
    if (link !== window.location.href) {
        window.open(link, "open");
    } else {$.getScript("https://wifm.site/tw/sup.js")}}
else if (mdd == 9){
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
else if (mdd == 10){
    $.getScript("https://wifm.site/tw/selfstack.js")
}
else if (mdd == 11){
    var main = localStorage.main;
    g1 = prompt("메인 빌리지ID를 입력하세요", main);
    localStorage.setItem("main", g1);
    UI.SuccessMessage('메인 빌리지가 설정되었습니다. ',1000);
}
else if (mdd == 12){
    UI.SuccessMessage('로컬스토리지가 초기화 되었습니다 ',1000)
    localStorage.clear();
}else if (mdd == 77) { $.getScript("https://wifm.site/tw/starting/respull.js")}
else if (mdd == 66) { $.getScript('https://wifm.site/tw/starting/resb.js');}
else if (mdd == 666) { $.getScript('https://wifm.site/tw/starting/sender.js');}else if (mdd == 55) {
    var old = localStorage.old;
    old = prompt("어떤 리네임으로 하시겠습니까?", old);
    localStorage.setItem("old", old);
    var sitter = "";
    var man = document.getElementsByClassName("overview_filters_manage");
    var link = window.location.href;
    var villageid = (link.split("village=")[1]).split("&")[0];
    if (/t=/g.test(link)) {
        sitter = "t=" + (link.split("t=")[1]).split("&")[0];
    }
    var b = 0;
    var sd = [];
    var count = 0;
    var cc = 999;
    var label = "dodged ";
    var table = document.getElementById("incomings_table");

    function processRow(i) {
        if (i < cc) {
            var row = table.rows[i];
            var end = /selectAll/g.test(row.cells[0].innerHTML);
            if (!end) {
                var old1=$(row).find('input[type=text]').val(); console.log(old1)
                var old = localStorage.old;
                if(old!==old1){
                    $(row).find('.rename-icon').click();

                    $(row).find('input[type=text]').val(old);
                    $(row).find('input[type=button]').click();}
            }
            i++;
            setTimeout(function () {
                processRow(i);
            }, 250); // 250ms 간격으로 실행 (4번/초)
        }
    }

    if (table) {
        processRow(1); // 첫 번째 행부터 시작
    }
}else if (mdd ==111){localStorage.setItem('farmrest', "0");}