import React from 'react';
import { render, screen, fireEvent, renderHook } from '@testing-library/react';
import App from '../App';
import { ControlForm } from '../ControlForm';
import { APIData } from '../APIData';
import { Message } from '../Api';


test('renders learn react link', () => {
  const comp = render(<App />);
  expect(comp).toBeTruthy();
});

test('starts and stops message listening', () => {
  render(<App />);
  const startButton = screen.getByText('STOP');
  fireEvent.click(startButton);
  expect(screen.getByText('START')).toBeInTheDocument();
});

test('renders ControlForm component correctly', () => {
  const { getByText } = render(<ControlForm listenToMsgs={true} handleStart={jest.fn()} handleClear={jest.fn()} />);
  expect(getByText('STOP')).toBeInTheDocument();
  expect(getByText('CLEAR')).toBeInTheDocument();
});

test('calls handleStart when button is clicked', () => {
  const handleStart = jest.fn();
  const handleClear = jest.fn();
  const { getByText } = render(<ControlForm listenToMsgs={true} handleStart={handleStart} handleClear={handleClear} />);
  fireEvent.click(getByText('STOP'));
  expect(handleStart).toHaveBeenCalledTimes(1);
});

test('calls handleClear when button is clicked', () => {
  const handleStart = jest.fn();
  const handleClear = jest.fn();
  const { getByText } = render(<ControlForm listenToMsgs={true} handleStart={handleStart} handleClear={handleClear} />);
  fireEvent.click(getByText('CLEAR'));
  expect(handleClear).toHaveBeenCalledTimes(1);
});

// TODO: more advanced tests