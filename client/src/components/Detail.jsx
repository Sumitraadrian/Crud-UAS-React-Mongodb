import React from "react";
import { useLoaderData, Link, Form,redirect} from "react-router-dom";
import axios from "axios";

export async function action({ request, params }) {
    const id = params?.id;

    let message;
    try {
        if (confirm("Hapus data ini?")) {
            const apiUrl = `https://crud-uas-react-mongodb.vercel.app/pasien/${id}`;
            const response = await axios.delete(apiUrl);
            message= "data berhasil dihapus";
            return redirect(`/`);
          }
        return {message};
    } catch (error) {
        console.log(error);
        message= "data gagal dihapus";
        return {message};
    }
}

export async function loader({ params }) {
  const id = params?.id;
  try {
    const apiUrl = `https://crud-uas-react-mongodb.vercel.app/pasien/id/${id}`;
    const response = await axios.get(apiUrl);

    return response.data;
  } catch (error) {
    console.log(error)
    return error;
  }
}

export default function Detail() {
  const mhs = useLoaderData();
  return (
    <div style={{margin: "4rem"}}>
    <h1 style={{textAlign: "center", marginBottom: "2rem"}}>DETAIL PASIEN</h1>
    <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignContent: "center", border: "2px solid white", padding: "2rem", borderRadius: "1rem"}}>

      <table>
        <tr>
          <th>Nama</th>
          <td>{`: ${mhs.nama}`}</td>
        </tr>
        <tr>
          <th>Jenis Kelamin</th>
          <td>{`: ${mhs.gender}`}</td>
        </tr>
        <tr>
          <th>Tanggal Lahir</th>
          <td>{`: ${mhs.tglLahir}`}</td>
        </tr>
        <tr>
          <th>Nomor HP</th>
          <td>{`: ${mhs.noHp}`}</td>
        </tr>
        <tr>
          <th>Asuransi</th>
          <td>{`: ${mhs.asuransi}`}</td>
        </tr>
        <tr>
          <th>Tempat Lahir</th>
          <td>{`: ${mhs.tempatLahir}`}</td>
        </tr>
        <tr>
          <th>Nomor Asuransi</th>
          <td>{`: ${mhs.noAsuransi}`}</td>
        </tr>
        <tr>
          <th>Poli</th>
          <td>{`: ${mhs.poli}`}</td>
        </tr>
        <tr>
          <th>Keluhan</th>
          <td>{`: ${mhs.keluhan}`}</td>
        </tr>
      </table>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "end", marginTop: "4rem"}}>
        <Link to={`/${mhs._id}/update`} style={{ color: "white" }}>
          <button>Edit</button>
        </Link>
        <Form method="post">
          <button type="submit">Hapus</button>
        </Form>
        <Link to={`/`} style={{ color: "white" }}>
          <button>Kembali</button>
        </Link>
      </div>
      </div>
    </div>
  );
}
