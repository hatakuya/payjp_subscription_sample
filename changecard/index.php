<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>定期購入</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/css/bootstrap/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <h2>カード情報変更</h2>
    </div>
    <div class="container">
        <div class="container">
            <div id="cards" class="form-group"></div>
        </div>
    </div>
    <div class="container" style="margin-top:20px;">
        <button id="apply_subscription_button" type="button" class="btn btn-primary">決済に新しいカードを使う</button>
    </div>
    <div class="container">
        <input type="hidden" id="userid" value="<?php echo $_POST['user_id']; ?>">
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="/js/jquery/min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="/js/bootstrap/bootstrap.min.js"></script>
    <script src="/js/common.js"></script>
    <script src="/js/changecard/index.js"></script>
</body>
</html>
