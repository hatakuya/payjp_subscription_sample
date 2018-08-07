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
        <h1>定期購入画面</h1>
    </div>
    <br>
    <div class="container">
        <h2>プラン選択</h2>
        <div class="form-group">
            <select id="planSelect" name="plan">
            </select>
        </div>
    </div>
    <br>
    <div class="container">
        <h2>ユーザー情報</h2>
        <div class="form-group">
            <label>顧客ID：</label>
            <label id="customerId" ></label>  
        </div>
        <div class="form-group">
            <label>氏名</label>
            <input name="name" type="text" class="form-control" value="大塚 拓也">
        </div>
        <div class="form-group">
            <label>メールアドレス</label>
            <input name="mail" type="email" class="form-control" value="test@example.com">
        </div>
        <button id="search_customer_button" type="button" class="btn btn-primary">顧客情報検索</button>
    </div>
    <br>
    <div class="container">
        <h2>操作</h2>
        <h3>新規お申込</h3>
        <button id="move_input_button" type="button" class="btn btn-primary">カード情報入力</button>
        <h3>ご利用停止</h3>
        <button id="stop_button" type="button" class="btn btn-primary">停止</button>
        <h3>ご利用再開</h3>
        <button id="restart_button" type="button" class="btn btn-primary">再開</button>
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
