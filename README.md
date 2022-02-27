# .NET6_WEBAPI_REACT_CLIENT

## TEMPORARY DOCS:

#### Server : ASP.NET CORE 6 minimal API 
 
##### ENDPOINTS:
###### /jobs
  GET: zwraca listę dostępnych ogłoszeń o prace
-
###### /jobs/{id}
-
  GET: zwraca pojedyncze ogłoszenie
-
###### /jobs-create
-
  POST: 
    -pozwala na dodanie nowego ogłoszenia
    -obsługuje Autoryzację
    -pozwala na wykonanie żadania tylko autoryzowanym użytkownikom Role = "admin"
###### /jobs-update
------------------
  PUT: 
    -pozwala na edycję ogłoszenia
    -obsługuje Autoryzację
    -pozwala na wykonanie żadania tylko autoryzowanym użytkownikom Role = "admin"
###### /jobs-delete/{id}
-
  DELETE:
    - pozwala na usunięcie wybranego po id ogłoszenia
    -obsługuje Autoryzację
    -pozwala na wykonanie żadania tylko autoryzowanym użytkownikom Role = "admin"
###### /api/login
  - zwraca JWT pozwalający na autoryzację



