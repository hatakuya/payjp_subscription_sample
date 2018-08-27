<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>定期購入設定</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/css/bootstrap/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <h1>入力内容確認画面</h1>
    </div>
    <br>
    <div class="container">
        <p id="danger_area" class="alert"></p>
        <div class="form-group">
            <label>ユーザID：</label>
            <label><?php echo $_POST['userid']; ?></label>  
        </div>
        <div class="form-group">
            <label>プラン名：</label>
            <label id="disp_brand"><?php echo $_POST['planname']; ?></label>
        </div>
    </div>
    <br>
    <div class="container">
        <button id="move_previous_button" type="button" class="btn btn-secondary">戻る</button>        
        <button id="move_complete_button" type="button" class="btn btn-primary">解約</button>
    </div>
    <!-- POST値格納領域 -->
    <div class="container">
        <input id="userid" type="hidden" value="<?php echo $_POST['userid']; ?>">
        <input id="customerid" type="hidden" value="<?php echo $_POST['customerid']; ?>">
        <input id="subscriptionid" type="hidden" value="<?php echo $_POST['subscriptionid']; ?>">
    </div>

    <!-- Optional JavaScript -->
    <script src="/js/jquery/min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="/js/bootstrap/bootstrap.min.js"></script>
    <script src="/js/common.js"></script>
    <script src="/js/cancel/confirm.js"></script>
</body>
</html>
