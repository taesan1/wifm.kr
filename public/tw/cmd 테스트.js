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
if(!mode){mode="일반";localStorage.mode="일반"}
var stop = localStorage.stop;
if (!stop) {
    stop = "0";
    localStorage.stop = "0";
}


//모드 세팅
var mdd = prompt("1= 중지/실행 \n2= 공격 모드(페이크/팽/뉴크) \n3= 방어 모드 \n4= OP 모드 \n5= AM 모드 \n6= 일반 모드 \n7= 스크립트 \n8= 초기화 \n9= 설정 ", md);
localStorage.setItem("mdt", mdd);
if (mdd == 1) {
    if (stop == 0) {
        localStorage.setItem("stop", "1");
        UI.ErrorMessage('중지 ', 1000);
    } else {
        localStorage.setItem("stop", "0");
        UI.SuccessMessage('시작 ', 1000);
    }
}
else if(mdd == 2){
    var matt=localStorage.matt;
    if (matt=="null"){matt=0}
    var mattt = prompt("0= 모드 시작 \n1= 그룹 좌표 설정 \n2= 페이크 유닛 설정 \n3= 팽 유닛 설정 \n4= 뉴크 유닛 설정 \n5= 공격모드 설정 초기화", matt);
    localStorage.setItem("matt", mattt);
    if (matt == 0){
        var attack= localStorage.attack;
        att1 =prompt("1: 페이크 \n 2: 팽 \n 3: 뉴크 ",attack);
        if(att1==1){localStorage.setItem("mode", "공격");localStorage.setItem("attack", "페이크");}
        else  if(att1==2){localStorage.setItem("mode", "공격");localStorage.setItem("attack", "팽");}
        else  if(att1==3){localStorage.setItem("mode", "공격");localStorage.setItem("attack", "뉴크");}
        UI.SuccessMessage('공격 ['+localStorage.attack+']이 설정되었습니다.',2000);
        var group = localStorage.group;
        att2 =prompt("공격을 보낼 그룹의 넘버(코드)를 입력하세요 ",group);
        localStorage.setItem("group", att2);
        var reps = localStorage.reps;
        att3 =prompt("한 마을당 몇번의 공격을 넣으시겠습니까? ", reps)
        localStorage.setItem("reps", att3);
        localStorage.setItem("now", "대기");
    }else if(matt == 1){
        $.getScript("https://wifm.site/tw/setcoord.js");
    }else if(matt == 2){
        //페이크유닛 설정하는 기능
    }else if(matt == 3){
        // 팽 유닛을 설정하는 기능
    }else if(matt == 4){
        // 뉴크 유닛을 설정하는 기능
    }else if(matt == 5){
        // 초기화
    }




}




