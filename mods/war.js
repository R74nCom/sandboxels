elements.land =  {
color: "#096600",
category: "war",
behavior: behaviors.WALL,
};
elements.red =  {
name: "redville",
color: "#880000",
category: "war",
behavior: [
"XX|CH:land>red%50 AND CH:blu>land%25 AND CH:kerdly>suselle%5|XX",
"CH:land>red%50 AND CH:blu>land%25 AND CH:kerdly>suselle%5|XX|CH:land>red%50 AND CH:blu>land%25 AND CH:kerdly>suselle%5",
"XX|CH:land>red%50 AND CH:blu>land%25 AND CH:kerdly>suselle%5|XX",
],
};
elements.blu =  {
name: "blue city",
color: "#000088",
category: "war",
behavior: [
"XX|CH:land>blu%50 AND CH:red>land%25 AND CH:kerdly>kralsei%5|XX",
"CH:land>blu%50 AND CH:red>land%25 AND CH:kerdly>kralsei%5|XX|CH:land>blu%50 AND CH:red>land%25 AND CH:kerdly>kralsei%5",
"XX|CH:land>blu%50 AND CH:red>land%25 AND CH:kerdly>kralsei%5|XX",
],
};
elements.kerdly =  {
name: "water",
category: "war",
color: "#5599ff",
behavior: behaviors.WALL,
};
elements.suselle =  {
name: "redville water",
category: "war",
color: "#7777dd",
behavior: [
"XX|CH:land>red%50 AND CH:blu>land%25 AND CH:kerdly>suselle%5 AND CH:kralsei>suselle%1|XX",
"CH:land>red%50 AND CH:blu>land%25 AND CH:kerdly>suselle%5 AND CH:kralsei>suselle%1|XX|CH:land>red%50 AND CH:blu>land%25 AND CH:kerdly>suselle%5 AND CH:kralsei>suselle%1",
"XX|CH:land>red%50 AND CH:blu>land%25 AND CH:kerdly>suselle%5 AND CH:kralsei>suselle%1|XX",
],
};
elements.kralsei =  {
name: "blue city water",
category: "war",
color: "#3377ff",
behavior: [
"XX|CH:land>blu%50 AND CH:red>land%25 AND CH:kerdly>kralsei%5 AND CH:suselle>kralsei%1|XX",
"CH:land>blu%50 AND CH:red>land%25 AND CH:kerdly>kralsei%5 AND CH:suselle>kralsei%1|XX|CH:land>blu%50 AND CH:red>land%25 AND CH:kerdly>kralsei%5 AND CH:suselle>kralsei%1",
"XX|CH:land>blu%50 AND CH:red>land%25 AND CH:kerdly>kralsei%5 AND CH:suselle>kralsei%1|XX",
],
};
