import './App.css';
import { Routing } from './routing/Routing';
import { Header, NavBar } from './components';

function App() {

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
        <Routing/>
      </div>
    </div>
  );
}

export default App;