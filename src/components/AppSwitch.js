// AppSwitch.js
import React from 'react';
import { Switch } from 'react-native';

const AppSwitch = ({ value, onValueChange }) => {
  return <Switch value={value} onValueChange={onValueChange} />;
};

export default AppSwitch;