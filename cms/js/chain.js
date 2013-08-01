/**
 * タブ化、絞り込み選択
 *
 * なにこれ？
 *   選択したアイテムによって、子となる要素の表示・非表示を切り替えます。
 *   タブによって表示内容の切り替えや、絞り込み選択等で活躍します。
 *   子要素の子要素と繋がっている先まで追って表示の切り替えを行ってくれます。
 *   切り替え方法にアニメーション指定が可能で、使い方次第では様々な方法に対応します。
 *
 * 特殊な動き
 *   子となる要素が<select>タグの場合、デフォルトでは絞り込み選択になります。
 *   また、アニメーション指定の場合は子要素が<div>,<p>タグ以外の場合に安定しない欠点があります。
 *   <div>,<p>以外のアニメーション対応はブラウザとタグの使用方法に左右されます。
 *
 * 使い方
 *   $( ① ).chain( ② , ③ , ④ );
 *
 *   ① : 親となるタグ。
 *   ②〜④ : 順番はバラバラでも問題ありません。またそれぞれ何度も書けます。
 *     例) 
 *       $( ① ).chain( ③ , ② , ④ );
 *       $( ① ).chain( ④ , ③ , ② );
 *       $( ① ).chain( ② , ④ , ③ );
 *       $( ① ).chain( ② , ④ , ④ , ④ , ③ , ③ );
 *
 *   ② : 子となるタグ。記述方式は css , jQuery 形式であれば可能
 *
 *   ③ : 設定。以下の設定が可能。
 *     設定名 : 設定値( デフォルト値 ) - 説明
 *     "parent"   : "value" - 親の判定する値となる属性。
 *     "children" : "chain" - 子の判定する値となる属性。
 *       例
 *         <div value="1">親</div> - ここをクリックすると子1を表示
 *         <div value="2">親</div> - ここをクリックすると子2を表示
 *         <div chain="1">子1</div>
 *         <div chain="2">子2</div>
 *         上記の場合は、親タグがクリックされた時に value値が子タグのchain値と同じなら表示、違えば非表示になる。
 *
 *     "all"  : "*" - 子タグ全てを表示する値(親用)
 *     "none" : "-" - 子タグの表示がない場合に表示する値(子用)
 *       例)
 *         <div value="*">親</div> - ここをクリックすると子3以外を表示
 *         <div value="">親</div>  - ここをクリックすると子3を表示
 *         <div chain="1">子1</div>
 *         <div chain="2">子2</div>
 *         <div chain="-">子3</div>
 *         上記の場合は、親タグがクリックされた時に value値が子タグのchain値と同じなら表示、違えば非表示になる。
 *
 *     "select" : true - 子が<select>の場合は<select>内の<option>タグを表示・非表示。
 *     "init"   : null - ページ表示時に実行するかしないか、また初期値の設定 ※①が<input>,<select>,<textarea>には指定値は働きません。
 *       例)
 *         "init":null - 何もしない
 *         "init":"1"  - 親の初期値を1として初回に1回実行する
 *         "init":"*"  - 親の初期値を*として初回に1回実行する
 *
 *     "show"  : "none" - 表示方法を設定できます。フェード系( "fade" ) スライド系( "slide" )の二つがサポートしています。
 *     "time"  : 0      - 表示・非表示のアニメーション時間を設定します。単位はミリ秒です。0の場合はアニメーションしません。
 *     "anime" : "none" - "none"で同時、"before"で表示後に非表示、"after"で非表示後に表示します。
 *       ※アニメーションさせる場合は<div>タグまたは<p>タグを指定してください。
 *       ※<select>の<option>タイプには効果がありません。
 *
 *   ④ : アニメーション完了時のコールバック関数。
 *
 * @author 望月@スタイルサーチ
 * @vaersion 3.1.1
 */
