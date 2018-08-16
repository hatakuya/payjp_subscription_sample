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
        <h1>支払い方法選択</h1>
    </div>
    <div class="container">
        <h3>PayJP</h3>
        <div class="container">
            <div id="cards" class="form-group"></div>
        </div>
    </div>
    <div class="container">
        <button id="move_previous_button" type="button" class="btn btn-secondary">戻る</button>  
        <button id="move_input_button" type="button" class="btn btn-primary">申込</button>
    </div>
    <!-- POST値格納領域 -->
    <div class="container">
        <input type="hidden" id="userid" value="<?php echo $_POST['userid']; ?>">
        <input type="hidden" id="mail" value="<?php echo $_POST['mail']; ?>">
        <input type="hidden" id="customerid" value="<?php echo $_POST['customerid']; ?>">
        <input type="hidden" id="planid" value="<?php echo $_POST['planid']; ?>">
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="js/jquery/min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="js/bootstrap/bootstrap.min.js"></script>
    <script src="js/common.js"></script>
    <script src="js/paymentselect.js"></script>
</body>
</html>
