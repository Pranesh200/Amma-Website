import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

function OrdersTable({ orders }) {
  console.log("ORDER", orders);
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th color="white">Order ID</Th>
          <Th color="white">Menu ID</Th>
          <Th color="white">Order Date</Th>
          <Th color="white">Order Time</Th>
          <Th color="white">Customer Name</Th>
          <Th color="white">Customer Phone</Th>
          <Th color="white">Menu Item</Th>
          <Th color="white">Menu Day</Th>
          <Th color="white">Menu Start Date</Th>
          <Th color="white">Quantity</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders?.map((order) => (
          <Tr key={order.order_id}>
            <Td color="white">{order.order_id}</Td>
            <Td color="white">{order.menu_id}</Td>
            <Td color="white">{order.order_date}</Td>
            <Td color="white">{order.order_time}</Td>
            <Td color="white">{order.customer_name}</Td>
            <Td color="white">{order.customer_phone}</Td>
            <Td color="white">{order.menu.item_name}</Td>
            <Td color="white">{order.menu.day_of_week}</Td>
            <Td color="white">{order.menu.start_date}</Td>
            <Td color="white">{order.quantity}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default OrdersTable;
