# Search Typeahead — Frontend

A React frontend for the Search Typeahead project — featuring debounced search input, keyboard navigation, frequency-ranked suggestions, and JWT authentication.

---

## Tech Stack

- React 18
- Framer Motion — page and modal animations
- React Router DOM — client-side routing
- Context API — global auth state

---

## Project Structure

```
src/
  components/
    NeuralBackground.jsx   # animated canvas background for search page
    SearchBar.jsx          # input + search button + empty/no-results states
    Suggestions.jsx        # dropdown list with prefix highlighting
    InfoDrawer.jsx         # collapsible side drawer with project info
    TypewriterBackground.jsx # animated typewriter demo on hero page
  context/
    AuthContext.jsx        # JWT token storage, login, logout
  pages/
    Login.jsx              # hero page + login/signup modal
    Search.jsx             # protected search page
  App.js                   # routes + protected route guard
  App.css                  # global styles
```

---

## Features

**Search**
- Debounced input — API called 300ms after user stops typing
- Minimum 2 characters required to trigger suggestions
- Top 5 suggestions ranked by global frequency
- Prefix highlighted in suggestion results
- Keyboard navigation — Arrow Up, Arrow Down, Enter, Escape
- Clicking or selecting a suggestion fires a POST to update frequency
- New words typed and submitted with Enter are saved to the backend

**Auth**
- JWT token stored in localStorage via AuthContext
- Protected route — unauthenticated users redirected to /
- Login and signup handled via modal on the hero page
- Logout clears token and redirects to /

**UX**
- Empty state shown when search bar is empty
- No results state shown when prefix returns nothing
- Collapsible info drawer explaining architecture and design decisions
- Animated mesh gradient background consistent across pages

---

## Pages

### `/` — Hero page
- Explains what the project does
- Get Started and Login buttons open a modal
- Modal handles both login and signup with smooth Framer Motion animation
- Switching between login and signup does not require page navigation

### `/search` — Search page (protected)
- Full search typeahead experience
- Logout button top right
- "How it works" drawer bottom right

---

## Running locally

```bash
# install dependencies
npm install

# start development server
npm start
```

App runs at `http://localhost:3000`

Make sure the backend is running at `http://localhost:9090` before starting the frontend.

---

## Environment

The backend URL is currently hardcoded as `http://localhost:9090`.

For production, replace all occurrences with your deployed backend URL or use an `.env` file:

```
REACT_APP_API_URL=https://your-backend-url.com
```

Then in your components:

```js
fetch(`${process.env.REACT_APP_API_URL}/search/suggest?prefix=${query}`)
```

---

## API Endpoints Used

| Method | Endpoint | Auth required | Description |
|--------|----------|---------------|-------------|
| POST | /user/signup | No | Register new user |
| POST | /user/login | No | Login, returns JWT |
| GET | /search/suggest?prefix= | Yes | Get top 5 suggestions |
| POST | /search/query?word= | Yes | Save search + update frequency |

---

## Known Limitations

- Single words only — phrase search not supported
- Lowercase only — input is sanitized to lowercase before sending
- No fuzzy matching — typos return no results
- Suggestions are global — not personalized per user yet

---

## Related

- [Backend Repository](https://github.com/yourname/search-typeahead-backend)





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
