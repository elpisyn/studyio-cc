# iOS用コンテンツ スキーマ定義

既存の資格学習アプリ群で実際に使われている形式。
この5ファイルをセットで生成する。実例は `templates/ios/` 配下。

## quiz_data.json

配列。1要素 = 1問。

```json
{
  "num": 1,
  "topic": "問題の論点を一言で(一覧・検索用)",
  "question": "問題文",
  "multi": false,
  "nCorrect": 1,
  "choices": [
    { "text": "選択肢テキスト", "correct": false, "explanation": "なぜ不正解か" },
    { "text": "選択肢テキスト", "correct": true,  "explanation": "なぜ正解か" }
  ],
  "concepts": [
    { "title": "関連概念の名前", "body": "詳しい説明", "bodySimple": "一言版" }
  ],
  "category": "出題カテゴリ名"
}
```

- `num` は1始まりの連番、重複・欠番なし。
- `multi` が `true` のとき複数選択可。`nCorrect` は `choices` 内の `correct: true` の個数と一致させる。
- `explanation` は正解・不正解いずれの選択肢にも書く(不正解の理由が学習価値を持つため)。
- `concepts` は0個以上。問題に関連する用語・概念を深掘りしたいときに追加。
- `category` は `study_content.json` の章立てと緩く対応させると教材との接続が作りやすい。

## study_content.json

配列。1要素 = 1教材ページ。`blocks` は型付きの配列で、表示側がこの型をswitchして描画する前提。

```json
{
  "id": "kebab-case-の一意ID",
  "category": "ページの分類(タブ分けなどに使用)",
  "tag": "画面上の小さいラベル",
  "title": "ページタイトル",
  "subtitle": "サブタイトル",
  "order": 1,
  "blocks": [
    { "type": "chips", "items": [{ "text": "AI", "color": "blue" }] },
    { "type": "heading", "level": 2, "text": "見出し", "id": "sec-1" },
    { "type": "paragraph", "text": "本文。**太字**などMarkdown風の簡易装飾が使える。" },
    { "type": "cardGrid", "columns": 2, "cards": [{ "title": "...", "body": "..." }] }
  ]
}
```

- `id` は `question_study_links.json` から参照されるので、生成後に変更しない。
- `blocks[].type` はこの4種以外にも必要に応じて増やしてよいが、その場合は表示側(アプリ)の対応実装が別途必要になることをユーザーに伝える。
- `order` でアプリ内の表示順を制御する。

## glossary.json

配列。1要素 = 1用語。

```json
{
  "id": "表示名と同じでよい(検索キー)",
  "term": "短い見出し語",
  "aliases": ["別名・英語表記・略称など"],
  "definition": "定義文",
  "category": "quiz_data.json の category と揃えると横断検索しやすい"
}
```

## question_study_links.json

配列。`quiz_data.json` の各問題から関連教材ページへのリンク。**リンク切れ(存在しないpageId)を作らないこと。**

```json
{
  "num": 1,
  "links": [
    { "pageId": "study_content.json の id", "headingText": "対応する見出しのテキスト", "anchorId": null }
  ]
}
```

- `num` は `quiz_data.json` の `num` と1対1対応。全問に最低1件のリンクを付けるのが望ましい。
- `anchorId` は該当ブロックに `heading` の `id` があればそれを入れる。無ければ `null`。

## app_config.json

```json
{ "examLabel": "アプリ内に表示する試験名(例: サンプル資格名)" }
```

- テーマ色を切り替える汎用テンプレート(`studyio-ios/app_config.json` 系)では、ここに `theme` オブジェクト
  (`accentLight` / `accentDark` / `accentInkLight` / `accentInkDark` / `accentSoftLight` / `accentSoftDark`)
  を追加することもある。ユーザーがテーマ色を指定した場合のみ追加する。

## 生成時の注意
- 出典不明の内容を断定的に書かない。公式ドキュメントで裏取りした場合は、生成報告の中でどこを調べたか簡潔に触れる。
- 既存の有料問題集・購入コンテンツを元に生成する場合、再配布不可の可能性が高いので、生成後の配布範囲(個人利用限定か等)をユーザーに確認する。
