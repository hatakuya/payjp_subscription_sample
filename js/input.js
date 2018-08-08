/**
 * 画面起動時処理
 */
$(document).ready(function(){    
    // payjp.jsの初期化
    Payjp.setPublicKey('pk_test_5e388cdf3be397973de9c4c2');
    
    // ボタンクリックの処理を定義
    document.querySelector('#move_confirm_button').addEventListener('click',moveConfirmPage);
    document.querySelector('#move_previous_button').addEventListener('click',movePreviousPage);

    // カード番号の４桁区切りを有効化
    $('input.cc-num').payment('formatCardNumber');

    // アラート表示領域の初期化
    $('#danger_area').hide();
    $('#danger_area').addClass('alert-danger');
});
/**
 * 前の画面へ遷移する
 */
function movePreviousPage(){
    postForm( './index.php', {} );
}
/**
 * 確認画面への遷移ロジック
 */
function moveConfirmPage(){
    // 画面上に保持している各種情報を収集
    var name = $('#name').html(),
        mail = $('#mail').html(),
        customerId = $('#customerid').html(),
        planName = $('#planname').html(),
        planId = $('#planid').val();
    var number = document.querySelector('input[name="number"]'),
        cardname = document.querySelector('input[name="cardname"]'),
        cvc = document.querySelector('input[name="cvc"]'),
        exp_month = document.querySelector('input[name="exp_month"]'),
        exp_year = document.querySelector('input[name="exp_year"]');
    var card = {
        number: number.value.replace(/\s/g, ""),
        cvc: cvc.value,
        exp_month: exp_month.value,
        exp_year: exp_year.value
    };

    // Payjp.jsライブラリを使用してカード情報のトークンを取得
    Payjp.createToken(card, function(s, response) {
        $('#danger_area').hide();
        // Payjpサーバからのエラーをハンドリングし、問題なければトークンIDを含めて次の画面へ遷移
        if (response.error) {
            $('#danger_area').html("エラーが発生しました。入力されたカードは使用できません。入力内容を再確認してください。エラー詳細（" + response.error.message + "）");
            $('#danger_area').show();
        }
        else {
            var tokenId = response.id;
            var data = {
                'name':name, 
                'mail':mail,
                'last4':number.value.replace(/\s/g, "").substr(12,4),
                'cardname':cardname.value,
                'exp_month':exp_month.value,
                'exp_year':exp_year.value,
                'cvc':cvc.value,
                'tokenid':tokenId,
                'customerid':customerId,
                'planname':planName,
                'planid':planId
            };
            postForm( './confirm.php', data );    
        }
    });
}
