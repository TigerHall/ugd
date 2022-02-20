function fix_mathml_for_ios() {

if ((navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1)) {
	// change the stylesheet (to hide alternative images for maths, leaving mathml displaying

	var oldlink = document.getElementsByTagName("link").item(0);
	
	var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", "../Styles/cup-bits-epub3-math.css");
 
        document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
		
	}
	
};


window.onload = fix_mathml_for_ios;