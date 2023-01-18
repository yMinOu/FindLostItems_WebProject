import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import VideoUploadPage from './views/VideoUploadPage/VideoUploadPage';
import SharingUploadPage from './views/VideoUploadPage/SharingUploadPage';
import Writeview from './views/Writeview/Writeview';
import WriteUpdate from './views/VideoUploadPage/WriteUpdate';
import ClassApp from './Class/ClassApp';
import ReformUpload from './views/Reform/ReformUpload';
import NoticePage from './views/NoticePage/NoticePage'
import NoticeView from './views/NoticePage/NoticeView';
import NoticeWrite from './views/NoticePage/NoticeWrite';
import CreditCard from './views/Item/CreditCard';
import StudentIDcard from './views/Item/StudentIDcard';
import Cosmetics from './views/Item/Cosmetics';
import DriversLicense from './views/Item/DriversLicense';
import Earphones from './views/Item/Earphones';
import SSN from './views/Item/SSN';
import Tumbler from './views/Item/Tumbler';
import Wallet from './views/Item/Wallet';
import Etc from './views/Item/Etc';


//null   Anyone Can go inside
//true   only logged in user can go inside //로그인한 사람만.
//false  logged in user can't go inside 

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/write/upload" component={Auth(VideoUploadPage, true)} />
          <Route exact path="/creditCard" component={Auth(CreditCard, null)} />
          <Route exact path="/studentIDcard" component={Auth(StudentIDcard, null)} />
          <Route exact path="/cosmetics" component={Auth(Cosmetics, null)} />
          <Route exact path="/driversLicense" component={Auth(DriversLicense, null)} />
          <Route exact path="/earphones" component={Auth(Earphones, null)} />
          <Route exact path="/ssn" component={Auth(SSN, null)} />
          <Route exact path="/tumbler" component={Auth(Tumbler, null)} />
          <Route exact path="/wallet" component={Auth(Wallet, null)} />
          <Route exact path="/etc" component={Auth(Etc, null)} />



          <Route exact path="/write/sharupload" component={Auth(SharingUploadPage, true)} />
          <Route exact path="/wirteview/:videoId" component={Auth(Writeview, null)} />
          <Route exact path="/write/update/:videoId" component={Auth(WriteUpdate, null)} />
          <Route exact path="/Class" component={Auth(ClassApp, null)} />
          <Route exact path="/reform/upload" component={Auth(ReformUpload, null)} />
          <Route exact path="/NoticePage" component={Auth(NoticePage, null)} />
          <Route exact path="/NoticeView/:noticeId" component={Auth(NoticeView, null)} />
          <Route exact path="/NoticeWrite" component={Auth(NoticeWrite, true)} />

        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
