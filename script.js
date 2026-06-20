let isAdmin = false;

// default password
if(!localStorage.getItem("passwordAdmin")){
    localStorage.setItem("passwordAdmin", "admin123");
}

// ================= LOGIN =================
function login(){

    let pass = document.getElementById("password").value;
    let saved = localStorage.getItem("passwordAdmin");

    if(pass === saved){

        isAdmin = true;
        localStorage.setItem("admin", "true");

        updateUI();

        tampilkanSayur();

        alert("Login berhasil!");

    } else {
        alert("Password salah!");
    }
}

// ================= LOGOUT =================
function logout(){

    isAdmin = false;
    localStorage.removeItem("admin");

    updateUI();

    tampilkanSayur();

    alert("Logout berhasil!");
}

// ================= UPDATE UI =================
function updateUI(){

    if(isAdmin){

        document.getElementById("loginBox").style.display = "none";
        document.getElementById("tombolLogout").style.display = "block";
        document.getElementById("tombolAdmin").style.display = "block";
        document.getElementById("gantiSandiBox").style.display = "block";

    } else {

        document.getElementById("loginBox").style.display = "block";
        document.getElementById("tombolLogout").style.display = "none";
        document.getElementById("tombolAdmin").style.display = "none";
        document.getElementById("gantiSandiBox").style.display = "none";
    }
}

// ================= GANTI PASSWORD =================
function gantiPassword(){

    let baru = document.getElementById("passBaru").value;

    if(baru.length < 4){
        alert("Password terlalu pendek!");
        return;
    }

    localStorage.setItem("passwordAdmin", baru);

    alert("Password berhasil diganti!");
}

// ================= TAMBAH =================
function tambahSayur(){

    let nama = prompt("Nama sayur:");
    let harga = prompt("Harga:");
    let stok = prompt("Stok:");

    let data = { nama, harga, stok };

    let daftar = JSON.parse(localStorage.getItem("sayur")) || [];

    daftar.push(data);

    localStorage.setItem("sayur", JSON.stringify(daftar));

    tampilkanSayur();
}

// ================= TAMPILKAN =================
function tampilkanSayur(){

    let tabel = document.getElementById("tabelSayur");

    tabel.innerHTML = `
        <tr>
            <th>Nama</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Aksi</th>
        </tr>
    `;

    let daftar = JSON.parse(localStorage.getItem("sayur")) || [];

    daftar.forEach((item, index) => {

        let baris = tabel.insertRow();

        baris.insertCell(0).innerHTML = item.nama;
        baris.insertCell(1).innerHTML = "Rp " + item.harga;
        baris.insertCell(2).innerHTML = item.stok;

        let aksi = "";

        if(isAdmin){
            aksi = `
                <button onclick="editSayur(${index})">Edit</button>
                <button onclick="hapusSayur(${index})">Hapus</button>
            `;
        }

        baris.insertCell(3).innerHTML = aksi;
    });

    hitungTotal();
}

// ================= HAPUS =================
function hapusSayur(index){

    let daftar = JSON.parse(localStorage.getItem("sayur")) || [];

    daftar.splice(index, 1);

    localStorage.setItem("sayur", JSON.stringify(daftar));

    tampilkanSayur();
}

// ================= EDIT =================
function editSayur(index){

    let daftar = JSON.parse(localStorage.getItem("sayur")) || [];

    let n = prompt("Nama:", daftar[index].nama);
    let h = prompt("Harga:", daftar[index].harga);
    let s = prompt("Stok:", daftar[index].stok);

    daftar[index] = { nama: n, harga: h, stok: s };

    localStorage.setItem("sayur", JSON.stringify(daftar));

    tampilkanSayur();
}

// ================= SEARCH =================
function cariSayur(){

    let kata = document.getElementById("cariSayur").value.toLowerCase();

    let tabel = document.getElementById("tabelSayur");

    tabel.innerHTML = `
        <tr>
            <th>Nama</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Aksi</th>
        </tr>
    `;

    let daftar = JSON.parse(localStorage.getItem("sayur")) || [];

    daftar.forEach((item, index) => {

        if(item.nama.toLowerCase().includes(kata)){

            let baris = tabel.insertRow();

            baris.insertCell(0).innerHTML = item.nama;
            baris.insertCell(1).innerHTML = "Rp " + item.harga;
            baris.insertCell(2).innerHTML = item.stok;

            let aksi = "";

            if(isAdmin){
                aksi = `
                    <button onclick="editSayur(${index})">Edit</button>
                    <button onclick="hapusSayur(${index})">Hapus</button>
                `;
            }

            baris.insertCell(3).innerHTML = aksi;
        }
    });
}

// ================= TOTAL =================
function hitungTotal(){

    let daftar = JSON.parse(localStorage.getItem("sayur")) || [];

    let total = 0;

    daftar.forEach(item => {
        total += (parseInt(item.harga) || 0) * (parseInt(item.stok) || 0);
    });

    document.getElementById("totalHarga").innerText =
    "Total: Rp " + total;
}

// ================= INIT =================
window.onload = function(){

    if(localStorage.getItem("admin") === "true"){
        isAdmin = true;
    }

    updateUI();
    tampilkanSayur();
};
function togglePassword(){

    let pass = document.getElementById("password");

    if(pass.type === "password"){
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}