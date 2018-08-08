<?php
require_once 'lib/init.php';

/**
 * PayJPAPI連携用モジュール
 */
class PayJPConnector {

    private $currency = 'jpy';
    private $secretKey = 'sk_test_24bc7421e2a88ee6a962b4b3';
    private $clientToken = '';

    /**
     * コンストラクタ（サーバトークンセット）
     */
    function __construct() {
        Payjp\Payjp::setApiKey($this->secretKey);
    }

    /**
     * 登録済みプラン情報一覧の取得
     */
    function getPlanList(){
        $result = Payjp\Plan::all();
        if (isset($result['error'])) {
            throw new Exception();
        }
        $obj;
        foreach($result['data'] as $index => $element){
            $obj[$index]['id'] = $element['id'];
            $obj[$index]['amount'] = $element['amount'];
            $obj[$index]['name'] = $element['name'];
            $obj[$index]['billing_day'] = $element['billing_day'];
            $obj[$index]['interval'] = $element['interval'];
        }
        return json_encode($obj);
    }

    /**
     * 顧客情報一覧取得
     */
    function getCustomer($email){
        $result = Payjp\Customer::all();
        if (isset($result['error'])) {
            throw new Exception();
        }
        foreach($result['data'] as $element){
            if($email == $element['email']){                    
                $customerInfo = Payjp\Customer::retrieve($element['id']);
                $cards = Payjp\Customer::retrieve($element['id'])->cards->all();
                $subscripts = Payjp\Customer::retrieve($element['id'])->subscriptions->all();

                $obj['id'] = $customerInfo['id'];
                $obj['email'] = $customerInfo['email'];

                foreach($cards['data'] as $i => $card){
                    $obj['card'][$i]['id'] = $card['id'];
                    $obj['card'][$i]['name'] = $card['name'];                        
                    $obj['card'][$i]['last4'] = $card['last4'];
                    $obj['card'][$i]['brand'] = $card['brand'];
                    $obj['card'][$i]['exp_month'] = $card['exp_month'];
                    $obj['card'][$i]['exp_year'] = $card['exp_year'];
                }
                
                foreach($subscripts['data'] as $i => $subscript){
                    $obj['subscription'][$i]['id'] = $subscript['id'];
                    $obj['subscription'][$i]['plan']['id'] = $subscript['plan']['id'];
                    $obj['subscription'][$i]['plan']['name'] = $subscript['plan']['name'];
                }
                return json_encode($obj);
            }
        }
        return "";
    }

    /**
     * 顧客情報生成
     * @return 顧客情報生成結果
     */
    function createCustomer($mail, $cardToken){        
        // 顧客情報の追加
        $result = Payjp\Customer::create(array(
            "email" => $mail,
            "card" => $cardToken
        ));
        if (isset($result['error'])) {
            throw new Exception();
        }
        return $result['id'];
    }

    /**
     * 定期課金生成処理
     * @return 定期課金生成結果
     */
    function createSubscription($customerId, $planId){
        $result = Payjp\Subscription::create(array(
            "customer" => $customerId,
            "plan" => $planId
        ));
        if (isset($result['error'])) {
            throw new Exception();
        }        
        $obj['result'] = "success";
        return json_encode($obj);
    }

    /**
     * 定期課金停止処理
     */
    function pauseSubscription($subscriptionId){
        $su = Payjp\Subscription::retrieve($subscriptionId);
        $su->pause();
        return "success";
    }

    /**
     * 定期課金再開処理
     */
    function resumeSubscription($subscriptionId){
        $su = Payjp\Subscription::retrieve($subscriptionId);
        $su->resume();
        return "success";
    }

    /**
     * 定期課金キャンセル処理
     */
    function cancelSubscription($subscriptionId){
        $su = Payjp\Subscription::retrieve($subscriptionId);
        $su->cancel();
        return "success";
    }

    /**
     * 定期課金削除処理
     */
    function deleteSubscription($subscriptionId){
        $su = Payjp\Subscription::retrieve($subscriptionId);
        $su->delete();
        return "success";
    }
}

/**
 * リクエストパラメータに応じた処理を実行
 */
$result = '';

try{
    $connection = new PayJPConnector();
    $command = $_GET['command'];
    switch($command){
        case 'get_plan_list':
            echo $connection->getPlanList();
            break;
        case 'get_customer':
            echo $connection->getCustomer($_POST['mail']);
            break;
        case 'create_customer':
            echo $connection->createCustomer($_POST['mail'], $_POST['tokenid']);
            break;
        case 'create_subscription':
            echo $connection->createSubscription($_POST['customerid'], $_POST['planid']);
            break;
        case 'pause_subscription':
            echo $connection->pauseSubscription($_POST['subscriptionid']);
            break;
        case 'resume_subscription':
            echo $connection->resumeSubscription($_POST['subscriptionid']);
            break;
        case 'cancel_subscription':
            echo $connection->cancelSubscription($_POST['subscriptionid']);
            break;
        case 'delete_subscription':
            echo $connection->deleteSubscription($_POST['subscriptionid']);
            break;
        default:
            echo "command not found.";
            break;
    }
}catch(Exception $e){
    $obj['error']['message'] = $e->getMessage();
    echo json_encode($obj);
}