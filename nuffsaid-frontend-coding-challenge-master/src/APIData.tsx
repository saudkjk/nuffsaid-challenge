import React, { useState } from 'react';
import { Message } from './Api';
import { Box, Container, Paper } from '@material-ui/core';
import styled from "styled-components";

const ListItem = styled.li`
  margin-top: 8px;
`;

const UList = styled.ul`
  list-style-type: none;
`;

const MsgTypesBox = styled(Box)`
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 0px;
  flex: 1;
`;

const ClearButton = styled.button`
  background-color: transparent;
  border: none;
  &:hover {
    cursor:pointer;
  }
`;

interface props {
    memoizedErrorMessages: Message[];
    memoizedWarningMessages: Message[];
    memoizedInfoMessages: Message[];
    handleErrorMsgDelete: (message: string) => void;
    handleWarningMsgDelete: (message: string) => void;
    handleInfoMsgDelete: (message: string) => void;
}

export const APIData: React.FC<props> = ({
    memoizedErrorMessages,
    memoizedWarningMessages,
    memoizedInfoMessages,
    handleErrorMsgDelete,
    handleWarningMsgDelete,
    handleInfoMsgDelete

}) => {
    return (
        <Container style={{ display: 'flex', flexDirection: 'row' }}>

            <MsgTypesBox>
                <h2>Error Type 1</h2>
                <p>Count {memoizedErrorMessages.length}</p>
                {memoizedErrorMessages.map?.(errorMessage => <div key={errorMessage.message}>
                    <UList>
                        <ListItem>
                            <Paper style={{ backgroundColor: '#F56236', padding: '1rem' }}>
                                <p>{errorMessage.message}</p>
                                <Box style={{ textAlign: 'right' }}>
                                    <ClearButton onClick={() => handleErrorMsgDelete(errorMessage.message)}>Clear</ClearButton>
                                </Box>
                            </Paper>
                        </ListItem>
                    </UList>
                </div>)}
            </MsgTypesBox>

            <MsgTypesBox>
                <h2>Warning Type 2</h2>
                <p>Count {memoizedWarningMessages.length}</p>
                {memoizedWarningMessages.map?.(warningMessage => <div key={warningMessage.message}>
                    <UList>
                        <ListItem>
                            <Paper style={{ backgroundColor: '#FCE788', padding: '1rem' }}>
                                <p>{warningMessage.message}</p>
                                <Box style={{ textAlign: 'right' }}>
                                    <ClearButton onClick={() => handleWarningMsgDelete(warningMessage.message)}>Clear</ClearButton>
                                </Box>
                            </Paper>
                        </ListItem>
                    </UList>
                </div>)}
            </MsgTypesBox >

            <MsgTypesBox>
                <h2>Info Type 3</h2>
                <p>Count {memoizedInfoMessages.length}</p>
                {memoizedInfoMessages.map?.(infoMessage => <div key={infoMessage.message}>
                    <UList>
                        <ListItem>
                            <Paper style={{ backgroundColor: '#88FCA3', padding: '1rem' }}>
                                <p>{infoMessage.message}</p>
                                <Box style={{ textAlign: 'right' }}>
                                    <ClearButton onClick={() => handleInfoMsgDelete(infoMessage.message)}>Clear</ClearButton>
                                </Box>
                            </Paper>
                        </ListItem>
                    </UList>
                </div>)}
            </MsgTypesBox>

        </Container>
    )
}