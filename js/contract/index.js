/**
 * 画面起動時処理
 */
$(document).ready(function(){
    // 選択可能プランを表示（すでに契約中のプランは除く）
    getPlanList();

    // 顧客IDを元に契約可能なプランと使用可能なカードを設定
    setUserSelectable();
    
    //　各ボタンクリックのイベントを定義
    document.querySelector('#apply_subscription_button').addEventListener('click',moveInputPage);
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
 * クレジットカード情報入力画面への遷移
 * 事前にページ上に保持しているユーザー情報を取得する
 */
function moveInputPage(){
    var userId = $('#userid').val();
    var planId = $('[name="plan"] option:selected').val();
    var customerId = $('#customerid').val();
    
    // 新規であればカード情報入力画面へ遷移
    if($('input[name="card"]:checked').val() == "new"){
        var data = {'userid':userId, 'planid':planId,'customerid':customerId};
        postForm( './input.php', data );
    }else{
        // 登録済みカードが選択されている場合は紐づく情報を元に確認画面へ遷移
        var cardId = $('input[name="card"]:checked').val();
        var cardName = $('#name_' + cardId).val();
        var last4 = $('#last4_' + cardId).val();
        var brand = $('#brand_' + cardId).val();
        var exp_month = $('#exp_month_' + cardId).val();
        var exp_year = $('#exp_year_' + cardId).val();
        var data = {
            'userid':userId,
            'customerid':customerId,
            'planid':planId,
            'last4':last4,
            'cardname':cardName,
            'brand':brand,
            'exp_month':exp_month,
            'exp_year':exp_year,
            'cardid':cardId

        };
        postForm( './confirm.php', data );
    }
}