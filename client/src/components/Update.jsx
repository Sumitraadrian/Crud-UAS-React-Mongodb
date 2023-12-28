import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Link, redirect, useActionData, useLoaderData } from "react-router-dom";

export async function action({ request, params }) {
  try {
    const id = params?.id;
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

    console.log(requestBody);
    const apiUrl = `https://crud-uas-react-mongodb.vercel.app/pasien/${id}`;
    await axios.patch(apiUrl, requestBody);

    return redirect("/");
  } catch (error) {
    console.log(error);
    return { message: "data gagal diupdate" };
  }
}

export async function loader({ params }) {
  const id = params?.id;
  try {
    const apiUrl = `https://crud-uas-react-mongodb.vercel.app/pasien/id/${id}`;
    const response = await axios.get(apiUrl);

    return response.data;
  } catch (error) {
    return error;
  }
}

export default function Create() {
  const phs = useLoaderData();
  const { status } = useActionData() || "";
  const [nama, setNama] = useState(phs.nama||"");
  const [gender, setGender] = useState(phs.gender||"");
  const [tglLahir, settgl] = useState(phs.tglLahir||"");
  const [noHp, setNohp] = useState(phs.noHp||"");
  const [asuransi, setAsuransi] = useState(phs.asuransi||"");
  const [tempatLahir, setTempatLahir] = useState(phs.tempatLahir||"");
  const [noAsuransi, setNoasuransi] = useState(phs.noAsuransi||"");
  const [poli, setPoli] = useState(phs.poli||"");
  const [keluhan, setKeluhan] = useState(phs.keluhan||"");

  useEffect(() => {
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
      }
    }
  }, [status]);

  return (
    <>
      <div style={{ margin: "4rem" }}>
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
          EDIT DATA PASIEN
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
                <option value="perempuan">Perempuan</option>
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
              <Link to={"/"}>
                <button>Batal</button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
