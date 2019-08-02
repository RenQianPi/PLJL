var postfixList = ["163.com", "gmail.com", "126.com", "qq.com", "263.net"];
var txt = document.getElementById("input-email");
var sug = document.getElementById("email-sug-wrapper");
var nowSelectTipIndex=0;
sug.addEventListener("click",function(ev){
  //采用事件代理，监听父级点击事件，通过target获取当前li
  var ev=ev||window.event;
  var target=ev.target||ev.srcElement;
  if(target.nodeName.toLowerCase()=="ol"){
   hide();
   jiaodian();
   return txt.value= target.innerHTML;  
  }
 })
 document.addEventListener("keydown",jianpan);
// keys.addEventListener("keyup",function(){
//  console.log("event handle1");
// })
// keys.addEventListener("keypress",function(){
//  console.log("event handle2");
// })
// keys.addEventListener("keydown",function(){
//  console.log("event handle3");
// })
// keys.addEventListener("input",function(){
//  console.log("event handle4");
// })

//经过查看各个效果，oninput效果最符合需求。
txt.oninput = function () {//用户输入的监听
 console.log("event handle4");

 judge();//提示框的显示和隐藏
 add();//提示框内容的生成
}
//将txt的值修剪后传递给inputText
function getText() {
 var inputText = txt.value.trim();
 return inputText;
}
//判断是否生成新的数组
function postlist() {
 var userinput = getText();
 var newpostlist = new Array();
 if (userinput.search('@') != 0) 
 {
  var len = userinput.search('@');
  //用来拼接的用户输入内容 = 只使用@之后的字符串
  var x = userinput.substring(len + 1, userinput.length); //取@之后的部分
  for (var i = 0; i < postfixList.length; i++) //newpostlist为用户输入值@后面的内容与postfixlist后缀相匹配产生的新的数组
  {
   if (postfixList[i].search(x) == 0) //如果没有匹配的值search返回的值为-1
   {
    newpostlist.push(postfixList[i]);
   }
  }
  //若@后面没有字符或者新数组newpostlist为空，就返回原来的postfixlist
  if (x === '' || newpostlist == '') 
  {
   return postfixList;
  }
  return newpostlist;
 } 
 else 
 {
  return postfixList;//当@出现在用户输入的第一个位置时，提示为原数组
 }
}
//根据输入内容和匹配来生成提示数组
function promptContent() {
 var x = getText();
 var tips = new Array();
 if (x.indexOf("@") != -1)//判断输入的数组中是否含有@ 
 {
  var p = x.slice(0, x.indexOf("@"));
  for (i = 0; i < postlist().length; i++)//运用postlist()方法获取的数组，将slice()方法获取的@之前的数据与数组中的成员相结合，形成新的提示数组
   {
   tips[i] = p + "@" + postlist()[i];
  }
 } else
  {
  for (i = 0; i < postfixList.length; i++)//因为不包含@，直接将x的值与postfixList数组中的成员相结合，形成新的数组
   {
   tips[i] = x + "@" + postfixList[i];
  }
 }
 return tips;
}
//添加提示数组进入li
function add() {
 var sug = document.getElementById("email-sug-wrapper");
 var tips = promptContent();
 while (sug.hasChildNodes()) {// 如果元素有子节点，则返回true
  sug.removeChild(sug.firstChild);//循环删除掉以前列表的所有成员
 }
 //然后重新生成新的列表
 for (i = 0; i < tips.length; i++) {
  var tip_ol = document.createElement("ol");
  tip_ol.innerHTML = tips[i];
  sug.appendChild(tip_ol);
 }
 var list=document.getElementsByTagName("ol");
 list[0].setAttribute("class","active");
}

function judge() {
 //判空，是“”没有内容，不能为“　”
 if (getText() == "") {
  hide();
 } else {
  display();
 }
}
function hide() {
 sug.style.display = "none";
}
function display() {
 sug.style.display = "block";
}



function jianpan(){//键盘上三个按钮的监听
  var list=document.getElementsByTagName("ol");
  var e=e||window.event;
  var key=e.which||e.keyCode;//获取用户按下的键的值
 if(key==40){//按下下键
for(i=0;i<list.length;i++){
  list[i].setAttribute("class","");//将列表里面所有的成员的类重置
}
nowSelectTipIndex++;
if(nowSelectTipIndex>=list.length){
  nowSelectTipIndex=0;//当没有下一个选项时，重新跳转到第一个选项
}
list[nowSelectTipIndex].setAttribute("class","active");
 }
 if(key==38){//按下上键
for(i=0;i<list.length;i++){
list[i].setAttribute("class","");
}
nowSelectTipIndex--;
if(nowSelectTipIndex<0){
  nowSelectTipIndex=list.length-1;
}
list[nowSelectTipIndex].setAttribute("class","active");
 }
 if(key==13){
   hide();
return txt.value=list[nowSelectTipIndex].innerHTML;
 }
 if(key==27){
   txt.select()
 }
}

function jiaodian(){
  txt.focus();//设定焦点的位置在文本框
}