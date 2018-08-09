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
                $("#planList").append('<label>・' + planStr + '</label>');
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

            console.log(response);
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
 * クレジットカード情報入力画面への遷移
 * 事前にページ上に保持しているユーザー情報を取得する
 */
function movePaymentSelectPage(){
    // 顧客IDを取得
    var customerId = $('#customerId').val();
    
    // 契約中プランを取得
    var subscriptionId = $('#' + planId).val();
    if(subscriptionId != undefined){
        alert('すでに契約済みのプランを選択しています。');
    }else{
        // 新規であればカード情報入力画面へ遷移
        if($('input[name="card"]:checked').val() == "new"){
            var data = {'mail':mail, 'planid':planId,'planname':planName, 'customerid':customerId};
            postForm( './input.php', data );
        }else{
            // 登録済みカードが選択されている場合は紐づく情報を元に確認画面へ遷移
            var cardId = $('input[name="card"]:checked').val();
            var cardName = $('#name_' + cardId).val();
            var last4 = $('#last4_' + cardId).val();
            var brand = $('#brand_' + cardId).val();
            var exp_month = $('#exp_month_' + cardId).val();
            var exp_year = $('#exp_year_' + cardId).val();
            var data = {
                'mail':mail,
                'planid':planId,
                'planname':planName,
                'customerid':customerId,
                'cardid':cardId,
                'cardname':cardName,
                'last4':last4,
                'brand':brand,
                'exp_month':exp_month,
                'exp_year':exp_year,
            };
            postForm( './confirm.php', data );
        }
    }
}
