// made by Costache Madalin (lllll llll)
// discord: costache madalin#8472

var backgroundColor = "#32313f";
var borderColor = "#3e6147";
var headerColor = "#202825";
var titleColor = "#ffffdf";

var countApiKey = "generateFakeScript";
var countNameSpace="madalinoTribalWarsScripts"

var headerWood="#001a33"
var headerWoodEven="#002e5a"
var headerStone="#3b3b00"
var headerStoneEven="#626200"
var headerIron="#1e003b"
var headerIronEven="#3c0076"

var defaultTheme= '[["theme1",["#E0E0E0","#000000","#C5979D","#2B193D","#2C365E","#484D6D","#4B8F8C","35"]],["currentTheme","theme1"],["theme2",["#E0E0E0","#000000","#F76F8E","#113537","#37505C","#445552","#294D4A","35"]],["theme3",["#E0E0E0","#000000","#ACFCD9","#190933","#665687","#7C77B9","#623B5A","35"]],["theme4",["#E0E0E0","#000000","#181F1C","#60712F","#274029","#315C2B","#214F4B","35"]],["theme5",["#E0E0E0","#000000","#9AD1D4","#007EA7","#003249","#1F5673","#1C448E","35"]],["theme6",["#E0E0E0","#000000","#EA8C55","#81171B","#540804","#710627","#9E1946","35"]],["theme7",["#E0E0E0","#000000","#754043","#37423D","#171614","#3A2618","#523A34","35"]],["theme8",["#E0E0E0","#000000","#9E0031","#8E0045","#44001A","#600047","#770058","35"]],["theme9",["#E0E0E0","#000000","#C1BDB3","#5F5B6B","#323031","#3D3B3C","#575366","35"]],["theme10",["#E0E0E0","#000000","#E6BCCD","#29274C","#012A36","#14453D","#7E52A0","35"]]]'
var localStorageThemeName = "generateFakeScript"

textColor="#ffffff"
var backgroundInput="#000000"

var borderColor = "#C5979D";//#026440
var backgroundContainer="#2B193D"
var backgroundHeader="#2C365E"
var backgroundMainTable="#484D6D"
var backgroundInnerTable="#4B8F8C"

var widthInterface=50;//percentage
var headerColorDarken=-50 //percentage( how much the header should be darker) if it's with -(darker) + (lighter)
var headerColorAlternateTable=-30;
var headerColorAlternateHover=30;

var backgroundAlternateTableEven=backgroundContainer;
var backgroundAlternateTableOdd=getColorDarker(backgroundContainer,headerColorAlternateTable);



var idInterval=0

async function main(){
    initializationTheme()
    await $.getScript("https://dl.dropboxusercontent.com/s/i5c0so9hwsizogm/styleCSSGlobal.js?dl=0");
    createMainInterface()
    changeTheme()
    hitCountApi()





}
main()



function getColorDarker(hexInput, percent) {
    let hex = hexInput;

    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, "");

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (hex.length === 3) {
        hex = hex.replace(/(.)/g, "$1$1");
    }

    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);

    const calculatedPercent = (100 + percent) / 100;

    r = Math.round(Math.min(255, Math.max(0, r * calculatedPercent)));
    g = Math.round(Math.min(255, Math.max(0, g * calculatedPercent)));
    b = Math.round(Math.min(255, Math.max(0, b * calculatedPercent)));

    return `#${("00"+r.toString(16)).slice(-2).toUpperCase()}${("00"+g.toString(16)).slice(-2).toUpperCase()}${("00"+b.toString(16)).slice(-2).toUpperCase()}`
}

