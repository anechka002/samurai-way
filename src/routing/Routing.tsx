import { Routes, Route } from 'react-router';
import { Dialogs } from '../components/dialogs/Dialogs';
import { Profile } from '../components/profile/Profile';
import { PATH } from '../constans/constans';
import { News } from '../components/news/News';

export const Routing = () => {
  return (
    <Routes>
      <Route
        path={PATH.DIALOGS}
        element={<Dialogs/>}
      />
      <Route
        path={PATH.PROFILE}
        element={<Profile/>}
      />
      <Route path={PATH.NEWS} element={<News />} />
    </Routes>
  );
};
