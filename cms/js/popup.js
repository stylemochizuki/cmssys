/**
 * ポップアップ
 *
 * これなに？
 *   ポップアップ表示を支援するプラグインです。
 *   表示/非表示まで一通りの流れをこれ1つで実装します。
 *   また、表示する瞬間、表示終わった時と細かなイベントの取得も可能です。
 *   設定方法がユニークになっているのも特徴ですが、どうでもいい事かもしれません。
 *
 * @author 望月@スタイルサーチ
 * @version 1.0.0
 */

/* -- jQuery -- */
( function( $ )
{
	// ポップアップ
	$.fn.popup = function()
	{
		// デフォルトの引数
		var param = {
			// ポップアップ内容
			"content" : null ,
			// 閉じるイベント
			"close" : null ,
			// 表示設定
			"show" : "show" ,
			"time" : 0 ,
			// クリック通知
			"event" : true ,
			// 画面外イベント
			"over" : true ,
			// 初期状態
			"init" : true ,
			// コールバック設定
			"call" : null ,      // 全てのイベント通知
			"click" : null ,     // クリック時
			"showStart" : null , // 表示開始時
			"showEnd" : null ,   // 表示終了時
			"hideStart" : null , // 非表示開始時
			"hideEnd" : null     // 非表示終了時
		};
		// ON/OFF
		var bool = 0;
		// 引数判定
		var paranum = 0;
		// コールバック判定
		var callnum = 0;

		// 変数の種類で判定
		for ( var i = 0 ; i < this.popup.arguments.length ; ++i ) {
			// 値
			var value = this.popup.arguments[ i ];
			// boolen
			if ( $.type( value ) === "boolean" ) {
				if      ( bool === 0 ) param.event = value;
				else if ( bool === 1 ) param.over = value;
				else if ( bool === 2 ) param.init = value;
				if ( ++bool === 3 ) bool = 0;
			}
			// 文字列
			else if ( $.type( value ) === "number" || $.type( value ) === "string" ) {
				switch ( paranum ) {
					case 0 : param.content = $( value ); break; // ポップアップ内容
					case 1 : param.show = value; break; // 表示種類
					case 2 : param.time = value; break; // 表示時間
					case 3 : param.close = value; break; // 閉じるイベント
				}
				if ( ++paranum === 4 ) paranum = 0;
			}
			// 関数
			else if ( $.type( value ) === "function" ) {
				switch ( callnum ) {
					case 0 : param.call = value; break;      // 全てのイベント通知
					case 1 : param.click = value; break;     // クリック時
					case 2 : param.showStart = value; break; // 表示開始時
					case 3 : param.showEnd = value; break;   // 表示終了時
					case 4 : param.hideStart = value; break; // 非表示開始時
					case 5 : param.hideEnd = value; break;   // 非表示終了時
				}
				if ( ++callnum === 6 ) callnum = 0;
			}
			// その他オブジェクト
			else if ( $.type( value ) === "object" ) {
				// Element
				if ( value.nodeType === 1 ) {
					param.content = $( value );
					if ( paranum === 0 ) paranum = 1;
				}
				// jQuery
				else if ( value instanceof jQuery ) {
					param.content = value;
					if ( paranum === 0 ) paranum = 1;
				}
				// JSON
				else {
					param = $.extend( param , value );
				}
			}
		}

		// 文字列
		if ( typeof( param.close ) === "string" ) {
			// 自身
			if ( param.close.indexOf( "this" ) === 0 ) {
				// 自身単体
				if ( param.close === "this" ) param.close = $( param.content );
				// 要素内
				else param.close = $( param.content ).find( param.close.substr( 4 ) );
			}
			// その他
			else param.close = $( param.close );
		}

		// 表示指定なし
		var show = "show";
		if ( param.show === "fade" ) show = "fadeIn";
		else if ( param.show === "slide" ) show = "slideDown";
		// 非表示
		var hide = "hide";
		if ( param.show === "fade" ) hide = "fadeOut";
		else if ( param.show === "slide" ) hide = "slideUp";

		// ポップアップの初期表示
		if ( param.init ) {
			// 非表示実行
			$( param.content )[ hide ]();
		}

		// クリックイベント
		$( this ).click( function()
		{
			// クリックイベント
			callback( this , "click" );
			// 表示していない
			if ( $( param.content ).is( ":hidden" ) ) {
				// 表示実行
				callback( param.content , "showStart" );
				$( param.content )[ show ]( param.time , function() { callback( param.content , "showEnd" ); } );
			}
			// イベント通知
			return( param.event );
		} );

		// 閉じるをクリック
		$( param.close ).click( function()
		{
			// クリックイベント
			callback( this , "click" );
			// 表示済み
			if ( $( param.content ).is( ":visible" ) ) {
				// 非表示実行
				callback( param.content , "hideStart" );
				$( param.content )[ hide ]( param.time , function() { callback( param.content , "hideEnd" ); } );
			}
		} );

		// 範囲外のクリック
		var hover = true;
		if ( $( param.content ).is( ":hidden" ) ) hover = false;
		$( this ).add( param.content ).hover( function() { hover = false; } , function() { hover = true; } );
		$( "*" ).click( function()
		{
			// 範囲外をクリック時
			if ( hover && $( param.content ).is( ":visible:not(:animated)" ) ) {
				// クリックイベント
				callback( this , "click" );
				// 非表示実行
				callback( param.content , "hideStart" );
				$( param.content )[ hide ]( param.time , function() { callback( param.content , "hideEnd" ); } );
			}
		} );

		// コールバック
		function callback( self , type )
		{
			// 各コールバック設定
			if ( typeof( param[ type ] ) === "function" ) param[ type ].call( self );
			if ( typeof( param.call ) === "function" ) param.call.call( self , type );
		}

		// 自身を返す
		return( this );
	};
}
)( jQuery );