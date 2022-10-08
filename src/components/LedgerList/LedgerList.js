import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';
import {View, Text, Input, Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {useForm, Controller} from 'react-hook-form';

import PageContainer from '../PageContainer';
import Header from '../Header';
import Modal from '../Modal';
import InputField from '../InputField/InputField';

import {numberFormatter} from '../../core/helper/HelperFunctions';
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '../../assets/vectorIcons';
import appStyles from '../../styles/style';
import appColors from '../../styles/color';

const LedgerList = ({
  // states
  ledgerList,
  // actions
  addLedger,
  editLedger,
  deleteLedger,
  setSelectedLedger,
}) => {
  const navigation = useNavigation();
  // const [titleToAddLedger, setTitleToAddLedger] = useState('');
  const [localSelectedLedger, setLocalSelectedLedger] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      title: '',
    },
  });

  const navigationHandler = ledger => {
    setSelectedLedger(ledger);
    navigation.navigate('Home');
  };

  const addLedgerHandler = title => {
    const identity = Date.now().toString();
    const data = {
      id: identity,
      ...title,
      isDeleted: 0, //! I think this will come from backend
      createdAt: identity, //! I think this will come from backend
      cashIn: 0, //! I think this will come from backend
      cashOut: 0, //! I think this will come from backend
    };

    addLedger(data);
    reset();
  };

  const ledgerEditHandler = ledger => {
    setLocalSelectedLedger(ledger);
    setShowEditModal(true);
  };

  const ledgerDeleteHandler = ledger => {
    setLocalSelectedLedger(ledger);
    setShowDeleteModal(true);
  };

  const updateHandler = () => {
    setShowEditModal(false);
    editLedger({id: localSelectedLedger.id, title: localSelectedLedger.title});
    setLocalSelectedLedger({});
  };

  const deleteHandler = () => {
    setShowDeleteModal(false);
    setLocalSelectedLedger({});
    deleteLedger({id: localSelectedLedger.id});
  };

  const cancelHandler = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setLocalSelectedLedger({});
  };

  const renderLedgerCard = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigationHandler(item)}
        style={styles.cardContainer}>
        <View style={styles.sidebar} />
        <View style={styles.cardContentContainer}>
          <View style={styles.cardTitleRow}>
            <Text
              fontSize={'lg'}
              bold
              noOfLines={1}
              width={230}
              mb={-1}
              color={appColors.primary}>
              {item.title}
            </Text>
            <View style={styles.createdAt}>
              <Text fontSize={'sm'} bold color={appColors.text}>
                {format(new Date(parseInt(item.createdAt, 10)), 'MMM, dd yyyy')}
              </Text>
            </View>
          </View>
          <View mb={'1'}>
            <Text fontSize={'md'} color={appColors.text}>
              Total Amount: {numberFormatter(item?.cashIn)}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.icon(appColors.greenBackground, appColors.green)}
              onPress={() => ledgerEditHandler(item)}>
              <Icon
                as={Feather}
                name={'edit-3'}
                size={'5'}
                color={appColors.green}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.icon(appColors.redBackground, appColors.red)}
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
            {/* //! should use hook forms */}
            <Input
              value={localSelectedLedger.title}
              onChangeText={text =>
                setLocalSelectedLedger({...localSelectedLedger, title: text})
              }
              size="md"
              variant="unstyled"
              width={'2xs'}
              pl={4}
              color={appColors.black}
            />
          </View>
        }
        buttons={
          <View style={{...appStyles.flexRow}}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={updateHandler}
              style={styles.button(appColors.green)}>
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
              style={styles.button(appColors.red, true)}>
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
                {localSelectedLedger.title}
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
              style={styles.button(appColors.red)}>
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
              style={styles.button(appColors.green, true)}>
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
        <View style={styles.mainContainer}>
          <View style={styles.headerInputContainer}>
            <Header showLeftIcon={false} title={'Transaction Ledgers'} />
            <Controller
              control={control}
              name={'title'}
              render={({field: {onChange, value}}) => (
                <InputField
                  value={value}
                  setValue={onChange}
                  placeholder={'Add Ledger Name'}
                  customStyles={styles.inputCustomStyles}
                  rightElement={
                    <TouchableOpacity
                      activeOpacity={0.9}
                      disabled={!value}
                      onPress={handleSubmit(addLedgerHandler)}
                      style={styles.addButton}>
                      <Icon
                        as={Ionicons}
                        name={'md-add'}
                        size={'6'}
                        color={appColors.primary}
                      />
                    </TouchableOpacity>
                  }
                />
              )}
            />
          </View>
          <View style={appStyles.flexCount(1)}>
            {true ? (
              <VirtualizedList
                data={ledgerList}
                renderItem={renderLedgerCard}
                contentContainerStyle={styles.listStyle}
                keyExtractor={(item, index) => `${item.text}-${index}`}
                getItemCount={() => ledgerList.length}
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
  headerInputContainer: {
    backgroundColor: appColors.primary,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  inputCustomStyles: {
    margin: 10,
  },
  inputContainer: {
    ...appStyles.containerBorderRadius(),
    borderWidth: 0.75,
    borderColor: appColors.primary,
    backgroundColor: appColors.white,
    height: 46,
    margin: 10,
  },
  addButton: {
    ...appStyles.containerBorderRadius(),
    backgroundColor: appColors.secondary,
    height: 44,
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listStyle: {
    paddingVertical: 5,
  },
  cardContainer: {
    ...appStyles.flexRow,
    justifyContent: 'flex-start',
    backgroundColor: appColors.white,
    marginVertical: 5,
    marginHorizontal: 10,
    ...appStyles.containerBorderRadius(),
    ...appStyles.boxShadow,
    overflow: 'hidden',
  },
  sidebar: {
    backgroundColor: appColors.primary,
    width: 10,
    height: '100%',
  },
  cardContentContainer: {
    ...appStyles.flexCount(1),
    paddingBottom: 10,
    paddingLeft: 10,
  },
  cardTitleRow: {
    ...appStyles.flexRow,
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  createdAt: {
    backgroundColor: appColors.secondary,
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
  },
  iconContainer: {
    ...appStyles.flexRow,
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  icon: (backgroundColor, color) => ({
    padding: 12,
    marginHorizontal: 5,
    backgroundColor: backgroundColor,
    borderWidth: 1,
    borderColor: color,
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
