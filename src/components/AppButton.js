import React from 'react';
import { Button } from 'react-native-elements';

const AppButton = ({ title, onPress, loading, disabled }) => {
  return (
    <Button
      title={title}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      buttonStyle={{
        backgroundColor: '#5E72E4',
        borderRadius: 4,
        paddingVertical: 12,
      }}
    />
  );
};

export default AppButton;
