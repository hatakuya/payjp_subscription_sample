<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>定期購入設定</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="./css/input.css">    
</head>
<body>
    <div class="container">
        <h1>クレジットカード情報入力画面</h1>
    </div>
    <br>
    <div class="container">
        <h2>基本情報</h2>
        <p>氏名：<?php echo $_POST['name']; ?></p>
        <p>メールアドレス：<?php echo $_POST['mail']; ?></p>
    </div>
    <br>
    <div class="container">
        <h2>カード情報入力</h2>
        <div class="card-container">
            <div class="card-wrapper"></div>
            <div class="form-container active">
                <form action="">
                    <input placeholder="カード番号" type="tel" name="number">
                    <input placeholder="氏名" type="text" name="name">
                    <input placeholder="有効期限" type="tel" name="expiry">
                    <input placeholder="CVC番号" type="number" name="cvc">
                </form>
            </div>
        </div>
        <button id="move_input_button" type="button" class="btn btn-primary">確認</button>
    </div>
    <!-- Optional JavaScript -->
    <script src="js/jquery/min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="js/bootstrap/bootstrap.min.js"></script>
    <script src="js/card/dist/jquery.card.js"></script>
    <script src="js/input.js"></script>
</body>
</html>
