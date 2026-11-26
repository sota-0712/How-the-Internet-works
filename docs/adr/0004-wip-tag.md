# 0004. ステップ定義のないシナリオは `@wip` で外す

- ステータス: 採用
- 日付: 2026-11-26

## 背景

BDD では Discovery → Formulation（Gherkin を書く）→ Automation（ステップ定義と実装）と進める。
Formulation が先に終わると、ステップ定義のない `.feature` がリポジトリに入る。playwright-bdd の `bddgen` はステップ定義が見つからないとエラーになるため、そのままでは CI（`npm run test:bdd`）が赤になる。

## 決定

- ステップ定義がまだないシナリオ（またはフィーチャー）には `@wip` タグを付ける
- `playwright.config.ts` の `defineBddConfig` に `tags: 'not @wip'` を指定し、`@wip` を `bddgen` の対象から外す
- Automation に入るときに `@wip` を外し、まず失敗する E2E として置いてから実装して緑にする

## 検討した他の案

- `.feature` を Automation まで別の場所（docs など）に置いておく: シナリオが features/ から外れると、どこに何があるか分かりにくくなる
- ステップ定義を空や `pending` で先に作る: まだ書き方の決まっていないステップに仮の実装を置くことになり、Formulation と Automation の区切りがぼやける

## 影響

- Gherkin だけ先にマージしても CI は緑のまま
- `@wip` が付いたまま放置されると、テストされていないシナリオが残る。`grep -r @wip features/` で残りを確認できる
- 最初に適用したのは PR #5（`features/open-url.feature`）
