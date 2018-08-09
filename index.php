<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>定期購入</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./css/bootstrap/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <h1>定期購入</h1>
    </div>
    <br>
    <div class="container"  style="margin-bottom:10px;">
        <h2>対象ユーザ選択</h2>
        <div class="form-group">
            <label>メールアドレスを入力してください</label>
            <input name="mail" type="email" class="form-control" value="test@example.com">
        </div>
        <div class="form-group">
            <label>ログイン中のユーザID（入力可能）</label>
            <input name="userid" type="text" class="form-control" value="user00000">
        </div>
        <button id="search_customer_button" type="button" class="btn btn-primary">メールアドレスによるPayJP顧客情報検索</button>
    </div>
    <div class="container">
        <h3>検索結果</h3>
        <div class="form-group">
            <label>ユーザID：</label>
            <label id="userId" ></label>  
        </div>
        <div class="form-group">
            <label>PayJP顧客ID：</label>
            <label id="customerId" ></label>  
        </div>
        
        <div class="form-group">
            <label>契約済みプラン</label>
            <div id="subscriptions" class="form-group">
            </div>
        </div>
        <div class="form-group">
            <label>登録済みカード</label>
            <div id="cards" class="form-group"></div>
        </div>
    </div>
    <div class="container">
        <h3>操作</h3>
        <button id="apply_subscription_button" type="button" class="btn btn-primary">定期購入のお申し込み</button>
        <button id="controll_plan_button" type="button" class="btn btn-primary">契約済プラン操作</button>
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="js/jquery/min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="js/bootstrap/bootstrap.min.js"></script>
    <script src="js/common.js"></script>
    <script src="js/index.js"></script>
</body>
</html>
