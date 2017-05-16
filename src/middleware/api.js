const list = [{
  id: 1,
  tags: ['es5'],
  title: 'What value is returned from the following statement?',
  code: `
    function f() { return this }
    f.bind(6).bind(9)()
  `,
  answers: [
    {id: 1, answer: '6', isTrue: true},
    {id: 2, answer: '9'},
    {id: 3, answer: '15'},
    {id: 4, answer: 'Error'}
  ]
}, {
  id: 2,
  tags: ['es5'],
  title: 'What will the code below output to the console?',
  code: `
    (function() {
      var a = b = 3;
    })();
    console.log(typeof a, typeof b);
  `,
  answers: [
    {id: 1, answer: 'undefined, number', isTrue: true},
    {id: 2, answer: 'number, number'},
    {id: 3, answer: 'number, undefined'},
    {id: 4, answer: 'undefined, undefined'}
  ]
}, {
  id: 3,
  tags: ['es5'],
  title: 'What will the code below output to the console?',
  code: `
    var myObject = {
      foo: 'bar',
      func: function() {
        var self = this;
        (function() {
          console.log(this.foo, self.foo);
        }());
      }
    };
    myObject.func();
  `,
  answers: [
    {id: 1, answer: 'undefined, bar', isTrue: true},
    {id: 2, answer: 'bar, bar'},
    {id: 3, answer: 'bar, undefined'},
    {id: 4, answer: 'undefined, undefined'}
  ]
}, {
  id: 4,
  tags: ['es5'],
  title: 'What will the code below output to the console?',
  code: `
    function foo1() {
      return {
        bar: 'hello'
      };
    }
    function foo2() {
      return
      {
        bar: 'hello'
      };
    }
    
    console.log(foo1(), foo2());
  `,
  answers: [
    {id: 1, answer: '{bar: "hello"}, undefined', isTrue: true},
    {id: 2, answer: '{bar: "hello"}, {bar: "hello"}'},
    {id: 3, answer: 'undefined, {bar: "hello"}'},
    {id: 4, answer: 'undefined, undefined'}
  ]
}, {
  id: 5,
  tags: ['es5'],
  title: 'What will the code below output to the console?',
  code: `
    console.log(typeof NaN === 'number');
    console.log(NaN === NaN);
    console.log('abc' / 3);
    console.log('A' - 'B' + '2');
  `,
  answers: [
    {id: 1, answer: 'true, false, NaN, "NaN2"', isTrue: true},
    {id: 2, answer: 'false, true, NaN, NaN'},
    {id: 3, answer: 'true, true, 1, NaN'},
    {id: 4, answer: 'false, false, NaN, "NaN2"'}
  ]
}, {
  id: 6,
  tags: ['es5'],
  title: 'In what order will the numbers 1-4 be logged to the console when the code below is executed?',
  code: `
    (function() {
      console.log(1);
      setTimeout(function() {console.log(2)}, 1000);
      setTimeout(function() {console.log(3)}, 0);
      console.log(4);
    }());
  `,
  answers: [
    {id: 1, answer: '1, 4, 3, 2', isTrue: true},
    {id: 2, answer: '1, 2, 3, 4'},
    {id: 3, answer: '1, 3, 4, 2'},
    {id: 4, answer: '1, 4, 2, 3'}
  ]
}, {
  id: 7,
  tags: ['es5'],
  title: 'What will the code below output to the console?',
  code: `
    var arr1 = 'john'.split('');
    var arr2 = arr1.reverse();
    var arr3 = 'jones'.split('');
    arr2.push(arr3);
    console.log(arr1.slice(-1), arr2.slice(-1));
  `,
  answers: [
    {id: 1, answer: '[["j","o","n","e","s"]], [["j","o","n","e","s"]]', isTrue: true},
    {id: 2, answer: '["s"], ["s"]'},
    {id: 3, answer: '["j"], [["j","o","n","e","s"]]'},
    {id: 4, answer: '["j"], ["s"]'}
  ]
}, {
  id: 8,
  tags: ['es5'],
  title: 'What will the code below output to the console?',
  code: `
    console.log(1 + '2' + '2');
    console.log(1 + +'2' + '2');
    console.log(1 + -'1' + '2');
    console.log(+'1' + '1' + '2');
  `,
  answers: [
    {id: 1, answer: '122, 32, 02, 112', isTrue: true},
    {id: 2, answer: '5, 32, 2, 4'},
    {id: 3, answer: '122, 122, 112, 112'},
    {id: 4, answer: '32, 32, 02, 112'}
  ]
}, {
  id: 9,
  tags: ['es5'],
  title: 'What will be the output of the following code?',
  code: `
    for(var i = 0; i < 5; i++) {
      setTimeout(function() { console.log(i); }, i * 1000);
    }
  `,
  answers: [
    {id: 1, answer: '5, 5, 5, 5, 5', isTrue: true},
    {id: 2, answer: '0, 1, 2, 3, 4'},
    {id: 3, answer: '0, 5, 5, 5, 5'},
    {id: 4, answer: '4, 3, 2, 1, 0'}
  ]
}, {
  id: 10,
  tags: ['es5'],
  title: 'What will the following code output to the console?',
  code: `
    var spy = {
      _name: 'James Bond',
      getSecretName: function() {
        return this._name;
      }
    };
    var stoleSecretName = spy.getSecretName;
    console.log(stoleSecretName(), spy.getSecretName());
  `,
  answers: [
    {id: 1, answer: 'undefined, "James Bond"', isTrue: true},
    {id: 2, answer: '"James Bond", "James Bond"'},
    {id: 3, answer: 'undefined, undefined'},
    {id: 4, answer: '"James Bond", undefined'}
  ]
}, {
  id: 11,
  tags: ['es5'],
  title: 'What will the following code output to the console?',
  code: `
    var a = {},
        b = {key: 'b'},
        c = {key: 'c'};
    a[b] = 7;
    a[c] = 13;
    console.log(a[b]);
  `,
  answers: [
    {id: 1, answer: '13', isTrue: true},
    {id: 2, answer: 'undefined'},
    {id: 3, answer: '7'},
    {id: 4, answer: 'Error'}
  ]
}, {
  id: 12,
  tags: ['es5'],
  title: 'What would the following lines of code output to the console?',
  code: `
    console.log(0 || 1);
    console.log(1 || 2);
    console.log(0 && 1);
    console.log(1 && 2);
  `,
  answers: [
    {id: 1, answer: '1, 1, 0, 2', isTrue: true},
    {id: 2, answer: '0, 2, 1, 1'},
    {id: 3, answer: '1, 1, 0, true'},
    {id: 4, answer: '1, 2, true, 1'}
  ]
}, {
  id: 13,
  tags: ['es5'],
  title: 'What will be the output of the following code?',
  code: `
    var b = {a: 13};
    
    (function foo(b) {
      b = {a: 7};
    })(b);
    console.log(b);
  `,
  answers: [
    {id: 1, answer: '{a: 13}', isTrue: true},
    {id: 2, answer: '{b: 7}'},
    {id: 3, answer: 'undefined'},
    {id: 4, answer: 'Error'}
  ]
}];
//import fetch from 'isomorphic-fetch';

export const CALL_API = 'CALL_API';

/*const callApi = async (endpoint, requestOptions) => {
  try {
    const response = await fetch(`https://localhost:3001/${endpoint}`, requestOptions);
    if(response.ok) {
      return response.json();
    } else {
      return response.json().then(error => {
        throw new Error(error.errors[0].message);
      });
    }
  } catch(err) {
    throw new Error(err);
  }
};*/

export default store => next => async action => {
  const callAPI = action[CALL_API];
  if(typeof callAPI === 'undefined') {
    return next(action);
  }

  const {types/*, requestOptions = {}*/} = callAPI;
  let {endpoint} = callAPI;

  if(typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if(typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if(!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if(!types.every(type => typeof type === 'string')) {
    throw Error('Expected action types to be strings.');
  }

  const [requestType, successType, failureType] = types;
  next({type: requestType});
  try {
    const response = list;/*await callApi(endpoint, requestOptions);*/
    setTimeout(() => next({type: successType, response}), 1000);
    //next({type: successType, response});
  } catch(error) {
    next({type: failureType, error: error.message || 'Something bad happened!'});
  }
};
