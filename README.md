Ответы к тестовому заданию:

1. 
console.log( doubleNum(10) );

let doubleNum = (num) => {
  let result = num * 2;
  return result;
}

Фрагмент 1 не будет работать, так как function expression не может быть использован до объявления.

3.
const resources = [
{
id: 1,
count: 13,
},
{
id: 2,
count: 5,
},
{
id: 3,
count: 24,
},
{
id: 4,
count: 101,
},
{
id: 5,
count: 72,
},
{
id: 6,
count: 64,
},
{
id: 7,
count: 305,
},
{
id: 8,
count: 67,
},
{
id: 9,
count: 95,
},
{
id: 10,
count: 21,
},
{
id: 12,
count: 37,
},
];

function getIdAndCount (arr) {
obj = Object.create(null);
for (let i = 0; i < arr.length; i++) {
obj.[arr[i].id] = arr[i].count
}
return console.log(obj);
}

getIdAndCount(resources);
