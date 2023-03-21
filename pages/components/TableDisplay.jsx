import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

function TableDisplay() {
    return (
        <TableContainer>
            <Table color='white' variant='simple'>
                <TableCaption color='white'>Imperial to metric conversion factors</TableCaption>
                <Thead color='white'>
                    <Tr color='white'>
                        <Th color='white' >To convert</Th>
                        <Th color='white'>into</Th>
                        <Th color='white' isNumeric>multiply by</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                        <Td>feet</Td>
                        <Td>centimetres (cm)</Td>
                        <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td isNumeric>0.91444</Td>
                    </Tr>
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th color='white'>To convert</Th>
                        <Th color='white'>into</Th>
                        <Th color='white' isNumeric>multiply by</Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}

export default TableDisplay


