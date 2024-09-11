
/* add code here */

var daysOfWeek = new Array("Mon", "Tues", "Wed", "Thur", "Fri");
daysOfWeek.push("Sat");
daysOfWeek.push("Sun");
// document.write(daysOfWeek+"<br/>");

document.write("<table border=1>");
document.write("<tr>");
for (var i = 0; i < daysOfWeek.length; i++) {
    if (daysOfWeek[i].length < 4)
        day = daysOfWeek[i];
    else
        day = "<em>" + daysOfWeek[i] + "</em>";
    document.write("<th>" + day + "</th>");
}
document.write("</tr>");

for (let i = 1; i < 31; i++) {
    if(i % 7 == 1)
        document.write("<tr>");
    else if(i % 7  == 0){
        document.write("<th>" + i + "</th>");
        document.write("</tr>");
        continue;
    }
    document.write("<th>" + i + "</th>");
}
