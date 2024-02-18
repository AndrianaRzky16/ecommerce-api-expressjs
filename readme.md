## Instalasi:

- Pastikan Anda telah menginstal Node.js dan npm (Node Package Manager) di komputer Anda.
- Buat proyek baru dengan menggunakan Express.js. Anda dapat mengikuti panduan instalasi di sini.

## Buat dan Jalankan Titik Akhir API:

- Setelah menginstal Express.js, buat titik akhir API yang sesuai dengan kebutuhan Anda. Anda dapat menambahkan rute untuk pengguna, produk, keranjang, item keranjang, dan pesanan.
- Pastikan server Anda berjalan dengan menjalankan perintah npm start atau node server.js.

## Operasi CRUD dan Metode HTTP:

- Anda dapat menggunakan metode HTTP berikut untuk berinteraksi dengan API Anda:

* GET: Untuk mengambil data.
* POST: Untuk menambahkan data.
* PUT: Untuk memperbarui data.
* DELETE: Untuk menghapus data.

## Menguji API dengan Postman:

- Unduh dan instal Postman jika Anda belum melakukannya.
- Buka Postman dan buat koleksi baru untuk API Anda.
- Tambahkan permintaan (request) untuk setiap rute yang telah Anda buat.
- Atur parameter, header, dan body sesuai dengan kebutuhan.
- Jalankan permintaan dan periksa respons dari server.

## Perbaiki Masalah ‘Access-Control-Allow-Origin’:

- Jika Anda menghadapi masalah CORS (Cross-Origin Resource Sharing), pastikan Anda mengatur header yang benar di server Anda. Anda dapat menambahkan middleware atau mengonfigurasi server Anda agar mengizinkan permintaan dari domain tertentu.

## Panduan Penggunaan API

- Berikut ini adalah panduan penggunaan API yang telah disediakan. Pastikan untuk mengikuti langkah-langkah dengan benar untuk menggunakan API dengan tepat.

## Registrasi Pengguna Baru

1. Buka aplikasi Postman.
2. Pilih metode POST.
3. Masukkan URL endpoint: http://localhost:PORT/register (pastikan untuk mengganti PORT dengan port yang digunakan oleh server Anda).
4. Pilih tab "Body".
5. Pilih "raw" dan atur jenis konten menjadi "JSON (application/json)".
6. Masukkan data pengguna baru dalam format JSON seperti di bawah ini:

{
"email": "andrianarizki@gmail.com",
"password": "password",
"name": "Andriana Rizki",
"roleId": 2
}

## Login Pengguna

1. Pilih metode POST.
2. Masukkan URL endpoint: http://localhost:PORT/login.
3. Pilih tab "Body".
4. Pilih "raw" dan atur jenis konten menjadi "JSON (application/json)".
5. Masukkan kredensial login pengguna dalam format JSON seperti di bawah ini:

{
"email": "andrianarizki@gmail.com",
"password": "password"
}

## Product Routes

1. Membuat Produk Baru

- Metode: POST
- URL Endpoint: http://localhost:PORT/products
- Body:
- Pilih "raw" dan atur jenis konten menjadi "JSON (application/json)".
- Masukkan detail produk baru dalam format JSON seperti ini:

{
"name": "Laptop ABC",
"description": "Powerful laptop for professional use.",
"price": 3000,
"stock": 30,
"image": "laptop_abc.jpg"
}

2. Mendapatkan Produk Berdasarkan ID

- Metode: GET
- URL Endpoint: http://localhost:PORT/products/:id
- Ganti :id dengan ID produk yang ingin Anda dapatkan.

3. Mendapatkan Semua Produk

- Metode: GET
- URL Endpoint: http://localhost:PORT/products

4. Mengupdate Produk Berdasarkan ID

- Metode: PUT
- URL Endpoint: http://localhost:PORT/products/:id
- Ganti :id dengan ID produk yang ingin Anda update.
- Body:
- Pilih "raw" dan atur jenis konten menjadi "JSON (application/json)".
- Masukkan detail perubahan produk dalam format JSON yang sesuai.

5. Menghapus Produk Berdasarkan ID

- Metode: DELETE
- URL Endpoint: http://localhost:PORT/products/:id
- Ganti :id dengan ID produk yang ingin Anda hapus.

## Cart Routes

1. Membuat Keranjang Belanja Baru

- Metode: POST
- URL Endpoint: http://localhost:PORT/cart
- Headers:
- Tambahkan header Authorization dengan nilai Bearer <token> (ganti <token> dengan token JWT yang Anda dapatkan setelah login).

Response:

{
"success": true,
"message": "Cart created successfully",
"cart": {
"id": 1,
"userId": 1,
"CartItems" [
// Sebelum Create Cart Items maka disini akan Kosong,
// Setelah Create Cart Items akan muncul
{
"success": true,
"cart": {
"id": 1,
"userId": 1,
"createdAt": "2024-02-18T12:00:00.000Z",
"updatedAt": "2024-02-18T12:00:00.000Z",
"cartItems": [
{
"id": 1,
"cartId": 1,
"productId": 2,
"quantity": 2,
"createdAt": "2024-02-18T12:00:00.000Z",
"updatedAt": "2024-02-18T12:00:00.000Z",
"product": {
"id": 2,
"name": "Product Name",
"description": "Product Description",
"price": 100.00,
"stock": 10,
"image": "product_image.jpg",
"createdAt": "2024-02-18T12:00:00.000Z",
"updatedAt": "2024-02-18T12:00:00.000Z"
}
}
]
}
}

]
"createdAt": "2024-02-18T12:00:00.000Z",
"updatedAt": "2024-02-18T12:00:00.000Z"
}
}

