import React from 'react'
import UsersPage from './pages/UsersPage'

const App = () => {
    return (
        <>
            <h1>Welcome to the User Listing App</h1>
            <p>This app allows you to view and manage a list of users.</p>
            <p>Navigate to the Users page to see the list of users and add new ones.</p>
            <UsersPage />
        </>
    )
}

export default App