// const date =  new Date();
// console.log(date)
// const day = date.getDate();
// console.log(day)

// const month = date.getMonth() + 1;
// console.log(month)

// const year = date.getFullYear()
// console.log(year)

// const Date1 = `${day}/${month}/${year}`
// console.log(Date1, "Date")

// let a = "Vipin"
// console.log(a.toLowerCase())


// let n = 5

// for(i=0; i<=n; i++){
//     let a =[]
//     for(j=0; j<i; j++){
//         a.push(i)
//     }
//     console.log(...a)
// }

let n =6
 let count = 0
if(n<=1){
 console.log("Not prime")
}else{


for(i=2; i<n; i++){
    if(n%i == 0){
        console.log('number is not prime')
        count++;
        break;
    }
}
if(count == 0 ){
    console.log("Prime")
}
}
