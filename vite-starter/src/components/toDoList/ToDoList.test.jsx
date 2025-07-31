import React from "react";
import mockData from "../mockData";
import '@testing-library/jest-dom';
import {render, screen } from '@testing-library/react';
import ToDoList from "./ToDoList";
import { describe, expect, it } from "vitest";

describe('todo list test', () =>{
    it('should show title of todos', () => {
        render(<ToDoList todos={mockData} />);
        mockData.forEach((d) => expect(screen.getByText(d.title)).toBeInTheDocument())
    })
})
