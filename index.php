<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Pay.JP TEST</title>
    <style type="text/css">
<!--
    #container{
        width:768px;
        margin : 10% auto;
    }
-->
    </style>
</head>
<body>
    <div id="container">
    <h1>PayJP のテストページです。</h1>
    <form action="./check.php" method="post">
        <script src="https://checkout.pay.jp/" class="payjp-button" data-key="pk_test_5e388cdf3be397973de9c4c2"></script>
    </form>
    </div>
</body>
</html>

<?php
phpinfo();