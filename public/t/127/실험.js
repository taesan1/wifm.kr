$(document).ready(function() {
    const init = function () {
        let AMoptions = JSON.parse(localStorage.getItem('MODE_AM_options')) || {
            optionGroup: 0,
            optionDelay: 30,
            optionLoot: true,
            optionLootVersion: 'optionLoot1', // 'optionLoot1' 또는 'optionLoot2'
            optionREC: true,
            optionScav: true,
            optionMint: true
        };

        let DEFoptions = JSON.parse(localStorage.getItem('MODE_DEF_options')) || {
            unitratio: 98,
            heavyratio: 98,
            axeratio: 98,
            lightratio: 98,
            spyratio: 98,
            catapultratio:98,
            dodn: 4,
            dodny: 15,

        };
        let ATToptions = JSON.parse(localStorage.getItem('MODE_ATT_options')) || {
            optionGroup: 0,
            optionDelay: 30,
            optionLoot: true,
            optionLoot1: true,
            optionLoot2: false,
            optionREC: true,
            optionScav: true,
            optionMint: true
        };

        let html = `
        
  <div id="tabs" class="optionsContent" style="width:95%;margin:auto;background: url('graphic/index/main_bg.jpg') 100% 0% #E3D5B3;border: 1px solid #7D510F;border-collapse: separate !important;border-spacing: 0px !important;">
  <button class="mtab-button" data-target="AM모드" style="background: #f4e4bc; border: 1px solid #7D510F; margin-top:3px; margin-left:1px; margin-bottom:3px; box-shadow: 2px 2px 2px rgba(125, 81, 15, 0.5);">AM 모드</button>
        <button class="dtab-button" data-target="방어모드" style="background: #f4e4bc; border: 1px solid #7D510F; margin-top:3px; margin-left:1px; margin-bottom:3px; box-shadow: 2px 2px 2px rgba(125, 81, 15, 0.5);">방어 모드</button>
        <button class="atab-button" data-target="공격모드" style="background: #f4e4bc; border: 1px solid #7D510F; margin-top:3px; margin-left:1px; margin-bottom:3px; box-shadow: 2px 2px 2px rgba(125, 81, 15, 0.5);">공격 모드</button>
<div id="AM모드" class="mtab-content" style="border-top: 0.2px solid #7D510F; border-bottom: none; border-left: none; border-right: none; border-collapse: separate !important; border-spacing: 0px !important;">
<table class="vis" style="width:100%;text-align:left;font-size:11px;">
<tr><h1  style="margin-left:3px; font-size:14px;"><br> AM 설정</h1></tr>
  <tr><td>그룹id</td><td><input type="text" size="5" class="AMoptionGroup" value="${AMoptions.optionGroup}"></td></tr>
  <tr><td>지연 시간(초)</td><td><input type="text" size="5" class="AMoptionDelay" value="${AMoptions.optionDelay}"></td></tr>
  <tr><td>동줍 기능</td><td><input type="checkbox" class="AMoptionLoot" ${(AMoptions.optionLoot) ? 'checked' : ''}></td></tr>
  <tr>
    <td>동줍(버전)</td>
    <td>
      <input type="radio" name="optionLootVersion" class="AMoptionLoot1" ${(AMoptions.optionLootVersion =='optionLoot1') ? 'checked' : ''}>farmgod
      <input type="radio" name="optionLootVersion" class="AMoptionLoot2" ${(AMoptions.optionLootVersion =='optionLoot2') ? 'checked' : ''}>LA(구버전)
    </td> 
  </tr>
  <tr><td>징집 기능</td><td><input type="checkbox" class="AMoptionREC" ${(AMoptions.optionREC) ? 'checked' : ''}></td></tr>
  <tr><td>스캐빈징 기능</td><td><input type="checkbox" class="AMoptionScav" ${(AMoptions.optionScav) ? 'checked' : ''}></td></tr>
  <tr><td>코찍 기능</td><td><input type="checkbox" class="AMoptionMint" ${(AMoptions.optionMint) ? 'checked' : ''}></td></tr>
</table><br><input type="button" class="btn AMoptionButton" value="저장"></div>


<div id="방어모드" class="dtab-content"style="border-top: 0.2px solid #7D510F; border-bottom: none; border-left: none; border-right: none; border-collapse: separate !important; border-spacing: 0px !important;">
<table class="vis" style="width:100%;text-align:left;font-size:11px;">
 <tbody><tr><h1  style="margin-left:3px; font-size:14px;"><br> 닷지 병력설정</h1></tr>
 <tr>
 <td>방어 유닛</td>
 <td class="DEFunit"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_sword.png"></td>
 <td class="DEFheavy"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_heavy.png"></td>
 <td>공격 유닛</td>
 <td class="DEFaxe"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_axe.png"></td>
 <td class="DEFlight"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_light.png"></td>
 <td>유틸 유닛</td>
 <td class="DEFspy"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_spy.png"></td>
 <td class="DEFcatapult"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_catapult.png"></td>
 </tr>
 <tr>
 <td>닷지 비율</td>
 <td><input type="text" name="DEFunitratio" class="DEFunitratio" style="width:18px; color: grey;" value="${DEFoptions.unitratio}" onfocus="if(this.value=='100') {this.value=''; this.style.color='black';}" onblur="if(this.value=='') {this.value='100'; this.style.color='grey';}">
 </td>
 <td><input type="text" name="DEFheavyratio" class="DEFheavyratio" style="width:18px; color: grey;" value="${DEFoptions.heavyratio}" onfocus="if(this.value=='100') {this.value=''; this.style.color='black';}" onblur="if(this.value=='') {this.value='100'; this.style.color='grey';}">
 </td>
 <td>닷지 비율</td>
 <td><input type="text" name="DEFaxeratio" class="DEFaxeratio" style="width:18px; color: grey;" value="${DEFoptions.axeratio}" onfocus="if(this.value=='100') {this.value=''; this.style.color='black';}" onblur="if(this.value=='') {this.value='100'; this.style.color='grey';}">
 </td>
 <td><input type="text" name="DEFlightratio" class="DEFlightratio" style="width:18px; color: grey;" value="${DEFoptions.lightratio}" onfocus="if(this.value=='100') {this.value=''; this.style.color='black';}" onblur="if(this.value=='') {this.value='100'; this.style.color='grey';}">
 </td>
 <td>닷지 비율</td>
 <td><input type="text" name="DEFspyratio" class="DEFspyratio" style="width:18px; color: grey;" value="${DEFoptions.spyratio}" onfocus="if(this.value=='100') {this.value=''; this.style.color='black';}" onblur="if(this.value=='') {this.value='100'; this.style.color='grey';}">
 </td>
 <td><input type="text" name="DEFcatapultratio" class="DEFcatapultratio" style="width:18px; color: grey;" value="${DEFoptions.catapultratio}" onfocus="if(this.value=='100') {this.value=''; this.style.color='black';}" onblur="if(this.value=='') {this.value='100'; this.style.color='grey';}">
 </td>
 </tr>
 <tr>
<td>팔라 빌리지</td>
<td class="DEFknight"><img src="https://dsen.innogamescdn.com/asset/1d2499b/graphic/unit/unit_knight.png"></td>
<td><input type="button" class="btn DEFpalaButton" value="입력"></td>
<td>닷지 시간(분)</td><td><img src="https://dsbr.innogamescdn.com/asset/234518f7/graphic/questionmark.png"></td><td><input type="text" style="width:17px" class="DEFdodn" value="${DEFoptions.dodn}"></td>
<td>새로 고침(초)</td><td><img src="https://dsbr.innogamescdn.com/asset/234518f7/graphic/questionmark.png"></td><td><input type="text" style="width:17px" class="DEFdodny" value="${DEFoptions.dodny}"></td>
 </tr>
 </tbody>
</table><br><input type="button" class="btn DEFoptionButton" value="저장"></div>



<div id="공격모드" class="atab-content" style="border-top: 0.2px solid #7D510F; border-bottom: none; border-left: none; border-right: none; border-collapse: separate !important; border-spacing: 0px !important;">
    <table class="vis" style="width:100%;text-align:left;font-size:11px;">
   <tr><h1  style="margin-left:3px; font-size:14px;"><br> 공격 설정(아직 수정중 이용금지) </h1></tr>
    <tr><td>그룹</td><td><input type="text" size="5" class="ATToptionGroup" value="${ATToptions.optionGroup}"></td></tr>
      <tr><td>빌리지 당 발사 횟수</td><td><input type="text" size="5" class="ATToptionDelay" value="${ATToptions.optionDelay}"></td></tr>
      <tr><td>지연 시간</td><td><input type="checkbox" class="ATToptionLoot" ${(ATToptions.optionLoot) ? 'checked' : ''}></td></tr>
      <tr>
        <td>공격 유형 변경</td>
        <td>
          <input type="radio" name="optionLootVersion" class="ATToptionLoot1" value="optionLoot1" ${(ATToptions.optionLoot1) ? 'checked' : ''}>페이크
          <input type="radio" name="optionLootVersion" class="ATToptionLoot2" value="optionLoot2" ${(ATToptions.optionLoot2) ? 'checked' : ''}>팽모드
        </td>
      </tr>
      <tr><td>정찰병 유무</td><td><input type="checkbox" class="ATToptionREC" ${(ATToptions.optionREC) ? 'checked' : ''}></td></tr>
      <tr><td>페이크</td><td><input type="checkbox" class="ATToptionScav" ${(ATToptions.optionScav) ? 'checked' : ''}></td></tr>
      <tr><td>공격</td><td><input type="checkbox" class="ATToptionMint" ${(ATToptions.optionMint) ? 'checked' : ''}></td></tr>
    </table><br><input type="button" class="btn ATToptionButton" value="저장"></div>
    </div>
    `;

        Dialog.show("모드설정",html);
        $(".mtab-button").click(function() {
            $(".atab-content").hide();
            $(".dtab-content").hide();
            $(".mtab-content").show();
        });
        $(".atab-button").click(function() {
            $(".dtab-content").hide();
            $(".mtab-content").hide();
            $(".atab-content").show();
        });
        $(".dtab-button").click(function() {
            $(".atab-content").hide();
            $(".mtab-content").hide();
            $(".dtab-content").show();
        });
        function activateInitialTab() {
            $(".atab-content").hide();
            $(".dtab-content").hide();
            $(".mtab-content").show();
        }
        activateInitialTab();
        $('#popup_box_모드설정').css('width', '450px');
        $('.DEFpalaButton').click(function(){
            localStorage.getItem('palavill')||0
            let g1=prompt('팔라 빌리지 좌표를 공백을 구분해서 입력하세요',localStorage.getItem('palavill'))
            localStorage.setItem('palavill',g1);
        })
        $('.AMoptionButton').click(function() {
            let updatedOptions = {
                optionGroup: $('.AMoptionGroup').val(),
                optionDelay: $('.AMoptionDelay').val(),
                optionREC: $('.AMoptionREC').is(':checked'),
                optionLoot: $('.AMoptionLoot').is(':checked'),
                optionLootVersion: $('input[name="optionLootVersion"]:checked').val(),
                optionScav: $('.AMoptionScav').is(':checked'),
                optionMint: $('.AMoptionMint').is(':checked')
            };
            localStorage.setItem('MODE_AM_options', JSON.stringify(updatedOptions));
        });
        $('.DEFoptionButton').click(function() {
            let updatedOptions = {
                unitratio: $('.DEFunitratio').val(),
                heavyratio: $('.DEFheavyratio').val(),
                axeratio: $('.DEFaxeratio').val(),
                lightratio: $('.DEFlightratio').val(),
                spyratio:$('.DEFspyratio').val(),
                catapultratio:$('.DEFcatapultratio').val(),
                dodn:$('.DEFdodn').val(),
                dodny:$('.DEFdodny').val()
            };
            localStorage.setItem('MODE_DEF_options', JSON.stringify(updatedOptions));
        });
        $('.ATToptionButton').click(function() {
            let updatedOptions = {
                optionGroup: $('.ATToptionGroup').val(),
                optionDelay: $('.ATToptionDelay').val(),
                optionREC: $('.ATToptionREC').is(':checked'),
                optionLoot: $('.ATToptionLoot').is(':checked'),
                optionLoot1: $('.ATToptionLoot1').is(':checked'),
                optionLoot2: $('.ATToptionLoot2').is(':checked'),
                optionScav: $('.ATToptionScav').is(':checked'),
                optionMint: $('.ATToptionMint').is(':checked')
            };
            localStorage.setItem('MODE_ATT_options', JSON.stringify(updatedOptions));
        });
    }
    init();
})