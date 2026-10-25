# studyio-cc

資格試験・検定向けの学習コンテンツ(クイズ・教材・用語集)を生成するClaude Code Skill。

## 使い方

このリポジトリ自体が1つのスキル本体（`SKILL.md`がリポジトリ直下にある）。Claude Codeがスキルとして認識するパスは `.claude/skills/<スキル名>/SKILL.md` なので、使うときはこのフォルダをその場所にコピーする。

```bash
# 自分のホーム配下に置く場合(全プロジェクトで使える)
cp -r studyio-cc ~/.claude/skills/studyio-cc

# 特定プロジェクトだけで使う場合
cp -r studyio-cc <your-project>/.claude/skills/studyio-cc
```

(フォルダ名はSKILL.mdの`name: studyio-cc`と一致しているので、`git clone`してきたフォルダ名のままコピーすればOK)

Claude Codeから `/studyio-cc [資格・試験名]` のように呼び出すと、以下を対話で確認しながらコンテンツを生成する。

- 出力形式: iOSアプリ用JSON / 単体HTMLページ
- 裏取り方法: 公式ドキュメント調査 / ユーザー提供資料

詳細は [`SKILL.md`](SKILL.md) を参照。

## スコープ

- コンテンツ(JSON/HTML)の生成のみ。Xcodeプロジェクトの作成・編集は対象外。
- 生成したコンテンツを実アプリに組み込む作業は手動で行う。
