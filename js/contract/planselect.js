/**
 * 画面起動時処理
 */
$(document).ready(function(){
    // 選択可能プランを表示（すでに契約中のプランは除く）
    getPlanList();

    // 顧客IDを元に契約中プランを取得
    getSelectablePlanList();

    //　ボタンクリックのイベントを定義
    document.querySelector('#move_paymentselect_button').addEventListener('click',movePaymentSelectPage);
    document.querySelector('#move_previous_button').addEventListener('click',movePreviousPage);
});

/**
 * プランの一覧を表示する
 */
function getPlanList(){
    $.post(
        "server.php?command=get_plan_list",
        {  },
        function(response){
            var parsed = $.parseJSON(response);
            $.each(parsed, function(index, element){
                var billingDay = element.billing_day == null? "":element.billing_day + "日";
                var planStr = element.name + " :(" + element.amount + " 円)/ 毎月" + billingDay + "支払い"
                $("#planList").append('<label>・' + planStr + '</label><br>');
            });
        }
    );
}

/**
 * 選択可能なプランの一覧を選択形式で出力
 */
function getSelectablePlanList(){ 
    var customerId = $('#customerid').val();
    $('#move_paymentselect_button').prop("disabled", false);
    $.post(
        "server.php?command=get_selectable_plan_list",
        { 'customerid':customerId },
        function(response){
            if(response == 'null'){
                $("#planSelect").append('<option>選択可能なプランはありません</option>');
                $('#move_paymentselect_button').prop("disabled", true);
                return;
            }

            var parsed = $.parseJSON(response);
            if(parsed.error){
                alert("エラーが発生しました。詳細：" + parsed.error.message);
                return;
            }

            $.each(parsed, function(index, element){
                $("#planSelect").append( function(){
                    if($("#planSelect option[value='"+ element.id +"']").length == 0) {
                        var billingDay = element.billing_day == null? "":element.billing_day + "日";
                        var planStr = element.name + " :(" + element.amount + " 円)/ 毎月" + billingDay + "支払い"
                        return $("<option>").val(element.id).text(planStr);
                    }
                });
            });
        }
    );
}

/**
 * 前の画面へ遷移する
 */
function movePreviousPage(){
    postForm( './index.php', {} );
}

/**
 * 支払い方法選択画面への遷移
 */
function movePaymentSelectPage(){
    var userId = $('#userid').val(); 
    var mail = $('#mail').val();
    var customerId = $('#customerid').val();
    var planId = $('[name="plan"] option:selected').val();
    var data = {'userid': userId, 'mail':mail, 'customerid':customerId, 'planid':planId};
    postForm( './paymentselect.php', data );
}
