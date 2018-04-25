# a-starter-kit

テーマ開発のスターターキットです。

## 使い方

### インストール

```
$ npm install
```

### ビルド

cssのbuildとjsのbuildを行います。
納品時にはこのコマンドを実行して納品してください。
JavaScriptがproductionビルドとなります。

```
$ npm run build
```

このコマンドを実行すると、cssとjsの変更をwatchしてビルドを行います。
上のコマンドと同じようにビルドされますが、developmentビルドで実行されるためproductionビルドよりは早いです。
しかし、納品時には必ず npm run buildしましょう。

```
$ npm run start
```
