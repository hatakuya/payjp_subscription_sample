/**
 * 画面起動時処理
 */
$(document).ready(function(){
    // 顧客IDを元に契約可能なプランと使用可能なカードを設定
    getCard();
    //　各ボタンクリックのイベントを定義
    document.querySelector('#apply_subscription_button').addEventListener('click',moveInputPage);
});


/**
 * 選択可能なプランの一覧を選択形式で出力
 */
function getCard(){

    // ユーザIDからPayJP顧客IDを取得する
    var userId = $('#userid').val();
    $.post(
        "../module/database_wrapper.php?command=select_payjp_user",
        { 'user_id':userId },
        function(response){
            if(response != 'null'){
                var parsed = $.parseJSON(response);
                if(parsed.error){
                    alert("エラーが発生しました。詳細：" + parsed.error.message);
                    return;
                }
                // 取得したカード情報を元にカード情報詳細を取得し設定する
                getCardDetail(parsed[0].customer_id);
            }else{
                alert("エラーが発生しました。管理者へお問い合わせ下さい。");
            }

            
        }
    );
}

/**
 * 入力されたメールアドレスに紐付く顧客情報を取得
 * 顧客に紐付くカード情報および契約している定期決済情報を画面へ表示する
 */
function getCardDetail(customerId){
    if(customerId == null){
        $('#cards').append('<label><input name="card" type="radio" value="new" checked="true">新しいカードで申し込む</label><br>');
        return;
    }

    $.post(
        "../module/payjp_wrapper.php?command=get_customer_card_list",
        { 'customerid': customerId },
        function(response){
            $('#cards').html('');
            // JSONデータをパース
            var parsed = $.parseJSON(response);
            // カード情報の一覧を出力
            $.each(parsed.card.data, function(index, element){
                $('#cards').append('<label><input name="card" type="radio" value="'+ element.id +'">XXXX - XXXX - XXXX - '+ element.last4 + '</label>');
                $('#cards').append('<input type="hidden" id="name_' +element.id+ '" value="' + element.name + '">');
                $('#cards').append('<input type="hidden" id="last4_' +element.id+ '" value="' + element.last4 + '">');
                $('#cards').append('<input type="hidden" id="brand_' +element.id+ '" value="' + element.brand + '">');
                $('#cards').append('<input type="hidden" id="exp_month_' +element.id+ '" value="' + element.exp_month + '">');
                $('#cards').append('<input type="hidden" id="exp_year_' +element.id+ '" value="' + element.exp_year + '">');
            });
        }
    );    
}

/**
 * クレジットカード情報入力画面への遷移
 * 事前にページ上に保持しているユーザー情報を取得する
 */
function moveInputPage(){
    var userId = $('#userid').val();
    var customerId = $('#customerid').val();
    
    var data = {'userid':userId, 'customerid':customerId};
    postForm( './input.php', data );
}