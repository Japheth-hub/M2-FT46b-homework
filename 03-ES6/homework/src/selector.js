var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if(matchFunc(startEl)) resultSet.push(startEl)

  for (let i = 0; i < startEl.children.length; i++) {
    let result = traverseDomAndCollectElements(matchFunc, startEl.children[i])
    
    resultSet = [...resultSet, ...result]
  }
  return resultSet
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {
  // tu código aquí
  let tipo = "";
  if(selector[0] === "#"){
    tipo = "id";
  } else if(selector[0] === "."){
    tipo = "class";
  } else if(selector.split(".").length > 1){
    tipo = "tag.class";
  } else {
    tipo = "tag";
  }
  return tipo;
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = (element) => {
      return element.id.toLowerCase() === selector.slice(1).toLowerCase();
    }
  } else if (selectorType === "class") {
    matchFunction = (element) => {
      let clases = [];
      // console.log(element.classList)
      // console.log(selector.slice(1))
      for(let item of element.classList){
        clases.push(item);
      }
      // console.log(clases.includes(selector.slice(1)))
      return clases.includes(selector.slice(1));
    }
  } else if (selectorType === "tag.class") {
    matchFunction = (element) => {
      let tag = element.tagName.toLowerCase();
      let clases = [...element.classList];
      let tagsNames = selector.split(".");
      if(tagsNames[0] === tag){
        for(let item of clases){
          if(item === tagsNames[1]){
            return true
          }
        }
      }
      return false
    }
  } else if (selectorType === "tag") {
    matchFunction = (element) => {
      // console.log(element.tagName)
      // console.log(selector)
      return element.tagName.toLowerCase() === selector.toLowerCase();
    }
  }
  return matchFunction
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
