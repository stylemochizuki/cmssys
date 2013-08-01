/**
 * アスキー文字を半角または全角へ変換
 *
 * @param string change "half":半角または"full":全角変換の指定( デフォルト:"half" )
 * @returns string 変換済みの文字列
 */
String.prototype.convertAscii = function ( change )
{
	// 全角へ変換
	if ( change === "full" ) return( this.replace( /[ !"#$%&'()*+,\-.\/0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ\[\\\]\^_`abcdefghijklmnopqrstuvwxyz{|}~]/g , function ( chr ) { return( "　！”＃＄％＆’（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［￥］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～".charAt( " !\"#$%&'()*+,-.\/0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf( chr ) ) ); } ) );
	// 半角を全角へ置換
	return( this.replace( /[　！”＃＄％＆’（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［￥］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～]/g , function ( chr ) { return( " !\"#$%&'()*+,-.\/0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt( "　！”＃＄％＆’（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［￥］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～".indexOf( chr ) ) ); } ) );
};

/**
 * カタカナを半角または全角へ変換
 *
 * @param string change "half":半角または"full":全角変換の指定( デフォルト:"full" )
 * @returns string 変換済みの文字列
 */
String.prototype.convertKana = function ( change )
{
	// 文字列
	var str = this;
	// 全角から半角
	if ( change === "half" ) {
		// 濁音と半濁音を置換
		str = str.replace( /[ヴガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ]/g , function ( chr ) { var index = "ヴガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ".indexOf( chr ); return( "ｳｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾊﾋﾌﾍﾎﾊﾋﾌﾍﾎ".charAt( index ) + ( index < 22 ? "ﾞ" : "ﾟ" ) ); } );
		// 全角を半角へ置換
		str = str.replace( /[アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョ゛゜ー、。・「」]/g , function ( chr ) { return( "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｬｭｮﾞﾟｰ､｡･｢｣".charAt( "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョ゛゜ー、。・「」".indexOf( chr ) ) ); } );
	}
	// 半角から全角
	else {
		// 濁音と半濁音を置換
		str = str.replace( /[ｳｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾊﾋﾌﾍﾎ](ﾞ|ﾟ)/g , function ( chr ) { return( "ヴガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ".charAt( "ｳﾞｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ".indexOf( chr ) >> 1 ) ); } );
		// 半角を全角へ置換
		str = str.replace( /[ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｬｭｮﾞﾟｰ､｡･｢｣]/g , function ( chr ) { return( "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョ゛゜ー、。・「」".charAt( "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｬｭｮﾞﾟｰ､｡･｢｣".indexOf( chr ) ) ); } );
	}
	// 置換済みの文字列を返す
	return( str );
};

/**
 * C/JAVA言語の sprintf を実装する
 *
 * @param string format フォーマット文字列
 * @param array params 引数
 * @returns string C/JAVA言語の sprintf と同じ
 */
function sprintf( format , params )
{
	// カウンタ
	var count = 0;
	// 置換
	format = format.replace( /%c|%C|%s|%(0)?([1-9]*)(d|u|i|o|x|f)/ig , function( src , zero , len , type )
	{
		// 置換する文字
		var value = params[ count++ ];
		// 文字
		if ( src === "%c" ) {
			
		}
		// 文字列
		else if ( src === "%s" ) ;
		// 数字
		else {
			// 進数
			var adv = 10;
			if ( type === "i" || type === "o" ) adv = 8;
			if ( type === "x" || type === "X" ) adv = 16;
			// 数値化
			var num = ( type === "f" ? parseFloat( value ) : parseInt( value ) );
			// 符号無し
			if ( num < 0 && ( type === "u" || type === "o" ) ) num *= -1;
			// 数値化
			value = num.toString( adv );
			// 小文字と大文字
			if      ( type === "x" ) value = value.toLowerCase();
			else if ( type === "X" ) value = value.toUpperCase();
			// 桁
			if ( len ) {
				// 桁数を計算
				len -= value.length;
				// 桁数分追加
				for ( var i = 0 ; i < len ; ++i ) {
					// ZEROフィールド
					if ( zero === "0" ) value = "0" + value;
					// 空白フィールド
					else value = " " + value;
				}
			}
		}
		// 置換文字を返す
		return( value );
	} );
	// 結果を返す
	return( format );
};

// エラーの種類
StyleCheck.ERROR = new Array(
	"SUCCESS" , // 問題なし
	"EMPTY"   , // 空
	"LENGTH"  , // 文字(桁)数が違う
	"MISS"    , // 違う
	"MAX"       // エラー種類の数
);
// 列挙型に変換
var tmp = StyleCheck.ERROR;
for ( var value in StyleCheck.ERROR ) tmp[ StyleCheck.ERROR[ value ] ] = value;
StyleCheck.ERROR = tmp;
delete( tmp );

/**
 * 文字のチェッククラス
 *
 * @param string this.check チェックしたい文字列
 * @param boolean flg 半角や全角も判定に入れる( デフォルト:true )
 */
function StyleCheck( str , flg )
{
	// 渡された文字列を記憶
	this.check = str;
	// デフォルトのフラグ
	this.flg = ( typeof( flg ) === "boolean" ? flg : true );

	/**
	 * 空のチェック
	 *
	 * @returns number 空ではなければ SUCCESS( 0 ) を返します。
	 */
	this.checkNull = function ( len , flg )
	{
		// 空
		if ( !this.check ) return( StyleCheck.ERROR.EMPTY );
		// 問題なし
		return( StyleCheck.ERROR.SUCCESS );
	};

	/**
	 * 数字のチェック
	 *
	 * @param number len 文字数指定。0で指定なし( デフォルト:0 )
	 * @param boolean flg 全角も判定に入れる( デフォルト:true )
	 * @returns number アスキー文字のみなら SUCCESS( 0 ) を返します。
	 */
	this.checkNumber = function ( len , flg )
	{
		// 空
		if ( !this.check ) return( StyleCheck.ERROR.EMPTY );
		// 文字数
		if ( typeof( len ) !== "number" ) len = 0;
		// フラグ
		if ( typeof( flg ) !== "boolean" ) flg = this.flg;
		// 変換
		if ( flg ) this.check = this.check.convertAscii();
		// 数字以外が存在する
		if ( !/^\d+$/.test( this.check ) ) return( StyleCheck.ERROR.MISS );
		// 桁数が指定値ではない
		if ( len !== 0 && len !== this.check.length ) return( StyleCheck.ERROR.LENGTH );
		// 問題なし
		return( StyleCheck.ERROR.SUCCESS );
	};

	/**
	 * 英字のチェック
	 *
	 * @param number len 文字数指定。0で指定なし( デフォルト:0 )
	 * @param boolean flg 全角も判定に入れる( デフォルト:true )
	 * @returns boolean アスキー文字のみなら SUCCESS( 0 ) を返します。
	 */
	this.checkEnglish = function ( len , flg )
	{
		// 空
		if ( !this.check ) return( StyleCheck.ERROR.EMPTY );
		// 文字数
		if ( typeof( len ) !== "number" ) len = 0;
		// フラグ
		if ( typeof( flg ) !== "boolean" ) flg = this.flg;
		// 変換
		if ( flg ) this.check = this.check.convertAscii();
		// 英字以外が存在する
		if ( !/^[A-Za-z]+$/.test( this.check ) ) return( StyleCheck.ERROR.MISS );
		// 文字数が指定値ではない
		if ( len !== 0 && len !== this.check.length ) return( StyleCheck.ERROR.LENGTH );
		// 問題なし
		return( StyleCheck.ERROR.SUCCESS );
	};

	/**
	 * 英大文字のチェック
	 *
	 * @param number len 文字数指定。0で指定なし( デフォルト:0 )
	 * @param boolean flg 全角も判定に入れる( デフォルト:true )
	 * @returns boolean アスキー文字のみなら SUCCESS( 0 ) を返します。
	 */
	this.checkUpper = function ( len , flg )
	{
		// 空
		if ( !this.check ) return( StyleCheck.ERROR.EMPTY );
		// 文字数
		if ( typeof( len ) !== "number" ) len = 0;
		// フラグ
		if ( typeof( flg ) !== "boolean" ) flg = this.flg;
		// 変換
		if ( flg ) this.check = this.check.convertAscii();
		// 英大字以外が存在する
		if ( !/^[A-Z]+$/.test( this.check ) ) return( StyleCheck.ERROR.MISS );
		// 文字数が指定値ではない
		if ( len !== 0 && len !== this.check.length ) return( StyleCheck.ERROR.LENGTH );
		// 問題なし
		return( StyleCheck.ERROR.SUCCESS );
	};

	/**
	 * 英小文字のチェック
	 *
	 * @param number len 文字数指定。0で指定なし( デフォルト:0 )
	 * @param boolean flg 全角も判定に入れる( デフォルト:true )
	 * @returns boolean アスキー文字のみなら SUCCESS( 0 ) を返します。
	 */
	this.checkLower = function ( len , flg )
	{
		// 空
		if ( !this.check ) return( StyleCheck.ERROR.EMPTY );
		// 文字数
		if ( typeof( len ) !== "number" ) len = 0;
		// フラグ
		if ( typeof( flg ) !== "boolean" ) flg = this.flg;
		// 変換
		if ( flg ) this.check = this.check.convertAscii();
		// 英大字以外が存在する
		if ( !/^[a-z]+$/.test( this.check ) ) return( StyleCheck.ERROR.MISS );
		// 文字数が指定値ではない
		if ( len !== 0 && len !== this.check.length ) return( StyleCheck.ERROR.LENGTH );
		// 問題なし
		return( StyleCheck.ERROR.SUCCESS );
	};

	/**
	 * 英数字のチェック
	 *
	 * @param number len 文字数指定。0で指定なし( デフォルト:0 )
	 * @param boolean flg 全角も判定に入れる( デフォルト:true )
	 * @returns boolean アスキー文字のみなら SUCCESS( 0 ) を返します。
	 */
	this.checkAlpha = function ( len , flg )
	{
		// 空
		if ( !this.check ) return( StyleCheck.ERROR.EMPTY );
		// 文字数
		if ( typeof( len ) !== "number" ) len = 0;
		// フラグ
		if ( typeof( flg ) !== "boolean" ) flg = this.flg;
		// 変換
		if ( flg ) this.check = this.check.convertAscii();
		// 英数字以外が存在する
		if ( !/^[0-9A-Za-z]+$/.test( this.check ) ) return( StyleCheck.ERROR.MISS );
		// 文字数が指定値ではない
		if ( len !== 0 && len !== this.check.length ) return( StyleCheck.ERROR.LENGTH );
		// 問題なし
		return( StyleCheck.ERROR.SUCCESS );
	};

	/**
	 * アスキーコードのチェック
	 *
	 * @param number len 文字数指定。0で指定なし( デフォルト:0 )
	 * @param boolean flg 全角も判定に入れる( デフォルト:true )
	 * @returns boolean アスキーコードのみなら SUCCESS( 0 ) を返します。
	 */
	this.checkAscii = function ( len , flg )
	{
		// 空
		if ( !this.check ) return( StyleCheck.ERROR.EMPTY );
		// 文字数
		if ( typeof( len ) !== "number" ) len = 0;
		// フラグ
		if ( typeof( flg ) !== "boolean" ) flg = this.flg;
		// 変換
		if ( flg ) this.check = this.check.convertAscii();
		// 英数字以外が存在する
		if ( !/^[ -~]+$/.test( this.check ) ) return( StyleCheck.ERROR.MISS ); //  !"#$%&'()*+,\-.\/0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ\[\\\]\^_`abcdefghijklmnopqrstuvwxyz{|}~
		// 文字数が指定値ではない
		if ( len !== 0 && len !== this.check.length ) return( StyleCheck.ERROR.LENGTH );
		// 問題なし
		return( StyleCheck.ERROR.SUCCESS );
	};

	/**
	 * URLのチェック(日本語ドメイン対応)
	 *
	 * @param boolean flg 半角カナや全角アスキーコードも判定に入れる( デフォルト:true )
	 * @returns boolean URLなら SUCCESS( 0 ) を返します。
	 */
	this.checkUrl = function( flg )
	{
		// 空
		if ( !this.check ) return( StyleCheck.ERROR.EMPTY );
		// フラグ
		if ( typeof( flg ) !== "boolean" ) flg = this.flg;
		// 変換
		if ( flg ) this.check = this.check.convertAscii().convertKana();
		// 大文字は全て小文字に変換
		this.check = this.check.toLowerCase();
		// 英語ドメイン
		// ^(https?|ftp):\/\/(www\.)?[0-9A-Za-z\-._]{3,63}\.[a-z]{2,}\/?
		// 日本語ドメイン
		// ^(https?|ftp):\/\/(www\.)?[^ !"#$%&'()*+,\/:;<=>?@\[\\\]\^_`{|}~。、，”□△◎☆！？～＠]{1,15}\.[a-z]{2,}\/?
		// ディレクトリ
		// [^\\:*?"<>|]+\/
		// ファイル名
		// [^\\:*\/?"<>|]+
		// 型のチェック
		if ( !/^(https?|ftp):\/\/(www\.)?([0-9A-Za-z\-._]{3,63}|[^ !"#$%&'()*+,\/:;<=>?@\[\\\]\^_`{|}~。、，”□△◎☆！？～＠]{1,15})\.[a-z]{2,}\/?([^\\:*\/?"<>|]+\/)*([^\\:*\/?"<>|]+)?$/.test( this.check ) ) return( StyleCheck.ERROR.MISS );
		// 問題なし
		return( StyleCheck.ERROR.SUCCESS );
	};

	/**
	 * メールアドレスのチェック(日本語ドメイン対応)
	 *
	 * @param boolean flg 半角カナや全角アスキーコードも判定に入れる( デフォルト:true )
	 * @returns boolean メールアドレスなら SUCCESS( 0 ) を返します。
	 */
	this.checkMail = function( flg )
	{
		// ドメイン
		var domain = "";
		// @マークの位置
		var at = 0;
		// 空
		if ( !this.check ) return( StyleCheck.ERROR.EMPTY );
		// フラグ
		if ( typeof( flg ) !== "boolean" ) flg = this.flg;
		// "@"がある位置
		at = this.check.lastIndexOf( "@" );
		if ( at === -1 ) at = this.check.lastIndexOf( "＠" );
		if ( at !== -1 ) {
			// "@"以降の文字列を取得(@以前はチェックしない)
			domain = this.check.substr( at );
			// 変換
			if ( flg ) {
				// 全角半角の変換
				domain = domain.convertAscii().convertKana();
				// 適応
				this.check = this.check.substr( 0 , at ) + domain;
			}
			// 型のチェック
			if ( !/^@([0-9A-Za-z\-._]{3,63}|[^ !"#$%&'()*+,\/:;<=>?@\[\\\]\^_`{|}~。、，”□△◎☆！？～＠]{1,15})\.[a-z]{2,}$/.test( domain ) ) return( StyleCheck.ERROR.MISS );
			// 問題なし
			return( StyleCheck.ERROR.SUCCESS );
		}
		// メールアドレスではない
		return( StyleCheck.ERROR.MISS );
	};

	/**
	 * 全角文字のチェック
	 *
	 * @param boolean flg 半角も判定に入れる( デフォルト:true )
	 * @returns boolean 全角文字のみなら SUCCESS( 0 ) を返します。
	 */
	this.checkFull = function ( flg )
	{
		// 空
		if ( !this.check ) return( StyleCheck.ERROR.EMPTY );
		// フラグ
		if ( typeof( flg ) !== "boolean" ) flg = this.flg;
		// 変換
		if ( flg ) this.check = this.check.convertKana();
		// 判定
		if ( !/^[^ -~ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｬｭｮﾞﾟｰ､｡･｢｣]+$/.test( this.check ) ) return( StyleCheck.ERROR.MISS );
		// 問題なし
		return( StyleCheck.ERROR.SUCCESS );
	};

	/**
	 * 全角カタカナのチェック
	 *
	 * @param boolean flg 半角も判定に入れる( デフォルト:true )
	 * @returns boolean 全角カタカナのみなら SUCCESS( 0 ) を返します。
	 */
	this.checkKana = function( flg )
	{
		// 空
		if ( !this.check ) return( StyleCheck.ERROR.EMPTY );
		// フラグ
		if ( typeof( flg ) !== "boolean" ) flg = this.flg;
		// 変換
		if ( flg ) this.check = this.check.convertKana();
		// 判定
		if ( !/^[アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォャュョヴガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ゛゜ー、。・「」]+$/.test( this.check ) ) return( StyleCheck.ERROR.MISS );
		// 問題なし
		return( StyleCheck.ERROR.SUCCESS );
	};

	/**
	 * 電話番号の詳細調査(日本国内)
	 *
	 * @param boolean flg 全角も判定に入れる( デフォルト:true )
	 * @returns number 0:固定電話 1:携帯電話 2:国際電話 3:公共番号 4:市内局番 5:電話番号ではない
	 */
	this.checkTellDetail = function( flg )
	{
		// 判定番号
		var type = 0;
		// 空
		if ( !this.check ) return( StyleCheck.ERROR.EMPTY );
		// フラグ
		if ( typeof( flg ) !== "boolean" ) flg = this.flg;
		// 変換
		if ( flg ) this.check = this.check.convertAscii();
		// 固定電話
		if ( /^0[1-9]\d*-\d{1,4}-\d{4}$/.test( this.check ) && this.check.length == 10 ) type = 0;
		// 携帯電話
		else if ( /^0[789]0-\d{4}-\d{4}$/.test( this.check ) ) type = 1;
		// 国際電話
		else if ( /^010-[1-9]\d*-\d+-\d+$/.test( this.check ) ) type = 2;
		// 公共番号
		else if ( /^1\d{2}$/.test( this.check ) ) type = 3;
		// 市内局番
		else if ( /^\d{1,4}-\d{4}$/.test( this.check ) ) type = 4;
		// 電話番号ではない
		else type = 5;
		// 判定
		return( type );
	};

	/**
	 * 電話番号のチェック(日本国内)
	 *
	 * @param boolean flg 全角も判定に入れる( デフォルト:true )
	 * @returns boolean 電話番号なら SUCCESS( 0 ) を返します。
	 */
	this.checkTell = function( flg )
	{
		// 判定番号
		var type = false;
		// 空
		if ( !this.check ) return( StyleCheck.ERROR.EMPTY );
		// フラグ
		if ( typeof( flg ) !== "boolean" ) flg = this.flg;
		// 変換
		if ( flg ) this.check = this.check.convertAscii();
		// 固定電話
		if ( /^0[1-9]\d*-\d{1,4}-\d{4}$/.test( this.check ) && this.check.length == 12 ) type = true;
		// 携帯電話
		else if ( /^0[789]0-\d{4}-\d{4}$/.test( this.check ) ) type = true;
		// 電話番号ではない
		else type = false;
		// 判定
		if ( !type ) return( StyleCheck.ERROR.MISS );
		// 問題なし
		return( StyleCheck.ERROR.SUCCESS );
	};

	/**
	 * 郵便番号のチェック(日本国内)
	 *
	 * @param boolean flg 全角も判定に入れる( デフォルト:true )
	 * @returns boolean 郵便番号なら SUCCESS( 0 ) を返します。
	 */
	this.checkZip = function( flg )
	{
		// 空
		if ( !this.check ) return( StyleCheck.ERROR.EMPTY );
		// フラグ
		if ( typeof( flg ) !== "boolean" ) flg = this.flg;
		// 変換
		if ( flg ) this.check = this.check.convertAscii();
		// 数字7桁
		if ( /^\d{7}$/.test( this.check ) ) this.check = this.check.substr( 0 , 3 ) + "-" + this.check.substr( 3 );
		// 判定
		if ( !/^\d{3}-\d{4}$/.test( this.check ) ) return( StyleCheck.ERROR.MISS );
		// 問題なし
		return( StyleCheck.ERROR.SUCCESS );
	};

	/**
	 * 郵便番号のチェック(日本国内)
	 *
	 * @param boolean flg 全角も判定に入れる( デフォルト:true )
	 * @returns boolean 郵便番号なら SUCCESS( 0 ) を返します。
	 */
	this.checkZip = function( flg )
	{
		// 空
		if ( !this.check ) return( StyleCheck.ERROR.EMPTY );
		// フラグ
		if ( typeof( flg ) !== "boolean" ) flg = this.flg;
		// 変換
		if ( flg ) this.check = this.check.convertAscii();
		// 数字7桁
		if ( /^\d{7}$/.test( this.check ) ) this.check = this.check.substr( 0 , 3 ) + "-" + this.check.substr( 3 );
		// 判定
		if ( !/^\d{3}-\d{4}$/.test( this.check ) ) return( StyleCheck.ERROR.MISS );
		// 問題なし
		return( StyleCheck.ERROR.SUCCESS );
	};

	/**
	 * パスワードのチェック
	 *
	 * @param boolean flg 全角も判定に入れる( デフォルト:true )
	 * @returns boolean パスワードとして使用可能なら SUCCESS( 0 ) を返します。
	 */
	this.checkPassword = function( flg )
	{
		// 空
		if ( !this.check ) return( StyleCheck.ERROR.EMPTY );
		// フラグ
		if ( typeof( flg ) !== "boolean" ) flg = this.flg;
		// 変換
		if ( flg ) this.check = this.check.convertAscii();
		// 半角英数字
		if ( !/^\w+$/.test( this.check ) ) return( StyleCheck.ERROR.MISS );
		// 3〜32文字まで
		if ( this.check.length < 4 || this.check.length > 32 ) return( StyleCheck.ERROR.LENGTH );
		// 問題なし
		return( StyleCheck.ERROR.SUCCESS );
	};
}

/**
 * 年月日の作成と制御
 *
 * @param object year 年のセレクトボックスオブジェクト
 * @param object month 月のセレクトボックスオブジェクト
 * @param object day 日のセレクトボックスオブジェクト
 * @param json params 初期設定
 */
function dateSelect( year , month , day , params , fun )
{
	// 初期値
	var def_params = {
		"base" : new Date() ,
		"start" : new Date() ,
		"end" : new Date() ,
		"year" : '<option( selected)>[value]</option>' ,
		"month" : '<option( selected)>[value]</option>' ,
		"day" : '<option( selected)>[value]</option>' ,
		"auto" : true
	};
	// Date型変換用
	var time = {
		"base" : { date : new Date() , year : 0 , month : 0 , day : 0 } ,
		"start" : { date : new Date() , year : 0 , month : 0 , day : 0 } ,
		"end" : { date : new Date() , year : 0 , month : 0 , day : 0 }
	};
	// 数字用
	var num = 0;

	// optionタグのフォーマットからHTMLを作成
	function optionFormat( format , value , selected )
	{
		// 置換
		format = format.replace( /\[value\]/g , value ).replace( /\(([^)]+)\)/g , ( selected === true ? "$1" : "" ) );
		// 変換済み文字列
		return( format );
	}

	/* -- JQuery -- */
	( function( $ )
	{
		// 引数の設定
		params = $.extend( def_params , params );

		// 基準
		if ( typeof( params.base ) === "string" ) {
			// 年月日のみ
			if ( /^\d{4}\/\d{2}\/\d{2}$/.test( params.base ) ) params.base += " 00:00:00";
			// Date型にパース
			num = params.base;
			if ( num !== NaN ) time.base.date.setTime( Date.parse( num ) );
		}
		// 数字
		else if ( typeof( params.base ) === "number" ) time.base.date.setTime( params.base );
		// 最古
		if ( typeof( params.start ) === "string" ) {
			// 年月日のみ
			if ( /^\d{4}\/\d{2}\/\d{2}$/.test( params.start ) ) params.start += " 00:00:00";
			// Date型にパース
			num = params.start;
			if ( num !== NaN ) time.start.date.setTime( Date.parse( num ) );
		}
		// 数字
		else if ( typeof( params.start ) === "number" ) time.start.date.setTime( params.start );
		// 最新
		if ( typeof( params.end ) === "string" ) {
			// 年月日のみ
			if ( /^\d{4}\/\d{2}\/\d{2}$/.test( params.end ) ) params.end += " 00:00:00";
			// Date型にパース
			num = params.end;
			if ( num !== NaN ) time.end.date.setTime( Date.parse( num ) );
		}
		// 数字
		else if ( typeof( params.end ) === "number" ) time.end.date.setTime( params.end );
		// 最古より最新のが古い
		if ( time.start.date > time.end.date ) {
			// 交換
			var date = time.start.date;
			time.start.date = time.end.date;
			time.end.date = date;
		}
		// 年取得
		time.base.year = time.base.date.getFullYear();
		time.start.year = time.start.date.getFullYear();
		time.end.year = time.end.date.getFullYear();
		// 月取得
		time.base.month = time.base.date.getMonth() + 1;
		time.start.month = time.start.date.getMonth() + 1;
		time.end.month = time.end.date.getMonth() + 1;
		// 日取得
		time.base.day = time.base.date.getDate();
		time.start.day = time.start.date.getDate();
		time.end.day = time.end.date.getDate();

		// 初期ロード
		if ( params.auto ) {
			// 年
			createYear( time.base.year );
			// 月
			createMonth( time.base.month );
			// 日
			createDay( time.base.day );
			// コールバック
			if ( fun ) fun();
		}

		// 年を作成
		function createYear( base )
		{
			// 範囲を取得
			var start = time.start.year;
			var end = time.end.year;
			var option = "";
			// 作成
			while ( start <= end ) {
				// optionタグを作成
				option += optionFormat( params.year , start , ( start == base ) );
				// 次の年へ
				++start;
			}
			// optionタグをHTML出力
			$( year ).html( option );
		}

		// 月を作成
		function createMonth( base )
		{
			// 範囲を取得
			var sel_year = $( year ).val();
			var start = 1;
			var end = 12;
			var option = "";
			// 選択している年が最小年
			if ( sel_year == time.start.year ) start = time.start.month;
			// 選択している年が最大年
			if ( sel_year == time.end.year ) end = time.end.month;
			// 作成
			while ( start <= end ) {
				// optionタグを作成
				option += optionFormat( params.month , start , ( start == base ) );
				// 次の月へ
				++start;
			}
			// optionタグをHTML出力
			$( month ).html( option );
		}

		// 日を作成
		function createDay( base )
		{
			// 範囲を取得
			var sel_year = $( year ).val();
			var sel_month = $( month ).val();
			var date = new Date( sel_year , sel_month , 0 );
			var start = 1;
			var end = 31;
			var option = "";
			// 当月の最終日
			end = date.getDate();
			// 選択している年が最小月
			if ( sel_year == time.start.year && sel_month == time.start.month ) start = time.start.day;
			// 選択している年が最大月
			if ( sel_year == time.end.year && sel_month == time.end.month ) end = time.end.day;
			// 作成
			while ( start <= end ) {
				// optionタグを作成
				option += optionFormat( params.day , start , ( start == base ) );
				// 次の月へ
				++start;
			}
			// optionタグをHTML出力
			$( day ).html( option );
		}

		// 年を変更
		$( year ).change( function()
		{
			// 月
			createMonth( $( month ).val() );
			// 日
			createDay( $( day ).val() );
			// コールバック
			if ( fun ) fun();
		} );

		// 月を変更
		$( month ).change( function()
		{
			// 日
			createDay( $( day ).val() );
			// コールバック
			if ( fun ) fun();
		} );

		// 日を変更
		$( day ).change( function()
		{
			// コールバック
			if ( fun ) fun();
		} );
	}
	)( jQuery );
};
