import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('アプリのタイトルを表示する', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'インターネットの仕組み' })).toBeInTheDocument()
  })
})
