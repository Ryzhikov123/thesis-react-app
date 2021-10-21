import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { UsersContextProvider } from './context/userContext';
import { UsersPage } from './components/pages/Users';
import { AlbumsPage } from './components/pages/Albums';
import { PhotosPage } from './components/pages/Albums/Photos';
import { PostsPage } from './components/pages/Posts';
import { TodosPage } from './components/pages/Todos';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="users" />
      <Route exact path="/users" component={UsersPage} />
      <Route exact path="/todos" component={TodosPage} />
      <Route exact path="/albums" component={AlbumsPage} />
      <Route exact path="/posts" component={PostsPage} />
      <Route exact path="/albums/:id" component={PhotosPage} />
      <Route component={() => <>404: Page not found</>} />
    </Switch>
  );
};

function App() {
  return (
    <div className="App">
      <UsersContextProvider>
        <Router>
          <Routes />
        </Router>
      </UsersContextProvider>
    </div>
  );
}

export default App;
