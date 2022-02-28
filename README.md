## .NET6_WEBAPI_REACT_CLIENT
# JobBoard
Aplikacja JobBoard z Panelem Administratora z wykorzystaniem bazy danych **SQLite**

Run React App in development mode
```
npm start
```

Run and debug the JobBoardServer
```
>JobBoardServer
```

## TEMPORARY DOCS:
#### Client : React App http://localhost:3000
#### GENERAL OVERWIEW
###### W początkowym trybie
Przegląd listy ogłoszeń o pracę
Zalogowanie sie do Panelu Administratora 
###### Po zalogowaniu na konto email:**karo.admin@email.com** password:**haslo123**
Przegląd listy ogłoszeń oraz ich edycje i usuniecie\
Dodanie nowego ogloszenia **Po zalogowaniu pojawi sie link w Nawigacji**\
Akcje CUD z **CRUD** moze wykonac tylko uzytkownik zalogowany z rola **admin**\
Mozna sie tez zalogowac kontem, ktore ma przydzielone zwykla role uzytkownika **via.admin@email.com** **haslo321**. Wyswietli mu sie panel administratora, jednak nie bedzie mogl wykonac akcji **CUD**

#### ROUTING
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
Wyświetla Panel logowania **dane do logowania podane pod email inputem**  
#### NIEOBSLUZONE ASPEKTY APLIKACJI
* Nie ma procedury wylogowania.  
* Brak obslugi rol uzytkowanika - zalogowany uzytkownik majacy role "user" ma dostep do panelow admin ale nie moze wykonywac operacji CUD
* Dlugosc zycia JWT to 15 minut - brak refresh token
------------------
### Server : ASP.NET CORE 6 minimal API https://localhost:3000
##### Launching with SwaggerUI
#### GENERAL INFO 
#### ENDPOINTS:
###### /jobs
  **GET:**  
    -zwraca listę dostępnych ogłoszeń o prace

###### /jobs/{id}

  **GET:**  
    -zwraca pojedyncze ogłoszenie

###### /jobs-create

  **POST:** 
      pozwala na dodanie nowego ogłoszenia  
    -obsługuje Autoryzację  
    -pozwala na wykonanie żadania tylko autoryzowanym użytkownikom Role = "admin"  
###### /jobs-update

  **PUT:** 
      pozwala na edycję ogłoszenia  
    -obsługuje Autoryzację  
    -pozwala na wykonanie żadania tylko autoryzowanym użytkownikom Role = "admin"  
###### /jobs-delete/{id}

  **DELETE:** 
       pozwala na usunięcie wybranego po id ogłoszenia  
    -obsługuje Autoryzację  
    -pozwala na wykonanie żadania tylko autoryzowanym użytkownikom Role = "admin"  
###### /api/login  
  zwraca JWT pozwalający na autoryzację
  
#### NIEOBSLUZONE ASPEKTY APLIKACJI
* Nie ma procedury wylogowania i registracji.  



