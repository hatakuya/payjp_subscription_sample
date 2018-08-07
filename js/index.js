/**
 * 画面起動時処理
 * ボタン押下時のイベントを定義
 */
$(document).ready(function(){
    document.querySelector('#move_input_button').addEventListener('click',moveInputPage);
    document.querySelector('#stop_button').addEventListener('click',stopService);
    document.querySelector('#restart_button').addEventListener('click',restartService);
    document.querySelector('#search_customer_button').addEventListener('click',searchCustomer);
    searchCustomer();
    getPlanList();
});

/**
 * クレジットカード情報入力画面への遷移
 * 事前にページ上に保持しているユーザー情報を取得する
 */
function moveInputPage(){
    var name = $('input[name="name"]').val();
    var mail = $('input[name="mail"]').val();
    var data = {'name':name, 'mail':mail};
    postForm( './input.php', data );
}

function searchCustomer(){
    var mail = $('input[name="mail"]').val();
    $.post(
        "server.php?command=get_customer",
        { 'mail': mail},
        function(response){
            $('#cards').html('');
            $('#subscriptions').html('');

            if(response == ''){
                $('#customerId').html('未登録');
                $('#cards').append('<label class="btn"><input name="card" type="radio" value="new" checked="true">新しいカードで申し込む</label><br>');
                $('#subscriptions').append('<label>契約情報はまだありません</label><br>');

            }else{
                var parsed = $.parseJSON(response);
                $('#customerId').html(parsed.id);
                $('#cards').append('<label class="btn"><input name="card" type="radio" value="new" checked>新しいカードで申し込む</label><br>');
                $.each(parsed.card, function(index, element){
                    $('#cards').append(
                        '<label class="btn"><input name="card" type="radio" value="'+ element.id +'">XXXX - XXXX - XXXX - ' + element.last4 + '</label><br>'
                    );
                });
                $.each(parsed.subscription, function(index, element){
                    $('#subscriptions').append('<label>・' + element.plan.name + '</label><br>');
                });    
            }
        }
    );
}

function getPlanList(){
    $.post(
        "server.php?command=get_plan_list",
        {  },
        function(response){
            var parsed = $.parseJSON(response);
            $.each(parsed, function(index, element){
                $("#planSelect").append( function(){
                    if($("#planSelect option[value='"+ element.id +"']").length == 0) {
                        var planStr = 
                            element.name + " :(" + element.amount + " 円)/ 毎月" + element.billing_day + "日支払い"
                        return $("<option>").val(element.id).text(planStr);
                    }
                });

                
            });
        }
    );
}

/**
 * 継続課金停止処理
 */
function stopService(){
    alert('継続課金停止の処理を行います');
}

/**
 * 継続課金再開処理
 */
function restartService(){
    alert('継続課金再開の処理を行います');
}

