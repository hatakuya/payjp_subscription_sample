<?php
require_once 'lib/database_init.php';

/********************************************************
 * リクエストルーティング
********************************************************/
/**
 * リクエスト時のパラメータに応じた処理を実行
 * 基本的にGETにて取得したコマンド値に対応した関数を呼び出す
 */
$result = '';

try{
    $dao = new Dao();
    $command = $_GET['command'];
    switch($command){
        case 'select_users':
            echo json_encode($dao->selectUsers($_POST['user_id']));
            break;
        default:
            echo "command not found.";
            break;
    }
}catch(Exception $e){
    // エラーハンドリング後は下記の構成でメッセージを返す（Payjp.jsが同様のフォーマットのため統一）
    $obj['error']['message'] = $e->getMessage();
    echo json_encode($obj);
}