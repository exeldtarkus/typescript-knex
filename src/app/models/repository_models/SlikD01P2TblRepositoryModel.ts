import {IRepositoryParam} from '../../repositories/IRepository';

type ColumnNames = '*' | keyof ISlikD01P2TblQueryOutput;

interface ISlikD01P2TblQueryParams extends IRepositoryParam<ColumnNames> {
  q?: {
    id?: number;
    cif?: number;
    period?: string;
    periodYear?: number;
    flagDetail?: string;
  };
}

interface ISlikD01P2TblQueryOutput {
  Period: string;
  Flag_Detail: string;
  Nomor_CIF_Debitur: string;
  Jenis_Identitas?: string | null;
  Nomor_Identitas?: string | null;
  Nama_Sesuai_Identitas?: string | null;
  Nama_Lengkap?: string | null;
  Kode_Status_Pendidikan_atau_Gelar_Debitur?: string | null;
  Jenis_Kelamin?: string | null;
  Tempat_Lahir?: string | null;
  Tanggal_Lahir?: string | null;
  Nomor_Pokok_Wajib_Pajak?: string | null;
  Alamat?: string | null;
  Kelurahan?: string | null;
  Kecamatan?: string | null;
  Kode_Kabupaten_atau_Kota?: string | null;
  Kode_Pos?: string | null;
  Nomor_Telepon?: string | null;
  Nomor_Telepon_Seluler?: string | null;
  Alamat_Surat_Elektronik?: string | null;
  Kode_Negara_Domisili?: string | null;
  Kode_Pekerjaan?: string | null;
  Tempat_Bekerja?: string | null;
  Kode_Bidang_Usaha_Tempat_Bekerja?: string | null;
  Alamat_Tempat_Bekerja?: string | null;
  Penghasilan_Kotor_Pertahun?: number | null;
  Kode_Sumber_Penghasilan?: string | null;
  Jumlah_Tanggungan?: number | null;
  Kode_Hubungan_Dengan_Pelapor?: string | null;
  Kode_Golongan_Debitur?: string | null;
  Status_Perkawinan_Debitur?: string | null;
  Nomor_Identitas_Pasangan?: string | null;
  Nama_Pasangan?: string | null;
  Tanggal_Lahir_Pasangan?: string | null;
  Perjanjian_Pisah_Harta?: string | null;
  Melanggar_BMPK_BMPD_BMPP?: string | null;
  Melampaui_BMPK_BMPD_BMPP?: string | null;
  Nama_Gadis_Ibu_Kandung?: string | null;
  Kode_Kantor_Cabang?: string | null;
  Operasi_Data?: string | null;
  validasi?: string | null;
  total_data?: number | null;
}

interface ISlikD01P2TblUpdatedParams {
  Period?: string;
  Flag_Detail?: string;
  Nomor_CIF_Debitur?: string;
  Jenis_Identitas?: string | null;
  Nomor_Identitas?: string | null;
  Nama_Sesuai_Identitas?: string | null;
  Nama_Lengkap?: string | null;
  Kode_Status_Pendidikan_atau_Gelar_Debitur?: string | null;
  Jenis_Kelamin?: string | null;
  Tempat_Lahir?: string | null;
  Tanggal_Lahir?: string | null;
  Nomor_Pokok_Wajib_Pajak?: string | null;
  Alamat?: string | null;
  Kelurahan?: string | null;
  Kecamatan?: string | null;
  Kode_Kabupaten_atau_Kota?: string | null;
  Kode_Pos?: string | null;
  Nomor_Telepon?: string | null;
  Nomor_Telepon_Seluler?: string | null;
  Alamat_Surat_Elektronik?: string | null;
  Kode_Negara_Domisili?: string | null;
  Kode_Pekerjaan?: string | null;
  Tempat_Bekerja?: string | null;
  Kode_Bidang_Usaha_Tempat_Bekerja?: string | null;
  Alamat_Tempat_Bekerja?: string | null;
  Penghasilan_Kotor_Pertahun?: number | null;
  Kode_Sumber_Penghasilan?: string | null;
  Jumlah_Tanggungan?: number | null;
  Kode_Hubungan_Dengan_Pelapor?: string | null;
  Kode_Golongan_Debitur?: string | null;
  Status_Perkawinan_Debitur?: string | null;
  Nomor_Identitas_Pasangan?: string | null;
  Nama_Pasangan?: string | null;
  Tanggal_Lahir_Pasangan?: string | null;
  Perjanjian_Pisah_Harta?: string | null;
  Melanggar_BMPK_BMPD_BMPP?: string | null;
  Melampaui_BMPK_BMPD_BMPP?: string | null;
  Nama_Gadis_Ibu_Kandung?: string | null;
  Kode_Kantor_Cabang?: string | null;
  Operasi_Data?: string | null;
  validasi?: string | null;
}

export {
  ISlikD01P2TblQueryParams,
  ISlikD01P2TblQueryOutput,
  ISlikD01P2TblUpdatedParams,
};
