import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
//Colors
import Colors from '../../constants/Colors';
//Item
import ItemList from './PreOrderItem';
//Number format
import NumberFormat from '../UI/NumberFormat';
//Moment
import moment from 'moment';
import 'moment/min/locales';
//PropTypes check
import PropTypes from 'prop-types';
import TextGeo from '../UI/TextGeo';

moment.locale('vi');

const OrderItem = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View style={styles.textContainer}>
          <TextGeo style={styles.text}>Mã đơn: </TextGeo>
          <TextGeo style={styles.detail}>{order.id}</TextGeo>
        </View>

        <View style={styles.textContainer}>
          <TextGeo style={styles.text}>Ngày đặt: </TextGeo>
          <TextGeo style={styles.detail}>
            {moment(order.date).format('Do MMMM  YYYY, hh:mm a ')}
          </TextGeo>
        </View>
        <View style={styles.detailButtom}>
          <TouchableOpacity onPress={() => setShowDetails((prev) => !prev)}>
            <TextGeo style={{ fontSize: 15, color: '#fff' }}>
              {showDetails ? 'Ẩn đơn hàng' : 'Chi tiết đơn hàng'}
            </TextGeo>
          </TouchableOpacity>
        </View>
        {showDetails ? (
          <View>
            <View style={styles.textContainer}>
              <TextGeo style={styles.text}>Tên người nhận: </TextGeo>
              <TextGeo style={styles.detail}>{order.name}</TextGeo>
            </View>

            <View style={styles.textContainer}>
              <TextGeo style={styles.text}>Địa chỉ: </TextGeo>
              <TextGeo style={styles.detail}>{order.address}</TextGeo>
            </View>
            <View style={styles.textContainer}>
              <TextGeo style={styles.text}>Số điện thoại: </TextGeo>
              <TextGeo style={styles.detail}>{order.phone}</TextGeo>
            </View>

            <TextGeo style={styles.text}>Sản phẩm đã đặt:</TextGeo>
            <FlatList
              data={order.items}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return <ItemList key={item._id} item={item} />;
              }}
            />
            <View
              style={{
                ...styles.textContainer,
                marginTop: 10,
                justifyContent: 'space-between',
              }}
            >
              <TextGeo style={styles.text}>Tổng tiền:</TextGeo>
              <NumberFormat
                price={order.totalAmount.toString()}
                style={{ fontSize: 15 }}
              />
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  detailButtom: {
    backgroundColor: Colors.blue,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
  },
  detail: {
    color: Colors.blue,
    fontSize: 16,
  },
});

export default OrderItem;
