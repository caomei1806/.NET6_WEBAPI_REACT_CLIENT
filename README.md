# .NET6_WEBAPI_REACT_CLIENT

## TEMPORARY DOCS:
#### Client : React App http://localhost:3000
##### ROUTING
###### /
**NOT LOGGED IN**  
Wyświetla tablice ogłoszeń
**LOGGED IN**  
Wyświetla Panel Edycji ogłoszeń z możliwością edycji i usuniecia

###### /jobs-create 
**LOGGED IN**  
Wyświetla Panel Dodaj ogloszenie 

###### /api/login
**NOT LOGGED IN**  
Wyświetla Panel logowania **dane do logowania podane pod email inputem"


------------------
#### Server : ASP.NET CORE 6 minimal API https://localhost:3000
##### Launching with SwaggerUI
##### GENERAL INFO 
##### ENDPOINTS:
###### /jobs
  GET: zwraca listę dostępnych ogłoszeń o prace

###### /jobs/{id}

  GET: zwraca pojedyncze ogłoszenie

###### /jobs-create

  POST: 
    -pozwala na dodanie nowego ogłoszenia
    -obsługuje Autoryzację
    -pozwala na wykonanie żadania tylko autoryzowanym użytkownikom Role = "admin"
###### /jobs-update

  PUT: 
    -pozwala na edycję ogłoszenia
    -obsługuje Autoryzację
    -pozwala na wykonanie żadania tylko autoryzowanym użytkownikom Role = "admin"
###### /jobs-delete/{id}

  DELETE:
    - pozwala na usunięcie wybranego po id ogłoszenia
    -obsługuje Autoryzację
    -pozwala na wykonanie żadania tylko autoryzowanym użytkownikom Role = "admin"
###### /api/login
  zwraca JWT pozwalający na autoryzację



