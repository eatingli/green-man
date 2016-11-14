//.toString(N進制)

//最高位為符號位 0+ 1-

console.log((99999999).toString(36)); //最高36進制

console.log((0b101 & 0b011).toString(2));
console.log((0b101 | 0b011).toString(2));
console.log((0b101 ^ 0b111).toString(2));

//有符號平移
console.log((0b101 >> 1).toString(2));
console.log((0b101 << 1).toString(2));
console.log((-0b101 >> 1).toString(2));

//無符號平移

//影響到最高位的符號位，所以正負會轉換
//會有一位比最大位數高一位的隱含'0'，在非運算後會變成'1'
console.log((~0b101).toString(2)); 


