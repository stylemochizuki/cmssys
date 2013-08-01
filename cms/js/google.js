/**
 * GoogleMapプラグイン
 *
 * これなに？
 *   GoogleMapのAPIとjQueryを融合させたプラグインです。
 *   小難しいエレメント検索をせずjQueryで使えるCSSのセレクター等が使えます。
 *   また、複数のMAPを表示する場合の設定にも対応しています。
 *   クローンを複数表示するも、個別マップを複数表示するも自由自在です。
 *   ただし、1つのタグ内で複数のMAPを表示する事は仕様上できません。
 *   原則 1タグ = 1マップ
 *   GoogleMapは単体でも結構な重さを持ちます。
 *   用法容量はご計画的にご利用ください。
 *
 * 特殊な動き
 *   表示タイミングは以下の通りです。
 *   jQuery.JS → GoogleMap.JS → jQuery.Ready → GoogleMap.Load → window.Load → GoogleMapMarker
 *   マップは window.Load 前から表示を開始しますが
 *   マーカーピンは window.Load 後から表示を開始する点に注意ください。
 *
 * 使い方
 *   $( "GoogleMapを表示する先" ).createGoogle( { [設定] } ); ← MAPを表示
 *   $( "GoogleMapを表示する先" ).markerGoogle( { [設定] } ); ← 置いたMAPにマーカーピンを置く
 *   $( "GoogleMapを表示する先" ).markerGoogle( { [設定] } ); ← 置いたMAPにマーカーピンを置く
 *
 * 説明
 *   GoogleMapを設置・表示する
 *   $( ① ).createGoogle( { ② } );
 *
 *     ① : GoogleMapを表示したいタグ。
 *       複数登録した場合、全てリンクします。
 *       まったく別のマップにしたい場合は個別で作成してください。
 *
 *     ② : マップ全体の設定。形式はJSONフォーマット( { "name" : "value" }の形 )
 *       設定名 : 初期設定値
 *       "center" : null
 *           マップの座標位置( GEOコード : "123.45678,45.6789" )を設定します。
 *           対応形式は string,array,json です。
 *             string : "xxx.xxxxx,yyy.yyyyy"
 *             array  : [ xxx.xxxxx , yyy.yyyyy ]
 *             json   : { "x" : xxx.xxxxx , "y" : yyy.yyyyy }
 *       "zoom" : 15
 *           ズームレベル(拡大率)を設定します。
 *           使用可能範囲は 1〜21 の間です。
 *           デフォルトでは 15 に設定されてます。
 *       "mapTypeId" : "ROADMAP"
 *           マップの種類を指定します。
 *             "ROADMAP"   : 通常の表示で、2DのGoogle Mapsを表示します。デフォルトで設定。
 *             "SATELLITE" : 鮮明な航空写真のタイルを表示します。
 *             "HYBRID"    : 鮮明な航空写真のタイルに、有名な地物(道路や街の名前など）重ねて表示します。
 *             "TERRAIN"   : 山や川などの地形的特徴を持つ地図を表示します。
 *       "scrollwheel"  : true
 *           マウスのスクロールで拡大縮小を許可するかしないかを設定します。
 *             true  : 許可する。デフォルトで設定。
 *             false : 許可しない。
 *       "scaleControl" : true
 *           左下に表示する寸法の表示をするかしないかを設定します。
 *             true  : 表示。デフォルトで設定。
 *             false : 非表示。
 *       "icon" : null
 *           マップ上でのデフォルトのマーカーピンのアイコンを設定します。
 *           設定は任意です。
 *           未設定の場合は、GoogleMapのデフォルトピンが使用されます。
 *           対応形式は string,jQuery,json です。
 *             string : "img/src/aaa.png" - ファイルのパス。
 *             jQuery : $( "img.map_icon" ) - CSS/jQueryのセレクター。<img> or <input type="image"> のみ対応。
 *             json   : 大きさ、切り取り範囲、ピンの基点位置の設定が可能です。形式はJSONフォーマット( { "name" : "value" }の形 )
 *               "icon" : 〜
 *                   マーカーピンのアイコンファイルパスを設定します。
 *                   対応形式は string,jQuery です。
 *                   string : "img/src/aaa.png" - ファイルのパス。
 *                   jQuery : $( "img.map_icon" ) - CSS/jQueryのセレクター。<img> or <input type="image"> のみ対応。
 *               "size" : 〜
 *                   アイコンのサイズを設定します。
 *                   設定は任意です。未設定の場合はアイコンサイズになります。
 *                   対応形式は string,array,json です。
 *                   string : "www,hhh"
 *                   array  : [ www , hhh ]
 *                   json   : { "width" : www , "height" : hhh }
 *               "origin" : 〜
 *                   アイコンの切り取り表示(開始)座標を設定します。
 *                   設定は任意です。未設定の場合は0,0(左上:切り取りなし)になります。
 *                   対応形式は string,array,json です。
 *                   string : "xxx,yyy"
 *                   array  : [ xxx , yyy ]
 *                   json   : { "x" : xxx , "y" : yyy }
 *               "anchor" : 〜
 *                   アイコンの基点位置を設定します。
 *                   設定は任意ですが、sizeとoriginの設定をしなければ使用できません。
 *                   未設定の場合は、中央下部になります。
 *                   対応形式は string,array,json です。
 *                   string : "xxx,yyy"
 *                   array  : [ xxx , yyy ]
 *                   json   : { "x" : xxx , "y" : yyy }
 *       "animation" : null
 *           マーカーピンの表示アニメーションの設定です。
 *           設定は任意です。デフォルトではアニメーションしません。
 *             "DROP"   : マーカーピンが落下してきます。
 *             "BOUNCE" : マーカーピンが跳ねます。
 *       "draggable" : null
 *           マーカーピンをドラッグして移動させる事を許可するかしないかの設定です。
 *           設定は任意です。デフォルトでは許可しません。
 *             true  : 許可する。
 *             false : 許可しない。
 *
 *   GoogleMapにマーカーピンを設置・表示する
 *   $( ① ).markerGoogle( { ② } );
 *
 *     ① : マーカーピンを設定・表示したいタグ
 *
 *     ② : マーカー単体の設定。形式はJSONフォーマット( { "name" : "value" }の形 )
 *       設定名 : 初期設定値
 *       "position" : null
 *           マーカーピンの表示座標位置を設定します。
 *           設定は必須です。
 *           対応形式は string,array,json です。
 *             string : "xxx.xxxxx,yyy.yyyyy"
 *             array  : [ xxx.xxxxx , yyy.yyyyy ]
 *             json   : { "x" : xxx.xxxxx , "y" : yyy.yyyyy }
 *       "zoom" : 15
 *           ズームレベル(拡大率)を設定します。
 *           使用可能範囲は 1〜21 の間です。
 *           設定されない場合はズームレベルの変更を行いません。
 *       "title" : null
 *           マーカーピンのタイトルを設定します。
 *           設定は任意です。
 *           string のみ対応しています。
 *       "content" : null
 *           マーカーピンに対応した内容を設定します。
 *           設定は任意です。
 *           対応形式は string,jQuery です。
 *             string : "<div>てすと</div>" - HTMLテキストデータ
 *             jQuery : $( ".content" ) - 指定したセレクター内のHTMLをコピーします。
 *       "click" : null
 *           マップ外部でクリックした時、マーカーをクリックした状態にする設定です。
 *           対応形式は string,jQuery です。
 *             string : ".map_click" - jQueryセレクター文字列
 *             jQuery : $( ".map_click" ) - 指定されたタグのクリックイベントとリンクします。
 *             ※ string型で記述しても最終的にはjQueryオブジェクトに変換して組み込みます。
 *       "icon" : null
 *           マーカーピンのアイコンを設定します。
 *           設定は任意です。
 *           未設定の場合は、マップのデフォルトピンまたはGoogleMapのデフォルトピンが使用されます。
 *           対応形式は string,jQuery,json です。
 *             string : "img/src/aaa.png" - ファイルのパス。
 *             jQuery : $( "img.map_icon" ) - CSS/jQueryのセレクター。<img> or <input type="image"> のみ対応。
 *             json   : 大きさ、切り取り範囲、ピンの基点位置の設定が可能です。形式はJSONフォーマット( { "name" : "value" }の形 )
 *               "icon" : 〜
 *                   マーカーピンのアイコンファイルパスを設定します。
 *                   対応形式は string,jQuery です。
 *                   string : "img/src/aaa.png" - ファイルのパス。
 *                   jQuery : $( "img.map_icon" ) - CSS/jQueryのセレクター。<img> or <input type="image"> のみ対応。
 *               "size" : 〜
 *                   アイコンのサイズを設定します。
 *                   設定は任意です。未設定の場合はアイコンサイズになります。
 *                   対応形式は string,array,json です。
 *                   string : "www,hhh"
 *                   array  : [ www , hhh ]
 *                   json   : { "width" : www , "height" : hhh }
 *               "origin" : 〜
 *                   アイコンの切り取り表示(開始)座標を設定します。
 *                   設定は任意です。未設定の場合は0,0(左上:切り取りなし)になります。
 *                   対応形式は string,array,json です。
 *                   string : "xxx,yyy"
 *                   array  : [ xxx , yyy ]
 *                   json   : { "x" : xxx , "y" : yyy }
 *               "anchor" : 〜
 *                   アイコンの基点位置を設定します。
 *                   設定は任意ですが、sizeとoriginの設定をしなければ使用できません。
 *                   未設定の場合は、中央下部になります。
 *                   対応形式は string,array,json です。
 *                   string : "xxx,yyy"
 *                   array  : [ xxx , yyy ]
 *                   json   : { "x" : xxx , "y" : yyy }
 *       "animation" : null
 *           マーカーピンの表示アニメーションの設定です。
 *           設定は任意です。デフォルトではアニメーションしません。
 *             "DROP"   : マーカーピンが落下してきます。
 *             "BOUNCE" : マーカーピンが跳ねます。
 *       "draggable" : null
 *           マーカーピンをドラッグして移動させる事を許可するかしないかの設定です。
 *           設定は任意です。デフォルトでは許可しません。
 *             true  : 許可する。
 *             false : 許可しない。
 *
 * 使用例
 *   // 通常のマップを表示( ズームレベル:15 )
 *   $( "#map_1" ).createGoogle( { "center" : "12.34567,89.01234" } );
 *
 *   // 航空写真のマップを表示( ズームレベル:10 )
 *   $( "#map_2" ).createGoogle( { "center" : [ 12.34567 , 89.01234 ] , "zoom" : 10 , "mapTypeId" : "SATELLITE" } );
 *
 *   // 個別のマップを複数置く
 *   $( "#map_3" ).createGoogle( { "center" : "12.34567,89.01234" } );
 *   $( "#map_4" ).createGoogle( { "center" : "32.34567,47.01234" } );
 *
 *   // 同一内容のマップを複数置く
 *   $( ".maps" ).createGoogle( { "center" : "12.34567,89.01234" } ); ← class="maps" 全てに同じ内容のマップを表示
 *
 *   // デフォルトマーカーピンを設定してマップを表示
 *   $( "#map_5" ).createGoogle( {
 *       "center" : { "x" : 12.34567 , "y" : 89.01234 } ,
 *       "icon" : "img/src/map_icon.png" ,
 *       "animation" : "DROP"
 *   } );
 *   $( "#map_5" ).markerGoogle( {
 *       "title" : "てすとぴん" ,
 *       "content" : '<div>てすとぴんの内容だよ</div>'
 *   } );
 *
 *   // マーカーピンと外部連携
 *   $( "#map_6" ).createGoogle( { "center" : "12.34567,89.01234" } );
 *   $( "#map_6" ).markerGoogle( {
 *       "icon" : $( ".map_icon" ) ,
 *       "animation" : "DROP" ,
 *       "title" : "てすとぴん" ,
 *       "content" : $( ".map_click" ) ,
 *       "click" : $( ".map_click" )
 *   } );
 *   ※ class="map_click" のタグをクリックするとマーカーが反応する
 *
 * @author 望月@スタイルサーチ
 * @version 1.0.5
 */

