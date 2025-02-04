// src/components/Icon.js
import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { Icon } from 'galio-framework';

import argonConfig from '../assets/config/argon.json';

// On crée un set d'icônes basé sur la config IcoMoon
const IconArgonExtra = createIconSetFromIcoMoon(argonConfig, 'ArgonExtra');

// On suppose que la police "ArgonExtra" est déjà correctement installée
// (voir plus bas: "Comment lier la police .ttf ?")

class IconExtra extends React.Component {
  render() {
    const { name, family, ...rest } = this.props;

    // Si le composant reçoit { name: "something", family: "ArgonExtra" }
    // on renvoie l'icône custom, sinon on utilise l'icône Galio
    if (name && family) {
      if (family === 'ArgonExtra') {
        return <IconArgonExtra name={name} {...rest} />;
      }
      return <Icon name={name} family={family} {...rest} />;
    }

    return null;
  }
}

export default IconExtra;
