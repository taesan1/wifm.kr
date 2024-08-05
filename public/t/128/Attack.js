var url=window.location.href;
var sitter=""
var villageid=(url.split("village=")[1]).split("&")[0];
if (/t=/g.test(url)) {
    sitter = "t=" + (url.split("t=")[1]).split("&")[0];
}
var targetUrl = "screen=overview";
var urlnow = url.includes(targetUrl);
if (!urlnow) {
    alert("Please move to overview");
    var url = document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid + "&screen=overview";
}else {

    $(document).ready(function () {
        function loadGroups() {
            var keys = Object.keys(localStorage);
            var groupsTable = $('#groupsTable');
            groupsTable.empty(); // 기존 내용 삭제
            var noGroupsMessage = $('#noGroupsMessage');

            // 그룹이 있는지 확인
            var hasGroups = false;

            keys.forEach(function(key, index) {
                if (key.endsWith('_list')) { // URL이 저장된 키만 선택
                    hasGroups = true; // 그룹이 존재함을 표시
                    var groupName = key.replace('_list', ''); // 그룹 이름 추출
                    var urls = localStorage.getItem(key).split('\n'); // 저장된 URL 가져오기

                    // 배경색 설정
                    var backgroundColor = index % 2 === 0 ? "#fff5da" : "#f0e2be";

                    // 그룹 이름과 삭제 버튼을 포함하는 행 추가
                    var groupRow = `<tr style="background-color: ${backgroundColor};">
                                <td style="cursor: pointer;">${groupName}</td>
                                <td><button class="btn pushButton" style="cursor: pointer;text-align: right;">실행</button></td>
                               <td><button class="btn deleteButton" style="cursor: pointer;text-align: right;">삭제</button></td>
                            </tr>`;
                    groupsTable.append(groupRow);

                    // 그룹 이름 클릭 시 URL을 팝업에 표시
                    $(groupsTable).find('tr:last td:first').click(function() {
                        $('#urlContent').text(urls.join('\n'));
                        $('#urlPopup').show();
                    });
                    // 실행 버튼 클릭 시 URL을 새 창으로 열기
                    $(groupsTable).find('tr:last .pushButton').click(function() {
                        // URL을 배열로 가져옴
                        var targetUrls = urls; // 로컬 스토리지에서 가져온 URL 배열

                        // 반복적으로 URL을 새 창에서 열기 위한 함수
                        function openUrls() {
                            for (var url of targetUrls) {
                                window.open(url, '_blank', 'height=700,width=600');
                            }
                        }

                        var intervalId = setInterval(openUrls, 6000);
                    });
                    // 삭제 버튼 클릭 시 로컬 스토리지에서 삭제
                    $(groupsTable).find('tr:last .deleteButton').click(function() {
                        localStorage.removeItem(key);
                        loadGroups(); // 다시 로드하여 업데이트
                    });

                }
            });
            // 그룹이 없으면 메시지 표시
            if (!hasGroups) {
                var groupRow = `<tr>
                <td style="text-align: center;">중앙에 리스트가 없습니다</td>
            </tr>`;
            }

        }
        const init = function () {
            loadGroups();

            var unit = JSON.parse(localStorage.getItem('ATTACK_unit')) || {
                spear   : 0,
                sword   : 0,
                axe     : 0,
                spy     : 0,
                light   : 0,
                heavy   : 0,
                ram     : 0,
                catapult: 0,
                knight  : 0,
                target  : 1,
                reps :1
            };

            let html = `
        
  <div id="tabs" class="optionsContent" style="width:720px;overflow: auto; margin:auto;background: url('graphic/index/main_bg.jpg') 100% 0% #E3D5B3;border: 1px solid #7D510F;border-collapse: separate !important;border-spacing: 0px !important;">
      <button class="rtab-button" data-target="랜덤" style="background: #f4e4bc; border: 1px solid #7D510F; margin-top:3px; margin-left:1px; margin-bottom:3px; box-shadow: 2px 2px 2px rgba(125, 81, 15, 0.5);">랜덤</button>
      <button class="ttab-button" data-target="땡타" style="background: #f4e4bc; border: 1px solid #7D510F; margin-top:3px; margin-left:1px; margin-bottom:3px; box-shadow: 2px 2px 2px rgba(125, 81, 15, 0.5);">땡타</button>

      <div id="랜덤" class="rtab-content" style="border-top: 0.2px solid #7D510F; overflow: auto; border-bottom: none; border-left: none; border-right: none; border-collapse: separate !important; border-spacing: 0px !important;">
          <table class="vis" style="margin-left: 1%;width:98%;text-align:left;font-size:11px;">
              <tbody>
                  <tr>
                      <h1 style="margin-left:12px; font-size:14px;"><br> (랜덤) 최소 유닛 설정</h1>
                  </tr>
                  <tr>
                      <td style="width: 90px; text-align: left; font-size:14px">유닛</td>
                      <td class="spear" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_sword.png"></td>
                      <td class="sword" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_sword.png"></td>
                      <td class="axe" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_axe.png"></td>
                      <td class="spy" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_spy.png"></td>
                      <td class="light" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_light.png"></td>
                      <td class="heavy" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_heavy.png"></td>
                      <td class="ram" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_ram.png"></td>
                      <td class="catapult" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_catapult.png"></td>
                      <td class="knight" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_knight.png"></td>
                  </tr>

                  <tr>
                      <td style="width: 90px; text-align: left; font-size:14px">최소 병력</td>
                      <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastspear" class="leastspear" style="width:80%; text-align: center; color: grey;" value="${unit.spear}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                      <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastsword" class="leastsword" style="width:80%; text-align: center; color: grey;" value="${unit.sword}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                      <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastaxe" class="leastaxe" style="width:80%; text-align: center; color: grey;" value="${unit.axe}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                      <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastspy" class="leastspy" style="width:80%; text-align: center; color: grey;" value="${unit.spy}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                      <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastlight" class="leastlight" style="width:80%; text-align: center; color: grey;" value="${unit.light}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                      <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastheavy" class="leastheavy" style="width:80%; text-align: center; color: grey;" value="${unit.heavy}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                      <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastram" class="leastram" style="width:80%; text-align: center; color: grey;" value="${unit.ram}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                      <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastcatapult" class="leastcatapult" style="width:80%; color: grey;" value="${unit.catapult}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                      <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastknight" class="leastknight" style="width:80%; color: grey;" value="${unit.knight}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                      </td>
                  </tr>
                  <tr>
                    <td style="font-size: 10px"> 설정 </td> 
                    <td style="font-size: 9px"> 타겟당발사</td> 
                    <td style="text-align: center; vertical-align: middle;"> <input type="number" name="reps" class="reps" style="width:80%; color: grey;" value="${unit.reps}" onblur="if(this.value=='') {this.value='1'; this.style.color='grey';}"> </td>
                    <td>그룹이름</td> 
                    <td style="text-align: center; vertical-align: middle;"> <input type="text" name="name" class="name" style="width:80%; color: grey;" value="" onblur="if(this.value=='') {this.value='k64'; this.style.color='grey';}"> </td>                 
                  </tr>
                     <tr>
                  </tr>
<table class="targeta" style="margin-left: 1%; margin-bottom:10px; width:98%;text-align:left;font-size:11px;">
                      <tr>
                          <td style="width: 90px; text-align: left; font-size:14px"> 타겟 좌표 111|222 333|444 123|333 공백으로 좌표 구분 </td>
                      </tr>
                      <tr>
                        <td>
                        <textarea id="targetcoord" name="targetcoord" class="targetcoord" style="width: 690px; height: 100px; resize: none;"></textarea>
</td>
                      </tr>
                          </table>
<h3 style="margin-left:8px;">list</h3>
<div id="groupsContainer" style="margin-left: 9px; margin-bottom:10px; width:678px;text-align:left;font-size:11px;height: 100px; border: 1px solid black; overflow-y: auto; padding: 10px;">
    <table style="width: 100%; border-collapse: collapse;">
        <tbody id="groupsTable">
           
        </tbody>
    </table>
</div>

<!-- 팝업 박스 -->
<div id="urlPopup" style="display: none; position: fixed; top: 800%; left: 800%; transform: translate(-50%, -50%); width: 400px; height: 150px; background-color: white; border: 1px solid #ccc; padding: 10px; z-index: 1000;">
    <h3>URL</h3>
    <pre id="urlContent"></pre>
</div>

   <table>
                      <tr>
                      <td>
                    <input type="button" class="btn saveButton" value="저장">
                  </td> </tr>
                  </table>
                 
          </table>
        </tbody>
      </div>

 <div id="땡타" class="ttab-content" style="border-top: 0.2px solid #7D510F; overflow: auto; border-bottom: none; border-left: none; border-right: none; border-collapse: separate !important; border-spacing: 0px !important;">
    <table class="vis" style="margin-left: 1%;width:98%;text-align:left;font-size:11px;">
        <tbody>
            <tr>
                <h1 style="margin-left:12px; font-size:14px;"><br> (땡타) 최소 유닛 설정</h1>
            </tr>
            <tr>
                <td style="width: 90px; text-align: left; font-size:14px">유닛</td>
                <td class="spear" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_sword.png"></td>
                <td class="sword" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_sword.png"></td>
                <td class="axe" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_axe.png"></td>
                <td class="spy" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_spy.png"></td>
                <td class="light" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_light.png"></td>
                <td class="heavy" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_heavy.png"></td>
                <td clas            <tr>
                <td style="width: 90px; text-align: left; font-size:14px">최소 병력</td>
                <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastspear" class="leastspear" style="width:80%; text-align: center; color: grey;" value="${unit.spear}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastsword" class="leastsword" style="width:80%; text-align: center; color: grey;" value="${unit.sword}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastaxe" class="leastaxe" style="width:80%; text-align: center; color: grey;" value="${unit.axe}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastspy" class="leastspy" style="width:80%; text-align: center; color: grey;" value="${unit.spy}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastlight" class="leastlight" style="width:80%; text-align: center; color: grey;" value="${unit.light}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastheavy" class="leastheavy" style="width:80%; text-align: center; color: grey;" value="${unit.heavy}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastram" class="leastram" style="width:80%; text-align: center; color: grey;" value="${unit.ram}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastcatapult" class="leastcatapult" style="width:80%; color: grey;" value="${unit.catapult}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                <td style="text-align: center; vertical-align: middle;"> <input type="number" name="leastknight" class="leastknight" style="width:80%; color: grey;" value="${unit.knight}" onblur="if(this.value=='0') {this.value='0'; this.style.color='grey';}"> </td>
                </td>
            </tr>s="ram" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_ram.png"></td>
                <td class="catapult" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_catapult.png"></td>
                <td class="knight" style="width: 30px; height: 20px; text-align: center; vertical-align: middle;"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_knight.png"></td>
            </tr>


            <tr>
                <td><input type="button" class="btn DEFpalaButton" value="입력"></td>
            </tr>
            <table class="target" style="margin-left: 1%;width:98%;text-align:left;font-size:11px;">
                <tr>
                    <td style="width: 90px; text-align: left; font-size:14px">타겟 좌표</td>
                </tr>
                <tr>
                    <td> <textarea name="22target" class="2arget" style="width: 690px;height: 100px;resize: none;"></textarea> </td>
                </tr>
                <tr>
                    <td> <textarea name="22target" class="2target" style="width: 690px;height: 100px;resize: none;"></textarea> </td>
                </tr>
            </table>
    </table>
    <br><input type="button" class="btn saveButton" value="저장"> </tbody>
</div>
 </div>
 `
            Dialog.show("모드설정", html);
            $(".rtab-button").click(function () {
                $(".ttab-content").hide();
                $(".rtab-content").show();
            });
            $(".ttab-button").click(function () {
                $(".rtab-content").hide();
                $(".ttab-content").show();
            });

            function activateInitialTab() {
                $(".ttab-content").hide();
                $(".rtab-content").show();
            }

            activateInitialTab();
            $('#popup_box_모드설정').css('width', '750px');




            $('.saveButton').click(function () {
                var coords = jQuery('#targetcoord').val(); // ID 선택자로 수정
                console.log("coords: " + coords); // coords 값 로그
                var coordinates = coords.split(' '); // 공백으로 좌표를 구분
                console.log("좌표 배열: ", coordinates); // 좌표 배열 로그
                var targetUrls = [];
                var villageIds = [];

                // 빌리지 ID 수집
                var villageOverviews = $("a[href$='screen=overview']");
                for (var i = 1; i < villageOverviews.length; i++) {
                    var thisURL = villageOverviews[i].href;
                    var villageId = thisURL.match('[\?&]village=([^&#]*)');
                    if (villageId) {
                        villageIds.push(villageId[1]);
                    }
                }

                // 각 좌표에 대해 URL 생성
                var urlCountPerVillage = Number($('input[name="reps"]').val()) || 1; // 기본값 1
                for (var i = 0; i < coordinates.length; i++) {
                    var [toX, toY] = coordinates[i].split('|').map(Number); // [toX, toY]로 분리
                    console.log(`좌표 ${i + 1}: toX = ${toX}, toY = ${toY}`); // 각 좌표 로그

                    var villageIdsForCoordinate = []; // 해당 좌표에 대한 빌리지 ID 저장 배열

                    // 랜덤으로 빌리지 ID 선택
                    for (var j = 0; j < urlCountPerVillage; j++) {
                        var randomIndex = Math.floor(Math.random() * villageIds.length); // 무작위 인덱스 선택
                        var villageId = villageIds[randomIndex];
                        var url = document.URL.split('?')[0] + "?" + sitter + 'village=' + villageId + '&screen=place&x=' + toX + '&y=' + toY;
                        console.log(`생성된 URL: ${url}`); // 생성된 URL 로그
                        targetUrls.push(url); // 생성된 URL을 배열에 추가
                        villageIdsForCoordinate.push(villageId); // 해당 좌표에 대한 빌리지 ID 추가
                    }
                }
                // 생성된 URL을 줄바꿈으로 구분하여 저장
                var attackName = $('input[name="name"]').val(); // 사용자가 입력한 공격 이름
                var urlsKey = `${attackName}_list`; // 키 생성
                localStorage.setItem(urlsKey, targetUrls.join('\n')); // URL을 줄바꿈으로 구분하여 저장
                console.log(`저장된 URL 목록: ${urlsKey} => ${targetUrls.join('\n')}`); // 저장 로그
                // 생성된 URL 배열을 사용하여 추가 작업 수행 가능
                console.log("최종 생성된 URL 목록: ", targetUrls);
                let updatedOptions = {
                    spear   : $('.leastspear').val(),
                    sword   : $('.leastsword').val(),
                    axe     : $('.leastaxe').val(),
                    spy     : $('.leastspy').val(),
                    light   : $('.leastlight').val(),
                    heavy   : $('.leastheavy').val(),
                    ram     : $('.leastram').val(),
                    catapult: $('.leastcatapult').val(),
                    knight  : $('.leastknight').val(),
                    reps  : $('.leastreps').val(),
                };
                localStorage.setItem('ATTACK_unit', JSON.stringify(updatedOptions));
                UI.InfoMessage('저장되었습니다..', 3000);
                loadGroups();
            });

            $('.pushButton').click(function () {

            })
            // 팝업 닫기 버튼 클릭 시 팝업 닫기
            $('#closePopup').click(function() {
                $('#urlPopup').hide();
            });
    }
        init();
        loadGroups()
    })}

