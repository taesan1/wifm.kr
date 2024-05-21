
var scavon = localStorage.getItem('scavon') || '1';
var world = game_data.world;
var vid = game_data.village.id;



if(document.URL.includes("screen=place&mode=scavenge_mass") && scavon ==0) {
    var aaa=setInterval(a, 5000);
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
                localStorage.setItem('now', "대기");
                localStorage.setItem('scavon', 1);
                window.location.href = "https://" + world + ".tribalwars.com.br/game.php?village=" + vid + "&screen=report";
            }, 9000);
        } else {
            console.log("Element #sendMass does not exist");
            setTimeout(function() {
                $.getScript('https://shinko-to-kuma.com/scripts/massScavenge.js');
            }, 2000);
        }
    }
    console.log("실행되고 있어");
}

if (document.URL.includes("screen=report")&&now=="대기"){
    var table = document.getElementById("report_list");
    if (table) {
        var row;
        var cc = 999;
        var i = 1;
        var scavFound = false;
        var continueProcessing = true; // 전역 변수로 재귀 호출 제어
        var callInterval = 5000; // 기본 호출 간격을 5초로 설정

        function processRow() {
            if (i < cc && continueProcessing) { // continueProcessing 상태 확인
                    row = table.rows[i];
                    var end = /selectAll/g.test(row.cells[0].innerHTML);
                    if (end) {
                        i = cc;
                    } else {
                    var scav = /coletar/g.test(row.cells[1].innerHTML);
                    console.log("scav " + scav);
                    if (scav) {
                        window.top.UI.InfoMessage('스캐빈징이 완료되었습니다.. 30초 뒤에 스크립트가 실행됩니다.', 10000);
                        scavFound = true;
                        // 체크박스가 체크되어 있지 않은 경우에만 클릭
                        var checkbox = $(row).find('input[type=checkbox]');
                        if (!checkbox.is(':checked')) {
                            checkbox.click();
                        }
                        setTimeout(function() {
                            $("input.btn.btn-cancel[type='submit'][name='del']").click();
                            localStorage.setItem('scavon', 0);
                        }, 8000);
                        callInterval = 250; // 'scav' 조건 만족 시 호출 간격을 250ms로 변경
                    }

                    if (!scav && scavon == 0 &&now=="대기") {
                        continueProcessing = false; // 추가 호출 중지
                        window.top.UI.InfoMessage('잠시 대기해주세요 스캐빈징이 시작됩니다..', 10000);
                        setTimeout(function() {
                            window.location.href = "https://" + world + ".tribalwars.com.br/game.php?village=" + vid + "&screen=place&mode=scavenge_mass&group=0";
                            localStorage.setItem('now', "스캐빈징");
                        }, 10000);
                    }
                    i++;
                    if (continueProcessing) { // 상태 확인 후 재귀 호출
                        setTimeout(processRow, callInterval);
                    }
                }
            }
        }

        // 초기 호출
        setTimeout(processRow, callInterval);
    }

}
