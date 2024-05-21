javascript:

    var aaa = window.location.href;
var targetUrl = "&screen=am_farm";
var isTargetPage = aaa.includes(targetUrl);
if (isTargetPage) {
    $(document).ready(function() {
        const init = function () {
            var unit= JSON.parse(localStorage.getItem('wallset')) || {
                spear: 0,
                sword: 0,
                axe: 0,
                spy: 0,
                light: 0,
                ram: 0,
                catapult: 0
            };
            function a(){
                var unit1 = document.querySelector("#popup_box_popup_command");
                if (unit1) {
                    var unit= JSON.parse(localStorage.getItem('wallset')) || {
                        spear: 0,
                        sword: 0,
                        axe: 0,
                        spy: 0,
                        light: 0,
                        ram: 0,
                        catapult: 0
                    };
                    document.querySelector("#unit_input_spear").value = unit.spear;
                    document.querySelector("#unit_input_sword").value = unit.sword;
                    document.querySelector("#unit_input_axe").value = unit.axe;
                    document.querySelector("#unit_input_spy").value = unit.spy;
                    document.querySelector("#unit_input_light").value = unit.light;
                    document.querySelector("#unit_input_ram").value = unit.ram;
                    document.querySelector("#unit_input_catapult").value = unit.catapult;
                    setTimeout(function() {
                        ;document.querySelector("#target_attack").click();
                    }, Math.floor(Math.random() * 500) + 100)
                    setTimeout(function() {
                        document.querySelector("#troop_confirm_submit").click();
                    }, Math.floor(Math.random() * 500) + 700);

                }}
            let html = `
  <div id="tabs" class="optionsContent" style="width:95%;margin:auto;background: url('graphic/index/main_bg.jpg') 100% 0% #E3D5B3;border: 1px solid #7D510F;border-collapse: separate !important;border-spacing: 0px !important;">
<div id="설정" class="mtab-content" style="border-top: 0.2px solid #7D510F; border-bottom: none; border-left: none; border-right: none; border-collapse: separate !important; border-spacing: 0px !important;">
<table class="vis" style="width:100%;text-align:left;font-size:11px;">
<tr><h1  style="margin-left:3px; font-size:14px;"><br>유닛 설정</h1></tr>
  <tr><td>창병</td><td><input type="text" size="5" class="spear" value="${unit.spear}"></td></tr>
  <tr><td>검병</td><td><input type="text" size="5" class="sword" value="${unit.sword}"></td></tr>
  <tr><td>도끼</td><td><input type="text" size="5" class="axe" value="${unit.axe}"></td></tr>
  <tr><td>정찰</td><td><input type="text" size="5" class="spy" value="${unit.spy}"></td></tr>
  <tr><td>기마</td><td><input type="text" size="5" class="light" value="${unit.light}"></td></tr>
  <tr><td>램</td><td><input type="text" size="5" class="ram" value="${unit.ram}"></td></tr>
  <tr><td>캣</td><td><input type="text" size="5" class="catapult" value="${unit.catapult}"></td></tr>
</table><br><input type="button" class="btn set" value="저장 및 실행"></div>
    `;
            Dialog.show("설정",html);

            $('.set').click(function() {
                let updatedOptions = {
                    spear: $('.spear').val(),
                    sword: $('.sword').val(),
                    axe: $('.axe').val(),
                    spy: $('.spy').val(),
                    light: $('.light').val(),
                    ram: $('.ram').val(),
                    catapult: $('.catapult').val(),
                };
                localStorage.setItem('wallset', JSON.stringify(updatedOptions));
                UI.InfoMessage('저장되었습니다.. ', 3000);
                Dialog.close("설정",html);
                var c=setInterval(a,500);
            });}
        init();


    })}
else {

        var sitter = "";
        var bbb = window.location.href;
        var villageid = (bbb.split("village=")[1]).split("&")[0];
        if (/t=/g.test(bbb)) {
            sitter = "t=" + (bbb.split("t=")[1]).split("&")[0];
        }
        alert("잦밀페이지로 이동합니다..");
        var bbb = document.URL.split('?')[0] + "?" + sitter + "&village=" + villageid + "&screen=am_farm";
        window.location.href = bbb;
    }
