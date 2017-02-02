

// get in string from outside
 function decideOnCategory(toDoString) {

  let splitString = toDoString.toLowerCase().split(" ");
  console.log(splitString)
  let theCategory = ""
  switch(splitString[0]){
    case 'watch':
    case'see':
      theCategory = 'Movies'
      break;
    case 'try':
    case 'eat':
    case'make':
      theCategory = "Food"
      break;
    case 'buy':
    case 'purchase':
      theCategory = 'Product'
      break;
    case 'read':
    case'look':
    case'inspect':
    case 'study':
      theCategory = "Books"
      break;
    default:
      theCategory = "Product"
      break;

  }

return theCategory;
}


console.log(decideOnCategory('watch Lord of the rings')) // movie
console.log(decideOnCategory('eat kimchi')) // food
console.log(decideOnCategory('try Shwartzs')) // food
console.log(decideOnCategory('read Lord of the Rings')) // books
console.log(decideOnCategory('buy Lord of the Rings')) // Product





