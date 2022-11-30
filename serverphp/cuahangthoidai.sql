-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 30, 2022 at 07:33 AM
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
-- Database: `cuahangthoidai`
--

DELIMITER $$
--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `delete_account` (`p_userid` INT) RETURNS TINYINT(1)  BEGIN
	declare v_user_id_test int unsigned default 0;

	select user_id into v_user_id_test
	from account
	where user_id=p_userid;

	IF(v_user_id_test>0) then 
    	DELETE FROM account
		WHERE user_id = p_userid;
   	 	RETURN 1;
    ELSE RETURN 0;
    end if;
	
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `delete_album` (`p_album_id` INT) RETURNS TINYINT(1)  BEGIN
	declare v_album_id_test int unsigned default 0;

	select album_id into v_album_id_test
	from album
	where album_id=p_album_id;

	IF(v_album_id_test>0) then 
    	DELETE FROM album
		WHERE album_id = p_album_id;
   	 	RETURN 1;
    ELSE RETURN 0;
    end if;
	
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `delete_artist` (`p_artist_id` INT) RETURNS TINYINT(1)  BEGIN
	declare v_artist_id_test int unsigned default 0;

	select artist_id into v_artist_id_test
	from artist
	where artist_id=p_artist_id;

	IF(v_artist_id_test>0) then 
    	DELETE FROM artist
		WHERE artist_id = p_artist_id;
   	 	RETURN 1;
    ELSE RETURN 0;
    end if;
	
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `delete_blog` (`p_blog_id` INT) RETURNS TINYINT(1)  BEGIN
	declare v_blog_id_test int unsigned default 0;

	select blog_id into v_blog_id_test
	from blog
	where blog_id=p_blog_id;

	IF(v_blog_id_test>0) then 
    	DELETE FROM blog
		WHERE blog_id = p_blog_id;
   	 	RETURN 1;
    ELSE RETURN 0;
    end if;
	
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `delete_review` (`p_review_id` INT) RETURNS TINYINT(1)  BEGIN
	declare v_review_id_test int unsigned default 0;

	select review_id into v_review_id_test
	from review
	where review_id=p_review_id;

	IF(v_review_id_test>0) then 
    	DELETE FROM review
		WHERE review_id = p_review_id;
   	 	RETURN 1;
    ELSE RETURN 0;
    end if;
	
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `insert_account` (`p_email` VARCHAR(255), `p_password` VARCHAR(255), `p_avatar` TEXT, `p_username` VARCHAR(255), `p_role` VARCHAR(32)) RETURNS TINYINT(1)  BEGIN
	declare v_user_id int unsigned default 0;
    DECLARE	store_user_id int unsigned default 0;
	SELECT user_id INTO v_user_id
    from account
    WHERE email=p_email;
    IF(v_user_id=0) THEN
 		insert into account (email ,password ,avatar,username,role ) 
    	values (p_email ,p_password ,p_avatar,p_username, p_role);
        set store_user_id = last_insert_id();
        if(p_role='customer') then 
        	INSERT INTO `user`(user_id)
            VALUES (store_user_id);
        	INSERT INTO customer(customer_id, state )
            VALUES (store_user_id, 'new');
        end if;
        if(p_role='employee') then 
        	INSERT INTO `user`(user_id )
            VALUES (store_user_id);
        	INSERT INTO employee(employee_id, state )
            VALUES (store_user_id, 'new');
        end if;
        if(p_role='admin') then 
        	INSERT INTO `user`(user_id )
            VALUES (store_user_id);
        	INSERT INTO admin(admin_id)
            VALUES (store_user_id);
        end if;
		RETURN 1;
     	ELSE
        	RETURN 0;
     end if;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `insert_album` (`p_title` TEXT, `p_price` VARCHAR(32), `a_name` VARCHAR(255), `p_avatar` TEXT, `p_quanity` INT, `p_album_type` VARCHAR(15), `a_avatar` TEXT) RETURNS TINYINT(1)  BEGIN
