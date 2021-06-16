import { reducer, SET_APPLICATION_DATA, SET_DAY, SET_INTERVIEW } from "./reducer";


describe('Reducer', () => {

  it('throws an error with an unsupported type', () => {
    expect(() => reducer({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    )
  })
})