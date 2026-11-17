import React from 'react'

const NavBar = ({
  setPage = () => {}
}) => {
  return (
    <nav>
      <button onClick={() => { setPage('people') }}>People</button>
      <button onClick={() => { setPage('planets')}}>Planets</button>
    </nav>
  )
}

export default NavBar