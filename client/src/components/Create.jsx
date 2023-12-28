import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

export async function action({ request, params }) {
  try {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    const nama = updates.nama;
    const gender = updates.gender;
    const tglLahir = updates.tglLahir;
    const tempatLahir = updates.tempatLahir;
    const noHp = updates.noHp;
    const asuransi = updates.asuransi;
    const noAsuransi = updates.noAsuransi;
    const poli = updates.poli;
    const keluhan = updates.keluhan;

    const requestBody = {
      nama,
      gender,
      tglLahir,
      noHp,
      asuransi,
      tempatLahir,
      noAsuransi,
      poli,
      keluhan,
    };

    console.log("ini request", requestBody);
    const apiUrl = `https://crud-uas-react-mongodb.vercel.app/pasien`;
    const response = await axios.post(apiUrl, requestBody);
    return { data: response.data, message: "data berhasil disimpan" };
  } catch (error) {
    console.log(error);
    return { message: "data gagal disimpan" };
  }
}

export async function loader({ params }) {
  const uid = params?.id;
  try {
    const apiUrl = `https://crud-uas-react-mongodb.vercel.app/pasiens`;
    const response = await axios.get(apiUrl);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export default function Create() {
  const phs = useLoaderData();
  const status = useActionData() || "";
  const [nama, setNama] = useState("");
  const [gender, setGender] = useState("");
  const [tglLahir, settgl] = useState("");
  const [noHp, setNohp] = useState("");
  const [asuransi, setAsuransi] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [noAsuransi, setNoasuransi] = useState("");
  const [poli, setPoli] = useState("");
  const [keluhan, setKeluhan] = useState("");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(status?.message);
    if (status?.message) {
      alert(status.message);
      if (status.message === "data berhasil disimpan") {
        setNama("");
        setGender("");
        settgl("");
        setNohp("");
        setAsuransi("");
        setTempatLahir("");
        setNoasuransi("");
        setPoli("");
        setKeluhan("");
        setOpen(false);
      }
    }
  }, [status]);

  return (
    <>
      <div style={{ margin: "4rem" }}>
        { open &&
          <>
            <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
              FORMULIR PENDAFTARAN PASIEN
            </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
                border: "2px solid white",
                padding: "2rem",
                borderRadius: "1rem",
              }}
            >
              <Form method="POST">
                <div className="form-input">
                  <label>Nama</label>
                  <input
                    name="nama"
                    type="text"
                    value={nama}
                    onInput={(e) => setNama(e.target.value)}
                    required
                  />
                </div>
                <div className="form-input">
                  <label>gender</label>
                  <select
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="laki-laki">Laki-Laki</option>
                    <option value="perenpuan">Perempuan</option>
                  </select>
                </div>
                <div className="form-input">
                  <label>Tanggal Lahir</label>
                  <input
                    name="tglLahir"
                    type="date"
                    value={tglLahir}
                    onInput={(e) => settgl(e.target.value)}
                    required
                  />
                </div>
                <div className="form-input">
                  <label>Nomor HP</label>
                  <input
                    name="noHp"
                    type="number"
                    value={noHp}
                    onInput={(e) => setNohp(e.target.value)}
                    required
                  />
                </div>
                <div className="form-input">
                  <label>Asuransi Kesehatan</label>
                  <select
                    name="asuransi"
                    value={asuransi}
                    onChange={(e) => setAsuransi(e.target.value)}
                    required
                  >
                    <option value="ya">Ya</option>
                    <option value="tidak">Tidak</option>
                  </select>
                </div>
                <div className="form-input">
                  <label>Tempat Lahir</label>
                  <input
                    name="tempatLahir"
                    type="text"
                    value={tempatLahir}
                    onInput={(e) => setTempatLahir(e.target.value)}
                    required
                  />
                </div>
                <div className="form-input">
                  <label>Nomor Asuransi</label>
                  <input
                    name="noAsuransi"
                    type="number"
                    value={noAsuransi}
                    onInput={(e) => setNoasuransi(e.target.value)}
                    required
                  />
                </div>
                <div className="form-input">
                  <label>Poli</label>
                  <input
                    name="poli"
                    type="text"
                    value={poli}
                    onInput={(e) => setPoli(e.target.value)}
                    required
                  />
                </div>
                <div className="form-input">
                  <label>Keluhan</label>
                  <textarea
                    name="keluhan"
                    value={keluhan}
                    onInput={(e) => setKeluhan(e.target.value)}
                  ></textarea>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    gap: "1rem",
                    marginTop: "2rem",
                  }}
                >
                  <button type="submit">Simpan</button>
                </div>
              </Form>
            </div>
          </>
        }
        
          <>
            <h1 style={{ textAlign: "center", margin: "2rem 0" }}>
              DAFTAR DATA PASIEN KLINK SEHAT-i
            </h1>
            <div style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
            <button style={{display: open? "none": "block"}} onClick={()=>setOpen(true)}>Tambah data</button>
            </div>
            <div
              style={{
                borderRadius: "1rem",
              }}
            >
              {phs.length > 0 ? phs?.map((pasien) => (
                <div
                  key={pasien._id}
                  style={{
                    margin: "0.5rem 0",
                    border: "0.25px solid black",
                    padding: "2rem",
                    borderRadius: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <div className="form-display">
                    <h2>{`${pasien.nama}`}</h2>
                    <p>{`${pasien.gender}`}</p>
                  </div>
                  <Link to={`/${pasien._id}`} style={{ color: "white" }}>
                    <button>Detail</button>
                  </Link>
                </div>
              )) : 
              <div style={{display:"flex", justifyContent: "center", alignItems: "center", padding: "2rem", border: "0.25px solid black",
                    margin: "2rem 0",
                    padding: "2rem",
              borderRadius: "0.5rem",}}>
                <p>tidak ada data</p>
              </div>
              }
            </div>
          </>

      </div>
    </>
  );
}
