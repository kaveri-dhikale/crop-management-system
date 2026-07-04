-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Jul 04, 2026 at 09:14 AM
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
-- Database: `crop_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `crops`
--

CREATE TABLE `crops` (
  `id` int(11) NOT NULL,
  `season` varchar(50) DEFAULT NULL,
  `soil_type` varchar(50) DEFAULT NULL,
  `crop_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crops`
--

INSERT INTO `crops` (`id`, `season`, `soil_type`, `crop_name`) VALUES
(1, 'Rabi', 'Loamy', 'Wheat'),
(2, 'Kharif', 'Black', 'Cotton'),
(3, 'Rabi', 'Sandy', 'Barley'),
(4, 'Kharif', 'Alluvial', 'Rice'),
(5, 'Zaid', 'Loamy', 'Maize');

-- --------------------------------------------------------

--
-- Table structure for table `farmer_data`
--

CREATE TABLE `farmer_data` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `area` int(11) DEFAULT NULL,
  `soil_type` varchar(50) DEFAULT NULL,
  `irrigation` varchar(50) DEFAULT NULL,
  `season` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `crop_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `farmer_data`
--

INSERT INTO `farmer_data` (`id`, `full_name`, `mobile`, `email`, `area`, `soil_type`, `irrigation`, `season`, `created_at`, `crop_name`) VALUES
(6, 'rutuja deore', '9999999999', 'test@test.com', 2, 'Black', 'yes', 'zaid', '2026-03-27 07:34:59', 'No crop'),
(8, 'Ramu rajan patil', '7823074760', 'ramupatil@gmail.com', 2, 'Black', 'Drip Irrigation', 'Rabi', '2026-04-21 18:22:51', 'No crop'),
(11, 'ajay shankar pawar', '7856432122', 'ajaypawar@gmail.com', 3, 'Sandy', 'Drip Irrigation', 'Rabi', '2026-04-21 18:28:36', 'Barley'),
(13, 'Raju ram pathak', '7856432112', 'rajupathak@gmail.com', 4, 'Loamy', 'Drip Irrigation', 'Zaid', '2026-04-21 18:30:50', 'Maize');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `mobile`, `email`, `password`) VALUES
(1, 'pallavi chaure', '9823145676', 'pallaviChaure12@gmail.com', '12345'),
(3, 'ishawari Dhikale', '9812345675', 'ishwaridhikale11@gmail.com', '123456'),
(4, 'tanmayee deore', '7685321344', 'tanmayeedeore@gmail.com', '123456'),
(5, 'kaveri Dnyaneshwar Dhikale', '7823074760', 'kaveridhikale2004@gmail.com', '1234'),
(6, 'rama patil', '8791234565', 'ramapatil@gmail.com', '123456'),
(7, 'Sameer Dnyaneshwar Dhikale', '7823076974', 'sameer@123.gmail.com', '234566');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crops`
--
ALTER TABLE `crops`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `farmer_data`
--
ALTER TABLE `farmer_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crops`
--
ALTER TABLE `crops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `farmer_data`
--
ALTER TABLE `farmer_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