// import
document.write( '<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>' );

/* -- jQuery -- */
$( function()
{
	// グローバル設定
	$.google = new function()
	{
		// デフォルトのマップ設定
		this.map = {
			"center" : null ,       // 中心位置
			"zoom" : 15 ,           // 拡大率
			"scrollwheel" : true ,  // スクロールによる拡縮
			"scaleControl" : true , // 縮尺の表示
			"mapTypeId" : "ROADMAP" // マップのスタイル
		};
		// デフォルトのアイコン設定
		this.icon = {
			"icon" : null ,       // ファイル名
			"size" : null ,       // サイズ
			"origin" : null ,     // 表示開始座標
			"anchor" : null ,     // マップ座標の基点位置
			"animation" : null ,  // アニメーション種類
			"draggable" : false , // ドラッグの可否
			"zoom" : null         // 拡大率
		};
		// 管理キー
		this.key = new Array();
		// 管理変数
		this.admin = new Array();
		// ロード済み
		var load = false;
		// あと読みデータ
		var after = new Array();

		// マップ設定
		this.defualtMap = function( option )
		{
			// 設定を引き継ぐ
			this.map = $.extend( this.map , option );
		};

		// アイコン設定
		this.defualtIcon = function( option )
		{
			// 設定を引き継ぐ
			this.icon = $.extend( this.icon , option );
		};

		// あと読みデータの貯蓄
		this.load = function( self , id , param , fun )
		{
			// 読み込み済みなら即実行
			if ( load ) fun.call( self , id , param );
			// 読み込み前
			else after.push( { "self" : self , "id" : id , "param" : param , "fun" : fun } );
		};

		// あと読みデータの実行
		this.exec = function()
		{
			// 全て実行
			for ( var i = 0 ; i < after.length ; ++i ) after[ i ].fun.call( after[ i ].self , after[ i ].id , after[ i ].param );
			// ロードフラグ
			load = true;
		};
	};

	// 作成
	$.fn.createGoogle = function( param )
	{
		// マップの設定
		var option = new Object();
		param = $.extend( $.google.map , param );
		for ( name in param ) option[ name ] = param[ name ];

		// 各タグ毎に記憶する
		$( this ).each( function()
		{
			// ID
			var id = $.inArray( this , $.google.key );
			// 未作成
			if ( id === -1 ) {
				// 登録
				$.google.key.push( this );
				// 初期値
				$.google.admin.push( {
					"map" : null ,
					"maeker" : new Array() ,
					"window" : null ,
					"icon" : null ,
					"animation" : null ,
					"draggable" : null
				} );
				// ID
				id = $.google.admin.length - 1;
			}
			// 作成済み
			else {
				// マップの登録
				$.google.admin[ id ].map = null;
				// マーカー登録の初期化
				$.google.admin[ id ].maeker = new Array();
				// ウィンドウ
				$.google.admin[ id ].window = null;
				// デフォルトのアイコン
				$.google.admin[ id ].icon = null;
				// デフォルトのアニメーション
				$.google.admin[ id ].animation = null;
				// デフォルトのドラッグ
				$.google.admin[ id ].draggable = null;
			}
			// アイコン
			if ( option.icon ) $.google.admin[ id ].icon = option.icon;
			// アニメーション
			if ( option.animation ) $.google.admin[ id ].animation = option.animation;
			// ドラッグ
			if ( option.draggable ) $.google.admin[ id ].draggable = option.draggable;
			// マップの登録
			$.google.load( this , id , option , function( id , option )
			{
				// マップの中心位置
				var center = null;
				// 文字列
				if ( $.type( option.center ) === "string" && /^\d{1,2}\.\d+,\d{1,3}\.\d+$/.test( option.center ) ) {
					// 分割
					center = option.center.split( "," );
					// 作り直し
					option[ 'center' ] = new google.maps.LatLng( center[ 0 ] , center[ 1 ] );
				}
				// 配列
				else if ( $.type( option.center ) === "array" && option.center.length >= 2 ) {
					// 作り直し
					option[ 'center' ] = new google.maps.LatLng( option.center[ 0 ] , option.center[ 1 ] );
				}
				// JSON
				else if ( $.type( option.center ) === "object" && option.center.x && option.center.y ) {
					// 作り直し
					option[ 'center' ] = new google.maps.LatLng( option.center.x , option.center.y );
				}
				// 拡大率
				if ( $.type( option.zoom ) === "string" && /^\d{1,2}$/.test( option.zoom ) ) option.zoom = parseInt( option.zoom );
				else if ( $.type( option.zoom ) === "number" && option.zoom >= 1 && option.zoom <= 21 ) option.zoom = option.zoom;
				// タイプ
				if ( $.type( option.mapTypeId ) === "string" && option.mapTypeId !== "" ) option.mapTypeId = google.maps.MapTypeId[ option.mapTypeId ];
				// 表示するタグ
				var map = new google.maps.Map( this , option );
				// ウィンドウ
				$.google.admin[ id ].window = new google.maps.InfoWindow();
				// 吹き出しを閉じるイベント
				google.maps.event.addListener( map , "click" , function() { $.google.admin[ id ].window.close(); } );
				// マップの登録
				$.google.admin[ id ].map = map;
			} );
		} );

		// 呼び出し元を返す
		return( this );
	};

	// GoogleMapを返す
	$.fn.getGoogle = function()
	{
		// ID
		var id = $.inArray( $( this ).get( 0 ) , $.google.key );
		// 作成済み
		if ( id !== -1 ) return( $.google.admin[ id ].map );
		// なし
		return( null );
	};

	// マーカー追加
	$.fn.markerGoogle = function( param )
	{
		// 設定なし
		if ( !param ) return( this );
		// ジオコードがない
		if ( !param.position ) return( this );

		// 自身
		var self = this;
		// 設定
		var option = new Object();
		for ( name in param ) option[ name ] = param[ name ];

		// 完全に読み込みまで待つ
		$( window ).load( function() {
			// 各毎タグの固有IDからマップを編集
			$( self ).each( function()
			{
				// 固有ID
				var id = $.inArray( this , $.google.key );
				// 存在するID
				if ( id !== -1 ) {
					// 登録
					$.google.load( this , id , option , function( id , option )
					{
						// 設定
						var config = {
							"map" : null ,
							"position" : null ,
							"title" : "" ,
							"icon" : null
						};
						// マップ
						config.map = $.google.admin[ id ].map;
						// 位置情報
						if ( $.type( option.position ) === "string" && option.position.indexOf( "," ) !== -1 && /^\d{1,2}\.\d+,\d{1,3}\.\d+/.test( option.position ) ) {
							var position = option.position.split( "," );
							config.position = new google.maps.LatLng( position[ 0 ] , position[ 1 ] );
						}
						else if ( $.type( option.position ) === "array" && option.center.length >= 2 ) {
							position = option.position;
							config.position = new google.maps.LatLng( option.position[ 0 ] , option.position[ 1 ] );
						}
						else if ( $.type( option.position ) === "object" && option.center.x && option.center.y ) {
							config.position = new google.maps.LatLng( option.position.x , option.position.y );
						}
						// タイトル
						if ( $.type( option.title ) === "string" && option.title !== "" ) config.title = option.title;
						else if ( ( option.title instanceof jQuery ) && $( option.title ).size() !== 0 ) config.title = $( option.title ).html();
						// アイコン
						var icon = null;
						// マーカー単体指定
						if ( option.icon ) {
							// jQuery
							if ( ( option.icon instanceof jQuery ) && $( option.icon ).filter( "[src]" ).size() !== 0 ) icon = option.icon;
							// 文字列
							else if ( $.type( option.icon ) === "string" ) icon = option.icon;
							// オブジェクト
							else if ( $.type( option.icon ) === "pbject" ) icon = option.icon;
						}
						// マップの設定
						if ( icon === null && $.google.admin[ id ].icon ) {
							// jQuery
							if ( ( $.google.admin[ id ].icon instanceof jQuery ) && $( $.google.admin[ id ].icon ).filter( "[src]" ).size() !== 0 ) icon = $.google.admin[ id ].icon;
							// 文字列
							else if ( $.type( $.google.admin[ id ].icon ) === "string" ) icon = $.google.admin[ id ].icon;
							// オブジェクト
							else if ( $.type( $.google.admin[ id ].icon ) === "pbject" ) icon = $.google.admin[ id ].icon;
						}
						// マップの設定
						if ( icon === null && $.google.icon.icon ) {
							// jQuery
							if ( ( $.google.icon.icon instanceof jQuery ) && $( $.google.icon.icon ).filter( "[src]" ).size() !== 0 ) icon = $.google.icon.icon;
							// 文字列
							else if ( $.type( $.google.icon.icon ) === "string" ) icon = $.google.icon.icon;
							// オブジェクト
							else if ( $.type( $.google.icon.icon ) === "pbject" ) icon = $.google.icon.icon;
						}
						// 文字列
						if ( $.type( icon ) === "string" ) config.icon = icon;
						// jQueryオブジェクト(HTMLタグ)
						else if ( icon instanceof jQuery ) {
							// マーカーを生成
							var size = null;
							var origin = null;
							var anchor = null;
							// サイズ
							if ( $( icon ).is( "[size]" ) && /^\d+,\d+$/.test( $( icon ).attr( "size" ) ) ) {
								var split = $( icon ).attr( "size" ).split( "," );
								size = new google.maps.Size( split[ 0 ] , split[ 1 ] );
							}
							// 基点
							if ( $( icon ).is( "[origin]" ) && /^\d+,\d+$/.test( $( icon ).attr( "origin" ) ) ) {
								var split = $( icon ).attr( "origin" ).split( "," );
								origin = new google.maps.Point( split[ 0 ] , split[ 1 ] );
							}
							// 中心点
							if ( $( icon ).is( "[anchor]" ) && /^\d+,\d+$/.test( $( icon ).attr( "anchor" ) ) ) {
								var split = $( icon ).attr( "anchor" ).split( "," );
								anchor = new google.maps.Point( split[ 0 ] , split[ 1 ] );
							}
							// アイコン作成　
							config.icon = new google.maps.MarkerImage( $( icon ).attr( "src" ) , size , origin , anchor );
						}
						// JSON
						else if ( $.type( icon ) === "object" ) {
							// パラメーター
							var src = "";
							var size = null;
							var origin = null;
							var anchor = null;
							// ファイル
							if ( $.type( icon.icon ) === "string" ) src = icon.icon;
							else if ( ( icon.icon instanceof jQuery ) && $( icon.icon ).is( "[src]" ) ) src = $( icon.icon ).attr( "src" );
							// サイズ
							if ( $.type( icon.size ) === "string" && /^\d+,\d+$/.test( icon.size ) ) size = icon.size.split( "," );
							else if ( $.type( icon.size ) === "array" && icon.size.length === 2 )  size = icon.size;
							else if ( $.type( icon.size ) === "object" && icon.size.width && icon.size.height ) {
								size = new Array( 2 );
								size[ 0 ] = icon.size.width;
								size[ 1 ] = icon.size.height;
							}
							if ( size ) size = new google.maps.Size( size[ 0 ] , size[ 1 ] );
							// 表示開始位置
							if ( $.type( icon.origin ) === "string" && /^\d+,\d+$/.test( icon.origin ) ) origin = icon.origin.split( "," );
							else if ( $.type( icon.origin ) === "array" && icon.origin.length === 2 )  origin = icon.origin;
							else if ( $.type( icon.origin ) === "object" && icon.origin.x && icon.origin.y ) {
								origin = new Array( 2 );
								origin[ 0 ] = icon.origin.x;
								origin[ 1 ] = icon.origin.y;
							}
							if ( origin ) origin = new google.maps.Point( origin[ 0 ] , origin[ 1 ] );
							// マップ座標の基点位置
							if ( $.type( icon.anchor ) === "string" && /^\d+,\d+$/.test( icon.anchor ) ) anchor = icon.anchor.split( "," );
							else if ( $.type( icon.anchor ) === "array" && icon.anchor.length === 2 )  anchor = icon.anchor;
							else if ( $.type( icon.anchor ) === "object" && icon.anchor.x && icon.anchor.y ) {
								anchor = new Array( 2 );
								anchor[ 0 ] = icon.anchor.x;
								anchor[ 1 ] = icon.anchor.y;
							}
							if ( anchor ) anchor = new google.maps.Point( anchor[ 0 ] , anchor[ 1 ] );
							// アイコン作成
							config.icon = new google.maps.MarkerImage( src , size , origin , anchor );
						}
						// アニメーション
						if ( option.animation ) config.animation = google.maps.Animation[ option.animation ];
						else if ( $.google.admin[ id ].animation ) config.animation = google.maps.Animation[ $.google.admin[ id ].animation ];
						else if ( $.google.icon.animation ) config.animation = google.maps.Animation[ $.google.icon.animation ];
						// ドラッグ
						if ( $.type( option.draggable ) === "boolean" ) config.draggable = option.draggable;
						else if ( $.type( $.google.admin[ id ].draggable ) === "boolean" ) config.draggable = $.google.admin[ id ].draggable;
						else config.draggable = $.google.icon.draggable;
						// コンテンツ
						if ( option.content instanceof jQuery ) option.content = $( option.content ).html();
						if ( option.content === "" ) option.content = null;

						var marker = new google.maps.Marker( config );
						// コンテンツがある
						if ( option.content ) {
							// マーカーをクリックした時の処理
							google.maps.event.addListener( marker , "click" , function()
							{
								// コンテンツをウィンドウとして登録
								$.google.admin[ id ].window.setContent( option.content );
								// マーカーとマップを紐づける
								$.google.admin[ id ].window.open( config.map , marker );
								// マップのズームレベルの設定
								if ( option.zoom ) config.map.setZoom( parseInt( option.zoom ) );
							} );
						}
						// クリックイベント
						$( option.click ).click( function()
						{
							// クリックイベントのトリガー
							google.maps.event.trigger( marker , "click" );
						} );
					} );
				}
			} );
		} );

		// 呼び出し元を返す
		return( this );
	};

	// 読み込みチェック
	LoadGoogleMapCheck();
	function LoadGoogleMapCheck()
	{
		setTimeout( function() { if ( google !== undefined ) $.google.exec(); else LoadGoogleMapCheck(); } , 100 );
	}
} );