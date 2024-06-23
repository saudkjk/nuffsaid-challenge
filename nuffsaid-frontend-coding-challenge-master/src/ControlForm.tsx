import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import styled from "styled-components";

const CustomButton = styled(Button)`
  background-color: #88FCA3; 
  margin-left: 2px;
  margin-right: 2px;
  margin-top: 4px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: bold;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);
`;

interface props {
    listenToMsgs: boolean;
    handleStart: () => void;
    handleClear: () => void;
}

export const ControlForm: React.FC<props> = ({
    listenToMsgs,
    handleStart,
    handleClear

}) => {
    return (
        <form>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                <CustomButton onClick={() => handleStart()}>{listenToMsgs ? 'STOP' : 'START'}</CustomButton>
                <CustomButton onClick={() => handleClear()}>CLEAR</CustomButton>
            </Box>
        </form>
    )
}