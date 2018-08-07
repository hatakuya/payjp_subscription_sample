<?php var_dump($_POST);?>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>定期購入設定</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./css/bootstrap/bootstrap.min.css">
</head>
<body>
    <?php var_dump($_POST);?>
    <div class="container">
        <h1>入力内容確認画面</h1>
    </div>
    <br>
    <div class="container">
        <div class="form-group">
            <label>ID：</label>
            <label><?php echo $_POST['customerid']; ?></label>
        </div>
        <div class="form-group">
            <label>氏名：</label>
            <label><?php echo $_POST['name']; ?></label>
        </div>
        <div class="form-group">
            <label>メールアドレス：</label>
            <label><?php echo $_POST['mail']; ?></label>
        </div>
        <div class="form-group">
            <label>選択プラン：</label>
            <label><?php echo $_POST['planname']; ?></label>
        </div>
        <div class="form-group">
            <label>クレジットカード番号：</label>
            <label>XXXX - XXXX - XXXX - <?php echo $_POST['last4']; ?></label>
        </div>
        <div class="form-group">
            <label>クレジットカード名義：</label>
            <label><?php echo $_POST['card_name']; ?></label>
        </div>
        <div class="form-group">
            <label>有効期限：</label>
            <label><?php echo $_POST['exp_month']; ?> / <?php echo $_POST['exp_year']; ?></label>
        </div>
    </div>
    <br>
    <div class="container">
        <input id="name" type="hidden" value="<?php echo $_POST['name']; ?>">
        <input id="mail" type="hidden" value="<?php echo $_POST['mail']; ?>">
        <input id="number" type="hidden" value="<?php echo $_POST['number']; ?>">
        <input id="card_name" type="hidden" value="<?php echo $_POST['card_name']; ?>">
        <input id="exp_month" type="hidden" value="<?php echo $_POST['exp_month']; ?>">
        <input id="exp_year" type="hidden" value="<?php echo $_POST['exp_year']; ?>">        
        <input id="cvc" type="hidden" value="<?php echo $_POST['cvc']; ?>">
        <input id="tokenid" type="hidden" value="<?php echo $_POST['tokenid']; ?>">        
        <button id="move_thanks_button" type="button" class="btn btn-primary">注文確定</button>
    </div>

    <!-- Optional JavaScript -->
    <script src="js/jquery/min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="js/bootstrap/bootstrap.min.js"></script>
    <script src="js/common.js"></script>
    <script src="js/confirm.js"></script>
</body>
</html>
