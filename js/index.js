/**
 * 画面起動時処理
 */
$(document).ready(function(){
    document.querySelector('#search_customer_button').addEventListener('click',getUsers);
});

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
                    console.log(element.user_id);
                    $("#users-table").append(
                        $("<tr></tr>")
                            .append($('<th scope="row"></th>').text(element.user_id))
                            .append($('<td></td>').text(element.mail))
                            .append($('<td></td>').text(element.paying_status))
                        );
                });
            }
        }
    );
}

