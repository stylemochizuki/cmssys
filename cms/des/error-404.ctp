<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<title>404 NotFound｜CMS(カスタム・マネジメント・システム)</title>
	<base href="<?php echo $_URL[ 'ROOT' ]; ?>">
	<link rel="stylesheet" href="css/bootstrap.min.css">
</head>
<body>
<div class="container" style="padding-top: 40px">
	<div class="hero-unit">
		<div class="row-fluid">
			<div class="span3"></div>
			<!-- ▽ タイトル ▽ -->
			<div class="span6">
				<h2>ページが見つかりません。</h2>
				<h1>Not Found!!</h1>
				<p style="margin-top: 1em">
					リクエストしたページは存在しませんでした。<br>
					以下の事が考えられます。
				</p>
				<ul>
					<li><small>URLが間違っている</small></li>
					<li><small>昔は存在したが現在は存在しない</small></li>
				</ul>
				<p class="text-center" style="margin-top:40px">
					<a href="./" class="btn btn-inverse btn-large">
						<i class="icon-home icon-white"></i> トップページ
					</a>
				</p>
			</div>
			<!-- △ タイトル △ -->
		</div>
	</div>
</div>
</body>
</html>
