<?php 
require_once 'lib/init.php';


//◆支払い以外のアクセスは弾く
if (!isset($_POST['tokenid'])) {
    echo "トークンがセットされていない";
    exit;
}

//失敗時のメッセージ
$err = '';
//送られてきた、顧客のカード情報を使って作成されたトークン
$token = $_POST['tokenid'];
//支払い価格
$amount = 500;
//秘密鍵
$secret = 'sk_test_24bc7421e2a88ee6a962b4b3';
//通貨(通常は日本円を表す'jpy'を指定する)
$currency = 'jpy';

$mail = $_POST['mail'];

$result;
try {
    // サーバトークンのセット
    Payjp\Payjp::setApiKey($secret);

    // 顧客情報の追加
    $customerResult = Payjp\Customer::create(array(
        "email" => $mail,
        "card" => $token
    ));    
    if (isset($customerResult['error'])) {
        throw new Exception();
    }

    $customerId = $customerResult['id'];
    //◆定期課金作成
    $result = Payjp\Subscription::create(array(
        "customer" => $customerId,
        "plan" => "test-plan"
    ));
    if (isset($result['error'])) {
        throw new Exception();
    }
} catch (Exception $e) {
    // カードが拒否された場合
    echo $e;
    $err = $result['error']['message'];
    echo $err;
    exit;
}

echo "支払いが完了しました。";