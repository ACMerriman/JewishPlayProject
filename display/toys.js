window.onload = main;

function main()
{
    var name = getParameterByName("name");
    
    console.log(name);
    var data = {name:name};
    
    $.ajax({
		url: 'http://localhost:3000/toy',
		data:{data:JSON.stringify(data)},							
		success: function(data) {
			console.log('success');
			console.log(data);
			//g_data = data;
			setupPage(data);

		},
		error: function(data) {
			console.log('error');
			console.log(data);
			
			// two arguments: the id of the Timeline container (no '#')
			// and the JSON object or an instance of TL.TimelineConfig created from
			// a suitable JSON object
			//window.timeline = new TL.Timeline('timeline-embed', 'marktwain_test.json');
		}
    });
}

function setupPage(data)
{
    var htmlString = "";
    
    document.title = data.Name;
    htmlString += "<h1>" + data.Name + "</h1>";
    if(data.People && data.People.length > 0)
    {
        if(data.People.length == 1)
        {
            htmlString += "Founder: "
        }
        else
        {
            htmlString += "People: "
        }
        for(var i = 0; i < data.People.length; i++)
        {
            htmlString += "<a href='./people?name=" + data.People[i] + "'>" + data.People[i] + "</a><br />";
        }
    }
    if(data.Companies && data.Companies.length > 0)
    {
        if(data.Companies.length == 1)
        {
            htmlString += "Company: "
        }
        else
        {
            htmlString += "Companies: "
        }
        for(var i = 0; i < data.Companies.length; i++)
        {
            htmlString += "<a href='./companies?name=" + data.Companies[i] + "'>" + data.Companies[i] + "</a><br />";
        }
    }
    if(data.Description)
    {
        htmlString += data.Description;
    }
    if(data.Sources && data.Sources.length > 0)
    {
        htmlString += "<br/><br/>Sources:<br/>";
        for(var i = 0; i < data.Sources.length; i++)
        {
            var title = data.Sources[i];
            if(data.SourceTitles && data.SourceTitles[i])
            {
                title = data.SourceTitles[i];
            }
            htmlString += "<a href='" + data.Sources[i] + "' target='_blank'>" + title  + "</a><br/>";
        }
    }
    if(data.Picture)
    {
        htmlString += "<img src='" + data.Picture + "' alt='" + data.Name + "' /><br />";
    }
    
    console.log(htmlString);
    document.getElementById("infoContainer").innerHTML = htmlString;
}

function getParameterByName(name) {
    url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}