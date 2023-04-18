import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function ItemTable({ orders }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemMap = new Map();
    orders.forEach((order) => {
      const itemName = order.menu.item_name;
      if (itemMap.has(itemName)) {
        const count = itemMap.get(itemName);
        itemMap.set(itemName, count + order.quantity);
      } else {
        itemMap.set(itemName, order.quantity);
      }
    });
    const itemArray = Array.from(itemMap).map(([name, count]) => ({
      name,
      count,
    }));
    setItems(itemArray);
  }, [orders]);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th color="white">Item Name</Th>
          <Th color="white">Total Ordered</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item) => (
          <Tr key={item.name}>
            <Td color="white">{item.name}</Td>
            <Td color="white">{item.count}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default ItemTable;
