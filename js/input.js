/**
 * 画面起動時処理
 */
$(document).ready(function(){
    // カード表示
    $('form').card({
        container: '.card-wrapper', 
    });
    
    // payjp.jsの初期化
    Payjp.setPublicKey('pk_test_5e388cdf3be397973de9c4c2');
    document.querySelector('#move_confirm_button').addEventListener('click',moveConfirmPage);
});

/**
 * 確認画面への遷移ロジック
 * 画面上の情報を収集
 */
function moveConfirmPage(){
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
    Payjp.createToken(card, function(s, response) {
        if (response.error) {
            alert("エラーが発生しました。入力されたカードは使用できません。入力内容を再確認してください。エラー詳細（" + response.error.message + "）");
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