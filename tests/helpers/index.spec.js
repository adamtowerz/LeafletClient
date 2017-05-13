import { arrayCompare } from 'helpers'

describe('{Helper) arrayComapre}', function () {
  let a = [1, 2, 3]
  let b = [1, 3, 4, 5]
  let c = [1, 2, 3]

  it('Should return true with shallow identical arrays.', function () {
    expect(arrayCompare(a, c)).to.be.true
  })
  it('Should return false with shallow different arrays.', function () {
    expect(arrayCompare(a, b)).to.be.false
  })
})
