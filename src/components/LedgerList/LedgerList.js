import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';
import {View, Text, Input, Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import PageContainer from '../PageContainer';
import appStyles from '../../style';
import Header from '../Header';
import {Feather, Ionicons, MaterialCommunityIcons} from '../Icons';
import appColors from '../../color';
import {LEDGER_DATA} from '../constants/transactionConstant';
import Modal from '../Modal';

const LedgerList = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [selectedLedger, setSelectedLedger] = useState({});
  const [titleForEdit, setTitleForEdit] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigationHandler = ledger => {
    navigation.navigate('Home', {type: ledger.title});
  };

  const ledgerEditHandler = ledger => {
    setSelectedLedger(ledger);
    setTitleForEdit(ledger.title);
    setShowEditModal(true);
  };

  const updateHandler = () => {
    setShowEditModal(false);
    setSelectedLedger({...selectedLedger, title: titleForEdit});
  };

  const cancelHandler = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedLedger({});
    setTitleForEdit('');
  };

  const ledgerDeleteHandler = ledger => {
    setSelectedLedger(ledger);
    setShowDeleteModal(true);
  };

  const deleteHandler = () => {
    setShowDeleteModal(false);
    setSelectedLedger({});
  };

  const renderLedgerCard = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigationHandler(item)}
        style={styles.cardContainer}>
        <View style={styles.cardContentContainer}>
          <View style={styles.cardTitleRow}>
            <Text
              fontSize={'lg'}
              bold
              noOfLines={2}
              width={250}
              color={appColors.primary}>
              {item.title}
            </Text>
            <Text fontSize={'sm'} color={appColors.text}>
              {item.createdAt}
            </Text>
          </View>
          <View my={'1'}>
            <Text fontSize={'md'} color={appColors.text}>
              Net Balance: {item.netBalance}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.icon(appColors.incomeIconBackground)}
              onPress={() => ledgerEditHandler(item)}>
              <Icon
                as={Feather}
                name={'edit-3'}
                size={'5'}
                color={appColors.green}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.icon(appColors.expenseIconBackground)}
              onPress={() => ledgerDeleteHandler(item)}>
              <Icon
                as={MaterialCommunityIcons}
                name={'delete-outline'}
                size={'5'}
                color={appColors.red}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sidebar} />
      </TouchableOpacity>
    );
  };

  const renderEditModal = () => {
    return (
      <Modal
        title={'Rename Ledger'}
        onOutsideTap={cancelHandler}
        content={
          <View my={4} style={styles.inputContainer}>
            <Input
              value={titleForEdit}
              onChangeText={text => setTitleForEdit(text)}
              size="md"
              variant="unstyled"
              width={'2xs'}
              pl={4}
              color={appColors.primary}
            />
          </View>
        }
        buttons={
          <View style={{...appStyles.flexRow}}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={updateHandler}
              style={styles.button(appColors.incomeStatus)}>
              <Text
                color={appColors.white}
                textTransform={'uppercase'}
                textAlign={'center'}>
                Update
              </Text>
            </TouchableOpacity>
            <View style={styles.buttonSeparator} />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={cancelHandler}
              style={styles.button(appColors.expenseStatus, true)}>
              <Text
                color={appColors.white}
                textTransform={'uppercase'}
                textAlign={'center'}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    );
  };

  const renderDeleteModal = () => {
    return (
      <Modal
        title={'Delete Ledger'}
        onOutsideTap={cancelHandler}
        content={
          <View my={4}>
            <Text fontSize={'md'}>
              Are you sure, you want to delete{' '}
              <Text color={appColors.red} bold>
                {selectedLedger.title}
              </Text>
              ?
            </Text>
          </View>
        }
        buttons={
          <View style={{...appStyles.flexRow}}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={deleteHandler}
              style={styles.button(appColors.expenseStatus)}>
              <Text
                color={appColors.white}
                textTransform={'uppercase'}
                textAlign={'center'}>
                Delete
              </Text>
            </TouchableOpacity>
            <View style={styles.buttonSeparator} />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={cancelHandler}
              style={styles.button(appColors.incomeStatus, true)}>
              <Text
                color={appColors.white}
                textTransform={'uppercase'}
                textAlign={'center'}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    );
  };

  return (
    <PageContainer>
      <SafeAreaView style={appStyles.flexCount(1)}>
        <Header showLeftIcon={false} title={'Transaction Ledgers'} />
        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <Input
              value={title}
              onChangeText={text => setTitle(text)}
              size="lg"
              variant="unstyled"
              ml={2}
              placeholder="Add Ledger Name"
              placeholderTextColor={appColors.primary}
              color={appColors.primary}
              rightElement={
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    console.log(`\nOpen modal for add new ledger\n`)
                  }
                  style={styles.addButton}>
                  <Icon
                    as={Ionicons}
                    name={'md-add'}
                    size={'6'}
                    color={appColors.white}
                  />
                </TouchableOpacity>
              }
            />
          </View>
          <View style={appStyles.flexCount(1)}>
            {true ? (
              <VirtualizedList
                data={LEDGER_DATA}
                renderItem={renderLedgerCard}
                keyExtractor={(item, index) => `${item.text}-${index}`}
                getItemCount={() => LEDGER_DATA.length}
                getItem={(data, index) => ({id: index, ...data[index]})}
              />
            ) : (
              <Text
                color={appColors.primary}
                width="100%"
                textAlign={'center'}
                lineHeight={'3xl'}>
                No Transaction Details
              </Text>
            )}
          </View>
          <Text>{selectedLedger.title}</Text>
          {showEditModal && renderEditModal()}
          {showDeleteModal && renderDeleteModal()}
        </View>
      </SafeAreaView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    ...appStyles.flexCount(1),
  },
  inputContainer: {
    ...appStyles.containerBorderRadius(),
    borderWidth: 1,
    borderColor: appColors.primary,
    backgroundColor: appColors.inputBackground,
    height: 46,
    margin: 10,
  },
  addButton: {
    backgroundColor: appColors.primary,
    height: 44,
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    ...appStyles.flexRow,
    justifyContent: 'flex-start',
    backgroundColor: appColors.white,
    marginVertical: 5,
    marginHorizontal: 10,
    ...appStyles.containerBorderRadius(),
    ...appStyles.boxShadow,
  },
  cardContentContainer: {
    ...appStyles.flexCount(1),
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
  },
  cardTitleRow: {
    ...appStyles.flexRow,
    marginBottom: 5,
  },
  iconContainer: {...appStyles.flexRow, justifyContent: 'flex-end'},
  sidebar: {
    backgroundColor: appColors.primary,
    width: 10,
    height: '100%',
    ...appStyles.containerBorderRadius(),
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  icon: background => ({
    padding: 12,
    marginHorizontal: 3,
    backgroundColor: background,
    ...appStyles.containerBorderRadius(100),
  }),
  button: (background, right = false) => ({
    backgroundColor: background,
    paddingVertical: 12,
    width: '50%',
    ...(right
      ? {
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
        }
      : {
          borderTopLeftRadius: 100,
          borderBottomLeftRadius: 100,
        }),
  }),
  buttonSeparator: {borderColor: appColors.primary, borderWidth: 0.25},
});

export default LedgerList;
