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
        <h2>解約プラン選択</h2>
        <div class="form-group">
            <select id="planSelect" name="plan"></select><br>
            <span class="text-muted">契約中プランが表示されています。</span>
        </div>
    </div>
    <div class="container" style="margin-top:20px;">
        <button id="move_previous_button" type="button" class="btn btn-secondary">戻る</button> 
        <button id="apply_subscription_button" type="button" class="btn btn-primary">解約</button>
    </div>
    <div class="container">
        <input type="hidden" id="userid" value="<?php echo $_POST['userid']; ?>">
        <input type="hidden" id="customerid" value="">
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="/js/jquery/min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="/js/bootstrap/bootstrap.min.js"></script>
    <script src="/js/common.js"></script>
    <script src="/js/cancel/index.js"></script>
</body>
</html>
