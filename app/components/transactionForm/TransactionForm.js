import React, { PropTypes } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FormInput } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import moment from 'moment';
import { Calculator, RoundButton } from '../index';

const TransactionForm = (props) => {
  const {
    value,
    category,
    date,
    note,
    isDatePickerVisible,
    isCalculatorVisible,
    onChangeValue,
    onChangeCategory,
    onUpdateNote,
    onSetDate,
    onToggleDatePicker,
    onToggleCalculator,
    onSubmit,
    style,
  } = props;

  return (
    <View style={style.rootStyle}>
      <TouchableOpacity
        onPress={onToggleCalculator}
      >
        <View>
          <FormInput
            value={value.toString()}
            editable={false}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onChangeCategory}
      >
        <View>
          <FormInput
            value={category && category.name}
            placeholder="Category"
            editable={false}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onToggleDatePicker}
      >
        <View>
          <FormInput
            value={moment(date).format('dddd, L')}
            editable={false}
          />
        </View>
      </TouchableOpacity>
      <FormInput
        value={note}
        placeholder="Note"
        multiline
        onChangeText={onUpdateNote}
      />
      <RoundButton
        style={style.submitButtonStyle}
        iconName="check"
        onPress={onSubmit}
      />
      <DateTimePicker
        isVisible={isDatePickerVisible}
        onConfirm={onSetDate}
        onCancel={onToggleDatePicker}
      />
      <Modal
        style={style.calculatorModalStyle}
        isVisible={isCalculatorVisible}
      >
        <Calculator
          value={value}
          onSubmit={onChangeValue}
        />
      </Modal>
    </View>
  );
};

TransactionForm.propTypes = {
  style: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  category: PropTypes.object,
  date: PropTypes.object,
  note: PropTypes.string,
  isDatePickerVisible: PropTypes.bool,
  isCalculatorVisible: PropTypes.bool,
  onChangeValue: PropTypes.func,
  onChangeCategory: PropTypes.func,
  onUpdateNote: PropTypes.func,
  onSetDate: PropTypes.func,
  onToggleDatePicker: PropTypes.func,
  onToggleCalculator: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default TransactionForm;
