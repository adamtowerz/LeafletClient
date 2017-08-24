import React from 'react'
import { bindActionCreators } from 'redux'
import { shallow } from 'enzyme'
import NewLeaflet from '../../../../../src/routes/Notebook/components/NotebookNav/NavSection/NewLeaflet'

describe('(Component) NewLeaflet', () => {
  let _props, _spies, _component

  beforeEach(() => {
    _spies = {}
    _props = {
      ...bindActionCreators({
        newLeaflet : (_spies.newLeaflet = sinon.spy()),
        cancel : (_spies.cancel = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _component = shallow(<NewLeaflet {..._props} />)
  })

  describe('A Check Button...', () => {
    it('Calls newPage when check button clicked and input valid', () => {
      _spies.newLeaflet.should.have.not.been.called
      _component.setState({
        leafletTitle: 'Adam'
      })
      _component.find('IconButton').last().simulate('click')
      _spies.newLeaflet.should.have.been.called
      expect(_component.state.errorText).to.equal(undefined)
    })

    it('Displays \'Cannot be empty!\' error when check button clicked but input empty', () => {
      _spies.newLeaflet.should.have.not.been.called
      _component.setState({
        leafletTitle: ''
      })
      _component.find('IconButton').last().simulate('click')
      _spies.newLeaflet.should.have.not.been.called
      expect(_component.state().errorText).to.equal('Cannot be empty!')
    })

    it('Displays \'Cannot exceed 32 characters!\' when check button clicked but input too long', () => {
      _spies.newLeaflet.should.have.not.been.called
      _component.setState({
        leafletTitle: 'abcdefghijklmnopqrstuvwxyz1234567890'
      })
      _component.find('IconButton').last().simulate('click')
      _spies.newLeaflet.should.have.not.been.called
      expect(_component.state().errorText).to.equal('Cannot exceed 32 characters!')
    })
  })

  describe('A Cancel Button...', () => {
    it('Should call cancel() when cancel button clicked', () => {
      _spies.cancel.should.have.not.been.called
      _component.find('IconButton').first().simulate('click')
      _spies.cancel.should.have.been.called
    })
  })
})
