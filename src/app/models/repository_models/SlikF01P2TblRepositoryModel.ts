import {IRepositoryParam} from '../../repositories/IRepository';

type ColumnNames = '*' | keyof ISlikF01P2TblQueryOutput;

interface ISlikF01P2TblQueryParams extends IRepositoryParam<ColumnNames> {
  q?: {
    id?: number;
    cif?: number;
    period?: string;
    periodYear?: number;
    flagDetail?: string;
  };
}

interface ISlikF01P2TblQueryOutput {
  Period: string;
  Flag_Detail: string;
  Nomor_Rekening_Fasilitas: string;
  Nomor_CIF_Debitur: string;
  Kode_Sifat_Kredit_atau_Pembiayaan?: string | null;
  Kode_Jenis_Kredit_atau_Pembiayaan?: string | null;
  Kode_Akad_Kredit_atau_Akad_Pembiayaan?: string | null;
  Nomor_Akad_Awal?: string | null;
  Tanggal_Akad_Awal?: string | null;
  Nomor_Akad_Akhir?: string | null;
  Tanggal_Akad_Akhir?: string | null;
  Frekuensi_Perpanjangan_Fasilitas_Kredit_atau_Pembiayaan?: number | null;
  Tanggal_Awal_Kredit_atau_Pembiayaan?: string | null;
  Tanggal_Mulai?: string | null;
  Tanggal_Jatuh_Tempo?: string | null;
  Kode_Kategori_Debitur?: string | null;
  Kode_Jenis_Penggunaan?: string | null;
  Kode_Orientasi_Penggunaan?: string | null;
  Kode_Sektor_Ekonomi?: string | null;
  Kode_Kabupaten_atau_Kota_Lokasi_Proyek?: string | null;
  Nilai_Proyek?: number | null;
  Kode_Valuta?: string | null;
  Suku_Bunga_atau_Imbalan?: number | null;
  Jenis_Suku_Bunga_atau_Imbalan?: string | null;
  Kredit_atau_Pembiayaan_Program_Pemerintah?: string | null;
  Asal_Kredit_atau_Pembiayaan_Takeover?: string | null;
  Sumber_Dana?: string | null;
  Plafon_Awal?: number | null;
  Plafon?: number | null;
  Realisasi_atau_Pencairan_Bulan_Berjalan?: number | null;
  Denda?: number | null;
  Baki_Debet?: number | null;
  Nilai_Dalam_Mata_Uang_Asal?: number | null;
  Kode_Kualitas_Kredit_atau_Pembiayaan?: string | null;
  Tanggal_Macet?: string | null;
  Kode_Sebab_Macet?: string | null;
  Tunggakan_Pokok?: number | null;
  Tunggakan_Bunga_atau_Imbalan?: number | null;
  Jumlah_Hari_Tunggakan?: number | null;
  Frekuensi_Tunggakan?: number | null;
  Frekuensi_Restrukturirasi?: number | null;
  Tanggal_Restrukturisasi_Awal?: string | null;
  Tanggal_Restrukturisasi_Akhir?: string | null;
  Kode_Cara_Restrukturisasi?: string | null;
  Kode_Kondisi?: string | null;
  Tanggal_Kondisi?: string | null;
  Keterangan?: string | null;
  Kode_Kantor_Cabang?: string | null;
  Operasi_Data?: string | null;
  total_data?: number;
}

interface ISlikF01P2TblUpdatedParams {
  Period?: string;
  Flag_Detail?: string;
  Nomor_Rekening_Fasilitas?: string;
  Nomor_CIF_Debitur?: string;
  Kode_Sifat_Kredit_atau_Pembiayaan?: string | null;
  Kode_Jenis_Kredit_atau_Pembiayaan?: string | null;
  Kode_Akad_Kredit_atau_Akad_Pembiayaan?: string | null;
  Nomor_Akad_Awal?: string | null;
  Tanggal_Akad_Awal?: string | null;
  Nomor_Akad_Akhir?: string | null;
  Tanggal_Akad_Akhir?: string | null;
  Frekuensi_Perpanjangan_Fasilitas_Kredit_atau_Pembiayaan?: number | null;
  Tanggal_Awal_Kredit_atau_Pembiayaan?: string | null;
  Tanggal_Mulai?: string | null;
  Tanggal_Jatuh_Tempo?: string | null;
  Kode_Kategori_Debitur?: string | null;
  Kode_Jenis_Penggunaan?: string | null;
  Kode_Orientasi_Penggunaan?: string | null;
  Kode_Sektor_Ekonomi?: string | null;
  Kode_Kabupaten_atau_Kota_Lokasi_Proyek?: string | null;
  Nilai_Proyek?: number | null;
  Kode_Valuta?: string | null;
  Suku_Bunga_atau_Imbalan?: number | null;
  Jenis_Suku_Bunga_atau_Imbalan?: string | null;
  Kredit_atau_Pembiayaan_Program_Pemerintah?: string | null;
  Asal_Kredit_atau_Pembiayaan_Takeover?: string | null;
  Sumber_Dana?: string | null;
  Plafon_Awal?: number | null;
  Plafon?: number | null;
  Realisasi_atau_Pencairan_Bulan_Berjalan?: number | null;
  Denda?: number | null;
  Baki_Debet?: number | null;
  Nilai_Dalam_Mata_Uang_Asal?: number | null;
  Kode_Kualitas_Kredit_atau_Pembiayaan?: string | null;
  Tanggal_Macet?: string | null;
  Kode_Sebab_Macet?: string | null;
  Tunggakan_Pokok?: number | null;
  Tunggakan_Bunga_atau_Imbalan?: number | null;
  Jumlah_Hari_Tunggakan?: number | null;
  Frekuensi_Tunggakan?: number | null;
  Frekuensi_Restrukturirasi?: number | null;
  Tanggal_Restrukturisasi_Awal?: string | null;
  Tanggal_Restrukturisasi_Akhir?: string | null;
  Kode_Cara_Restrukturisasi?: string | null;
  Kode_Kondisi?: string | null;
  Tanggal_Kondisi?: string | null;
  Keterangan?: string | null;
  Kode_Kantor_Cabang?: string | null;
  Operasi_Data?: string | null;
}

export {
  ISlikF01P2TblQueryParams,
  ISlikF01P2TblQueryOutput,
  ISlikF01P2TblUpdatedParams,
};
