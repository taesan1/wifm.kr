
var sendAt; // 움직임을 보낼 시간을 저장하는 변수
var baseInterval; // 기본 인터벌 타이머 변수
var precInterval; // 정밀 인터벌 타이머 변수
var utc_diff = server_utc_diff * 1000; // 서버와의 시간 차이를 밀리초 단위로 저장
var counter = -1; // 카운터 변수 초기화
var offset = 20; // 보내는 시간에 대한 오프셋 변수
var aaa = localStorage.getItem("sendAt_"+window.game_data.village.id);

function main() { // 메인 함수
    let now = getNow(); // 현재 시간 가져오기
    console.log(now); // 현재 시간 출력

    var time = document.querySelector("#serverTime");
    time = time.textContent;    console.log(time);
    var date = document.querySelector("#serverDate");
    date=date.textContent;    console.log(date);
    var ttt= time +" "+ date;  console.log(ttt);
    var sss= localStorage.getItem("sss_"+ window.game_data.village.id) || 000;
    sendAt1 = prompt('날짜 시간을 입력하세요 [ 02:40:13 23/07/2024 ] :', ttt); // 사용자에게 보내는 시간 입력받기
    sendAt2 = prompt('밀리초를 입력하세요 [ 000 ] :',sss);
if (sendAt1 == null || sendAt1.length < 7) {sendAt1=ttt}
if (sendAt2 == null || sendAt2.length > 3){sendAt2= 000;}
    localStorage.setItem("sss_"+ window.game_data.village.id,sendAt2);

    var dateStr = sendAt1.split(" ")[1];
    var year = dateStr.split("/")[2];
    var month = dateStr.split("/")[1];
    var day = dateStr.split("/")[0];
    var formattedDate = `${year}-${month}-${day}`;
    var timeStr = sendAt1.split(" ")[0];
    var sendAt3 = `${formattedDate} ${timeStr}`;
    console.log(sendAt3);
    var sendAt= sendAt3+"."+sendAt2;   console.log(sendAt);
    // 입력받은 시간을 UTC 형식으로 변환
    let sendAtString = sendAt;
    sendAt += 'Z';
    sendAt = new Date(new Date(sendAt).getTime() - Timing.offset_to_server - (offset / 2));
    localStorage.setItem("sendAt_"+window.game_data.village.id,sendAtString);
    console.log(sendAt); // 변환된 보내는 시간 출력

    let millis = sendAt - now; // 현재 시간과 보내는 시간의 차이 계산
    console.log('Will be sent in (minutes): ' + (millis / 1000 / 60)); // 차이를 분 단위로 출력
    baseInterval = setInterval(timeBase, 2000); // 2초 간격으로 timeBase 함수 실행

    if (baseInterval) { // 인터벌 타이머가 실행되었다면
        document.getElementsByTagName("h2")[0].innerHTML = '<h3>Movement will be sent at ' + sendAtString + ' </h3><a id="workingIndicator"></a>'
        button()
    }
}

if(!aaa){main()}else{
    baseInterval = setInterval(timeBase, 2000); // 2초 간격으로 timeBase 함수 실행
    if (baseInterval) {

        document.getElementsByTagName("h2")[0].innerHTML = '<h3>Movement will be sent at ' + aaa + ' </h3><a id="workingIndicator"></a>'
        button()
    }
}

function timeBase() {
    var sendAt = localStorage.getItem("sendAt_"+window.game_data.village.id);
    sendAt = new Date(sendAt)- Timing.offset_to_server - (offset / 2);
    // 현재 시간을 가져옵니다.
    let now = getNow(); console.log("now :"+now);
    // 보내기 시간과 현재 시간의 차이를 계산합니다.
    let diff = sendAt - now;  console.log("diff :"+diff);
    console.log("시간이 계산됩니다");
    // 차이가 6000 이하이면 (약 1분)
    if (diff <= 3000) {
        // 고정밀 모드로 전환합니다.
        clearInterval(baseInterval);
        document.getElementById('workingIndicator').innerHTML = 'High precision mode active.';
        precInterval = setInterval(timeAccurate, offset);
        return;
    }

    // 'workingIndicator' 요소가 있다면
    if (document.getElementById('workingIndicator')) {
        // 카운터가 0이면
        if (counter == 0) {
            // '.'을 표시합니다.
            document.getElementById('workingIndicator').innerHTML = '.';
            // 카운터가 1이면
        } else if (counter == 1) {
            // '..'을 표시합니다.
            document.getElementById('workingIndicator').innerHTML = '..';
            // 카운터가 2 이상이면
        } else if (counter >= 2) {
            // '...'을 표시하고 카운터를 -1로 초기화합니다.
            document.getElementById('workingIndicator').innerHTML = '...';
            counter = -1;
        }
        // 카운터를 증가시킵니다.
        counter++;
    }
}

function timeAccurate() {
    console.log("3초 이내");
    // 현재 시간을 가져옵니다.
    let now = getNow();
    var sendAt = localStorage.getItem("sendAt_"+window.game_data.village.id);
    sendAt = new Date(sendAt)- Timing.offset_to_server - (offset / 2);
    console.log("sendat 확인 :"+sendAt);
    // 보내기 시간과 현재 시간의 차이를 계산합니다.
    let diff = sendAt - now;

    // 차이가 0 이하이면 (보내기 시간이 지났으면)
    if (diff <= 0) {
        // 움직임을 보냅니다.
        sendMovement();
        // 고정밀 모드 타이머를 중지합니다.
        clearInterval(precInterval);
    }
}

function sendMovement() {
    // 'troop_confirm_go' 버튼을 클릭합니다.
    console.log("클릭");
    document.forms[0].troop_confirm_submit.click();
    localStorage.removeItem("sendAt_"+window.game_data.village.id);
}

function getNow() {
    // 현재 서버 시간을 가져와 utc_diff를 더하여 반환합니다.
    return new Date(Timing.getCurrentServerTime() + utc_diff);
}

function button(){
var deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.addEventListener("click", function() {
    localStorage.removeItem("sendAt_"+window.game_data.village.id);
    location.reload();
});
var h2Element = document.getElementsByTagName("h2")[0];
h2Element.appendChild(deleteButton);}