/* -- jQuery -- */
$( function()
{
	$.fn.chain = function()
	{
		// デフォルトの設定
		var param = {
			"parent"   : "value" , // 親の値
			"children" : "chain" , // 子の値
			"all"      : "*" ,     // 全て表示する値
			"none"     : "-" ,     // 全て消えた時に表示する値
			"select"   : true ,    // 選択系の処理をする
			"init"     : null ,    // 読み込み時の実行

			"show"  : "none" , // 表示方法( none:なし , fade:フェード , slide:スライド )
			"time"  : 0 ,      // アニメーション時間( ミリ秒 )
			"anime" : "none"   // 表示順序( none:同時 , before:表示後に非表示 , after:非表示後に表示 )
		};
		// リンク
		var link = null;
		// デフォルト
		var def = null;
		// コールバック
		var call = null;
		// 汎用
		var i = 0;

		// 変数の種類で判定
		for ( i = 0 ; i < this.chain.arguments.length ; ++i ) {
			// 値
			var value = this.chain.arguments[ i ];
			// 文字列
			if ( $.type( value ) === "string" ) link = addjQuery( link , value );
			// 関数
			else if ( $.type( value ) === "function" ) call = value;
			// その他オブジェクト
			else if ( $.type( value ) === "object" ) {
				// Element
				if ( value.nodeType === 1 ) {
					link = addjQuery( link , $( value ) );
				}
				// jQuery
				else if ( value instanceof jQuery ) {
					link = addjQuery( link , value );
				}
				// JSON
				else param = $.extend( param , value );
			}
		}

		// デフォルト
		if ( param.select ) def = $( link ).filter( "select" ).clone().children().attr( "selected" , false ).end();

		// 初回
		if ( param.init !== null ) $( this ).each( function() { takeOver( this , param.init ); } );

		// チェイン先全てに通知
		function chainChange( parent , value , type )
		{
			// 選択系
			var select = $( link ).filter( "select" );
			// 通常
			var nomal = $( link ).filter( ":not(select)" );
			// 表示するタグ
			var show = null;
			// 非表示にするタグ
			var hide = null;

			// 選択系
			if ( param.select ) {
				$( select ).empty().each( function( index )
				{
					// デフォルトの取得
					var data = $( def ).filter( ":eq(" + index + ")" ).clone();
					// 全て表示
					if ( value === param.all ) {
						// append
						$( this ).append( $( data ).children( "[" + param.children + "!='-']" ) );
					}
					// 一致する条件のみ追加
					else {
						// 指定属性がなければ表示
						$( this ).append( $( data ).children( ":not([" + param.children + "])" ) );
						// append
						$( this ).append( $( data ).children( "[" + param.children + "='" + value + "']" ) );
					}
					// 表示する項目がない
					if ( $( this ).children().size() === 0 ) $( this ).append( $( data ).children( "[" + param.children + "='-']" ) );
				} ).change();
			}
			// 通常と同一処理
			else nomal = addjQuery( nomal , select );

			// 全て表示
			if ( value === param.all ) {
				// 表示タグ
				show = addjQuery( show , $( nomal ).not( "[" + param.children + "='-']" ) );
				// 非表示タグ
				hide = addjQuery( hide , $( nomal ).filter( "[" + param.children + "='-']" ) );
			}
			// 一致する条件のみ
			else {
				// 表示タグ
				show = addjQuery( show , $( nomal ).filter( "[" + param.children + "='" + value + "'],:not([" + param.children + "])" ) );
				// 非表示タグ
				hide = addjQuery( hide , $( nomal ).not( "[" + param.children + "='" + value + "'],:not([" + param.children + "])" ) );
			}

			// 表示と非表示
			animeObject( show , hide , function()
			{
				// 表示する項目がない
				if ( $( show ).size() === 0 ) showObject( $( link ).filter( "[" + param.children + "='-']" ) , function() { if ( typeof( call ) === "function" ) call.call( parent , link ); } );
				// 完了
				else if ( typeof( call ) === "function" ) call.call( parent , link );
			} );

			// 戻り値
			return( parent );
		}

		// クリック時
		$( this ).filter( ":not(input,select,textarea)" ).click( function()
		{
			// トリガー
			chainChange( this , $( this ).attr( param.parent ) , "click" );
			// イベントはそのまま
			return( true );
		} );

		// 変更した時
		$( this ).change( function()
		{
			// 引き継ぎ
			takeOver( this );
			// イベントはそのまま
			return( true );
		} );

		// 親情報を子に託す
		function takeOver( self , value )
		{
			// 入力系
			if ( $( self ).is( "input,select,textarea" ) ) value = $( self ).filter( ":not(:radio,:checkbox),:checked" ).val();
			// その他
			else if ( value === undefined ) value = $( self ).attr( param.parent );
			// トリガー
			chainChange( self , value , "change" );
			// 親自身
			return( self );
		}

		// 表示
		function showObject( src , fun )
		{
			// カウント
			var count = 0;
			// 一つもない
			if ( $( src ).size() === 0 ) { if ( typeof( fun ) === "function" ) fun(); }
			// フェード
			else if ( param.show === "fade" ) $( src ).stop( true , true ).fadeIn( param.time , function() { if ( typeof( fun ) === "function" && ++count === $( src ).size() ) fun(); } );
			// スライド
			else if ( param.show === "slide" ) $( src ).stop( true , true ).slideDown( param.time , function() { if ( typeof( fun ) === "function" && ++count === $( src ).size() ) fun(); } );
			// なし
			else $( src ).stop( true , true ).show( param.time , function() { if ( typeof( fun ) === "function" && ++count === $( src ).size() ) fun(); } );
		}

		// 非表示
		function hideObject( src , fun )
		{
			// カウント
			var count = 0;
			// 一つもない
			if ( $( src ).size() === 0 ) { if ( typeof( fun ) === "function" ) fun(); }
			// フェード
			else if ( param.show === "fade" ) $( src ).stop( true , true ).fadeOut( param.time , function() { if ( typeof( fun ) === "function" && ++count === $( src ).size() ) fun(); } );
			// スライド
			else if ( param.show === "slide" ) $( src ).stop( true , true ).slideUp( param.time , function() { if ( typeof( fun ) === "function" && ++count === $( src ).size() ) fun(); } );
			// なし
			else $( src ).stop( true , true ).hide( param.time , function() { if ( typeof( fun ) === "function" && ++count === $( src ).size() ) fun(); } );
		}

		// アニメーション対応
		function animeObject( show , hide , fun )
		{
			// 表示後に非表示
			if ( param.anime === "before" ) showObject( show , function() { hideObject( hide , fun ); } );
			// 非表示後に表示
			else if ( param.anime === "after" ) hideObject( hide , function() { showObject( show , fun ); } );
			// なし
			else {
				// 一瞬で表示
				showObject( show );
				hideObject( hide );
				if ( typeof( fun ) === "function" ) fun();
			}
		}

		// 自身を返す
		 return( this );
	};

	// jQueryオブジェクトの追加
	function addjQuery( src , add )
	{
		// 空ではない
		if ( src ) return( $( src ).add( $( add ) ) );
		return( $( add ) );
	}
} );
