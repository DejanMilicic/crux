import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import App from "./App";
import Trap from "./Trap";
import { Signup, Home, Dash, CanvasDelete, CanvasDeleted, CanvasDisplay, CanvasFinish, CanvasInput, FilterTable, FilterWall, MediaWall } from "./pages";

ReactDOM.render(
  <Trap>
    <Router>
      <App path="/">
        <Home path="/" />
        <Dash path="/dash" />
        <CanvasDelete path="/delete/:logicKey/:logicId" />
        <CanvasDeleted path="/deleted/:logicKey" />
        <CanvasDisplay path="/display/:logicKey/:logicId" />
        <CanvasFinish path="/finish/:logicKey/:logicId" />
        <CanvasInput path="/add/:logicKey" />
        <CanvasInput path="/edit/:logicKey/:logicId" />
        <FilterTable path="/table/:logicKey" />
        <FilterWall path="/wall/:logicKey" />
        <MediaWall path="/media" />
      </App>
      <Signup path="/signup" />
      <Signup path="/signup/:entryKey" />
    </Router>
  </Trap>,
  document.getElementById("root")
);
