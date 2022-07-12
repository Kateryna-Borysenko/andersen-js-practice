//! LESSON 1

let someString = 'String';
// console.log(someString[1]); //t
someString[1] = 'w';
// console.log(someString[1]); //t

//! LESSON 2 
//проблема копирования объектов
const person = {
  firstName: 'Roman',
  lastName: 'Alexanov'
};

const personCopy = Object.assign({}, person) //делаем копию, тут всё ok тк нет вложенностей
// console.log('🍒 personCopy', personCopy)

//создаём объект с объектом внутри
const personWithPassport = {
  firstName: 'Roman',
  lastName: 'Alexanov',
  passport: {
    series: 'MC',
    number: '1234546'
  }
};
//было выполнено не глубокое копирование поэтому изменятся в обоих объектах 
const personWithPassportCopy = Object.assign({}, personWithPassport)
// не глубокое копирование 
// console.log('🍒 personWithPassport', personWithPassport)
// console.log('🍒 personWithPassportCopy', personWithPassportCopy)
//! если переопределим то изменения будут в обоих объектах
personWithPassportCopy.passport.series = 'FN';
// console.log('🍒 personWithPassport', personWithPassport)
// console.log('🍒 personWithPassportCopy', personWithPassportCopy)

//! Object.is()
const obj = { message: 'hello' };
const newObj = obj;
const anotherObj = { message: 'hello' };
// console.log(obj === obj); //true
// console.log(obj === anotherObj); //false
// console.log(Object.is(obj, anotherObj)); //false
// console.log(Object.is(obj, newObj)); //true //показывает что это один и тот же объект


// ПРИМЕР ОПТИМИЗАЦИИ ПОИСКА
//поиск данных по имени и фамилии
//как с линейной превратить в константную сложность
const customerList = [
  { firstName: 'Nick', secondName: 'McGillan', age: 35, phoneNumber: '+1333777888' },
  { firstName: 'Brian', secondName: 'Boyenger', age: 35, phoneNumber: '+1555666777' },
];

//решение
const mappedCustomerList = customerList.reduce((acc, item) => {
  acc[item.firstName + item.secondName] = item;
  return acc;
}, {});

// console.log(mappedCustomerList);

//!Примитив “как объект” (автобоксинг)
//	Автобоксинг - это внутренний механизм JavaScript, суть которого заключается в обёртке примитива в объект соответствующего типа (Number для чисел, String для строк) в момент попытки обращения к “его внутренним свойствам или методам”. Всякий раз, обращаясь к свойствам/методам нашего примитива, мы на самом деле работаем со свойствами/методами временного объекта-обёртки, который создаётся лишь на момент осуществления доступа и тут же уничтожается.


//! массив - это упорядоченная коллекция данных.
//бинарный поиск (двоичный поиск) - важно массив должен быть отсортирован
//видео 0:56 
//отсортировали массив
// берём за базу длину массива и делим пополам , затем проверяем искомое число больше или меньше и отсекаем не нужную половину массива
//после каждой итерации наш массив укорачивается в два раза 
//тем самым получаем оптимизацию 
const sortedArray = [1, 5, 6, 7, 8, 20, 25, 26, 30, 35, 40, 50];

const binarySearc = (array, serchedValue) => {
  let start = 0;
  let end = array.length;
  let base = Math.floor((start + end) / 2);
  let step = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[base] !== serchedValue) {
      if (serchedValue < array[base]) {
        end = base;
      } else {
        start = base;
      }
      base = Math.floor((start + end) / 2);
      step++;
    };

    if (array[base] === serchedValue) return `Found ${serchedValue} in ${step} steps`;
  }

  return 'Nothing found';
}

console.log(binarySearc(sortedArray, 125));

//! LESSON 3

const counter = function (sumValue) {
  let count = 0;
  return function () {
    console.log(count += sumValue);
  };
};

const addFive = counter(5);
const addFive2 = counter(5);
const addSeven = counter(7);

addFive();
addFive();
addFive();
addFive();

addSeven();

addFive2();

//! LESSON 8
// console.log(typeof typeof (1 / 0)) вернёт строку


//задание продублировать массив
Array.prototype.duplicate = function () {
  return [...this, ...this];
}
// console.log([1, 2, 3, 4, 5].duplicate()); // [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]

let arr = [1, 2, 3, 3, 4, 5, 5, 6, 7, 7, 7];

//получить уникальные значения массива
function unique(array) {
  return [...new Set(arr)];
}
// console.log(unique(arr)); // 


//вывести значения которые повторяются в двух массивах но при этом без повторений - уникальные 
let arr1 = [0, 2, 4, 6, 8, 8, 7, 7];
let arr2 = [1, 2, 3, 4, 5, 6, 8, 8];

let duplicateValues = [...new Set(arr1)].filter(item => arr2.includes(item))
// console.log(duplicateValues);


//со *
//ф-ция которая выполниться через отложенное кол-во времени
function when(delay) {
  return new Promise((res, rej) => {
    setTimeout(res, delay)
  })
}

// when(2000).then(() => console.log('finish'));


// Задача на понимание This
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
}

// console.log(shape.diameter()); // 20

// console.log(shape.perimeter()); // NaN - потому что ссылка на глобальный объект а свойства radius в глобальном объекте нет, поэтому вернёт undefined //perimeter: () => 2 * Math.PI * undefined,

const newDiameter = shape.diameter;

// console.log(newDiameter()); // NaN - потеря контекста / как вернуть контекст - bind


// TDZ - задача на временную мертвую зону

var a = 5;

function foo(a) {
  a += a;
}

foo(10);
// console.log(a); // 5



// задача  Promise chaining

// Promise.reject('a') //a
//  .catch(p => p + 'b')//b
//  .catch(p => p + 'c')
//  .then(p => p + 'd') //d
//  .finally(p => p + 'e')
//  .then(p => console.log(p)); // abd - промис один раз обрабатывает ошибку сработает первый catch второй не сработает и из then возвращаем результат finally ничего не возвращает а последний then вернёт результат первого then 



//задача посложнее 
Promise.resolve(11)
  .then(
    val => console.log('then', val), // then, 11 - выполниться
    err => console.log('catch', err)
  )
  .then(
    null, //не сработает нет первого аргумента
    err => console.log('catch', err)
  )
  .catch(
    err => console.log('catch', err)
  )
  .then(
    () => Promise.reject(22)
  )
  .catch(
    null
  )
  .then(
    val => console.log('then', val),
    null
  )
  .finally(
    val => console.log('finally', val), // finally, undefined
  )
  .catch(
    val => console.log('catch', val) // catch, 22
  )
  .finally(
    () => Promise.reject(33)
  )
  .then(
    val => console.log('then', val),
    err => console.log('catch', err) // catch 33
  )
  .catch(
    val => console.log('then', val),
    err => console.log('catch', err)
  );


// Мутирование 
let someString = 'String';
// console.log(someString[1]); //t
someString[1] = 'w';
        // console.log(someString[1]); //t