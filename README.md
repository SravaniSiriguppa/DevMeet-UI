# DevMeet

- Create a vite + React application
- Remove unecessary code and create a hello world app
- Install tailwindcss
- Install Daisy UI
- Add Navbar component to App.jsx
- Create a seperate Navbar component
- Install react router dom
- Create Browser Router => Routes => Route(path, element) => Route children
- Create an Outlet in your Body Component
- Create a footer
- Create a Login page
- Install axios
- CORS - install cors in backend => add middleware with configurations: origin and credentials. Use withCredentials when called in UI from axios
- Install react-redux + @reduxjs/toolkit - htps://redux-toolkit.js.org/tutorials/quick-start
- configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- NavBar should update as soon as use logs in
- If token is not present, can't go to any page, redirect to login page
- Cannot access other pages without login
- Conditional navbar based on login status
- Logout feature
- Get the feed and save it in redux store
- Built the user card on feed
- Edit profile page
- Alert on success or failure on saving edit profile
- Displaying all connections
- Display all connection Requests
- feature to accept/reject connections
- Send/ignore the profiles on the feed

Body
    NavBar
    Route=/ => Feed
    Route=/login => Login
    Route=/connections => Connections
    Route=/profile => Profile