/**
 * 指定したタグが指定位置に来た時に通知
 *
 * なにこれ？
 *   スクロール中に指定したタグが決まった位置に到達した時にイベントを発生させます。
 *   スクロール範囲ではなく、指定したタグの位置によって発生するのが特徴です。
 *   例えば、ドキュメントの最下層に到達したら発生する等でウィンドウの大きさや
 *   スクロール位置を使って計算をする必要がありません。
 *   また、指定したタグが複数ある場合はタグの数だけ(各タグが指定位置に到達する度)イベントが発生します。
 *   イベントはスクロールアップ(上へ移動中)とスクロールダウン(下へ移動中)の2種類発生します。
 *
 * 使用上の注意
 *   <body>タグの終了タグを指定した場合、OSやブラウザによってはイベントが発生しない事があります。
 *   ドキュメント最下層を指定する場合は、一番最後のタグを指定するとイベントが発生しやすいです。
 *   ただし、<body>タグの開始タグの指定は、問題なくイベントが発生します。
 *   物理的にイベントが発生しない指定が可能です。
 *   例えば、<body>タグの終了タグが画面上部に到達した場合等です。
 *
 * 説明
 * $( "#target" ).notice( fn , [params] )
 *
 * #target : 対象となる指定タグ。
 *   複数の指定も可能です。
 *   複数指定した場合は、通知がそれぞれのタグで発生します。
 *   chainした時は、#targetを引き継ぎます。
 *
 * fn : 通知先の関数
 *   イベントの通知先を指定します。
 *   通知先の第一引数にはスクロールイベントの種類が入ります。
 *     "up" : スクロールアップイベント
 *     "down" : スクロールダウンイベント
 *   通知先の第二引数にはスクロールイベント対象タグが入ります。
 *
 * params : 設定値
 *   通知種類の設定をします。
 *   記述方式は jsonフォーマットです。 例 : { name : "value" , name : "value" }
 *
 *   position : 画面上のどの場所で通知するかの設定
 *     "top"    - 画面上部( デフォルト )
 *     "bottom" - 画面下部
 *     "center" - 画面中央
 *
 *   tag : タグの判定位置
 *     "start" - 開始タグ( デフォルト )
 *     "end"   - 終了タグ
 *
 *   load : 通知開始タイミング
 *     true  - 画像等を含む全てのデータが読み込み終わってから通知開始( デフォルト )
 *     false - 画像等を含む全てのデータが読み込み終る前から通知開始
 *       ※ 画像等が読み込む終わる前と後ではタグの位置が違う場合があります。
 *
 * 注意
 *   this変数は $( window ) を返します。
 *   イベント元のタグを知りたい時は関数の第二引数を設定して、そこから使用してください。
 *
 * 使用方法
 *   $( "div.event" ).notice( function() { 〜 プログラム処理 〜 } );
 *     完全ロード後、<div class="event">タグが画面上部に来た時に通知
 *
 *   $( "span#scroll" ).notice( function( scroll , event ) { 〜 プログラム処理 〜 } , { position:"bottom" , tag:"end" } );
 *     完全ロード後、<span class="scroll">の終了タグが画面下部に来た時に通知
 *     scroll値にはイベント種類( "up" , "down" )、event値には通知元の<span class="scroll">オブジェクト
 *
 * @author 望月@スタイルサーチ
 * @version 1.0.3
 */
( function( $ )
{
	/**
	 * 指定したタグが指定位置に来た時に通知
	 *
	 * @param function fn イベント通知先
	 * @param array(json) params パラメーター
	 * @returns 呼び出しオブジェクト
	 */
	$.fn.notice = function( fn , params )
	{
		// デフォルトの引数
		var defaultParams = {
			position : "top" ,
			tag : "start" ,
			load : true
		};
		// 呼び出し元
		var self = this;
		// スクロール記憶
		var scrollPostion = 0; // 位置
		var scrollDirection = ""; // スクロールアップ( up ) or スクロールダウン( down )
		// 前回通知
		var oldDirection = new Array( this.length );

		// 引数を獲得
		params = $.extend( defaultParams , params , {} );

		// 読み込み完了まで待機する
		if ( params.load ) $( window ).load( function() { $( window ).bind( "scroll.notice" , function() { windowScrollEvent(); } ); } );
		// 読み込み完了まで待機しない
		else $( window ).bind( "scroll.notice" , function() { windowScrollEvent(); } );

		/**
		 * スクロール制御
		 */
		function windowScrollEvent()
		{
			// スクロール位置
			var scroll = $( window ).scrollTop();
			// 目標の位置
			var target = 0;

			// 通知位置
			if      ( params.position === "bottom" ) scroll += $( window ).height();
			else if ( params.position === "center" ) scroll += $( window ).height() / 2;
			// スクロール方向
			scrollDirection = ( scroll < scrollPostion ? "up" :  "down" );

			// 展開
			$( self ).each( function( index )
			{
				// 目標の開始タグ位置が取得できる
				if ( $( this ).offset() !== undefined ) {
					// 目標の開始タグ位置を取得
					target = $( this ).offset().top;
					// 目標が終了タグ位置
					if ( params.tag === "end" ) target += $( this ).height();
					// 通知
					if ( target <= scroll && target > scrollPostion && scrollDirection === "down" || // スクロールダウン
						 target >= scroll && target < scrollPostion && scrollDirection === "up" ) {  // スクロールアップ
						// 1度の通知
						if ( scrollDirection !== oldDirection[ index ] ) {
							oldDirection[ index ] = scrollDirection;
							// イベント発生
							fn.call( this , scrollDirection );
						}
					}
				}
			} );

			// スクロールの位置
			scrollPostion = scroll;
		}

		// 呼び出し元を返す( chain )
		return( this );
	};
}
)( jQuery );