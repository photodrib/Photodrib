

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	<meta name="description" content="Photodrib" />
	<meta name="author" content="Han Zuohao, Wang Yuxi, Wu Pangbo, Zhang Sheng" />
	<meta name="apple-mobile-web-app-capable" content="yes" /> 
	<script src="js/jquery-1.7.2.min.js"></script>
    <script src="js/jquery-ui-1.8.21.custom.min.js"></script>
    <script src="js/Knockout-2.1.0.js"></script>
	
	<title>Photodrib</title>

	<link rel="icon" href="favicon.ico" type="image/x-icon">

	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/Photodrib.css">
	
	<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script
src="http://maps.googleapis.com/maps/api/js?key=AIzaSyD4AmOld0gvXFP_LjlCibt75nf3cRZ9GEc&sensor=false">
</script>

<script>
function initialize()
{
var mapProp = {
  center:new google.maps.LatLng(51.508742,-0.120850),
  zoom:5,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };
var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

google.maps.event.addDomListener(window, 'load', initialize);
</script>
	

	    
	
</head>
<body onload="initialize()" onunload="GUnload()">
	
    <div id="body" class="unselectable">


        <div calss="metro appnavbar" style="margin-top: 50px; margin-right: 5px;">
			<ul>
				<a class="backbutton" href="javascript:closeApp()">
				<img src="img/Metro-Back-48.png" alt="Go back to Dashboard">
				</a>
				<h1 class="start">View Photo</h1>
				
			</ul>
		</div>
		<div style="border-color:#FFA500;border-style:solid">
                    <img src="001.JPG" data-bind="attr: {src: photo}"  />
        </div>
		<div id="googleMap" style="width: 500px; height: 300px"></div>
		



</body>



    </script>
    

	
</html>