# 0003. Gherkin のキーワードは英語、本文は日本語

- ステータス: 採用
- 日付: 2026-11-26

## 背景

最初の `features/app.feature` は `# language: ja` で、キーワードも日本語（`機能`、`シナリオ`、`もし`、`ならば`）で書いていた。
Discovery の結果を `features/open-url.feature` に書くにあたり、書き方を決める必要があった。

## 決定

- キーワードは英語（`Feature` / `Rule` / `Background` / `Scenario` / `Given` / `When` / `Then` / `And`）
- 本文（シナリオ名やステップの文）は日本語

## 検討した他の案

- キーワードも日本語（`# language: ja`）: 日本語キーワードは種類が多く（`もし` / `ならば` / `前提` など）、BDD の本や記事、playwright-bdd のドキュメントにある `Given` / `When` / `Then` と対応づけて読み替える手間がかかる
- すべて英語: 学習アプリの中身（DNS、TCP など）を自分の言葉で書いて理解を確かめたいので、本文は日本語のほうがよい

## 影響

- 本や資料の例と、手元の `.feature` を同じ形で読み比べられる
- 既存の `features/app.feature` はまだ日本語キーワードのまま。触るタイミングで英語キーワードに揃える
