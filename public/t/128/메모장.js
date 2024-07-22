<html>
<body>
<!-- 기존 HTML 코드 -->

<div id="공격모드" className="atab-content"
     style="border-top: 0.2px solid #7D510F; border-bottom: none; border-left: none; border-right: none; border-collapse: separate !important; border-spacing: 0px !important;">
    <table className="vis" style="width:100%;text-align:left;font-size:11px;">
        <tr><h1 style="margin-left:3px; font-size:14px;"><br/> 공격 설정(아직 수정중 이용금지) </h1></tr>
        <tr>
            <td>그룹</td>
            <td><input type="text" size="5" className="ATToptionGroup" value="${ATT.optionGroup}"/></td>
        </tr>
        <tr>
            <td>빌리지 당 발사 횟수</td>
            <td><input type="text" size="5" className="ATToptionDelay" value="${ATT.optionDelay}"/></td>
        </tr>
        <tr>
            <td>지연 시간</td>
            <td><input type="checkbox" className="ATToptionLoot" ${(ATT.optionLoot) ? 'checked' : ''}/></td>
        </tr>
        <tr>
            <td>공격 유형 변경</td>
            <td>
                <input type="radio" name="optionLootVersion" className="ATToptionLoot1" value="optionLoot1"
                       ${(ATT.optionLoot1) ? 'checked' : ''}/>페이크
                <input type="radio" name="optionLootVersion" className="ATToptionLoot2" value="optionLoot2"
                       ${(ATT.optionLoot2) ? 'checked' : ''}/>팽모드
            </td>
        </tr>
        <tr>
            <td>정찰병 유무</td>
            <td><input type="checkbox" className="ATToptionREC" ${(ATT.optionREC) ? 'checked' : ''}/></td>
        </tr>
        <tr>
            <td>페이크</td>
            <td><input type="checkbox" className="ATToptionScav" ${(ATT.optionScav) ? 'checked' : ''}/></td>
        </tr>
        <tr>
            <td>공격</td>
            <td><input type="checkbox" className="ATToptionMint" ${(ATT.optionMint) ? 'checked' : ''}/></td>
        </tr>
    </table>
    <br/><input type="button" className="btn ATToptionButton" value="저장"/>
</div>
</body>
</html>