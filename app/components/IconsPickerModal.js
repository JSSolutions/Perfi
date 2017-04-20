import React, { PropTypes } from 'react';
import { View, ListView, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import Modal from 'react-native-modal';
import icons from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/IconsPickerStyles';

const chunkedIconsList = _.chunk(Object.keys(icons), 4);

const IconsPickerModal = ({ isVisible, onIconPick }) => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  });

  const dataSource = ds.cloneWithRows(chunkedIconsList);

  const renderRow = (row) => (<View style={styles.rowStyle}>
    { row.map((name, key) =>
      <TouchableOpacity
        key={key}
        style={styles.iconContainerStyle}
        onPress={() => onIconPick(name)}
      >
        <MaterialIcons name={name} size={32}/>
      </TouchableOpacity>) }
  </View>);

  return (
    <Modal isVisible={isVisible} hideOnBack style={styles.modalStyle}>
      <ListView
        style={styles.listStyle}
        dataSource={dataSource}
        renderRow={renderRow}
      />
    </Modal>
  );
};

IconsPickerModal.propTypes = {
  isVisible: PropTypes.bool,
  onIconPick: PropTypes.func,
};

export default IconsPickerModal;
