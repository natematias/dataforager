(function(){

	// the minimum version of jQuery we want
	var v = "1.3.2";

	// check prior inclusion and version
	if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
		var done = false;
		var script = document.createElement("script");
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				initForager();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		initForager();
	}
        
        function validateTwitterAccount(twitter_account){
          nonalpha = twitter_account.match(/\W/)
          if(twitter_account.length > 0 && nonalpha == null){
            return true;
          }else{
            return false;
          }
        }

        function trim(stringToTrim) {
          return stringToTrim.replace(/^\s+|\s+$/g,"");
        }

	function initForager() {
          window.jQuery('head').append('<link rel="stylesheet" href="http://natematias.com/medialab/dataforager/dataforager.css" type="text/css" />');

          twitter_accounts = []
          matches = document.body.innerHTML.match(/@(<.*?>)?(.*?)</g);
          if(matches != null){
            window.jQuery.each(matches, function(index, value){
              acct = value.match(/>(.*?)</);
              if(acct!=null && acct.length >0){
                twitter_accounts.push(value.match(/>(.*?)</)[1])
              }
            });

          }
          matches = document.body.innerHTML.match(/(@.*?)(<| )/g);
          if(matches!=null){
            window.jQuery.each(matches, function(index, value){
              account = value.substring(1, value.length-1);
              if(account.length>1){
                twitter_accounts.push(account);
              }
            });
          }

          matches = unescape(document.body.innerHTML).match(/(http|https):\/\/twitter.com\/(.*?)"/g);
          if(matches!=null){
            window.jQuery.each(matches, function(index, value){
              if(value.match(/share?/) || value.match(/search(\/|\?)/)){
                account = null;
              }else if(value.match(/intent/)){
                m = value.match(/screen_name=(.*?)"/)
                if(m!=null) account = m[1]
              }else if(value.match(/#!/)){
                m = value.match(/(http|https):\/\/twitter.com\/#.*?\/(.*?)(\/|")/);
                if(m==null){
                  alert(value);
                }else{
                  account = m[2];
                }
              }else{
                account = value.match(/(http|https):\/\/twitter.com\/(.*?)(\/|")/)[2];
              }
              if(account!=null && account.length > 0){
                twitter_accounts.push(account);
              }
            });
          }

            //remove duplicates
          deduped_accounts = [];
          twitter_accounts.sort();
          for (var i = 0; i < twitter_accounts.length - 1; i++) {
            if (twitter_accounts[i + 1] == twitter_accounts[i]) {
              
            }else{
              deduped_accounts.push(twitter_accounts[i]);
            }
          }
          deduped_accounts.push(twitter_accounts[twitter_accounts.length-1]);
          twitter_accounts = deduped_accounts;

          //alert(twitter_accounts);

          window.jQuery('body').append("<div id='dataforager_main'><a href='javascript:window.jQuery(\"#dataforager_main\").remove();none;' style='display:inline-block; float:right'>(close)</a><h1>Data Forager Results</h1></div>");
          df_main = window.jQuery("#dataforager_main");
          df_main.append("<ul>");
          list = jQuery("#dataforager_main ul");
          window.jQuery.each(twitter_accounts, function(index, value){
            value = trim(value);
            if(validateTwitterAccount(value)){
              list.append("<li>@" + value + "</li>");
            }
          });
	}

})();
