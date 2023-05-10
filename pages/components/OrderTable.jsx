import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

function OrdersTable({ orders }) {
  console.log("ORDER", orders);
  return (
    <Table variant="simple" overflowX="auto">
      <Thead>
        <Tr>
          <Th color="white">Customer Name</Th>
          <Th color="white">Menu Item</Th>
          <Th color="white">Quantity</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders?.map((order) => (
          <Tr key={order.order_id}>
            <Td color="white">{order.customer_name}</Td>
            <Td color="white">{order.menu.item_name}</Td>
            <Td color="white">{order.quantity}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default OrdersTable;
