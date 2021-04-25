const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, cb) {
      const newCollection = collection instanceof Array ? [...collection] : Object.values(collection)

      for(let i = 0; i < newCollection.length; i++){
        cb(newCollection[i])
      }
      return collection
    },

    map: function(collection, cb) {

      if(!(collection instanceof Array)){
        collection = Object.values(collection)
      }

      const newCollection = []

      for(let i = 0; i < collection.length; i++){
        newCollection.push(cb(collection[i]))
      }
      return newCollection
    },

    // what are the steps to figure this out
    reduce: function(collection, callback, acc) {

        let c = collection.slice(0)

        if(!acc) {
          acc = c[0]
          c = c.slice(1)
        }

      for(let i = 0; i < c.length; i++){
        acc = callback(acc, c[i], c)
      }
      return acc
    },

    find: function(collection, predicate){
      for(let i = 0; i < collection.length; i++){
        if (predicate(collection[i])) return collection[i]
      } 
      return undefined
    }, 

    filter: function(collection, predicate){
      if(!(collection instanceof Array)) {
        collection = Object.values(collection)
      }
      const a = []
      for(let i = 0; i < collection.length; i++){
        if (predicate(collection[i])) {
          a.push(collection[i])
        }
      } 
      return a
    }, 

    size: function(collection){
      return collection instanceof Array ? collection.length : Object.keys(collection).length
    }, 

    first: function(collection, n){
     return n ? collection.slice(0, n) : collection[0]
     
    }, 

    last: function(collection, n){
      return n ? collection.slice(-n) : collection[collection.length - 1]
      
    }, 

    compact: function(collection){
      // check for truthy values & push to new array
      // return new array
      const a = []
      for(let i = 0; i < collection.length; i++){
        if(!!collection[i]) a.push(collection[i])
      }
      return a
    }, 

    sortBy: function(collection, cb){
      const a = [...collection]
      return a.sort((a, b) => cb(a) - cb(b)) 
    }, 
    
    unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    flatten: function(collection, shallow, newArr=[]) {
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },

    uniqSorted: function(collection, iteratee) {
      const sorted = [collection[0]]
      for (let idx = 1; idx < collection.length; idx++) {
        if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
    },

    uniq: function(collection, sorted=false, iteratee=false) {
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    keys: function(object) {
      const keys = []

      for(let key in object) {
        keys.push(key)
      }
      return keys
    },

    values: function(object) {
      const values = []

      for(let val in object) {
        values.push(object[val])
      }
      return values
    },

    functions: function(obj) {
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }

      return functionNames.sort()
    },


  }
})()

fi.libraryMethod()
