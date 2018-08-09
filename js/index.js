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
            $('#cards').html('');
            $('#subscriptions').html('');
            // 契約情報がなければその旨を通知
            if(response == 'null'){
                $('#customerId').html('未登録');
                $('#cards').append('<label class="btn"><input name="card" type="radio" value="new" checked="true">登録されているカードはありません。</label><br>');
                $('#subscriptions').append('<label>契約情報はまだありません</label><br>');
            }else{
                // JSONデータをパース
                var parsed = $.parseJSON(response);

                // PayJP顧客IDを出力
                $('#customerId').html(parsed.id);
                
                // カード情報の一覧を出力
                $('#cards').append('<label class="btn"><input name="card" type="radio" value="new" checked>新しいカードで申し込む</label><br>');
                $.each(parsed.card, function(index, element){
                    $('#cards').append('<label class="btn"><input name="card" type="radio" value="'+ element.id +'">XXXX - XXXX - XXXX - '+ element.last4 + '</label>');
                    $('#cards').append('<input type="hidden" id="name_' +element.id+ '" value="' + element.name + '">');
                    $('#cards').append('<input type="hidden" id="last4_' +element.id+ '" value="' + element.last4 + '">');
                    $('#cards').append('<input type="hidden" id="brand_' +element.id+ '" value="' + element.brand + '">');
                    $('#cards').append('<input type="hidden" id="exp_month_' +element.id+ '" value="' + element.exp_month + '">');
                    $('#cards').append('<input type="hidden" id="exp_year_' +element.id+ '" value="' + element.exp_year + '">');
                });

                // 顧客が契約している定期課金情報の一覧を出力
                $.each(parsed.subscription, function(index, element){
                    $('#subscriptions').append('<label>・' + element.plan.name + '</label><br>');
                    $('#cards').append('<input type="hidden" id="' +element.plan.id+ '" value="' + element.id + '">');
                });
            }
        }
    );
}
