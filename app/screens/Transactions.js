import React, { PropTypes } from 'react';
import { View } from 'react-native';
import R from 'ramda';
import moment from 'moment';
import screens from '../constants/screens';
import { RoundButton, SlidesWithTabs } from '../components';
import {
  TransactionsHeaderContainer,
  TransactionsListContainer,
} from '../containers';
import styles from '../styles/DashboardStyles';

const getNavParameter = (name, def) => R.pathOr(def, ['state', 'params', name]);

const getAccount = getNavParameter('account');

const getInterval = getNavParameter('interval', 'day');

const getTime = (index, interval = 'day') => moment().add(index, `${interval}s`);

const getPeriod = (index, interval = 'day') => ({
  from: getTime(index, interval).startOf(interval).toDate(),
  to: getTime(index, interval).endOf(interval).toDate(),
});

const getPeriodName = interval => index => {
  const time = getTime(index, interval);
  const timeFormats = {
    day: 'll',
    month: 'MMM YYYY',
    year: 'YYYY',
  };
  let name = time.format(timeFormats[interval]);

  if (interval === 'week') {
    const startOfWeek = `${time.format('MMM')} ${time.startOf(interval).date()}`;
    const endOfWeek = time.endOf(interval).format('D, YYYY');
    name = `${startOfWeek}-${endOfWeek}`;
  }

  return name;
};

const TransactionsList = navigation => ({ index, key }) => (
  <TransactionsListContainer
    key={key}
    onSelectTransaction={transaction => navigation.navigate(
      screens.TransactionEditor,
      { transaction },
    )}
    account={getAccount(navigation)}
    period={getPeriod(index, getInterval(navigation))}
  />
);

const Transactions = ({ navigation }) => (
  <View style={styles.rootStyle}>
    <SlidesWithTabs
      slideRenderer={TransactionsList(navigation)}
      setTitle={getPeriodName(getInterval(navigation))}
    />
    <RoundButton
      style={styles.addButtonStyle}
      iconName="add"
      onPress={() => navigation.navigate(screens.TransactionEditor)}
    />
  </View>
);

Transactions.propTypes = {
  navigation: PropTypes.object,
};

Transactions.navigationOptions = ({ navigation }) => ({
  title: 'Transactions',
  header: (
    <TransactionsHeaderContainer
      navigation={navigation}
      currentAccount={getAccount(navigation)}
      onSelectAccount={account => navigation.setParams({ account })}
      intervals={['day', 'week', 'month', 'year']}
      currentInterval={getInterval(navigation)}
      onSelectInterval={interval => navigation.setParams({ interval })}
    />
  ),
});

export default Transactions;