function createMainInterface(){

    let html=`
    
    <div id="div_container" class="scriptContainer">
        <div class="scriptHeader">
            <div style=" margin-top:10px;"><h2>Generate fake script</h2></div>
            <div style="position:absolute;top:10px;right: 10px;"><a href="#" onclick="$('#div_container').remove()"><img src="https://img.icons8.com/emoji/24/000000/cross-mark-button-emoji.png"/></a></div>
            <div style="position:absolute;top:8px;right: 35px;" id="div_minimize"><a href="#"><img src="https://img.icons8.com/plasticine/28/000000/minimize-window.png"/></a></div>
            <div style="position:absolute;top:10px;right: 60px;" id="div_theme"><a href="#" onclick="$('#theme_settings').toggle()"><img src="https://img.icons8.com/material-sharp/24/fa314a/change-theme.png"/></a></div>
        </div>
        <div id="theme_settings"></div>

        <div id="div_body">
            <table id="settings_table" class="scriptTable">
                <tr>
                    <td style="width:30%">admin id</td>
                    <td><input type="text"  id="input_admin_id" class="scriptInput" placeholder="name" value="${game_data.player.id}"></td>
                </tr>
                <tr>
                    <td>world number</td>
                    <td><input type="text"  id="input_number_world" class="scriptInput" placeholder="name" value="${game_data.world.match(/\d+/)[0]}"></td>
                </tr>
                <tr>
                    <td>database name</td>
                    <td><input type="text"  id="input_database_name" class="scriptInput" placeholder="anything is good" value="PleaseWork"></td>
                </tr>
                <tr>
                    <td>link script</td>
                    <td><textarea id="input_link_script" cols="40" rows="10" placeholder="press start"></textarea></td>
                    
                </tr>
                <tr>
                    <td colspan="2"><input class="btn evt-confirm-btn btn-confirm-yes" type="button" id="btn_start" onclick="generateScript()" value="Start"></td>
                </tr>
            </table>
        </div>
        <div class="scriptFooter">
            <div style=" margin-top:5px;"><h5>made by Costache</h5></div>
        </div>
    </div>`





    ////////////////////////////////////////add and remove window from page///////////////////////////////////////////
    $("#div_container").remove()
    $("#contentContainer").eq(0).prepend(html);
    $("#mobileContent").eq(0).prepend(html);


    $("#div_container").css("position","fixed");
    $("#div_container").draggable();


    $("#div_minimize").on("click",()=>{
        let currentWidthPercentage=Math.ceil($('#div_container').width() / $('body').width() * 100);
        if(currentWidthPercentage >=widthInterface ){
            $('#div_container').css({'width' : '10%'});
            $('#div_body').hide();
        }
        else{
            $('#div_container').css({'width' : `${widthInterface}%`});
            $('#div_body').show();
        }
    })


}

