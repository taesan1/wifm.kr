javascript:
//커맨드 메뉴 관리
    var stop = localStorage.getItem('stop')|| 0;
//모드 세팅
var mdd =localStorage.getItem('mdd')|| 0;
var md = prompt("1= 중지/실행 \n2= 모드 \n3= 스크립트 \n4= 초기화 \n5= 상태",mdd);
localStorage.setItem("mdd", md);
if(md ==1){
    //중지, 실행
    if (stop == 0) {
        localStorage.setItem("stop", "1");
        UI.ErrorMessage('중지 ', 2000);
    } else {
        localStorage.setItem("stop", "0");
        UI.SuccessMessage('시작 ', 2000);
    }
}else if(md ==2){
    //모드
    var mode1=localStorage.getItem('mode1')|| 0;
    md= prompt("0= 모드 설정 \n1= AM모드 \n2= 방어모드 \n3= 공격모드",mode1);
    localStorage.setItem("mode1", md);
    if(md ==0){
        //모드 세팅
        $.getScript("https://wifm.kr/t/127/modeset.js");
    }
    else if(md ==1){localStorage.setItem("mode", "AM"); UI.ErrorMessage('AM모드가 설정되었습니다 ', 2000);}
    else if(md==2){localStorage.setItem("mode", "방어"); UI.ErrorMessage('방어모드가 설정되었습니다 ', 2000);}
    else if(md==3){localStorage.setItem("mode", "공격"); UI.ErrorMessage('공격모드가 설정되었습니다 ', 2000);}
}else if(md ==3){
    //스크립트
    md=prompt("0= farmgod\n1= 자원 당기기(코찍) \n2= 자원밸런스 \n3= 자원보내기(대량) \n4=스캐빈징  \n5= ");
    if(md==0){localStorage.setItem('farmrest', "0"); $.getScript("https://wifm.kr/t/starting/farmgod.js")}
    else if(md==1){$.getScript("https://wifm.kr/t/starting/respull.js")}
    else if(md==2){$.getScript('https://wifm.kr/t/starting/resb.js');}
    else if(md==3){$.getScript('https://wifm.kr/t/starting/sender.js');}
    else if(md==4){ $.getScript('https://shinko-to-kuma.com/scripts/massScavenge.js');
        localStorage.setItem('now', "스캐빈징");localStorage.setItem('nn',0)}
    else if(md==5){}
}else if(md ==4){
//초기화
    md=prompt("0= 전체초기화 \n1= 상태 초기화 \n2= 모드(수정중) \n3= \n4= \n5= ");
    if(md==0){ UI.SuccessMessage('로컬스토리지가 초기화 되었습니다 ',1000)
        localStorage.clear();}
    else if(md==1){localStorage.setItem('now', "대기"); location.reload();}
    else if(md==2){}
    else if(md==3){}
    else if(md==4){}
    else if(md==5){}
}else if(md ==5){
    //상태
}