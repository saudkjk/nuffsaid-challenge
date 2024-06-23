import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
import generateMessage, { Message } from './Api';
import { Snackbar } from '@material-ui/core';
import { createGlobalStyle } from "styled-components";
import { ControlForm } from './ControlForm';
import { APIData } from './APIData';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0px;
    margin: 0px;
  }
`;

const App: React.FC<{}> = () => {

  const [errorMessages, setErrorMessages] = useState<Message[]>([]);
  const [warningMessages, setWarningMessages] = useState<Message[]>([]);
  const [infoMessages, setInfoMessages] = useState<Message[]>([]);
  const [listenToMsgs, setListenToMsgs] = useState(true);
  const [snackBar, setSnackBar] = useState(false);
  const [latestError, setLatestError] = useState("");

  useEffect(() => {
    if (listenToMsgs) {
      const cleanUp = generateMessage((message: Message) => {
        if (message.priority === 0) {
          setLatestError(message.message); {/* save the latest error message to show it in snack bar */ }
          setSnackBar(true);
          setErrorMessages(oldErrorMessages => [...oldErrorMessages, message]);
        }
        if (message.priority === 1) {
          setWarningMessages(oldWarningMessages => [...oldWarningMessages, message]);
        }
        if (message.priority === 2) {
          setInfoMessages(oldInfoMessages => [...oldInfoMessages, message]);
        }
      }
      );
      return cleanUp;
    }
  }, [setErrorMessages, setWarningMessages, setInfoMessages, listenToMsgs]);


  const memoizedErrorMessages = useMemo(() => errorMessages.slice().reverse(), [errorMessages]);
  const memoizedWarningMessages = useMemo(() => warningMessages.slice().reverse(), [warningMessages]);
  const memoizedInfoMessages = useMemo(() => infoMessages.slice().reverse(), [infoMessages]);

  const handleErrorMsgDelete = (message: string) => {
    setErrorMessages(oldErrorMessages => oldErrorMessages.filter(msg => msg.message !== message));
    {/* Handle error messages special case: snack bar close */ }
    if (latestError == message) {
      setSnackBar(false);
    }
  };

  const handleWarningMsgDelete = (message: string) => {
    setWarningMessages(oldWarningMessages => oldWarningMessages.filter(msg => msg.message !== message));
  };

  const handleInfoMsgDelete = (message: string) => {
    setInfoMessages(oldInfoMessages => oldInfoMessages.filter(msg => msg.message !== message));
  };

  const handleClear = () => {
    setErrorMessages([]);
    setWarningMessages([]);
    setInfoMessages([]);
    setSnackBar(false);
  };

  const handleStart = () => {
    setListenToMsgs((prevState) => !prevState);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar(false);
  };

  return (

    <>
      <GlobalStyle />

      {/* Header */}
      <h1 style={{ margin: 6, padding: 0 }}>nuffsaid.com Coding Challenge</h1>
      <hr></hr>

      <ControlForm
        listenToMsgs={listenToMsgs}
        handleStart={handleStart}
        handleClear={handleClear}
      />

      <APIData
        memoizedErrorMessages={memoizedErrorMessages}
        memoizedWarningMessages={memoizedWarningMessages}
        memoizedInfoMessages={memoizedInfoMessages}
        handleErrorMsgDelete={handleErrorMsgDelete}
        handleWarningMsgDelete={handleWarningMsgDelete}
        handleInfoMsgDelete={handleInfoMsgDelete}
      />

      <Snackbar
        message={latestError}
        autoHideDuration={2000}
        open={snackBar}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </>
  );
}

export default App;