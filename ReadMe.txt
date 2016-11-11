
note:

db.oauthclients.insert({clientId:"s6BhdRkqt3",clientSecret:"umakant"});

Before asking for access token, must signup and users  data can be found in oauthusers table

steps to use oauth2 server 

    Make POST request with username, password and grant_type.
 
1. localhost:8080/oauth/token

   => Method must be POST with application/x-www-form-urlencoded encoding

   => required parameters 
	a.username
        b.password
	c.grant_type = 'password'
  => Output
	{
  "token_type": "bearer",
  
           "access_token": "5adc333d84917a8ba17dfd88b846c9390af98e0e",
  
           "expires_in": 3600,
  
           "refresh_token": "86537a8b3a37fbbe93c2eef315e4a04199aa0ce8"

        }


    
once token expires make the refresh token call for new token
   
2. localhost:8080/oauth/token 
		
    => Requested method must be POST

    => required parameters

       a.refresh_token = "86537a8b3a37fbbe93c2eef315e4a04199aa0ce8"
	 
       b.grant_type = 'refresh_token'

    => Output	

	{
  "token_type": "bearer",
  
           "access_token": 5dc0ff0f6af36e501a6d6be82879a6d2266792a2
           "expires_in": 3600,
  
           "refresh_token": 457a3223594ec35438a4f16b8dbd3481fc9e04c7
        }
        
       
	 