DECLARE v_album_id_check_title int unsigned default 0;
DECLARE	v_album_id_check_type int unsigned default 0;
DECLARE v_artist_id_check_artist int unsigned default 0;
DECLARE	store_ablum_id int unsigned default 0;
DECLARE	store_artist_id int unsigned default 0;

	SELECT album_id into v_album_id_check_title
    FROM album
    WHERE title = p_title;
    
	SELECT album_id into v_album_id_check_title
    FROM album
    WHERE album_type = p_album_type AND title = p_title;
    
    SELECT artist_id into v_artist_id_check_artist
    FROM artist
    WHERE name = a_name;

	IF(v_album_id_check_title=0) THEN 
    	INSERT INTO album(title, price, avatar, album_type,quanity)
    	VALUES (p_title, p_price, p_avatar, p_album_type,p_quanity);
    	set store_ablum_id = last_insert_id();
            IF(v_artist_id_check_artist=0) THEN 
                INSERT INTO artist(avatar,name)
                VALUES(a_avatar, a_name);
                set store_artist_id = last_insert_id();
                INSERT INTO compose(artist_id ,album_id)
                VALUES (store_artist_id, store_ablum_id);
            
            ELSE
                INSERT INTO compose(artist_id ,album_id)
                VALUES (v_artist_id_check_artist, store_ablum_id);
              
            END IF;
       ELSE
        	IF(v_album_id_check_type>0) THEN RETURN 0;
            ELSE
            	INSERT INTO album(title, price, avatar, album_type,quanity)
    			VALUES (p_title, p_price, p_avatar, p_album_type,p_quanity);
    			set store_ablum_id = last_insert_id();
            	IF(v_artist_id_check_artist=0) THEN 
                    INSERT INTO artist(avatar,name)
                    VALUES(a_avatar, a_name);
                    set store_artist_id = last_insert_id();
                    INSERT INTO compose(artist_id ,album_id)
                    VALUES (store_artist_id, store_ablum_id);
                    
                ELSE
                    INSERT INTO compose(artist_id ,album_id)
                    VALUES (v_artist_id_check_artist, store_ablum_id);
                    
                END IF;
   			END IF;
   
        
    END IF;
	RETURN 1;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `insert_blog` (`p_topic` VARCHAR(255), `p_headline` VARCHAR(255), `p_content` TEXT, `p_employee_id` INT, `P_avatar` TEXT) RETURNS TINYINT(1)  BEGIN
	DECLARE	v_blog_id int unsigned default 0;

	INSERT INTO blog(topic,headline,content,avatar)
    VALUES (p_topic,p_headline,p_content,p_avatar);
    set v_blog_id = last_insert_id();

    INSERT INTO write_blog(employee_id, blog_id, date ,time)
    VALUES (p_employee_id,v_blog_id,curdate(), CURRENT_TIME());
	RETURN 1;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `insert_review` (`p_score` INT, `p_content` TEXT, `p_album_id` INT UNSIGNED, `p_customer_id` INT UNSIGNED) RETURNS TINYINT(1)  BEGIN
	DECLARE	v_review_id int unsigned default 0;
	
	INSERT INTO review(score,content)
    VALUES (p_score,p_content);
    set v_review_id = last_insert_id();

    INSERT INTO write_review(review_id, album_id, customer_id ,date ,time)
    VALUES (v_review_id,p_album_id,p_customer_id,curdate(), CURRENT_TIME());
	RETURN 1;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `insert_transaction` (`p_type_of_transaction` VARCHAR(255), `p_type_of_shipping` VARCHAR(15), `p_customer_id` INT UNSIGNED, `p_address` VARCHAR(255), `p_deliver_partner` VARCHAR(255), `p_employee_id` INT, `p_total_price` DECIMAL(10,2)) RETURNS TINYINT(1)  BEGIN
	declare v_transaction_id int unsigned default 0;
    INSERT INTO transaction(type_of_transaction,type_of_shipping, customer_id,total_price)
    VALUES (p_type_of_transaction,p_type_of_shipping, p_customer_id,p_total_price);
    set v_transaction_id = last_insert_id();

    
    IF(p_type_of_shipping='pick_up') THEN 
    	INSERT INTO pick_up_at_store(transaction_id, employee_id  )
        VALUES (v_transaction_id, p_employee_id );    
        RETURN 1;
    END IF;
    
    IF(p_type_of_shipping='shipping') THEN 
    	INSERT INTO shipping(transaction_id  , isDone, address , deliver_partner )
        VALUES (v_transaction_id, 0,p_address, p_deliver_partner);  
        RETURN 1;
    END IF;
    
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `insert_transaction_items` (`p_transaction_id` INT UNSIGNED, `p_album_id` INT UNSIGNED, `p_quanity` INT) RETURNS TINYINT(1)  BEGIN
    
    INSERT INTO transaction_items(transaction_id ,album_id , quanity )
    VALUES (p_transaction_id ,p_album_id , p_quanity );
    RETURN 1;
    
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `update_account` (`p_user_id` INT, `p_email` VARCHAR(255), `p_password` VARCHAR(255), `p_avatar` TEXT, `p_username` VARCHAR(255), `p_role` VARCHAR(32)) RETURNS TINYINT(1)  BEGIN
	declare v_user_id int unsigned default 0;
    
	SELECT user_id INTO v_user_id
    from account
    WHERE user_id=p_user_id;
    IF(v_user_id>0) THEN
    	UPDATE account
            SET    
                   email = p_email,
                   password = p_password,
                   avatar = p_avatar,
                   username = p_username,
                   role = p_role
            WHERE  user_id = p_user_id;
		RETURN 1;
     	ELSE
        	RETURN 0;
     end if;
     
     
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `update_album` (`p_album_id` INT, `p_title` VARCHAR(32), `p_price` VARCHAR(32), `p_avatar` TEXT, `p_album_type` VARCHAR(15), `p_quanity` INT) RETURNS TINYINT(1)  BEGIN
	declare v_album_id int unsigned default 0;
    
	SELECT album_id INTO v_album_id
    from album
    WHERE album_id=p_album_id;
    IF(v_album_id>0) THEN
    	UPDATE album
            SET    
                   title = p_title,
                   price = p_price,
                   avatar = p_avatar,
                   album_type = p_album_type,
                   quanity = p_quanity
            WHERE  album_id = p_album_id;
		RETURN 1;
     	ELSE
        	RETURN 0;
     end if;
     
     
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `update_artist` (`p_artist_id` INT, `p_name` VARCHAR(32), `p_avatar` TEXT, `p_page` INT) RETURNS TINYINT(1)  BEGIN
	declare v_artist_id int unsigned default 0;
    
	SELECT artist_id INTO v_artist_id
    from artist
    WHERE artist_id=p_artist_id;
    IF(v_artist_id>0) THEN
    	UPDATE artist
            SET    
                   name = p_name,
                   avatar = p_avatar,
                   page= p_page
            WHERE  artist_id = p_artist_id;
		RETURN 1;
     	ELSE
        	RETURN 0;
     end if;
     
     
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `update_blog` (`p_blog_id` INT, `p_topic` VARCHAR(255), `p_headline` VARCHAR(255), `p_content` TEXT) RETURNS TINYINT(1)  BEGIN
	declare v_blog_id int unsigned default 0;
    
	SELECT blog_id INTO v_blog_id
    from blog
    WHERE blog_id=p_blog_id;
    IF(v_blog_id>0) THEN
    	UPDATE blog
            SET    
                   topic = p_topic,
                   headline = p_headline,
                   content= p_content
            WHERE  blog_id = p_blog_id;
		RETURN 1;
     	ELSE
        	RETURN 0;
     end if;
     
     
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `update_customer` (`p_customer_id` INT, `p_state` VARCHAR(15)) RETURNS TINYINT(1)  BEGIN
	declare v_customer_id int unsigned default 0;
    
	SELECT customer_id INTO v_customer_id
    from customer
    WHERE customer_id=p_customer_id;
    IF(v_customer_id>0) THEN
    	UPDATE customer
            SET    
                   state = p_state
            WHERE  customer_id = p_customer_id;
		RETURN 1;
     	ELSE
        	RETURN 0;
     end if;
     
     
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `update_employee` (`p_employee_id` INT, `p_state` VARCHAR(15)) RETURNS TINYINT(1)  BEGIN
	declare v_employee_id int unsigned default 0;
    
	SELECT employee_id INTO v_employee_id
    from employee
    WHERE employee_id=p_employee_id;
    IF(v_employee_id>0) THEN
    	UPDATE employee
            SET    
                   state = p_state
            WHERE  employee_id = p_employee_id;
		RETURN 1;
     	ELSE
        	RETURN 0;
     end if;
     
     
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `update_review` (`p_review_id` INT UNSIGNED, `p_score` INT, `p_content` TEXT) RETURNS TINYINT(1)  BEGIN
	declare v_review_id int unsigned default 0;
    
	SELECT review_id INTO v_review_id
    from review
    WHERE review_id=p_review_id;
    IF(v_review_id>0) THEN
    	UPDATE review
            SET    
                   score = p_score,
                   content = p_content
            WHERE  review_id = p_review_id;
		RETURN 1;
     	ELSE
        	RETURN 0;
     end if;
     
     
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `update_shipping` (`p_transaction_id` INT UNSIGNED) RETURNS TINYINT(1)  BEGIN
	declare v_transaction_id int unsigned default 0;
    
	SELECT transaction_id INTO v_transaction_id
    from shipping
    WHERE transaction_id=p_transaction_id;
    IF(v_transaction_id>0) THEN
    	UPDATE shipping
            SET    
                   date_arrive  = curdate(),
                   time_arrive  = CURRENT_TIME(),
                   isDone  = 1
            WHERE  transaction_id = p_transaction_id;
		RETURN 1;
     	ELSE
        	RETURN 0;
     end if;
     
     
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `update_transaction_items` (`p_transaction_id` INT UNSIGNED, `p_album_id` INT UNSIGNED, `p_quanity` INT) RETURNS TINYINT(1)  BEGIN
    
    declare v_transaction_id int unsigned default 0;
    
	SELECT transaction_id INTO v_transaction_id
    from transaction_items
    WHERE transaction_id=p_transaction_id AND album_id=p_album_id;
    IF(v_transaction_id>0) THEN
    	UPDATE transaction_items
            SET    
                   quanity = p_quanity
            WHERE  transaction_id = v_transaction_id;
		RETURN 1;
     	ELSE
        	RETURN 0;
     end if;

    
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `update_user` (`p_user_id` INT, `p_gender` VARCHAR(32), `p_phone` VARCHAR(32), `p_address` VARCHAR(255), `p_Bdate` DATE) RETURNS TINYINT(1)  BEGIN
	declare v_user_id int unsigned default 0;
    
	SELECT user_id INTO v_user_id
    from `user`
    WHERE user_id=p_user_id;
    IF(v_user_id>0) THEN
    	UPDATE `user`
            SET    
                   gender = p_gender,
                   phone = p_phone,
                   address = p_address,
                   Bdate = p_Bdate
            WHERE  user_id = p_user_id;
		RETURN 1;
     	ELSE
        	RETURN 0;
     end if;
     
     
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` text DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `role` varchar(32) DEFAULT NULL CHECK (`role` in ('Employee','Customer','Admin'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`user_id`, `email`, `password`, `avatar`, `username`, `role`) VALUES
(15, 'phong@gmail.com', '$2y$10$jmjqCyFNRU7qQ/uy2N/KO.CiZQty3nh/vj/AW47C5xTvJI9T7ekvq', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775520/cuahangthoidai/hcdy9fdfuctba383isf6.png', 'Kavon Harmony', 'admin'),
(16, 'van@gmail.com', '$2y$10$O7qD.faJH7DoQKruY9l3/eSCE245QtWv702b/su.fyIWBUQ3QQM.q', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775550/cuahangthoidai/suppmp9mjqdk7hb6fgeh.png', 'Theo Keaton', 'employee'),
(17, 'phat@gmail.com', '$2y$10$dU9LSsFyEN62TUTphbebLO6sOQLDTL7KhaF4gLrUHOIjAagPp4RWy', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775571/cuahangthoidai/hn0bn1hsrbjrybrjeayg.png', 'Tressie Laurence', 'customer'),
(18, 'eloise.earlene@example.com', '$2y$10$5jmWWDm5P7osp196H2nonu5XVxTyqV74HT.HMbvFf7pmutxhclBsO', 'https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c', 'Eloise Earlene', 'customer'),
(19, 'shany.hildegard@example.com', '$2y$10$XsDVY09bFtmMEVLAGj/WeOCmQpVlSRvWvbI31DpKZoQkDPIaa96nq', 'https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c', 'Shany Hildegard', 'customer'),
(20, 'brandy.adolph@example.com', '$2y$10$xMa3JJXQFU9fEhl85lNZreHC8BaBotr0ohzccuBFEzXv64P2uF/gW', 'https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c', 'Brandy Adolph', 'customer'),
(21, 'kelley.misty@example.com', '$2y$10$RnuuGPCquOC6WT0aYCPjCuMfWGMGAgYRlYKFXBneZjYN.8lTEUura', 'https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c', 'Kelley Misty', 'customer'),
(22, 'vallie.brannon@example.com', '$2y$10$fT9QQ.EtWh09RNT72WvjLOLi1mHOfMDKiCnuogxvYpOrbGkV9hNkq', 'https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c', 'Vallie Brannon', 'customer'),
(23, 'jillian.gay@example.com', '$2y$10$mlHoScVUfMamlxo31uSzSOX1BPWGvoKmCKK4hwF2egs2lyijURmku', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669776184/cuahangthoidai/biiw4rv3w2dhsz6nwzhs.png', 'Jillian Gay', 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`) VALUES
(15);

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE `album` (
  `album_id` int(10) UNSIGNED NOT NULL,
  `title` text DEFAULT NULL,
  `price` varchar(32) DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  `album_type` varchar(15) DEFAULT NULL,
  `quanity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`album_id`, `title`, `price`, `avatar`, `album_type`, `quanity`) VALUES
(21, 'Monica Crona', '874', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669778419/cuahangthoidai/gzlovlq45tb8jqtnte2c.png', 'cd', 492),
(22, 'Darryl Armstrong', '371', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775661/cuahangthoidai/b71x4n3fyf9lxjkinyuz.png', 'cd', 428),
(23, 'Archie Cormier', '968', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775667/cuahangthoidai/ghlpuorblxd02issuntj.png', 'cd', 901),
(24, 'Clinton DuBuque', '92', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775673/cuahangthoidai/t7qihc0q9luvhtmpxftw.png', 'cd', 910),
(25, 'Christie Smitham DVM', '961', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775679/cuahangthoidai/okcgtxldwfjrqzjfiech.png', 'cd', 164),
(26, 'Ted Steuber', '164', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775686/cuahangthoidai/qmhxabwh2pcsj4ulbydv.png', 'cd', 774),
(27, 'Edith Lemke', '862', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775692/cuahangthoidai/ettbl1itacqypep7vkmh.png', 'cd', 401),
(28, 'Melody Heathcote', '169', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775698/cuahangthoidai/woihqgyi6rbs0kyif3b9.png', 'cd', 415),
(29, 'Regina Stiedemann I', '299', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775721/cuahangthoidai/cn6wyickpscwhlmzrrmy.png', 'cd', 446);

-- --------------------------------------------------------

--
-- Table structure for table `artist`
--

CREATE TABLE `artist` (
  `artist_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `artist`
--

INSERT INTO `artist` (`artist_id`, `name`, `avatar`) VALUES
(18, 'Sherry Shields', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775652/cuahangthoidai/uzlpqgtc7wpqxjip2ezj.png'),
(19, 'Nicolas Goyette PhD', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775657/cuahangthoidai/htnhbn4wk0si6t4b45tk.png'),
(20, 'Melba Bogisich', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775663/cuahangthoidai/odtpxrzt0ig7lnlwuzm4.png'),
(21, 'Alejandro Lubowitz', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775669/cuahangthoidai/kipbl9avsa8iybuvcgka.png'),
(22, 'Gwen Rodriguez', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775675/cuahangthoidai/avefuf11oozirepp69pc.png'),
(23, 'Steve Turner', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775682/cuahangthoidai/lk4lm0mpno9bkoxmaxx4.png'),
(24, 'Lynn Murazik', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775688/cuahangthoidai/vhfe1ybarj8pam3nrixe.png'),
(25, 'Shelly Dibbert', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775694/cuahangthoidai/nwblptzcicqtc0dqvyor.png'),
(26, 'Billy Cummings', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775718/cuahangthoidai/jfowusj3neztxtpacmfj.png');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `blog_id` int(10) UNSIGNED NOT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `headline` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `avatar` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`blog_id`, `topic`, `headline`, `content`, `avatar`) VALUES
(12, 'withdrawal', 'transform Account Fresh', 'Ut vero ut autem. Accusantium sint in ea dolorum minima et ut omnis alias. Nulla cupiditate dicta et possimus in. Nihil doloribus ut et laborum consectetur. Ea cumque iste corrupti error blanditiis. Quas est et placeat iure.', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775752/cuahangthoidai/qjbcm8fe2eujle2lkpbl.png'),
(13, 'Barbados', 'payment index compelling compelling', 'Sequi delectus rem eius quod rem. Assumenda voluptatibus rerum molestias cumque et. Autem nemo ratione sint doloremque laboriosam.', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775754/cuahangthoidai/dyvmyviswhmbrgbsivqm.png'),
(14, 'compress', 'teal programming Function-based', 'Qui dolorum dicta velit quo. Ut quo aut quos porro officiis saepe sunt impedit dolor. Qui facere ipsam id eius. Dolorem velit aut aliquam aspernatur ullam laudantium et a. Voluptatum deserunt esse et.', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775756/cuahangthoidai/qqdtrprz502fxsal3uel.png'),
(15, '24', 'Intelligent Account Plastic Wall Mouse', 'Possimus at dignissimos libero et impedit deleniti ullam. Consequuntur eum quibusdam quas velit voluptas ut adipisci quis. Et ducimus et sapiente rem et.', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775759/cuahangthoidai/b9omovlqr5bkqoiahcyt.png'),
(16, 'redundant', 'Ergonomic Bedfordshire Spain Interactions', 'Optio voluptates aut omnis quos. Provident eos praesentium ut accusantium id. Aut ea voluptatem molestiae consequatur molestiae ipsam voluptas numquam. Eos est et et quidem consequuntur aut distinctio facilis. Id iste ea tenetur qui alias. Modi voluptatibus autem fuga totam in accusamus officiis quo.', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775837/cuahangthoidai/ciyyw6ughbolq98zat4b.png');

-- --------------------------------------------------------

--
-- Table structure for table `compose`
--

CREATE TABLE `compose` (
  `artist_id` int(10) UNSIGNED NOT NULL,
  `album_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `compose`
--

INSERT INTO `compose` (`artist_id`, `album_id`) VALUES
(18, 21),
(19, 22),
(20, 23),
(21, 24),
(22, 25),
(23, 26),
(24, 27),
(25, 28),
(26, 29);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(10) UNSIGNED NOT NULL,
  `state` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `state`) VALUES
(17, 'in use'),
(18, 'new'),
(19, 'new'),
(20, 'new'),
(21, 'new'),
(22, 'new'),
(23, 'new');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(10) UNSIGNED NOT NULL,
  `state` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `state`) VALUES
(16, 'banned');

-- --------------------------------------------------------

--
-- Table structure for table `pick_up_at_store`
--

CREATE TABLE `pick_up_at_store` (
  `transaction_id` int(10) UNSIGNED NOT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `review_id` int(10) UNSIGNED NOT NULL,
  `score` int(11) DEFAULT NULL CHECK (`score` >= 0 and `score` <= 10),
  `content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`review_id`, `score`, `content`) VALUES
(15, 9, 'Nihil velit quaerat repellat deserunt. Odit et officiis corrupti beatae qui voluptas quas. Autem molestiae tempore est incidunt fuga quos expedita architecto. Autem porro beatae enim blanditiis quia nam et qui. Minus esse dolore quisquam. Nihil voluptatibus nulla natus qui.'),
(16, 9, 'Minus ex sed aut commodi ullam sunt est consequatur. Facere quia labore dolorem rerum non saepe non. Repellat minima quam odit. Et voluptatem aut aut.'),
(17, 9, 'Qui quidem facere et voluptatem. Veniam voluptatum quidem doloremque alias. Sapiente et ipsam quae asperiores magnam est sapiente.'),
(18, 9, 'Quasi ut soluta enim rerum quia similique. Explicabo harum dignissimos tempora rerum reprehenderit fugiat dolorem. Quo ut porro et maiores quas minima est porro consequatur. Similique non et ex quos dolorem doloribus quis. Est est exercitationem autem et quibusdam quo eos ex sunt.');

-- --------------------------------------------------------

--
-- Table structure for table `shipping`
--

CREATE TABLE `shipping` (
  `transaction_id` int(10) UNSIGNED NOT NULL,
  `date_arrive` date DEFAULT NULL,
  `time_arrive` time DEFAULT NULL,
  `isDone` tinyint(1) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `deliver_partner` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `song`
--

CREATE TABLE `song` (
  `album_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(32) DEFAULT NULL,
  `length` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int(10) UNSIGNED NOT NULL,
  `type_of_transaction` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `type_of_shipping` varchar(15) DEFAULT NULL CHECK (`type_of_shipping` in ('pick_up','shipping')),
  `customer_id` int(10) UNSIGNED NOT NULL,
  `total_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_items`
--

CREATE TABLE `transaction_items` (
  `transaction_id` int(10) UNSIGNED NOT NULL,
  `album_id` int(10) UNSIGNED NOT NULL,
  `quanity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `gender` varchar(32) DEFAULT NULL CHECK (`gender` in ('Male','Female')),
  `phone` varchar(32) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `Bdate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `gender`, `phone`, `address`, `Bdate`) VALUES
(15, NULL, NULL, NULL, NULL),
(16, 'Female', '256-242-4281', '055 Gibson Green', '2002-10-30'),
(17, NULL, NULL, NULL, NULL),
(18, NULL, NULL, NULL, NULL),
(19, NULL, NULL, NULL, NULL),
(20, NULL, NULL, NULL, NULL),
(21, NULL, NULL, NULL, NULL),
(22, NULL, NULL, NULL, NULL),
(23, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `write_blog`
--

CREATE TABLE `write_blog` (
  `employee_id` int(10) UNSIGNED NOT NULL,
  `blog_id` int(10) UNSIGNED NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `write_blog`
--

INSERT INTO `write_blog` (`employee_id`, `blog_id`, `date`, `time`) VALUES
(16, 12, '2022-11-30', '09:35:51'),
(16, 13, '2022-11-30', '09:35:53'),
(16, 14, '2022-11-30', '09:35:55'),
(16, 15, '2022-11-30', '09:35:57'),
(16, 16, '2022-11-30', '09:37:16');

-- --------------------------------------------------------

--
-- Table structure for table `write_review`
--

CREATE TABLE `write_review` (
  `review_id` int(10) UNSIGNED NOT NULL,
  `album_id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `write_review`
--

INSERT INTO `write_review` (`review_id`, `album_id`, `customer_id`, `date`, `time`) VALUES
(15, 21, 17, '2022-11-30', '09:37:48'),
(16, 21, 17, '2022-11-30', '09:37:49'),
(17, 21, 17, '2022-11-30', '09:37:49'),
(18, 21, 17, '2022-11-30', '09:37:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`album_id`);

--
-- Indexes for table `artist`
--
ALTER TABLE `artist`
  ADD PRIMARY KEY (`artist_id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`blog_id`),
  ADD UNIQUE KEY `headline` (`headline`);

--
-- Indexes for table `compose`
--
ALTER TABLE `compose`
  ADD PRIMARY KEY (`artist_id`,`album_id`),
  ADD KEY `album_id` (`album_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `pick_up_at_store`
--
ALTER TABLE `pick_up_at_store`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`);

--
-- Indexes for table `shipping`
--
ALTER TABLE `shipping`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`album_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `transaction_items`
--
ALTER TABLE `transaction_items`
  ADD KEY `album_id` (`album_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `write_blog`
--
ALTER TABLE `write_blog`
  ADD PRIMARY KEY (`employee_id`,`blog_id`),
  ADD KEY `blog_id` (`blog_id`);

--
-- Indexes for table `write_review`
--
ALTER TABLE `write_review`
  ADD PRIMARY KEY (`review_id`,`album_id`),
  ADD KEY `album_id` (`album_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `album`
--
ALTER TABLE `album`
  MODIFY `album_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `artist`
--
ALTER TABLE `artist`
  MODIFY `artist_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `blog_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `review_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transaction_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `compose`
--
ALTER TABLE `compose`
  ADD CONSTRAINT `compose_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`artist_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compose_ibfk_2` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pick_up_at_store`
--
ALTER TABLE `pick_up_at_store`
  ADD CONSTRAINT `pick_up_at_store_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shipping`
--
ALTER TABLE `shipping`
  ADD CONSTRAINT `shipping_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `song`
--
ALTER TABLE `song`
  ADD CONSTRAINT `song_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaction_items`
--
ALTER TABLE `transaction_items`
  ADD CONSTRAINT `transaction_items_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `write_blog`
--
ALTER TABLE `write_blog`
  ADD CONSTRAINT `write_blog_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `write_blog_ibfk_2` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`blog_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `write_review`
--
ALTER TABLE `write_review`
  ADD CONSTRAINT `write_review_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `review` (`review_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `write_review_ibfk_2` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `write_review_ibfk_3` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
