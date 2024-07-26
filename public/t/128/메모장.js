// 현재 페이지의 URL이 "screen=info_command&id=" 문자열을 포함하고 있지 않다면
if (!document.URL.match(/screen=info_command&id=/i)) {
    // "Go to the Attack" 경고창을 표시합니다.
    alert("Go to the Attack");
} else {
    /*// 로컬 스토리지에서 "cst" 값을 가져옵니다.
    var cst = localStorage.getItem('cst');
    // 사용자에게 착륙 시간 형식(Feb 16, 2020 04:28:02)을 입력받습니다. 기본값은 "cst" 값입니다.
    var cs = prompt("landing time format Feb 16, 2020 04:28:02", cst);
    // 입력받은 착륙 시간을 로컬 스토리지에 "cst" 키로 저장합니다.
    localStorage.setItem('cst', cs);
    // 착륙 시간을 밀리초 단위로 변환합니다.

     */
    var cs = "jul 22, 2024 04:16:10:386";
    var cst = new Date(cs).getTime(); console.log("cat : "+cst);
//

    let $rows = $('.vis:first-of-type tr');
    console.log('$rows:', $rows.html());
    var $arrivalRow = $rows.filter((i, el) => $(el).text().indexOf('Chegada:') >= 0);
    console.log('$arrivalRow:', $arrivalRow.html());
    var arival = $arrivalRow.find('td:nth-of-type(2)').text().trim();
    console.log('arival:', arival);
    var parsed = new Date(Date.parse(arival));
    console.log('parsed:', parsed);


    var $duration = $rows.filter((i, el) => $(el).text().indexOf('Duração:') >= 0);
    console.log('$duration:', $duration.html());
    var duration2 = $duration.find('td:nth-of-type(2)').text().trim();
    console.log('duration2:', duration2);
    var duration = (duration2.split(":")[0] * 3600000) + (duration2.split(":")[1] * 60000) + (duration2.split(":")[2] * 1000);
    console.log('duration1:', duration);

    // 공격 대상의 도착 시간을 가져옵니다.
    var b1 = new Date(cst).getTime();
    console.log('b1:', b1);
    b1 = b1 - duration;
    console.log('b1 (after subtracting duration):', b1);
    var diff1 = (parseInt(parsed) - parseInt(b1)) / 2;
    console.log('diff1:', diff1);
    var landt = parseInt(cs.split(":")[2]);
    console.log('landt:', landt);
    var b11 = parseInt(new Date(b1).toString().split(":")[2]);
    console.log('b11:', b11);
    var condition = (landt + b11 + 2) / 2 !== parseInt((landt + parseInt(b11) + 2) / 2);
    console.log('Condition:', condition);
    if ((landt + b11 + 2) / 2 != parseInt((landt + parseInt(b11) + 2) / 2)) {
        alert("Wrong Odd or Even time! Cancel and resend to correct village.");
    } else {
        // 취소 시간이 범위 내에 있는지 확인합니다.
        if (diff1 < 0 || diff1 > 720000) {
            alert("Not within range! Check times.")
        } else {
            // 취소 시간을 계산합니다.
            var diff2 = new Date(cst - diff1);
            var check1 = parseInt(duration2.split(":")[2]) + 2;

            // 공격 시간이 짝수인지 확인합니다.
            if (check1 / 2 != parseInt(check1 / 2)) {
                alert("Not and even travel time village! Cancel Now!");
            } else {
                // 취소 시간과 착륙 시간을 화면에 표시합니다.
                document.getElementsByTagName("h2")[0].innerHTML = '<FONT SIZE=+1 COLOR="green"> cancel time: <FONT COLOR="red">' + diff2 + '<FONT COLOR="green"><br>noble landing ' + cs + '</FONT></FONT> </FONT>';
            }
        }
    }
}