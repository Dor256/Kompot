import { AppRegistry} from 'react-native';
import {Container} from './Container';
import React from 'react';
import './fakeMochaGlobals';

async function fetchAndEvaluateBundle() {
  try {
    const response = await fetch('http://localhost:1234/main.bundle.js', { method: 'GET', headers: { "Content-Type": "text/plain"} });
    const content = await response.text();
    eval(content);
  } catch (e) {
    console.error('Cannot fetch bundle: ',e.message);
  }
}
AppRegistry.registerComponent('Kompot', () => Container);

let onComponentToTestReadyListener;
global.onComponentToTestReady = function(listener) {
  onComponentToTestReadyListener = listener;
}
global.setComponentToTest = function(ComponentToTest){
  onComponentToTestReadyListener(ComponentToTest);
}

global.Kompot = global.setComponentToTest;
global.React = React; //todo: try to remove
fetchAndEvaluateBundle();