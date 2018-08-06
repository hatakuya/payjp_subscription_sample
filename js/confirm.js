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
    var mail = $('#mail').val();
    var tokenId = $('#tokenid').val();
    var data = {'mail':mail, 'tokenid':tokenId};

    postForm( './thanks.php', data );
}
