-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 25, 2023 at 01:00 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chattify`
--

-- --------------------------------------------------------

--
-- Table structure for table `chatGroup`
--

CREATE TABLE `chatGroup` (
  `chat_id` varchar(100) NOT NULL,
  `toUser_id` int(11) NOT NULL,
  `fromUser_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chatGroup`
--

INSERT INTO `chatGroup` (`chat_id`, `toUser_id`, `fromUser_id`, `createdAt`, `updatedAt`) VALUES
('51599158370549604352', 3, 2, '2023-01-23 07:49:34', '2023-01-23 07:49:34'),
('6968918703830071296', 1, 2, '2023-01-23 09:52:30', '2023-01-23 09:52:30');

-- --------------------------------------------------------

--
-- Table structure for table `Messages`
--

CREATE TABLE `Messages` (
  `message_id` int(11) NOT NULL,
  `chat_id` varchar(100) NOT NULL,
  `toUser_id` int(11) NOT NULL,
  `fromUser_id` int(11) NOT NULL,
  `message` varchar(250) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Messages`
--

INSERT INTO `Messages` (`message_id`, `chat_id`, `toUser_id`, `fromUser_id`, `message`, `createdAt`, `updatedAt`) VALUES
(1, '51599158370549604352', 2, 3, 'Hello sir good morning', '2023-01-23 08:53:33', '2023-01-23 08:53:33'),
(2, '51599158370549604352', 3, 2, 'hanji kaise ho sir', '2023-01-23 08:53:33', '2023-01-23 08:53:33'),
(3, '51599158370549604352', 3, 2, 'sdfffdf', '2023-01-24 07:37:05', '2023-01-24 07:37:05'),
(4, '51599158370549604352', 3, 2, 'fffaaaa', '2023-01-24 07:37:21', '2023-01-24 07:37:21'),
(5, '51599158370549604352', 2, 3, 'Hey', '2023-01-24 07:37:48', '2023-01-24 07:37:48'),
(6, '51599158370549604352', 2, 3, 'How are you', '2023-01-24 07:37:53', '2023-01-24 07:37:53'),
(7, '51599158370549604352', 3, 2, 'i am good how are you', '2023-01-24 07:38:07', '2023-01-24 07:38:07'),
(8, '51599158370549604352', 2, 3, 'Xbsbsbs', '2023-01-24 07:55:31', '2023-01-24 07:55:31'),
(9, '51599158370549604352', 2, 3, 'Xnsbsbs', '2023-01-24 07:55:33', '2023-01-24 07:55:33'),
(10, '51599158370549604352', 3, 2, 'heey', '2023-01-24 07:55:43', '2023-01-24 07:55:43'),
(11, '51599158370549604352', 2, 3, 'Hi mohit', '2023-01-24 07:55:49', '2023-01-24 07:55:49'),
(12, '51599158370549604352', 3, 2, 'hello lucky ji', '2023-01-24 07:55:55', '2023-01-24 07:55:55'),
(13, '51599158370549604352', 2, 3, 'Ji', '2023-01-24 07:55:56', '2023-01-24 07:55:56'),
(14, '51599158370549604352', 3, 2, 'kaise ho aap', '2023-01-24 07:56:02', '2023-01-24 07:56:02'),
(15, '51599158370549604352', 3, 2, 'sdfsfsfsfsf', '2023-01-24 07:56:19', '2023-01-24 07:56:19'),
(16, '51599158370549604352', 2, 3, 'Hhhhhhhbdd', '2023-01-24 07:56:24', '2023-01-24 07:56:24'),
(17, '51599158370549604352', 2, 3, 'Hdjdhdb', '2023-01-24 07:56:43', '2023-01-24 07:56:43'),
(18, '51599158370549604352', 2, 3, 'Bdbs', '2023-01-24 07:56:49', '2023-01-24 07:56:49'),
(19, '6968918703830071296', 1, 2, 'sdfsfsfs', '2023-01-24 07:56:54', '2023-01-24 07:56:54'),
(20, '51599158370549604352', 3, 2, 'sdfsfdsfs', '2023-01-24 07:57:15', '2023-01-24 07:57:15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `mobile` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `mobile`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'mohit', '8168264309', '1234', '2023-01-12 11:40:10', '2023-01-12 11:40:10'),
(2, 'bot', '1111111111', '1234', '2023-01-12 11:41:44', '2023-01-12 11:41:44'),
(3, 'Ranbir', '2222222222', '1234', '2023-01-12 11:40:10', '2023-01-12 11:40:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chatGroup`
--
ALTER TABLE `chatGroup`
  ADD PRIMARY KEY (`chat_id`);

--
-- Indexes for table `Messages`
--
ALTER TABLE `Messages`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Messages`
--
ALTER TABLE `Messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
