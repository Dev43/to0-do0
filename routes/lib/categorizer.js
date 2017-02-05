

// get in string from outside
 module.exports = function decideOnCategory(toDoString) {

  let splitString = toDoString.toLowerCase().split(" ");
  let theCategory = ""
  switch(splitString[0]){
    case 'watch':
    case'see':
    case 'observe':
    case 'view':
      theCategory = 'Movies'
      return 1;
    case 'read':
    case'look':
    case'inspect':
    case 'study':
      theCategory = "Books"
      return 2;
    case 'try':
    case 'eat':
    case'make':
      theCategory = "Food"
      return 3;
    case 'buy':
    case 'purchase':
    case 'obtain':
      theCategory = 'Product'
      return 4;
      break;
    default:
      theCategory = "Uncategorized"
      return;

  }
}


// console.log(decideOnCategory('watch Lord of the rings')) // movie
// console.log(decideOnCategory('eat kimchi')) // food
// console.log(decideOnCategory('try Shwartzs')) // food
// console.log(decideOnCategory('read Lord of the Rings')) // books
// console.log(decideOnCategory('buy Lord of the Rings')) // Product





