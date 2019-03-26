import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Menu, Icon } from 'semantic-ui-react'
import { debounce } from 'lodash'

class Navbar extends Component {
  state = { width: window.innerWidth, expanded: false }

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, expanded: !this.state.expanded })

  componentDidMount = () =>
    window.addEventListener(
      'resize',
      debounce(this.handleWindowSizeChange, 100)
    )
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth })
  }

  toggleButton = () => (
    <Icon
      onClick={() => this.setState({ expanded: !this.state.expanded })}
      size='big'
      as='i'
      color={this.state.expanded ? 'grey' : 'blue'}
      inverted
      name={this.state.expanded ? 'close' : 'bars'}
    />
  )

  render() {
    const isMobile = this.state.width <= 780
    const { activeItem, expanded } = this.state
    const displayMenuBtn = isMobile && !expanded
    const displayMenuCloseBtn = isMobile && expanded

    return (
      <Menu style={{ borderRadius: 0 }} borderless inverted stackable>
        <Container>
          <Menu.Item>
            <img
              alt='logo'
              style={{ paddingRight: '3px' }}
              src='https://react.semantic-ui.com/logo.png'
            />
            {displayMenuBtn && this.toggleButton()}
            {displayMenuCloseBtn && this.toggleButton()}
          </Menu.Item>

          {(isMobile && expanded) || !isMobile ? (
            <Fragment>
              <Menu.Item
                name='about'
                active={activeItem === 'about'}
                onClick={this.handleItemClick}
                as={Link}
                to='/'
              >
                About
              </Menu.Item>
              <Menu.Item
                name='char-lib'
                active={activeItem === 'char-lib'}
                onClick={this.handleItemClick}
                as={Link}
                to='/characters'
              >
                Character Library
              </Menu.Item>
              <Menu.Item
                name='char-new'
                active={activeItem === 'char-new'}
                onClick={this.handleItemClick}
                as={Link}
                to='/characters/new'
              >
                Create Character
              </Menu.Item>
              <Menu.Item
                name='account'
                active={activeItem === 'account'}
                onClick={this.handleItemClick}
                as={Link}
                to='/characters/new'
              >
                My Account
              </Menu.Item>

              <Menu.Item position='right'>
                <Button inverted>Log in</Button>
                <Button inverted primary style={{ marginLeft: '0.5em' }}>
                  Sign Up
                </Button>
              </Menu.Item>
            </Fragment>
          ) : null}
        </Container>
      </Menu>
    )
  }
}

export default Navbar
