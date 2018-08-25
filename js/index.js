/**
 * 画面起動時処理
 */
$(document).ready(function(){
    document.querySelector('#search_customer_button').addEventListener('click',getUsers);
    document.querySelector('#move_admin_page_button').addEventListener('click',moveAdminPage);
});

function moveAdminPage(){
    postForm( './admin/index.php', {} );
}

function getUsers(){
    var id = $('input[name="userid"]').val();
    $.post(
        "module/database_wrapper.php?command=select_users",
        { 'user_id': id},
        function(response){
            console.log(response);
            // 表示領域初期化
            $('#users-table').html('');

            // 契約情報がなければその旨を通知
            if(response == 'null'){
                alert("検索結果0件");
            }else{
                // JSONデータをパース
                var parsed = $.parseJSON(response);
                console.log(parsed);
                if(parsed.error){
                    alert(parsed.error.message);
                    return;
                }

                $.each(parsed, function(index, element){
                    $("#users-table").append(
                        $("<tr></tr>")
                            .append($('<th scope="row"></th>').text(element.user_id))
                            .append($('<td></td>').text(element.mail))
                            .append($('<td></td>').text(element.paying_status != '0' ? '有料':'通常'))
                            .append($('<td></td>')
                                .append('<button type="button" class="apply_subscription_button btn btn-primary">プラン契約</button>'))
                            .append($('<td></td>')
                                .append('<button id="apply_subscription_button" type="button" class="btn btn-primary">カード変更</button>'))
                            .append($('<td></td>')
                                .append('<button id="apply_subscription_button" type="button" class="btn btn-primary">解約</button>'))
                        );
                });
                addEvent();
            }
        }
    );
}

function addEvent(){
    var elements = $('.apply_subscription_button');
    $.each(elements, function(index,element){
        
        element.addEventListener('click',function(){
            var userid = $(this).closest('tr').children("th").text();
            postForm("contract/index.php",{'user_id': userid});
        });
    });
}
