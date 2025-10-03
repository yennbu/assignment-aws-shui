# assignment-aws-shui
Individuell inlämning för Utveckling och driftsättning i molnmiljöer


### Användning:
Klicka på loggan för att komma till startsidan.

Klicka på användaren inuti en anteckning för att sortera anteckningar efter den användaren

### Buggar
Det går inte att ladda om sidan när man är inne på en särskild användares anteckningar

Ibland hoppar placeholdern ut ur textrutan när man skriver en ny anteckning


### Användarvalidering
Jag har utnyttjat Zustand för att skapa custom hooks där jag sparar information om man är inloggad eller inte i localStorage

Det är inte den mest säkra användarvalideringen, men jag tycker att det funkar för den här uppgiften

### Fortsättning
Om jag hade fortsatt arbeta med appen hade jag

Sagt till att man bara kan redigera en anteckning i taget

Gjort så att man kan fästa/favoritmarkera anteckningar

Fixat buggen med att man inte kan ladda om sidan "/notes-for-user"
