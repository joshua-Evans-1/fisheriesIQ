# FisheriesIQ

FisheriesIQ is dedicated to advancing the understanding of fisheries biology and aquatic ecosystems in Minnesota. By delivering accessible tools for data analysis and educational visualization, it bridges the gap between complex scientific data and practical application. Designed to democratize access to critical information, FisheriesIQ empowers informed decision-making and fosters a deeper appreciation of aquatic environments. This platform serves as a comprehensive resource for exploring species, habitats, and behavior, equipping educators, anglers, and enthusiasts with the knowledge needed for meaningful engagement and sustainable practices.

---

### Docs
- [Server docs](/Docs/server.md)
- [Client docs](/Docs/client.md)

---

### Setup and Usage
1. Clone the repository:
```bash
git clone https://github.com/joshua-evans-1/FisheriesIQ.git
```
2. Install dependencies:
```bash
cd Server
npm install
cd ../WebClient
npm install
```
3. Configure the .env file with your database credentials.

    The server uses a `.env` file to manage sensitive configuration details like database credentials and server ports. Example:

```env
STATUS=dev
#Development
DEV_SERVER=<localhost>
DEV_PORT=1234
#Production 
PROD_SERVER=<server_ip>
PROD_PORT=5678

HOST=<sql_host>
USER=<sql_user>
PASSWORD=<sql_user_pass>
DB=fisheries
```
4. Start the server:
```bash
cd Server
npm run dev
```
5. start the client:
```bash
cd WebClient
npm start
```
---

### Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any new features or fixes.

---

