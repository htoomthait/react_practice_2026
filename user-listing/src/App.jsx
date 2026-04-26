import React from 'react'
import UsersPage from './pages/UsersPage'
import LoginPage from './pages/LoginPage'

const App = () => {
    return (
        <>
            <h1 className="text-4xl font-bold underline text-blue-600">Welcome to the User Listing App</h1>
            <p className="text">This app allows you to view and manage a list of users.</p>
            <p className="text">Navigate to the Users page to see the list of users and add new ones.</p>
            {/* <LoginPage /> */}
            <UsersPage />
        </>
    )
}

export default App