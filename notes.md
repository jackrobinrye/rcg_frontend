CSS 



table.paleBlueRows {
  font-family: Georgia, serif;
  border: 0px solid #FFFFFF;
  width: 1000px;
  height: 200px;
  text-align: center;
  border-collapse: collapse;
}
table.paleBlueRows td, table.paleBlueRows th {
  border: 1px solid #FFFFFF;
  padding: 4px 2px;
}
table.paleBlueRows tbody td {
  font-size: 13px;
}
table.paleBlueRows tr:nth-child(odd) {
  background: #E9F4FF;
}
table.paleBlueRows tr:nth-child(even) {
  background: #D0E4F5;
}
table.paleBlueRows tfoot td {
  font-size: 14px;
}




//player not from form 
{id: "1", type: "player", attributes: {…}}
attributes: {name: "Jack", age: 25, gender: "agender", characters: Array(4)}
id: "1"
type: "player"
__proto__: Object
{{id: player.id}, ...player.attributes}

//player from form 
{id: 6, name: "asdf", age: 23, gender: "sadf", created_at: "2020-06-08T17:56:29.053Z", …}
age: 23
created_at: "2020-06-08T17:56:29.053Z"
gender: "sadf"
id: 6
name: "asdf"
updated_at: "2020-06-08T17:56:29.053Z"
__proto__: Object