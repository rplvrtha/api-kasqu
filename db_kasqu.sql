-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 29, 2024 at 10:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_kasqu`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_kas`
--

CREATE TABLE `data_kas` (
  `id` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_kas`
--

INSERT INTO `data_kas` (`id`, `jumlah`) VALUES
(1, 2000),
(2, 500);

-- --------------------------------------------------------

--
-- Table structure for table `riwayat`
--

CREATE TABLE `riwayat` (
  `id_riwayat` char(6) NOT NULL,
  `kategori` enum('pemasukan','pengeluaran') NOT NULL,
  `tanggal` date NOT NULL,
  `nominal` int(11) NOT NULL,
  `keterangan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `riwayat`
--

INSERT INTO `riwayat` (`id_riwayat`, `kategori`, `tanggal`, `nominal`, `keterangan`) VALUES
('RWT001', 'pemasukan', '2024-03-30', 50000, 'Donasi Guru'),
('RWT002', 'pengeluaran', '2024-03-30', 5000, 'Beli HVS');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_trx` char(6) NOT NULL,
  `no_induk` varchar(20) NOT NULL,
  `tanggal` date NOT NULL,
  `nominal` int(11) NOT NULL,
  `keterangan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_trx`, `no_induk`, `tanggal`, `nominal`, `keterangan`) VALUES
('TRX001', '22511', '2024-03-30', 2000, 'Bayar Kas');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `no_induk` varchar(20) NOT NULL,
  `username` varchar(35) NOT NULL,
  `password` varchar(32) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telp` varchar(20) NOT NULL,
  `status` enum('sudah_bayar','belum_bayar') NOT NULL,
  `level` enum('siswa','bendahara','guru','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`no_induk`, `username`, `password`, `nama`, `email`, `telp`, `status`, `level`) VALUES
('1', 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin', NULL, '08123456789', 'sudah_bayar', 'admin'),
('10493827493820', 'guru', '77e69c137812518e359196bb2f5e9bb9', 'guru', 'guru', '03480384', 'sudah_bayar', 'guru'),
('22511', 'nobriyan', '50249feab4d1ca42b96e8393893f48d7', 'Nobriyan Adil Kurniawan', 'nobriyan.adil@kasqu.com', '6288227903725', 'sudah_bayar', 'siswa'),
('39284', 'bendahara', 'd41d8cd98f00b204e9800998ecf8427e', 'Bendahara', 'bendahara@mail.com', '319203', 'sudah_bayar', 'bendahara'),
('7685', 'tes', 'd41d8cd98f00b204e9800998ecf8427e', 'Tes1', 'tes@mift.com', '98567890', 'sudah_bayar', 'siswa'),
('98765456789', 'tes', 'fcde56ebb5446c0563c1d4765cecd6a5', 'tes', 'tes@tes.com', '56788765', 'sudah_bayar', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_kas`
--
ALTER TABLE `data_kas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `riwayat`
--
ALTER TABLE `riwayat`
  ADD PRIMARY KEY (`id_riwayat`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_trx`),
  ADD KEY `id_user` (`no_induk`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`no_induk`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
