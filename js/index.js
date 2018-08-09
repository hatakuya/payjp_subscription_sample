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

function moveApplySubscriptionPage(){

}

function moveControllPlanPage(){

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
            console.log(response);
            $('#customerId').html('');
            $('#cards').html('');
            $('#subscriptions').html('');
            // 契約情報がなければその旨を通知
            if(response == 'null'){
                $('#customerId').html('未登録');
                $('#cards').append('<label><input name="card" type="radio" value="new" checked="true">登録されているカードはありません。</label><br>');
                $('#subscriptions').append('<label>契約情報はまだありません</label><br>');
            }else{
                // JSONデータをパース
                var parsed = $.parseJSON(response);

                // PayJP顧客IDを出力
                $('#customerId').html(parsed.id);

                // 顧客が契約している定期課金情報の一覧を出力
                $.each(parsed.subscription, function(index, element){
                    $('#subscriptions').append('<label>・' + element.plan.name + '</label><br>');
                });
                
                // カード情報の一覧を出力
                $.each(parsed.card, function(index, element){
                    $('#cards').append('<label>・XXXX - XXXX - XXXX - '+ element.last4 + '</label><br>');
                });

            }
        }
    );
}
