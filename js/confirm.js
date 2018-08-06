/**
 * 画面起動時処理
 */
$(document).ready(function(){
    // 決済実行および完了ページへの遷移
    document.querySelector('#move_thanks_button').addEventListener('click',moveThanksPage);
});

/**
 * 確認画面への遷移ロジック
 * 画面上の情報を収集
 */
function moveThanksPage(){
/*
    var name = $('input[name="name"]').val();
    var mail = $('input[name="mail"]').val();
    var number = $('input[name="number"]').val();
    var card_name = $('input[name="card_name"]').val();
    var expiry = $('input[name="expiry"]').val();
    var cvc = $('input[name="cvc"]').val();

    var data = {'name':name, 'mail':mail, 'number':number, 'card_name':card_name, 'expiry':expiry, 'cvc':cvc};

    postForm( './confirm.php', data );
*/
}
