import { useCookie } from '.'

describe('[useCookie]', () => {
  beforeAll(() => {
    document.cookie = 'anyCookie=anyValue'
  })

  it('should return string value', () => {
    const { anyCookie } = useCookie()

    expect(anyCookie).toEqual('anyValue')
  })
})
