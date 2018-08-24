/**
 * 画面起動時処理
 */
$(document).ready(function(){
    // 選択可能プランを表示（すでに契約中のプランは除く）
    getPlanList();

    // 顧客IDを元に契約可能なプランと使用可能なカードを設定
    setUserSelectable();
    
    //　各ボタンクリックのイベントを定義
    document.querySelector('#search_customer_button').addEventListener('click',searchCustomer);
    //document.querySelector('#apply_subscription_button').addEventListener('click',moveApplySubscriptionPage);
    //document.querySelector('#controll_plan_button').addEventListener('click',moveControllPlanPage);

    // フォームのメールアドレスから顧客情報と紐づくカード、定期課金情報を取得
    //searchCustomer();
});

/**
 * プランの一覧を表示する
 */
function getPlanList(){
    $.post(
        "../module/payjp_wrapper.php?command=get_plan_list",
        {  },
        function(response){
            var parsed = $.parseJSON(response);
            $.each(parsed, function(index, element){
                var billingDay = element.billing_day == null? "":element.billing_day + "日";
                var planStr = element.name + " :(" + element.amount + " 円)/ 毎月" + billingDay + "支払い"
                $("#planList").append('<label>・' + planStr + '</label><br>');
            });
        }
    );
}

/**
 * 選択可能なプランの一覧を選択形式で出力
 */
function setUserSelectable(){

    var userId = $('#userid').val();
    $.post(
        "../module/database_wrapper.php?command=select_payjp_user",
        { 'user_id':userId },
        function(response){
            if(response == 'null'){
                alert("登録情報が不正です。管理者に問い合わせてください。");
                return;
            }

            var parsed = $.parseJSON(response);
            if(parsed.error){
                alert("エラーが発生しました。詳細：" + parsed.error.message);
                return;
            }
            getSelectablePlanList(parsed[0].customer_id);
            getCardList(parsed[0].customer_id);
        }
    );
}

function getSelectablePlanList(customerId){
    $.post(
        "../module/payjp_wrapper.php?command=get_selectable_plan_list",
        { 'user_id':customerId },
        function(res){
            if(res != 'null'){
                var payjpParsed = $.parseJSON(res);
                $.each(payjpParsed, function(index, ele){
                    $("#planSelect").append( function(){
                        if($("#planSelect option[value='"+ ele.id +"']").length == 0) {
                            var billingDay = ele.billing_day == null? "":ele.billing_day + "日";
                            var planStr = ele.name + " :(" + ele.amount + " 円)/ 毎月" + billingDay + "支払い"
                            return $("<option>").val(ele.id).text(planStr);
                        }
                    });
                });    
            }else{
                $("#planSelect").append('<option>選択可能なプランはありません</option>');
                $('#move_paymentselect_button').prop("disabled", true);                    
            }
        }
    );
}

/**
 * 入力されたメールアドレスに紐付く顧客情報を取得
 * 顧客に紐付くカード情報および契約している定期決済情報を画面へ表示する
 */
function getCardList(customerId){
    if(customerId == null){
        $('#cards').append('<label><input name="card" type="radio" value="new" checked="true">新しいカードで申し込む</label><br>');
        return;
    }

    $.post(
        "../module/payjp_wrapper.php?command=get_customer_card_list",
        { 'customerid': customerId},
        function(response){
            console.log(response);
            $('#cards').html('');
            // 契約情報がなければその旨を通知
            if(response == ''){
                $('#cards').append('<label><input name="card" type="radio" value="new" checked="true">新しいカードで申し込む</label><br>');
            }else{
                
                // JSONデータをパース
                var parsed = $.parseJSON(response);
                // カード情報の一覧を出力
                $('#cards').append('<label><input name="card" type="radio" value="new" checked>新しいカードで申し込む</label><br>');
                $.each(parsed.card.data, function(index, element){
                    $('#cards').append('<label><input name="card" type="radio" value="'+ element.id +'">XXXX - XXXX - XXXX - '+ element.last4 + '</label>');
                    $('#cards').append('<input type="hidden" id="name_' +element.id+ '" value="' + element.name + '">');
                    $('#cards').append('<input type="hidden" id="last4_' +element.id+ '" value="' + element.last4 + '">');
                    $('#cards').append('<input type="hidden" id="brand_' +element.id+ '" value="' + element.brand + '">');
                    $('#cards').append('<input type="hidden" id="exp_month_' +element.id+ '" value="' + element.exp_month + '">');
                    $('#cards').append('<input type="hidden" id="exp_year_' +element.id+ '" value="' + element.exp_year + '">');
                });
            }
        }
    );    
}

/**
 * 定期購入申し込み画面への遷移
 */
function moveApplySubscriptionPage(){
    var mail = $('input[name="mail"]').val();
    var userId = $('input[name="userid"]').val();
    var customerId = $('#customerid').html();
    var data = {
        'userid':userId,
        'mail':mail,
        'customerid':customerId
    };
    postForm("./planselect.php",data);
}

/**
 * 各種操作系への遷移（申し込み済みのプランがなければボタン制御にて遷移しない）
 */
function moveControllPlanPage(){
    var customerId = $('#customerid').html();
    var data = {
        'customerid':customerId
    };
    postForm("./controllplan.php",data);
}
