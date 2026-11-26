# Discovery: docs/discovery/open-url.md
# ステップ定義と実装はまだないため @wip を付けて bddgen の対象から外している。
# Automation に入るときに @wip を外し、失敗する E2E として置く。
@wip
Feature: URLを開いてから画面が出るまでをステップごとに追う
  1〜5年目のIT社員として
  URLを開いてから画面が出るまでを1ステップずつ進めたり戻したりしたい
  それぞれの瞬間に何が起きているかを図で確かめるため

  Background:
    Given 「https://example.com を開く」シナリオを表示している

  Rule: 図は常に表示されている

    Scenario: 開いた直後は最初のステップの図と説明が見える
      Then 「DNS」段階の最初のステップの図と説明が表示されている

  Rule: 次へ・前へ・ステップ選択で時間を動かせる

    Scenario: 最初のステップでは前へを押せない
      Then 「前へ」ボタンが非活性である

    Scenario: 最後のステップでは次へを押せない
      When ステップ選択で「描画」段階の最後のステップを選ぶ
      Then 「次へ」ボタンが非活性である

    Scenario: 次へで段階をまたいで進む
      When ステップ選択で「TCP：コネクション確立」を選ぶ
      And 「次へ」を押す
      Then 「TLS」段階の最初のステップの図と説明が表示されている
