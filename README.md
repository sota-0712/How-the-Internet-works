# インターネットの仕組み

ブラウザでURLを開いたとき、ハードウェアからアプリまでの各レイヤーで何が起きているかを、同じ瞬間で見比べられる学習用Webアプリです。BDD（振る舞い駆動開発）で少しずつ機能を増やしていきます。

## 必要なもの

- Node.js 22
- Playwright の Chromium（初回のみ `npx playwright install --with-deps chromium`）

WSL で開発する場合は、リポジトリを WSL 側のホーム配下に置いてください（`/mnt/c` 配下だとファイル監視が遅くなります）。

## よく使うコマンド

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動する（http://localhost:5173） |
| `npm run storybook` | Storybook を起動する（http://localhost:6006） |
| `npm run lint` | oxlint で静的解析する |
| `npm run build` | 型チェックして本番ビルドする |
| `npm run test:unit` | Vitest で単体テストを実行する |
| `npm run test:stories` | Storybook のストーリーをテストとして実行する |
| `npm run test:bdd` | `features/` の Gherkin シナリオを Playwright で実行する |
| `npm test` | 上の3つのテストをすべて実行する |

## BDD の進め方

1. **Discovery**：フィーチャーごとにルール・具体例・疑問を書き出す
2. **Formulation**：`features/*.feature` に日本語の Gherkin（`# language: ja`）でシナリオを書く
3. **Automation**：`features/steps/` にステップ定義を書き、`npm run test:bdd` が赤になるのを確かめてから実装して緑にする

部品は Storybook（`src/**/*.stories.tsx`）で作り、ロジックは Vitest（`src/**/*.test.ts(x)`）で確かめます。

## ディレクトリ

```
features/          Gherkin のシナリオ（.feature）
features/steps/    playwright-bdd のステップ定義
src/               React アプリ本体・ストーリー・単体テスト
.storybook/        Storybook の設定
.github/workflows/ CI と GitHub Pages への公開
```

## 公開

`main` に入ると GitHub Actions で GitHub Pages に公開されます。初回はリポジトリの Settings → Pages で Source を「GitHub Actions」にしてください。
