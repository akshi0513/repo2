import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import OrderList from '../components/OrderList';

const OrdersPage = () => {
  const { orders } = useContext(OrderContext);

  return (
    <div>
      <h1>Orders</h1>
      <OrderList orders={orders} />
    </div>
  );
};

export default OrdersPage;
