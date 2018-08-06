/**
 * 画面起動時処理
 */
$(document).ready(function(){
    // カード表示
    $('form').card({
        container: '.card-wrapper', 
    });
    // 
    // payjp.jsの初期化
    Payjp.setPublicKey('pk_test_5e388cdf3be397973de9c4c2');
    document.querySelector('#move_confirm_button').addEventListener('click',moveConfirmPage);
});

/**
 * 確認画面への遷移ロジック
 * 画面上の情報を収集
 */
function moveConfirmPage(){
    var name = $('input[name="name"]').val(),
        mail = $('input[name="mail"]').val();
    var number = document.querySelector('input[name="number"]'),
        card_name = document.querySelector('input[name="card_name"]'),
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
            alert(response.error.message);
        }
        else {
            var tokenId = response.id;
            var data = {'name':name, 'mail':mail, 'number':number.value.replace(/\s/g, ""), 'card_name':card_name.value, 'exp_month':exp_month.value,'exp_year':exp_year.value, 'cvc':cvc.value, 'tokenid':tokenId};
            postForm( './confirm.php', data );    
        }
    });
}