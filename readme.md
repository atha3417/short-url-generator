# Short URL Generator

Aplikasi ini adalah pembuat Short URL yang menggunakan **Node.js** dan **MySQL**.

## Cara Menjalankan Aplikasi

1. Clone repository ini ke direktori lokal Anda:

    ```bash
    git clone https://github.com/atha3417/short-url-generator.git
    cd short-url-generator
    ```

2. Install dependensi yang dibutuhkan:

    ```bash
    npm install
    ```

3. Import database dari file `db.sql`:

    ```bash
    mysql -u root -p shorturl < db.sql
    ```

4. Sesuaikan credential database di file `utils/db.js`:

    ```javascript
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'shorturl',
    });
    ```

5. Jalankan server:

    ```bash
    npm start
    ```

6. Akses aplikasi di `http://localhost:3000`.

## Kontak

Instagram: [@mhqif](https://instagram.com/mhqif)
