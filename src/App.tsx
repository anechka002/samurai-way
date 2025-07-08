import './App.css';
import Header from './components/header/Header';
import { Routing } from './routing/Routing';
import { NavBar } from './components/navBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './redux/redux-store';


function App() {
  const state = useSelector<RootState, RootState>(state => state)
  const dispatch = useDispatch()

  // const handleIncrementLikesCount = (postId: string) => {
  //   setPosts(
  //     posts.map((p) =>
  //       p.id === postId ? { ...p, likesCount: p.likesCount + 1 } : p
  //     )
  //   );
  // };

  return (
    <div className="app-wrapper">
      <Header />
      <NavBar />
      <div className="app-wrapper-content">
        <Routing
          state={state}
          dispatch={dispatch}
          // handleIncrementLikesCount={handleIncrementLikesCount}
        />
      </div>
    </div>
  );
}

export default App;