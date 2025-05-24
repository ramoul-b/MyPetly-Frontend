import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputDate = ({ label, value, onChange }) => {
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }

    if (selectedDate) {
      const isoDate = selectedDate.toISOString().split('T')[0];
      onChange(isoDate);
    }
  };

  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>{label}</Text>

      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
          paddingVertical: 12,
          paddingHorizontal: 14,
          borderRadius: 6,
        }}
      >
        <Icon name="calendar" size={18} color="#666" />
        <Text style={{ marginLeft: 10, color: value ? '#333' : '#aaa' }}>
          {value || 'Choisir une date'}
        </Text>
      </TouchableOpacity>

      {show && Platform.OS === 'ios' && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={show}
          onRequestClose={() => setShow(false)}
        >
          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
            <View style={{
              backgroundColor: '#fff',
              padding: 16,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}>
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                display="spinner"
                onChange={onChangeDate}
                locale="fr-FR"
              />
              <Button title="Fermer" onPress={() => setShow(false)} />
            </View>
          </View>
        </Modal>
      )}

      {show && Platform.OS === 'android' && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

export default InputDate;
