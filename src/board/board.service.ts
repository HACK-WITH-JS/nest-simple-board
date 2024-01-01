import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  private boards = [
    {
      id: 1,
      title: 'hello world',
      content: 'Content 1',
    },
    {
      id: 2,
      title: 'hello world',
      content: 'Content 2',
    },
    {
      id: 3,
      title: 'hello world',
      content: 'Content 3',
    },
    {
      id: 4,
      title: 'hello world',
      content: 'Content 4',
    },
    {
      id: 5,
      title: 'hello world',
      content: 'Content 5',
    },
    {
      id: 6,
      title: 'hello world',
      content: 'Content 6',
    },
    {
      id: 7,
      title: 'hello world',
      content: 'Content 7',
    },
    {
      id: 8,
      title: 'hello world',
      content: 'Content 8',
    },
    {
      id: 9,
      title: 'hello world',
      content: 'Content 9',
    },
    {
      id: 10,
      title: 'hello world',
      content: 'Content 10',
    },
  ];

  findAll() {
    return this.boards;
  }

  find(id: number) {
    return this.boards.filter((board) => board.id === id);
  }

  create(data) {
    const newBoard = { id: this.getNextId(), ...data };
    this.boards.push(newBoard);
    return newBoard;
  }

  update(id: number, data) {
    const index = this.getBoardId(id);
    if (index > -1) {
      this.boards[index] = {
        ...this.boards[index],
        ...data,
      };

      return this.boards[index];
    }

    return null;
  }

  delete(id: number) {
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  getNextId() {
    return (
      this.boards.sort((board1, board2) => board2.id - board1.id)[0].id + 1
    );
  }

  getBoardId(id: number) {
    return this.boards.findIndex((board) => board.id === id);
  }
}