function changeTheme(){
    let html= `
    <h3 style="color:${textColor};padding-left:10px;padding-top:5px">after theme is selected run the script again<h3>
    <table class="scriptTable" >
        
        <tr>
            <td>
                <select  id="select_theme">
                    <option value="theme1">theme1</option>
                    <option value="theme2">theme2</option>
                    <option value="theme3">theme3</option>
                    <option value="theme4">theme4</option>
                    <option value="theme5">theme5</option>
                    <option value="theme6">theme6</option>
                    <option value="theme7">theme7</option>
                    <option value="theme8">theme8</option>
                    <option value="theme9">theme9</option>
                    <option value="theme10">theme10</option>
                </select>
            </td>
            <td>value</td>
            <td >color hex</td>
        </tr>
        <tr>
            <td>textColor</td>
            <td style="background-color:${textColor}" class="td_background"></td>
            <td><input type="text" class="scriptInput input_theme" value="${textColor}"></td>
        </tr>
        <tr>
            <td>backgroundInput</td>
            <td style="background-color:${backgroundInput}" class="td_background"></td>
            <td><input type="text" class="scriptInput input_theme" value="${backgroundInput}"></td>
        </tr>
        <tr>
            <td>borderColor</td>
            <td style="background-color:${borderColor}" class="td_background"></td>
            <td><input type="text" class="scriptInput input_theme" value="${borderColor}"></td>
        </tr>
        <tr>
            <td>backgroundContainer</td>
            <td style="background-color:${backgroundContainer}" class="td_background"></td>
            <td><input type="text" class="scriptInput input_theme" value="${backgroundContainer}"></td>
        </tr>
        <tr>
            <td>backgroundHeader</td>
            <td style="background-color:${backgroundHeader}" class="td_background"></td>
            <td><input type="text" class="scriptInput input_theme" value="${backgroundHeader}"></td>
        </tr>
        <tr>
            <td>backgroundMainTable</td>
            <td style="background-color:${backgroundMainTable}" class="td_background"></td>
            <td><input type="text" class="scriptInput input_theme" value="${backgroundMainTable}"></td>
        </tr>
        <tr>
            <td>backgroundInnerTable</td>
            <td style="background-color:${backgroundInnerTable}" class="td_background"></td>
            <td><input type="text" class="scriptInput input_theme" value="${backgroundInnerTable}"></td>
        </tr>
        <tr>
            <td>widthInterface</td>
            <td><input type="range" min="25" max="100" class="slider input_theme" id="input_slider_width" value="${widthInterface}"></td>
            <td id="td_width">${widthInterface}%</td>
        </tr>
        <tr >
            <td><input class="btn evt-confirm-btn btn-confirm-yes" type="button" id="btn_save_theme" value="Save"></td>
            <td><input class="btn evt-confirm-btn btn-confirm-yes" type="button" id="btn_reset_theme" value="Default themes"></td>
            <td></td>
        </tr>

    </table>
    `
    $("#theme_settings").append(html)
    $("#theme_settings").hide()

    let selectedTheme = ""
    let colours =[]
    let mapTheme = new Map()

    $("#select_theme").on("change",()=>{
        if(localStorage.getItem(localStorageThemeName) != undefined){
            selectedTheme = $('#select_theme').find(":selected").text();
            colours = Array.from($(".input_theme")).map(elem=>elem.value.toUpperCase().trim())
            mapTheme = new Map(JSON.parse(localStorage.getItem(localStorageThemeName)))
            console.log(selectedTheme)
            console.log(mapTheme)
            colours = mapTheme.get(selectedTheme)
            console.log(colours)
            Array.from($(".input_theme")).forEach((elem,index)=>{
                elem.value = colours[index]
            })
            Array.from($(".td_background")).forEach((elem,index)=>{
                elem.style.background = colours[index]
            })

            mapTheme.set("currentTheme",selectedTheme)
            localStorage.setItem(localStorageThemeName, JSON.stringify(Array.from(mapTheme.entries())))
        }
    })

    $("#btn_save_theme").on("click",()=>{
        colours = Array.from($(".input_theme")).map(elem=>elem.value.toUpperCase().trim())
        selectedTheme = $('#select_theme').find(":selected").text();

        for(let i=0;i<colours.length-1;i++){
            if(colours[i].match(/#[0-9 A-F]{6}/) == null ){
                UI.ErrorMessage("wrong colour: "+colours[i])
                throw new Error("wrong colour")
            }
        }

        if(localStorage.getItem(localStorageThemeName) != undefined)
            mapTheme = new Map(JSON.parse(localStorage.getItem(localStorageThemeName)))


        mapTheme.set(selectedTheme,colours)
        mapTheme.set("currentTheme",selectedTheme)

        localStorage.setItem(localStorageThemeName, JSON.stringify(Array.from(mapTheme.entries())))
        console.log("saved colours for: "+selectedTheme)
        UI.SuccessMessage(`saved colours for: ${selectedTheme} \n run the script again`,1000)


    })

    $("#btn_reset_theme").on("click",()=>{
        localStorage.setItem(localStorageThemeName, defaultTheme)
        UI.SuccessMessage("run the script again",1000)

    })
    $("#input_slider_width").on("input",()=>{
        $("#td_width").text($("#input_slider_width").val()+"%")
    })


    if(localStorage.getItem(localStorageThemeName) != undefined){
        mapTheme = new Map(JSON.parse(localStorage.getItem(localStorageThemeName)))
        let currentTheme=mapTheme.get("currentTheme")
        document.querySelector('#select_theme').value=currentTheme
    }


}

function initializationTheme(){
    if(localStorage.getItem(localStorageThemeName) != undefined){
        let mapTheme = new Map(JSON.parse(localStorage.getItem(localStorageThemeName)))
        let currentTheme=mapTheme.get("currentTheme")
        let colours=mapTheme.get(currentTheme)

        textColor=colours[0]
        backgroundInput=colours[1]

        borderColor = colours[2]
        backgroundContainer=colours[3]
        backgroundHeader=colours[4]
        backgroundMainTable=colours[5]
        backgroundInnerTable=colours[6]
        widthInterface=colours[7]

        backgroundAlternateTableEven=backgroundContainer;
        backgroundAlternateTableOdd=getColorDarker(backgroundContainer,headerColorAlternateTable);
        console.log("textColor: "+textColor)
        console.log("backgroundContainer: "+backgroundContainer)

    }
    else{
        localStorage.setItem(localStorageThemeName, defaultTheme)

        let mapTheme = new Map(JSON.parse(localStorage.getItem(localStorageThemeName)))
        let currentTheme=mapTheme.get("currentTheme")
        let colours=mapTheme.get(currentTheme)

        textColor=colours[0]
        backgroundInput=colours[1]

        borderColor = colours[2]
        backgroundContainer=colours[3]
        backgroundHeader=colours[4]
        backgroundMainTable=colours[5]
        backgroundInnerTable=colours[6]
        widthInterface=colours[7]

        backgroundAlternateTableEven=backgroundContainer;
        backgroundAlternateTableOdd=getColorDarker(backgroundContainer,headerColorAlternateTable);
    }

}



async function generateScript() {
    // "데이터베이스 생성 중... 몇 초만 기다려 주세요"라는 성공 메시지를 사용자에게 표시
    UI.SuccessMessage("generating database...\n wait couple of seconds");

    // insertCryptoLibrary 함수를 호출하고 완료될 때까지 대기
    await insertCryptoLibrary();

    // game_data.world에서 첫 번째로 일치하는 소문자 문자열을 추출하여 market 변수에 저장
    let market = game_data.world.match(/[a-z]+/)[0];

    // HTML 요소에서 admin ID 입력 값을 가져와 nameAdmin 변수에 저장
    let nameAdmin = document.getElementById("input_admin_id").value;

    // HTML 요소에서 데이터베이스 이름 입력 값을 가져와 databaseName 변수에 저장
    let databaseName = document.getElementById("input_database_name").value;

    // HTML 요소에서 world number 입력 값을 가져와 numberWorld 변수에 저장
    let numberWorld = document.getElementById("input_number_world").value;

    // game_data 객체에서 플레이어 이름을 가져와 playerName 변수에 저장
    let playerName = game_data.player.name;

    // databaseName을 특정 형식으로 재구성
    databaseName = `FakeScriptDB/${market}/${numberWorld}/${databaseName}_${playerName}_${nameAdmin}`;

    // 평문 텍스트를 생성
    let plainText = `
        dropboxToken="${CryptoJS.AES.decrypt("U2FsdGVkX1/6wzFsxv1u7NwiDdhq+t+Ck5XRU3/axVCb2ujjSuDtIhxQPwYv+fu5QCfsQjraV1CzmrbTKLN0Hh5UtsaPWDNYAU5bzqJjytQ4jvRWm9dlnwaVRgCngaur", "whatup").toString(CryptoJS.enc.Utf8)}";
        databaseName="${databaseName}";
        runWorld=${numberWorld};
        adminBoss="${nameAdmin}";
    `;

    // 평문 텍스트를 암호화하여 key 변수에 저장
    let key = CryptoJS.AES.encrypt(plainText, "automateThisAnnoyingPart").toString();

    // outputfakeScript 변수에 JavaScript 코드 문자열을 생성하여 저장
    let outputfakeScript = `javascript:var encryptedData='${key}';
    $.getScript('https://dl.dropboxusercontent.com/s/2q29vaqbibe6tph/fakeScriptMain.js?dl=0');void(0);`;

    // 파일 경로를 설정
    let filname_ally = `${databaseName}/ally.txt`;
    let filname_admin = `${databaseName}/admin.txt`;

    let filename_fakes1 = `${databaseName}/fakes1.txt`;
    let filename_fakes2 = `${databaseName}/fakes2.txt`;
    let filename_fakes3 = `${databaseName}/fakes3.txt`;
    let filename_fakes4 = `${databaseName}/fakes4.txt`;
    let filename_fakes5 = `${databaseName}/fakes5.txt`;
    let filename_fakes6 = `${databaseName}/fakes6.txt`;
    let filename_fakes7 = `${databaseName}/fakes7.txt`;
    let filename_fakes8 = `${databaseName}/fakes8.txt`;
    let filename_fakes9 = `${databaseName}/fakes9.txt`;
    let filename_fakes10 = `${databaseName}/fakes10.txt`;

    try {
        // Dropbox에서 파일을 읽으려고 시도
        await readFileDropbox(filname_ally);
        await readFileDropbox(filname_admin);

        await readFileDropbox(filename_fakes1);
        await readFileDropbox(filename_fakes2);
        await readFileDropbox(filename_fakes3);
        await readFileDropbox(filename_fakes4);
        await readFileDropbox(filename_fakes5);
        await readFileDropbox(filename_fakes6);
        await readFileDropbox(filename_fakes7);
        await readFileDropbox(filename_fakes8);
        await readFileDropbox(filename_fakes9);
        await readFileDropbox(filename_fakes10);

        // 파일이 이미 존재할 경우 오류 메시지를 표시하고 콘솔에 로그를 남김
        UI.ErrorMessage("database already exists");
        console.log("files already exists");
    } catch (error) {
        // 파일이 존재하지 않을 경우 새 파일을 생성하고 업로드
        await uploadFile("[]", filname_ally);
        await uploadFile("[]", filname_admin);

        await uploadFile("[]", filename_fakes1);
        await uploadFile("[]", filename_fakes2);
        await uploadFile("[]", filename_fakes3);
        await uploadFile("[]", filename_fakes4);
        await uploadFile("[]", filename_fakes5);
        await uploadFile("[]", filename_fakes6);
        await uploadFile("[]", filename_fakes7);
        await uploadFile("[]", filename_fakes8);
        await uploadFile("[]", filename_fakes9);
        await uploadFile("[]", filename_fakes10);

        // 파일 생성 완료 메시지를 콘솔에 로그
        console.log("files created");
    }

    // 생성된 스크립트를 HTML 요소에 설정
    document.getElementById("input_link_script").value = outputfakeScript;
}


function insertCryptoLibrary(){
    return new Promise((resolve,reject)=>{

        let start = new Date().getTime(); // 현재 시간을 밀리초 단위로 저장합니다.
        let script = document.createElement('script'); // 새로운 <script> 요소를 생성합니다.
        script.type = "text/javascript"; // 스크립트의 타입을 "text/javascript"로 설정합니다.
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"; // 스크립트의 소스를 설정합니다.
        script.onload = function () { // 스크립트가 로드된 후 실행될 함수입니다.
            let stop = new Date().getTime(); // 스크립트가 로드된 후의 시간을 밀리초 단위로 저장합니다.
            console.log(`insert crypto-js library in ${stop-start} ms`); // 스크립트 로드에 걸린 시간을 콘솔에 출력합니다.
            resolve("done"); // Promise를 성공적으로 완료하고 "done"을 반환합니다.
        };
        document.head.appendChild(script); // <script> 요소를 <head> 요소에 추가합니다.
    });
}

function uploadFile(data, filename) {
    return new Promise((resolve, reject) => {
        var file = new Blob([data], { type: "plain/text" }); // 주어진 데이터를 plain/text 타입의 Blob 객체로 생성합니다.
        var nr_start1 = new Date().getTime(); // 현재 시간을 밀리초 단위로 저장합니다.
        file.name = filename; // 파일 이름을 설정합니다.

        // 페이지 새로고침 방지
        $(document).bind("keydown", disableF5);
        window.onbeforeunload = function(e) {
            console.log("is uploading");
            return "are you sure?"; // 페이지를 떠나기 전에 사용자에게 확인 메시지를 표시합니다.
        };

        var xhr = new XMLHttpRequest();
        xhr.upload.onprogress = function(evt) {
            console.log(evt);
            var percentComplete = parseInt(100.0 * evt.loaded / evt.total); // 업로드 진행률을 계산합니다.
            console.log(percentComplete);
            UI.SuccessMessage("progress upload: " + percentComplete + "%"); // 업로드 진행 상황을 사용자에게 알립니다.
        };

        xhr.onload = function() {
            if (xhr.status === 200) {
                var fileInfo = JSON.parse(xhr.response); // 서버 응답을 JSON으로 파싱합니다.
                // 업로드 성공 시 수행할 작업
                UI.SuccessMessage("upload success");
                var nr_stop1 = new Date().getTime();
                console.log("time upload: " + (nr_stop1 - nr_start1)); // 업로드에 걸린 시간을 출력합니다.

                // 페이지 새로고침 허용
                window.onbeforeunload = function(e) {
                    console.log("done");
                };
                $(document).unbind("keydown", disableF5);
                resolve("success");
            } else {
                var errorMessage = xhr.response || 'Unable to upload file'; // 오류 메시지를 설정합니다.
                // 업로드 실패 시 수행할 작업
                UI.SuccessMessage("upload failed");
                reject(errorMessage);
            }
        };

        xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload', false); // Dropbox API에 POST 요청을 엽니다.
        xhr.setRequestHeader('Authorization', 'Bearer ' + CryptoJS.AES.decrypt("U2FsdGVkX1/6wzFsxv1u7NwiDdhq+t+Ck5XRU3/axVCb2ujjSuDtIhxQPwYv+fu5QCfsQjraV1CzmrbTKLN0Hh5UtsaPWDNYAU5bzqJjytQ4jvRWm9dlnwaVRgCngaur", "whatup").toString(CryptoJS.enc.Utf8)); // 인증 헤더를 설정합니다.
        xhr.setRequestHeader('Content-Type', 'application/octet-stream'); // 콘텐츠 타입을 설정합니다.
        xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
            path: '/' + file.name,
            mode: 'add',
            autorename: true,
            mode: 'overwrite',
            mute: false
        })); // Dropbox API 인수를 설정합니다.

        xhr.send(file); // 파일을 서버로 전송합니다.
    });
}

