javascripts:   var popup = document.createElement("div");
popup.id = "popup";
popup.style.position = "fixed";
popup.style.top = "10vw";
popup.style.right = "10vw";
popup.style.zIndex = "150";
popup.style.width = "50%"; // 너비를 화면 너비의 90%로 설정
popup.style.height = "50%"; // 높이를 화면 높이의 90%로 설정
popup.style.padding = "10px";
popup.style.background = "url('https://dsen.innogamescdn.com/asset/f567efc9/graphic/index/main_bg.jpg') scroll right top repeat"; // 배경 이미지 설정
popup.style.backgroundColor = "#f7eed3"; // 텍스트 색상 설정
popup.style.borderWidth = "7px";
popup.style.border = "1px solid #000000";

// 팝업 드래그 가능하게 설정
jQuery(popup).draggable();

// 팝업 추가
document.body.appendChild(popup);


function showPopup() {
    // 팝업 내용 업데이트
    var popupContent = document.getElementById("popup");

    popupContent.innerHTML = `
            <div class="popup-title">
                <h2>유닛 회군 설정</h2>
                <hr>
            </div>
            <div class="popup-content" style="overflow: auto; height: 70%;">
                <div class="draggable-area">
                    <div class="draggable-content">
                        <table class="popup-table" style="margin: 0; padding: 0; width: 100%;">
                            <tr>
                            <th>Origin </th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_spear.png" class="" data-title="Spear fighter"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_sword.png" class="" data-title="Swordsman"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_axe.png" class="" data-title="Axeman"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_archer.png" class="" data-title="Archer"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_spy.png" class="" data-title="Scout"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_light.png" class="" data-title="Light cavalry"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_marcher.png" class="" data-title="Mounted archer"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_heavy.png" class="" data-title="Heavy cavalry"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_ram.png" class="" data-title="Ram"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_catapult.png" class="" data-title="Catapult"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_knight.png" class="" data-title="Paladin"></th>
                            <th style="text-align:center" width=""><img src="https://dsen.innogamescdn.com/asset/c38e8d7e/graphic/unit/unit_snob.png" class="" data-title="Nobleman"></th>
                            <th>Action</th>
                            </tr>
                            <tr>
                             <tr>
    <th>체크</th>
<th style="text-align:center"><input type="checkbox" class="withdraw_check" name="spear"></th>
<th style="text-align:center"><input type="checkbox" class="withdraw_check" name="sword"></th>
<th style="text-align:center"><input type="checkbox" class="withdraw_check" name="axe"></th>
<th style="text-align:center"><input type="checkbox" class="withdraw_check" name="archer"></th>
<th style="text-align:center"><input type="checkbox" class="withdraw_check" name="spy"></th>
<th style="text-align:center"><input type="checkbox" class="withdraw_check" name="light_cavalry"></th>
<th style="text-align:center"><input type="checkbox" class="withdraw_check" name="mounted_archer"></th>
<th style="text-align:center"><input type="checkbox" class="withdraw_check" name="heavy_cavalry"></th>
<th style="text-align:center"><input type="checkbox" class="withdraw_check" name="ram"></th>
<th style="text-align:center"><input type="checkbox" class="withdraw_check" name="catapult"></th>
<th style="text-align:center"><input type="checkbox" class="withdraw_check" name="paladin"></th>
<th style="text-align:center"><input type="checkbox" class="withdraw_check" name="nobleman"></th>

  <th><input class="btn btn-check" type="submit" name="action" value="실행"><th>


</tr>

                            </tr>
<tr>
<th>비율</th>
<th style="text-align:center"><input type="number" class="withdraw_ratio" min="0" max="100"  style="width: 30px; text-align: center;" onblur="if(this.value==='') this.value='0'" placeholder="0" name="sqear"></th>
<th style="text-align:center"><input type="number" class="withdraw_ratio" min="0" max="100" style="width: 30px; text-align: center;" onblur="if(this.value==='') this.value='0'" placeholder="0" name="sword"></th>
<th style="text-align:center"><input type="number" class="withdraw_ratio" min="0" max="100" style="width: 30px; text-align: center;" onblur="if(this.value==='') this.value='0'" placeholder="0" name="axe"></th>
<th style="text-align:center"><input type="number" class="withdraw_ratio" min="0" max="100"  style="width: 30px; text-align: center;" onblur="if(this.value==='') this.value='0'" placeholder="0" name="archer"></th>
<th style="text-align:center"><input type="number" class="withdraw_ratio" min="0" max="100" style="width: 30px; text-align: center;" onblur="if(this.value==='') this.value='0'" placeholder="0" name="spy"></th>
<th style="text-align:center"><input type="number" class="withdraw_ratio" min="0" max="100" style="width: 30px; text-align: center;" onblur="if(this.value==='') this.value='0'" placeholder="0" name="light_cavalry"></th>
<th style="text-align:center"><input type="number" class="withdraw_ratio" min="0" max="100"  style="width: 30px; text-align: center;" onblur="if(this.value==='') this.value='0'" placeholder="0" name="mounted_archer"></th>
<th style="text-align:center"><input type="number" class="withdraw_ratio" min="0" max="100"  style="width: 30px; text-align: center;" onblur="if(this.value==='') this.value='0'" placeholder="0" name="heavy_cavalry"></th>
<th style="text-align:center"><input type="number" class="withdraw_ratio" min="0" max="100" style="width: 30px; text-align: center;" onblur="if(this.value==='') this.value='0'" placeholder="0" name="ram"></th>
<th style="text-align:center"><input type="number" class="withdraw_ratio" min="0" max="100" style="width: 30px; text-align: center;" onblur="if(this.value==='') this.value='0'" placeholder="0" name="catapult"></th>
<th style="text-align:center"><input type="number" class="withdraw_ratio" min="0" max="100" style="width: 30px; text-align: center;" onblur="if(this.value==='') this.value='0'" placeholder="0" name="paladin"></th>
<th style="text-align:center"><input type="number" class="withdraw_ratio" min="0" max="100"  style="width: 30px; text-align: center;" onblur="if(this.value==='') this.value='0'" placeholder="0" name="nobleman"></th>
<th><input class="btn btn-ratio" type="submit" class="action" value="실행"><th>
</tr>
<tr>
</tr>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div style="margin-top: 10px;"></div>
        <div class="popup-button">
         <input name="ratioinput" class="btn" type="submit" value="입력">
            <input name="close" class="btn" type="submit" value="닫기">
        </div>
        `;

    function execute() {
        var checkxx = document.querySelectorAll('.withdraw_check');
        var checkValues = [];

        checkxx.forEach(function (checkbox) {
            if (checkbox.checked) {
                var name = checkbox.name;
                checkValues.push(name);
            }
        });

        var checkString = checkValues.join(' ');
        localStorage.setItem('withdraw_check', checkString);

    }

    function ratioac() {
        var ratioxx = document.querySelectorAll('.withdraw_ratio');
        var ratioxxx = [];

        ratioxx.forEach(function (number) {
            var value = parseInt(number.value);
            if (isNaN(value)) {
                value = 0;
            } else if (value > 100) {
                value = 100;
            }
            var name = number.name;
            ratioxxx.push(name + ':' + value);
        });

        var ratioString = ratioxxx.join(' ');
        localStorage.setItem('withdraw_ratio', ratioString);
    }


    var executeButton = document.querySelector(".btn-check");
    executeButton.addEventListener("click", execute);
    var ratioButton = document.querySelector(".btn-ratio");
    ratioButton.addEventListener("click", ratioac);
    // 팝업 표시
    popup.style.display = "block";
    var unitcheck = localStorage.getItem("withdraw_check");
    var unitratio = localStorage.getItem("withdraw_ratio");
    // unitcheck 값에 따라 체크 박스 상태 설정
    if (unitcheck) {
        var checkboxes = document.getElementsByClassName("withdraw_check");
        var unitNames = unitcheck.split(" ");

        for (var i = 0; i < checkboxes.length; i++) {
            var checkbox = checkboxes[i];
            if (unitNames.includes(checkbox.name)) {
                checkbox.checked = true;
            }
        }
    }

    // unitratio 값에 따라 비율 설정
    if (unitratio) {
        var ratioArray = unitratio.split(" ");

        ratioArray.forEach(function (ratio) {
            var parts = ratio.split(":");
            var unitName = parts[0];
            var unitValue = parts[1];

            var inputElement = document.getElementsByName(unitName)[0];
            if (inputElement) {
                inputElement.value = unitValue;
            }
        });
    }

    function handleInput() {
        var unitratio = localStorage.getItem("withdraw_ratio");
        var unitcheck = localStorage.getItem("withdraw_check");
        var selectedUnit = unitcheck.split(" ");
        var ratioArray = unitratio.split(" ");

        for (var i = 0; i < selectedUnit.length; i++) {
            var unit = selectedUnit[i];
            var elements = document.querySelectorAll(`#${unit} > input`); // 배열로 감싸줍니다.
            console.log("elements: ", elements);
            elements.forEach(function (element) {
                var maxAttributeValue = element.attributes.max.value;
                if (maxAttributeValue === "0") {
                    return; // max="0"인 요소는 건너뜁니다.
                }
                for (var j = 0; j < ratioArray.length; j++) {
                    var ratio = ratioArray[j].split(":");
                    var unitName = ratio[0];
                    var unitRatio = parseFloat(ratio[1]);
                    if (unit === unitName) {
                        console.log("unit: " + unitName + "   unitRatio: " + unitRatio);
                        var maxAttributeValue = element.attributes.max.value;
                        console.log("maxAttributeValue: ", maxAttributeValue);
                        var value = parseFloat(maxAttributeValue); // td의 max 속성 값을 사용합니다.
                        var newValue = value * unitRatio;
                        console.log("Old value:", value);
                        console.log("New value:", newValue);
                        element.value = newValue; // elements가 아닌 element에 값을 할당합니다.
                    }
                }
            },200);
        }
    }


    var inputButton = document.querySelector("input[name='ratioinput']");
    inputButton.addEventListener("click", handleInput);
}
showPopup();


document.querySelector("#withdraw_selected_units_village_info > table")
var all = document.querySelector("#units_select_all")
all.click();
var table = document.querySelector("#withdraw_selected_units_village_info > table")
if (table) {
    var row;
    var cc = 999;
    var i = 1;
    if (i < cc) {
        console.log("찾았따");
        row = table.rows[i];
        var unitcheck = localStorage.getItem("withdraw_check");
        var unitratio = localStorage.getItem("withdraw_ratio");

    }
}


var unit ="spear sword heavy"
var elements = document.querySelectorAll(`#${unit} > input`);
console.log("elements: ", elements);
elements.forEach(function (element) {
    var maxAttributeValue = element.attributes.max.value;
    if (maxAttributeValue === "0") {
        return; // max="0"인 요소는 건너뜁니다.
    }
}

javascripts:
    var unit = "spear sword heavy";
var elements = document.querySelectorAll(`#${unit} > input`);
var maxSum = { spear: 0, sword: 0, heavy: 0 };

elements.forEach(function (element) {
    console.log("element:", element);
    var unitType = element.id;
    maxSum[unitType] += parseInt(element.value);
});

console.log("maxSum:", maxSum);