2. Mendapatkan Keranjang Belanja Berdasarkan ID Pengguna

- Metode: GET
- URL Endpoint: http://localhost:PORT/cart
- Headers:
- Tambahkan header Authorization dengan nilai Bearer <token> (ganti <token> dengan token JWT yang Anda dapatkan setelah login).

3. Menghapus Keranjang Belanja Berdasarkan ID Pengguna

- Metode: DELETE
- URL Endpoint: http://localhost:PORT/cart/:id
- Ganti :id dengan ID keranjang belanja yang ingin Anda hapus.
- Headers:
- Tambahkan header Authorization dengan nilai Bearer <token> (ganti <token> dengan token JWT yang Anda dapatkan setelah login).

## Cart Items Routes

1. Membuat Item Keranjang Belanja Baru

- Metode: POST
- URL Endpoint: http://localhost:PORT/cartItem
- Headers:
- Tambahkan header Authorization dengan nilai Bearer <token> (ganti <token> dengan token JWT yang Anda dapatkan setelah login).
- Body:
- Pilih "raw" dan atur jenis konten menjadi "JSON (application/json)".
- Masukkan detail item keranjang belanja dalam format JSON seperti ini:

{
"cartId": 1,
"productId": 2,
"quantity": 2
}

Response:

{
"success": true,
"message": "Cart item created successfully",
"cartItem": {
"id": 1,
"cartId": 1,
"productId": 2,
"quantity": 2,
"createdAt": "2024-02-18T12:00:00.000Z",
"updatedAt": "2024-02-18T12:00:00.000Z"
}
}

2. Mendapatkan Item Keranjang Belanja Berdasarkan ID Keranjang

- Metode: GET
- URL Endpoint: http://localhost:PORT/cartItem
- Headers:
- Tambahkan header Authorization dengan nilai Bearer <token> (ganti <token> dengan token JWT yang Anda dapatkan setelah login).

3. Menghapus Item Keranjang Belanja Berdasarkan ID

- Metode: DELETE
- URL Endpoint: http://localhost:PORT/cartItem/:id
- Ganti :id dengan ID item keranjang belanja yang ingin Anda hapus.
- Headers:
- Tambahkan header Authorization dengan nilai Bearer <token> (ganti <token> dengan token JWT yang Anda dapatkan setelah login).

## Orders Rutes

1. Membuat Pesanan Baru

- Metode: POST
- URL Endpoint: http://localhost:PORT/order
- Headers:
- Tambahkan header Authorization dengan nilai Bearer <token> (ganti <token> dengan token JWT yang Anda dapatkan setelah login).

Response:

{
"success": true,
"message": "Order created successfully",
"order": {
"id": 1,
"userId": 1,
"status": "pending",
"paymentStatus": null,
"createdAt": "2024-02-18T12:00:00.000Z",
"updatedAt": "2024-02-18T12:00:00.000Z"
}
}

2. Membuat Item Pesanan Baru

- Metode: POST
- URL Endpoint: http://localhost:PORT/orderItems
- Headers:
- Tambahkan header Authorization dengan nilai Bearer <token> (ganti <token> dengan token JWT yang Anda dapatkan setelah login).
- Body:
- Pilih "raw" dan atur jenis konten menjadi "JSON (application/json)".
- Masukkan detail item pesanan dalam format JSON seperti ini:

{
"orderId": 1,
"productId": 2,
"quantity": 2
}

Response:

{
"success": true,
"message": "Order item created successfully",
"orderItem": {
"id": 1,
"orderId": 1,
"productId": 2,
"quantity": 2,
"paymentStatus": Pending, // sebelum create Payment maka akan Pending ketika sudah create payment makan jadi done
"createdAt": "2024-02-18T12:00:00.000Z",
"updatedAt": "2024-02-18T12:00:00.000Z"
}
}

3. Melakukan Pembayaran

- Metode: POST
- URL Endpoint: http://localhost:PORT/payment
- Headers:
- Tambahkan header Authorization dengan nilai Bearer <token> (ganti <token> dengan token JWT yang Anda dapatkan setelah login).

Response:

{
"success": true,
"message": "Payment successful",
"payment": {
"id": 1,
"orderId": 1,
"amount": 200.00,
"currency": "USD",
"status": "completed",
"paymentDate": "2024-02-18T12:00:00.000Z",
"createdAt": "2024-02-18T12:00:00.000Z",
"updatedAt": "2024-02-18T12:00:00.000Z"
}
}

4. Mendapatkan Riwayat Item Pesanan Berdasarkan ID Pesanan

- Metode: GET
- URL Endpoint: http://localhost:PORT/history/orderItems/:id
- Ganti :id dengan ID pesanan yang ingin Anda dapatkan riwayat itemnya.
- Headers:
- Tambahkan header Authorization dengan nilai Bearer <token> (ganti <token> dengan token JWT yang Anda dapatkan setelah login).

5. Mendapatkan Riwayat Pembayaran

- Metode: GET
- URL Endpoint: http://localhost:PORT/history/payment
- Headers:
- Tambahkan header Authorization dengan nilai Bearer <token> (ganti <token> dengan token JWT yang Anda dapatkan setelah login).
- Pastikan Anda mengganti http://localhost:PORT dengan URL yang sesuai dengan server Anda dan port yang digunakan. Juga, pastikan Anda memiliki token JWT yang valid untuk menggunakan rute yang memerlukan otentikasi

Semoga panduan ini membantu Anda dalam menguji dan mengembangkan REST API dengan Express.js menggunakan Postman! 🚀
