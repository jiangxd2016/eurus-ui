describe('Hi', () => {
  it('should works', () => {
    expect(1 + 1).toEqual(2)
    expect(1 + 2).toMatchInlineSnapshot('3')
  })
})
