function solution(edges) {
  var answer = [];
  let graphMap = new Map();
  let startNode = 0; // 생성자 노드
  for (let i = 0; i < edges.length; i++) {
    const start = edges[i][0];
    const next = edges[i][1];
    if (!graphMap.get(start)) {
      graphMap.set(start, [next]);
    } else {
      const arr = graphMap.get(start);
      startNode = start;
      graphMap.set(start, [...arr, next]);
    }
  }
  console.log(graphMap);
  return answer;
}

solution([
  [2, 3],
  [4, 3],
  [1, 1],
  [2, 1],
]);

solution([
  [4, 11],
  [1, 12],
  [8, 3],
  [12, 7],
  [4, 2],
  [7, 11],
  [4, 8],
  [9, 6],
  [10, 11],
  [6, 10],
  [3, 5],
  [11, 1],
  [5, 3],
  [11, 9],
  [3, 8],
]);
