/**
 * @param {{
 * data: { me2: number, replies: number, text: string, url: string, wid: string },
 * maxValue: number,
 * sons: Array | null
 * }} node
 */
export const isLeaf = node => {
  return node.sons.length === 0;
};

/**
 *
 * @param {Array<{
 * data: { me2: number, replies: number, text: string, url: string, wid: string },
 * maxValue: number,
 * sons: Array | null
 * }>} leafs
 */
export const getMaxValue = leafs => {
  return leafs.reduce((max, curr) => Math.max(max, curr.data.replies), 0);
};

/**
 *
 * @param {{
 * data: { me2: number, replies: number, text: string, url: string, wid: string },
 * maxValue: number,
 * sons: Array
 * }} node
 */
export const findMaxSum = node => {
  if (isLeaf(node)) {
    return node.data.replies;
  }

  const arrLenght = node.sons.length;
  let max = 0;
  let sum = 0;
  for (let idx = 0; idx < arrLenght; idx++) {
    max = findMaxSum(node.sons[idx]);
    sum = Math.max(sum, max + node.data.replies);
  }

  setMaxValue(node, sum);
  return sum;
};

export const findNode = (node, wid, action) => {
  if (isLeaf(node) && node.data.wid !== wid) {
    return null;
  }

  if (node.data.wid === wid) {
    action(node);
    return node;
  }

  const arrLenght = node.sons.length;
  for (let idx = 0; idx < arrLenght; idx++) {
    const finded = findNode(node.sons[idx], wid, action);
    if (finded) {
      break;
    }
  }
};

/**
 *
 * @param {{
 * data: { me2: number, replies: number, text: string, url: string, wid: string },
 * maxValue: number,
 * sons: Array
 * }} node
 */
export const setMaxValue = (node, maxValue) => {
  node.maxValue = maxValue;
};

/*
const mockData = {
  data: { me2: 1, replies: 10, text: "Algo", url: "URL", wid: "idRaro" },
  maxValue: 0,
  sons: [
    {
      data: { me2: 2.1, replies: 2, text: "Algo", url: "URL", wid: "idRaro" },
      maxValue: 0,
      sons: [
        {
          data: {
            me2: 3.11,
            replies: 12,
            text: "Algo",
            url: "URL",
            wid: "idRaro"
          },
          maxValue: 0,
          sons: [
            {
              data: {
                me2: 411,
                replies: 0,
                text: "Algo",
                url: "URL",
                wid: "idRaro"
              },
              maxValue: 0,
              sons: []
            },
            {
              data: {
                me2: 412,
                replies: 12,
                text: "Algo",
                url: "URL",
                wid: "idRaro"
              },
              maxValue: 0,
              sons: []
            }
          ]
        }
      ]
    },
    {
      data: { me2: 22, replies: 8, text: "Algo", url: "URL", wid: "idRaro" },
      maxValue: 0,
      sons: [
        {
          data: {
            me2: 321,
            replies: 10,
            text: "Algo",
            url: "URL",
            wid: "idRaro"
          },
          maxValue: 0,
          sons: []
        },
        {
          data: {
            me2: 322,
            replies: 7,
            text: "Algo",
            url: "URL",
            wid: "idRaro"
          },
          maxValue: 0,
          sons: [
            {
              data: {
                me2: 421,
                replies: 0,
                text: "Algo",
                url: "URL",
                wid: "idRaro"
              },
              maxValue: 0,
              sons: [
                {
                  data: {
                    me2: 521,
                    replies: 0,
                    text: "Algo",
                    url: "URL",
                    wid: "idRaro"
                  },
                  maxValue: 0,
                  sons: []
                },
                {
                  data: {
                    me2: 522,
                    replies: 3,
                    text: "Algo",
                    url: "URL",
                    wid: "idRaro"
                  },
                  maxValue: 0,
                  sons: [
                    {
                      data: {
                        me2: 621,
                        replies: 0,
                        text: "Algo",
                        url: "URL",
                        wid: "idRaro"
                      },
                      maxValue: 0,
                      sons: []
                    }
                  ]
                }
              ]
            },
            {
              data: {
                me2: 422,
                replies: 10,
                text: "Algo",
                url: "URL",
                wid: "idRaro"
              },
              maxValue: 2,
              sons: []
            }
          ]
        }
      ]
    },
    {
      data: { me2: 23, replies: 10, text: "Algo", url: "URL", wid: "idRaro" },
      maxValue: 0,
      sons: []
    },
    {
      data: { me2: 24, replies: 0, text: "Algo", url: "URL", wid: "idRaro" },
      maxValue: 0,
      sons: [
        {
          data: {
            me2: 341,
            replies: 52,
            text: "Algo",
            url: "URL",
            wid: "idRaro"
          },
          maxValue: 0,
          sons: [
            {
              data: {
                me2: 441,
                replies: 10,
                text: "Algo",
                url: "URL",
                wid: "idRaro"
              },
              maxValue: 0,
              sons: []
            },
            {
              data: {
                me2: 442,
                replies: 0,
                text: "Algo",
                url: "URL",
                wid: "idRaro"
              },
              maxValue: 0,
              sons: [
                {
                  data: {
                    me2: 541,
                    replies: 2,
                    text: "Algo",
                    url: "URL",
                    wid: "wid400000"
                  },
                  maxValue: 0,
                  sons: []
                }
              ]
            }
          ]
        },
        {
          data: {
            me2: 342,
            replies: 0,
            text: "Algo",
            url: "URL",
            wid: "idRaro"
          },
          maxValue: 0,
          sons: []
        }
      ]
    }
  ]
};

console.log("====================================");
console.log(findMaxSum(mockData));
console.log("====================================");
console.log("====================================");
console.log(
  findNode(mockData, "wid400000", node => {
    node.data.text = "Me Encontraron";
    console.log("FINDED", node);
  })
);
console.log("====================================");
console.log("====================================");
console.log(
  findNode(mockData, "wid400000", node => {
    console.log("FINDED_2", node);
  })
);
console.log("====================================");
console.log("====================================");
console.log(mockData);
console.log("====================================");
*/