function readFileDropbox(filename) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://content.dropboxapi.com/2/files/download", // Dropbox 파일 다운로드 API URL
            method: 'POST', // HTTP POST 메서드 사용
            dataType: "text", // 응답 데이터 타입을 텍스트로 설정
            headers: { // 요청 헤더 설정
                'Authorization': 'Bearer ' + CryptoJS.AES.decrypt("U2FsdGVkX1/6wzFsxv1u7NwiDdhq+t+Ck5XRU3/axVCb2ujjSuDtIhxQPwYv+fu5QCfsQjraV1CzmrbTKLN0Hh5UtsaPWDNYAU5bzqJjytQ4jvRWm9dlnwaVRgCngaur", "whatup").toString(CryptoJS.enc.Utf8), // 인증 토큰 복호화
                'Dropbox-API-Arg': JSON.stringify({ path: "/" + filename }) // Dropbox API 인수 설정 (다운로드할 파일 경로)
            },

            success: (data) => { // 요청 성공 시 호출되는 함수
                resolve(data); // Promise를 성공으로 완료하고 데이터를 반환
            },
            error: (err) => { // 요청 실패 시 호출되는 함수
                console.log(err); // 오류를 콘솔에 출력
                reject(err); // Promise를 실패로 완료하고 오류를 반환
            }
        });
    });
}

function disableF5(e) {
    if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82) e.preventDefault();
}; // F5 키와 R 키를 누를 경우 페이지 새로고침을 방지하는 함수



function hitCountApi(){
    $.getJSON(`https://api.counterapi.dev/v1/${countNameSpace}/${countApiKey}/up`, response=>{
        console.log(`This script has been run: ${response.count} times`);
    });
    if(game_data.device !="desktop"){
        $.getJSON(`https://api.counterapi.dev/v1/${countNameSpace}/${countApiKey}_phone/up`, response=>{
            console.log(`This script has been run on mobile: ${response.count} times`);
        });
    }

    $.getJSON(`https://api.counterapi.dev/v1/${countNameSpace}/${countApiKey}_id2${game_data.player.id}/up`, response=>{
        if(response.count == 1){
            $.getJSON(`https://api.counterapi.dev/v1/${countNameSpace}/${countApiKey}_scriptUsers/up`, response=>{});
        }

    });

    try {
        $.getJSON(`https://api.counterapi.dev/v1/${countNameSpace}/${countApiKey}_scriptUsers`, response=>{
            console.log(`Total number of users: ${response.count}`);
        });

    } catch (error) {}

}