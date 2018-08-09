/**
 * 画面起動時処理
 */
$(document).ready(function(){
    //　各ボタンクリックのイベントを定義
    document.querySelector('#search_customer_button').addEventListener('click',searchCustomer);
    document.querySelector('#apply_subscription_button').addEventListener('click',moveApplySubscriptionPage);
    document.querySelector('#controll_plan_button').addEventListener('click',moveControllPlanPage);

    // フォームのメールアドレスから顧客情報と紐づくカード、定期課金情報を取得
    searchCustomer();
});

/**
 * 定期購入申し込み画面への遷移
 */
function moveApplySubscriptionPage(){
    var customerId = $('#customerId').html();
    var data = {
        'customerid':customerId
    };
    postForm("./selectplan.php",data);
}

/**
 * 各種操作系への遷移（申し込み済みのプランがなければボタン制御にて遷移しない）
 */
function moveControllPlanPage(){
    var customerId = $('#customerId').html();
    var data = {
        'customerid':customerId
    };
    postForm("./controllplan.php",data);
}

/**
 * 入力されたメールアドレスに紐付く顧客情報を取得
 * 顧客に紐付くカード情報および契約している定期決済情報を画面へ表示する
 */
function searchCustomer(){
    var mail = $('input[name="mail"]').val();
    $.post(
        "server.php?command=get_customer_detail",
        { 'mail': mail},
        function(response){
            // 表示領域初期化
            $('#customerId').html('');
            $('#cards').html('');
            $('#subscriptions').html('');
            $('#controll_plan_button').prop("disabled", false);

            // 契約情報がなければその旨を通知
            if(response == 'null'){
                $('#customerId').html('未登録');
                $('#subscriptions').append('<label>・契約済みのプランはありません</label><br>');
                $('#cards').append('<label>・カード情報は未登録です</label><br>');
            }else{
                // JSONデータをパース
                var parsed = $.parseJSON(response);
                if(parsed.error){
                    alert(parsed.error.message);
                    return;
                }

                // PayJP顧客IDを出力
                $('#customerId').html(parsed.id);

                // 顧客が契約している定期課金情報の一覧を出力
                if(parsed.subscription.count != '0'){
                    $.each(parsed.subscription.data, function(index, element){
                        $('#subscriptions').append('<label>・' + element.plan.name + '</label><br>');
                    });    
                }else{
                    $('#subscriptions').append('<label>・契約済みのプランはありません</label><br>');
                    $('#controll_plan_button').prop("disabled", true);
                }
                
                // カード情報の一覧を出力
                if(parsed.card.count != '0'){
                    $.each(parsed.card.data, function(index, element){
                        $('#cards').append('<label>・XXXX - XXXX - XXXX - '+ element.last4 + '</label><br>');
                    });
                }else{
                    $('#cards').append('<label>・カード情報は未登録です</label><br>');
                }
            }
        }
    );
}
