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

    // 顧客IDがセットされていない場合（ユーザー登録必須）
    if($('#customerid').val() == ""){

    }else{
        // 登録済みカードで決済

    }
    var mail = $('#mail').val();
    var tokenId = $('#tokenid').val();
    var data = {'mail':mail, 'tokenid':tokenId};

    // 正常終了なら完了ページへ
    postForm( './complete.php', data );
}