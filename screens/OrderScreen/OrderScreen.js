import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';

//Redux
import { useSelector, useDispatch } from 'react-redux';
//Action
import * as OrderActions from '../../store/order/orderActions';
//Colors
import Colors from '../../utils/Colors';
// OrderItem
import OrderItem from './components/OrderItem';
//Icon
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomText from '../../components/UI/CustomText';
import SkeletonLoadingCart from '../../components/Loaders/SkeletonLoadingCart';

const { height } = Dimensions.get('window');

const OrderScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();
  const loadOrders = useCallback(async () => {
    setLoading(true);
    setIsRefreshing(true);
    try {
      await dispatch(OrderActions.fetchOrder());
    } catch (err) {
      alert(err.message);
    }
    setIsRefreshing(false);
    setLoading(false);
  }, [dispatch, setIsRefreshing]);
  useEffect(() => {
    loadOrders();
  }, [user.userid]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{ position: 'absolute', bottom: 15, left: 15, zIndex: 10 }}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          >
            <MaterialCommunityIcons
              name='menu'
              size={25}
              color={Colors.light_green}
            />
          </TouchableOpacity>
        </View>
        <CustomText style={styles.titleHeader}>Tra cứu đơn hàng</CustomText>
        <View />
      </View>
      {loading ? (
        <View style={styles.centerLoader}>
          <SkeletonLoadingCart />
        </View>
      ) : (
        <View style={styles.footer}>
          {Object.keys(user).length === 0 ? (
            <View style={styles.center}>
              <CustomText style={{ fontSize: 16 }}>
                Bạn cần đăng nhập để xem đơn hàng!
              </CustomText>
              <View
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: Colors.lighter_green,
                  borderRadius: 5,
                  borderColor: Colors.lighter_green,
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('SignUp')}
                >
                  <CustomText style={{ fontSize: 16, color: '#fff' }}>
                    Tiếp tục
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          ) : orders.length === 0 ? (
            <View style={styles.center}>
              <CustomText style={{ fontSize: 16 }}>
                Bạn không có đơn hàng nào!
              </CustomText>
            </View>
          ) : (
            <FlatList
              data={orders}
              onRefresh={loadOrders}
              refreshing={isRefreshing}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return <OrderItem order={item} />;
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerLoader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: {
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    height: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
    fontWeight: '500',
  },
  titleHeader: {
    textAlign: 'center',
    color: Colors.light_green,
    fontSize: 20,
  },
  footer: {
    flex: 1,
    marginTop: 5,
  },
  content: {
    marginVertical: 10,
  },
});

export default OrderScreen;
