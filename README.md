# GoalHub - cel i opis projektu 

Projekt GoalHub to aplikacja realizująca żądania CRUD wykorzystująca technologie Spring Boot, React oraz MySQL. Aplikacja umożliwia użytkownikom dodawanie, edytowanie i usuwanie zadań, oznaczanie ich jako ukończone oraz śledzenie postępów za pomocą wykresów słupkowych.

Aby uzyskać dostęp do aplikacji, użytkownik musi najpierw przejść proces rejestracji. Następnie wysyła żądanie do REST API, które generuje JSON Web Token (JWT). Po jego otrzymaniu token jest przechowywany w Local Storage, co pozwala na autoryzację kolejnych żądań.

W celu zapewnienia prawidłowej komunikacji między frontendem a backendem, w aplikacji zaimplementowano mechanizm CORS (Cross-Origin Resource Sharing) w Spring Boot. Pozwala on na kontrolowanie, które domeny mogą uzyskiwać dostęp do zasobów API, co zwiększa bezpieczeństwo

# Wykorzystane technologie 

 Backend: Spring Boot → JWT (JSON Web Token), CORS , Interfejsy, żadania HTTP, obsługa wyjątków, dziedziczenie, Hashowanie hasła
 
 Frontend: React → axios, react-router-dom, obsługa JWT, Efekty Wizualne CSS, Hashowanie hasła

Baza danych: MYSQL Workbench → Relacja jeden do wielu między Task a User

# Kluczowe funkcjonalności: 

Konfiguracja zabezpieczeń i implementacja CORS:

CORS jest skonfigurowany w sposób, aby zezwalać na żądania z określonych domen (np. http://localhost:3000 ) oraz na określone metody HTTP i nagłówki. Dzięki temu aplikacja frontendowa działająca na podanym porcie może bezpiecznie komunikować się z backendem działającym na innym porcie. Dodatkowo, BCryptPasswordEncoder jest używany do haszowania haseł, a AuthenticationManager zarządza procesem uwierzytelniania.

Implementacja JWT (JSON Web Token): 

JwtAuthenticationFilter to filtr w Spring Boot, który sprawdza token JWT w nagłówku Authorization, uwierzytelnia użytkownika i zapisuje jego dane w SecurityContextHolder.
JWT (JSON Web Token) to bezstanowy token uwierzytelniający, zawierający nagłówek, ładunek z danymi użytkownika i podpis. Po zalogowaniu klient wysyła go w żądaniach, a serwer weryfikuje jego poprawność.

Uwierzytelnianie za pomocą biblioteki axios:

Funkcja login wysyła dane logowania (username, password) do backendu (POST /login) i zwraca otrzymaną odpowiedź. 
Funkcja register tworzy obiekt z danymi rejestracyjnymi (firstName, lastName, username, password, role), wysyła go jako JSON do backendu (POST /register) i zwraca odpowiedź.
Funkcja checkAuth sprawdza, czy w localStorage znajduje się token, co oznacza, że użytkownik jest zalogowany.

# Relacje w bazie danych:
<img width="500" alt="Zrzut ekranu 2025-02-24 o 17 30 24" src="https://github.com/user-attachments/assets/5ec31bf8-de3e-433b-901b-5f9e06949ab3" />


