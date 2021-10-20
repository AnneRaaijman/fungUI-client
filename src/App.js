import React, { useEffect, useState } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AreaMap from "./pages/AreaMap";
import ObservationMap from "./pages/ObservationMap";
import Details from "./pages/MushroomDetails";
// import Auction from "./pages/Auction";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/mushroom/:id" component={Details} />
        <Route path="/map" component={ObservationMap} />
        <Route path="/signup" component={SignUp} />
        <Route path="/areamap" component={AreaMap} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
