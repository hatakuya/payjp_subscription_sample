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

    // ユーザー情報の取得
    getUser();
    // Payjp顧客情報の取得
    getCustomer();
    // 選択プランの名称取得
    getPlan();
    // ロゴの切り替え
    displayLogo();
});

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

function getCustomer(){
    var userId = $('#userid').val();
    $.post(
        "../module/database_wrapper.php?command=select_payjp_user",
        { 'user_id':userId },
        function(response){
            if(response == "null"){
                $('#customer_id_disp').html("未登録");
                $('#customerid').val("未登録");           
                return;
            }
            var parsed = $.parseJSON(response);
            if (parsed.error) {
                $('#danger_area').html("ユーザ情報取得時にエラーが発生しました。詳細（" + parsed.error.message + "）");
                $('#danger_area').show();
            }else{
                if(parsed[0].customer_id){
                    $('#customer_id_disp').html(parsed[0].customer_id);
                    $('#customerid').val(parsed[0].customer_id);
                }
            }
        }
    );
}

/**
 * ユーザ情報を取得する
 */
function getUser(){
    var userId = $('#userid').val();
    $.post(
        "../module/database_wrapper.php?command=select_users",
        { 'user_id':userId },
        function(response){
            var parsed = $.parseJSON(response);
            if (parsed.error) {
                $('#danger_area').html("ユーザ情報取得時にエラーが発生しました。詳細（" + parsed.error.message + "）");
                $('#danger_area').show();
            }else{
                $('#mail_disp').html(parsed[0].mail);
                $('#mail').val(parsed[0].mail);
            }
        }
    );
}

/**
 * プラン情報を取得する
 */
function getPlan(){
    var planId = $('#planid').val();
    $.post(
        "../module/payjp_wrapper.php?command=get_plan",
        { 'planid':planId },
        function(response){
            var parsed = $.parseJSON(response);
            if (parsed.error) {
                $('#danger_area').html("プラン取得時にエラーが発生しました。詳細（" + parsed.error.message + "）");
                $('#danger_area').show();
            }else{
                $('#planname').html(parsed.name);
            }
        }
    );
}

/**
 * 指定したカードIDに紐づく情報を取得する
 */
function getCard(){
    var customerId = $('#customerid').val();
    var cardId = $('#cardid').val();
    $.post(
        "../module/payjp_wrapper.php?command=get_customer_card",
        { 'customerid':customerId, 'cardid': cardId},
        function(response){
            console.log(customerId,cardId);
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
 * 前の画面へ遷移する
 */
function movePreviousPage(){
    var userId = $('#userid').val(); 
    var mail = $('#mail').val();
    var customerId = $('#customerid').val();
    var planId = $('#planid').val();
    var data = {'userid': userId, 'mail':mail, 'customerid':customerId, 'planid':planId};

    // 登録済みであるか、否かで遷移先を切り替える
    if(customerId == '未登録'){    
        postForm( './input.php', data );
    }else{
        postForm( './paymentselect.php', data );
    }
}

/**
 * 決済処理を実行後完了ページへ遷移
 */
function moveThanksPage(){
    $('#danger_area').hide();
    var tokenId = $('#tokenid').val();
    var planId = $('#planid').val();
    var userId = $('#userid').val();
    var customerId = $('#customerid').val();
    var mail = $('#mail').val();
    // トークンが入っていれば新規顧客登録
    if(customerId == '未登録'){
        $.post(
            "../module/payjp_wrapper.php?command=create_customer",
            { 'userid':userId, 'mail': mail, 'tokenid':tokenId},
            function(response){
                var parsed = $.parseJSON(response);
                if (parsed.error) {
                    $('#danger_area').html("決済エラーが発生しました。カードが使用できません。入力内容を再確認してください。エラー詳細（" + parsed.error.message + "）");
                    $('#danger_area').show();
                }else{
                    createSubscription(parsed, planId);
                }
            }
        );
    }else{
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
        "../module/payjp_wrapper.php?command=create_subscription",
        { 'customerid': customerId, 'planid':planId},
        function(response){
            var parsed = $.parseJSON(response);
            if (parsed.error) {
                $('#danger_area').html("決済エラーが発生しました。カードが使用できません。入力内容を再確認してください。エラー詳細（" + parsed.error.message + "）");
                $('#danger_area').show();
            }else{
                // 正常終了なら完了ページへ
                postForm('./complete.php',{});
            }
        }
    );
}

