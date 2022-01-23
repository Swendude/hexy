import { uniqueLines, allEdges } from './gridUtils';

test('uniqueLines removes duplicate lines', () => {
    expect(uniqueLines([
        [{ x: 1, y: 3 }, { x: 4, y: 6 }],
        [{ x: 8, y: 3 }, { x: 2, y: 9 }],
        [{ x: 4, y: 6 }, { x: 1, y: 3 }]
    ])).toEqual([
        [{ x: 1, y: 3 }, { x: 4, y: 6 }],
        [{ x: 2, y: 9 }, { x: 8, y: 3 }]
    ])
})

test('allEdges returns all pairs', () => {
    expect(allEdges([0, 1, 2, 3, 4, 5])).toEqual([
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 0]
    ])
})