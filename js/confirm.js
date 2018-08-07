/**
 * 画面起動時処理
 */
$(document).ready(function(){
    // 決済実行および完了ページへの遷移
    document.querySelector('#move_complete_button').addEventListener('click',moveThanksPage);
});

/**
 * 確認画面への遷移ロジック
 * 画面上の情報を収集
 */
function moveThanksPage(){
    var mail = $('#mail').val();
    var tokenId = $('#tokenid').val();
    var planId = $('#planid').val();
    var customerId = $('#customerid').val();
    // 顧客IDがセットされていない場合（ユーザー登録）
    if(customerId == "新規登録"){
            $.post(
            "server.php?command=create_customer",
            { 'mail': mail, 'tokenid':tokenId},
            function(response){
                createSubscription(response, planId);
            }
        );
    }else{
        // 登録済みカードで決済
        createSubscription(customerId, planId);
    }
}

/**
 * 定期課金作成
 * @param {*} customerId 
 * @param {*} planId 
 */
function createSubscription(customerId, planId){
    $.post(
        "server.php?command=create_subscription",
        { 'customerid': customerId, 'planid':planId},
        function(response){
            // 正常終了なら完了ページへ
            postForm( './complete.php', {} );
        }
    );

}