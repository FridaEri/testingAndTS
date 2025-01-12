# Hur man startar projektet:

Du börjar först med att lägga in informationen som finns i bd filen i din databas som du finner i backend mappen, sedan måste du lägga till en .env fil med PGURI och informationen till din databas för att backendet ska nå den

Efter det kan du köra npm install i vardera mapp, dvs frontend och sedan backend.

Du går sedan till backend och kör npm run dev

Öppna upp en ny terminal och gå in i frontend för att även där köra npm run dev. Klicka in på sidan som visas.

För att nå testdelen av projektet öppnar du ännu en terminal och går till frontend mappen, sedan skriver du in npx cypress open. Här väljer du vilken del du vill köra först. Det finns både E2E och komponent tester som man kan göra.
Viktigt att komma ihåg här är dock att de test som du måste köra först för E2E är signUp för att dom andra testen ska kunna köras då dom är baserade på att man redan har ett konto med informationen som man får ifrån just det testet.

# Vilka krav har uppnåtts? 

Alla krav för G.

Tack för en trevlig kurs!
God fortsättning och tack för tålamodet. 