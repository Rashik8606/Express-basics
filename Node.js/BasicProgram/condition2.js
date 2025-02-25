var sum = require('readline-sync')
var read = sum.question('Enter 2 Number ? ')

var read2 = sum.question('')

if (read>read2){
    console.log('Largest Number is ' +read)
}else if (read===read2){
    console.log('The number was Equal')
}else{
    console.log('Largest number is '+ read2)
}