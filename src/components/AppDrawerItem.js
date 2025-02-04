// AppDrawerItem.js
import React from 'react';
import { ListItem } from 'react-native-elements';

const AppDrawerItem = ({ title, icon, onPress }) => {
  return (
    <ListItem onPress={onPress}>
      {icon && <ListItem.Icon name={icon} />}
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

export default AppDrawerItem;