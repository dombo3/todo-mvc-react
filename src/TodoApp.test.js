import React from 'react';
import TodoApp from './TodoApp.js';

import '@testing-library/jest-dom';
import { render, fireEvent, getByText } from '@testing-library/react';

test('render TodoApp', () => {
  const { queryByText } = render(<TodoApp />);
  expect(queryByText('todos')).toHaveTextContent('todos');
})

test('todo input is on the document', () => {
  const { getByPlaceholderText } = render(<TodoApp />);
  expect(getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
})

test('todo input change', () => {
  const { getByPlaceholderText, getByDisplayValue } = render(<TodoApp />);
  const input = getByPlaceholderText('What needs to be done?');
  fireEvent.change(input, {target : { value : 'dishes'}})
  expect(getByDisplayValue('dishes')).toBeInTheDocument();
})

test('todo submitted, added to todo-list', () => {
  const { getByPlaceholderText, getByText } = render(<TodoApp />);
  const input = getByPlaceholderText('What needs to be done?');
  fireEvent.change(input, {target : { value : 'dishes'}});
  fireEvent.submit(input);
  expect(getByText('dishes')).toBeInTheDocument();
})

test('when two todo submitted, then both added to the todo-list', () => {
  const { getByPlaceholderText, getByText } = render(<TodoApp />);
  const input = getByPlaceholderText('What needs to be done?');
  fireEvent.change(input, {target : { value : 'dishes'}});
  fireEvent.submit(input);
  fireEvent.change(input, {target : { value : 'loundry'}});
  fireEvent.submit(input);
  expect(getByText('dishes')).toBeInTheDocument();
  expect(getByText('loundry')).toBeInTheDocument();
})

test('footer present, when todos submitted', () => {
  const { getByPlaceholderText, getByText } = render(<TodoApp />);
  const input = getByPlaceholderText('What needs to be done?');
  fireEvent.change(input, {target : { value : 'dishes'}});
  fireEvent.submit(input);
  fireEvent.change(input, {target : { value : 'loundry'}});
  fireEvent.submit(input);

  expect(getByText('2 items left')).toBeInTheDocument();
  expect(getByText('All')).toBeInTheDocument();
  expect(getByText('Active')).toBeInTheDocument();
  expect(getByText('Completed')).toBeInTheDocument();
})

test('focus on edit text when todo double clicked', () => {
  const { getByPlaceholderText, getByText, getByDisplayValue } = render(<TodoApp />);
  const input = getByPlaceholderText('What needs to be done?');
  fireEvent.change(input, {target : { value : 'dishes'}});
  fireEvent.submit(input);
  
  const todo = getByText('dishes');

  fireEvent.dblClick(todo, { bubbles: true });

  const editTodo = getByDisplayValue('dishes');
  expect(editTodo).toHaveFocus();
})

test('show only active todos', () => {
  const { getByPlaceholderText, getByTestId, getByText } = render(<TodoApp />);
  const input = getByPlaceholderText('What needs to be done?');
  fireEvent.change(input, {target : { value : 'dishes'}});
  fireEvent.submit(input);
  fireEvent.change(input, {target : { value : 'loundry'}});
  fireEvent.submit(input);
  const loundry_todo = getByText('loundry');
  
  fireEvent.click(getByTestId('done-button-dishes'));
  fireEvent.click(getByText('Completed'));

  expect(getByText('1 item left')).toBeInTheDocument();
  expect(getByText('dishes')).toBeInTheDocument()
  expect(loundry_todo).not.toBeInTheDocument();
})