/**
 * 画面起動時処理
 */
$(document).ready(function(){
    // 決済実行および完了ページへの遷移
    document.querySelector('#move_complete_button').addEventListener('click',moveThanksPage);
    document.querySelector('#move_previous_button').addEventListener('click',movePreviousPage);

    // アラート表示領域の初期化
    $('#danger_area').hide();
    $('#danger_area').addClass('alert-danger');

    getCustomer();
    displayLogo();
});

/**
 * ユーザIDよりPayjp顧客情報を取得する
 */
function getCustomer(){
    var userid = $('#userid').val();
    $.post(
        "../module/database_wrapper.php?command=select_payjp_user",
        { 'userid': userid},
        function(response){
            var parsed = $.parseJSON(response);
            if (parsed.error) {
                $('#danger_area').html("システムエラーが発生しました。管理者に問い合わせて下さい。");
                $('#danger_area').show();
            }else{
                // 顧客IDのセット
                $('#customerid').val(parsed[0].customer_id);
            }
        }
    );
}

/**
 * 指定したカードIDに紐づく情報を取得する未使用
 */
function getCard(customerId){
    var cardId = $('#cardid').val();
    $.post(
        "../module/payjp_wrapper.php?command=get_customer_card",
        { 'customerid':customerId, 'cardid': cardId},
        function(response){
            var parsed = $.parseJSON(response);
            if (parsed.error) {
                $('#danger_area').html("カード情報取得時にエラーが発生しました。詳細（" + parsed.error.message + "）");
                $('#danger_area').show();
            }else{
                $('#disp_last4').html(parsed.last4);
                $('#disp_cardname').html(parsed.name);
                $('#disp_brand').html(parsed.brand);
                $('#disp_exp').html(parsed.exp_month + " / " + parsed.exp_year);
                displayLogo();
            }
        }
    );
}

/**
 * クレジットカードのロゴを表示
 */
function displayLogo(){
    var logoStr = $('#disp_brand').html();
    switch(logoStr){
        case 'Visa':
            $('#disp_brand').html("<img class='img-fluid' src='../img/card_visa.png' />");
            break;
        case 'MasterCard':
            $('#disp_brand').html("<img class='img-fluid' src='../img/card_master.png' />");
            break;
        case 'JCB':
            $('#disp_brand').html("<img class='img-fluid' src='../img/card_jcb.png' />");
            break;  
        case 'American Express':
            $('#disp_brand').html("<img class='img-fluid' src='../img/card_amex.png' />");
            break;
        case 'Diners Club':
            $('#disp_brand').html("<img class='img-fluid' src='../img/card_dinersclub.png' />");
            break;
        case 'Discover':
            $('#disp_brand').html("<img class='img-fluid' src='../img/card_discover.png' />");
            break;
    }
}

/**
 * 決済処理を実行後完了ページへ遷移
 */
function moveThanksPage(){
    $('#danger_area').hide();
    var tokenId = $('#tokenid').val();
    var customerId = $('#customerid').val();

    // トークンが入っていれば新規顧客登録
    changeCard(customerId, tokenId);
}

/**
 * 定期課金作成
 * @param {*} customerId 
 * @param {*} planId 
 */
function changeCard(customerId, tokenid){
    $.post(
        "../module/payjp_wrapper.php?command=update_customer_card",
        { 'customerid': customerId, 'tokenid':tokenid},
        function(response){
            var parsed = $.parseJSON(response);
            if (parsed != "success") {
                $('#danger_area').html("エラーが発生しました。カードが使用できません。入力内容を再確認してください。エラー詳細（" + parsed + "）");
                $('#danger_area').show();
            }else{
                // 正常終了なら完了ページへ
                postForm("./complete.php",{});
            }
        }
    );
}

/**
 * 前の画面へ遷移する
 */
function movePreviousPage(){
    var userId = $('#userid').val(); 
    var mailaddress = $('#mailaddress').val();
    var customerId = $('#customerid').val();
    var data = {'userid': userId, 'mailaddress':mailaddress, 'customerid':customerId};
    postForm( './input.php', data );
}
