import AddFriend from "./UI/Home/AddFriend";
import AddTweet from "./UI/Home/AddTweet";
import Feed from "./UI/Home/Feed";
import StudentPanel from "./UI/Home/StudentPanel";
import Landing from "./UI/Landing/Landing";
import Login from "./UI/Registeration/Login";
import Registeration from "./UI/Registeration/Registeration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explore from "./UI/Explore/Explore";
import Profile from "./UI/Profile/Profile";
import UserProfile from "./UI/constant/UserProfile";
import Menu from "./UI/Syllabus/Menu";
import Detail from './UI/Syllabus/Detail';
import Error from "./UI/constant/Error";

import firebase from "firebase";
import { firebaseConfig } from "./firebase/Config";
import {Provider} from 'react-redux';
import store from './redux/store';
import Deatail from "./UI/Explore/Detail";
import MenuCards from "./UI/Syllabus/MenuCards";
import ShowFollowing from "./UI/constant/ShowFollowing";
import TweetDetail from "./UI/constant/TweetDetail";
import ForgetPass from "./UI/Registeration/ForgetPass";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
  console.log("Connected .......!")
}

function App() {
  return (
    <Provider store={store}>
    <div className="App">
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Registeration/>}/>
        <Route path="/forgetpassword" element={<ForgetPass/>}/>
        <Route path="/home" element={<Feed/>} />
        <Route path="/home/:id" element={<TweetDetail/>} />
        <Route path="/home/addfrd" element={<AddFriend/>} />
        <Route path="/home/addtweet" element={<AddTweet/>} />
        <Route path="/home/student" element={<StudentPanel/>} />
        <Route path="/explore"  element={<Explore/>} />
        <Route path="/explore/detail/:id/:type"  element={<Deatail/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile/:id" element={<UserProfile/>} />
        <Route path="/profile/:id/userFollowing" element={<ShowFollowing/>} />
        <Route path="/syllabus" element={<Menu/>}/>
        <Route path="/syllabus/:branch" element={<MenuCards/>}/>
        <Route path="/syllabus/:branch/:sem" element={<Detail/>} />
        <Route path="*" element={<Error/>} />
    </Routes>
    </BrowserRouter>

    </div>
    </Provider>
  );
}

export default App;

