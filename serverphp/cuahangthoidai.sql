-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2022 at 09:30 AM
-- Server version: 10.4.24-MariaDB
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

CREATE DEFINER=`root`@`localhost` FUNCTION `insert_transaction` (`p_type_of_transaction` VARCHAR(255), `p_type_of_shipping` VARCHAR(15), `p_customer_id` INT UNSIGNED, `p_receiver_name` VARCHAR(255), `p_receiver_phone` VARCHAR(15), `p_receiver_address` VARCHAR(255), `p_deliver_partner` VARCHAR(255), `p_employee_id` INT, `p_total_price` DECIMAL(10,2)) RETURNS INT(11)  BEGIN
	declare v_transaction_id int unsigned default 0;
    INSERT INTO transaction(type_of_transaction,type_of_shipping, customer_id,total_price,date,time)
    VALUES (p_type_of_transaction,p_type_of_shipping, p_customer_id,p_total_price,curdate(), CURRENT_TIME());
    set v_transaction_id = last_insert_id();

    
    IF(p_type_of_shipping='pick_up') THEN 
    	INSERT INTO pick_up_at_store(transaction_id, employee_id  )
        VALUES (v_transaction_id, p_employee_id );    
        RETURN v_transaction_id;
    END IF;
    
    IF(p_type_of_shipping='shipping') THEN 
    	INSERT INTO shipping(transaction_id, state, receiver_name, receiver_phone,receiver_address,deliver_partner)
        VALUES (v_transaction_id, 'NEW',p_receiver_name,p_receiver_phone,p_receiver_address, p_deliver_partner);  
        RETURN v_transaction_id;
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

CREATE DEFINER=`root`@`localhost` FUNCTION `update_shipping` (`p_transaction_id` INT UNSIGNED, `p_state` VARCHAR(15)) RETURNS TINYINT(1)  BEGIN
	declare v_transaction_id int unsigned default 0;
    
	SELECT transaction_id INTO v_transaction_id
    from shipping
    WHERE transaction_id=p_transaction_id;
    IF(v_transaction_id>0) THEN
    	UPDATE shipping
            SET    
                   date_arrive  = curdate(),
                   time_arrive  = CURRENT_TIME(),
                   state  = p_state
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
(15, 'phong@gmail.com', '$2y$10$BJHXPYjoYoZSxEd7.oaNheZUiEQ7OjE4qTQ15Hxpn/k35e0ob75ba', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669795569/cuahangthoidai/ymrlhopvlrflgcj8k5k1.png', 'Jillian Gay', 'admin'),
(16, 'van@gmail.com', '$2y$10$O7qD.faJH7DoQKruY9l3/eSCE245QtWv702b/su.fyIWBUQ3QQM.q', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775550/cuahangthoidai/suppmp9mjqdk7hb6fgeh.png', 'Theo Keaton', 'employee'),
(17, 'phat@gmail.com', '$2y$10$dU9LSsFyEN62TUTphbebLO6sOQLDTL7KhaF4gLrUHOIjAagPp4RWy', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775571/cuahangthoidai/hn0bn1hsrbjrybrjeayg.png', 'Glen asd', 'customer'),
(18, 'eloise.earlene@example.com', '$2y$10$5jmWWDm5P7osp196H2nonu5XVxTyqV74HT.HMbvFf7pmutxhclBsO', 'https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c', 'Eloise Earlene', 'customer'),
(19, 'shany.hildegard@example.com', '$2y$10$XsDVY09bFtmMEVLAGj/WeOCmQpVlSRvWvbI31DpKZoQkDPIaa96nq', 'https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c', 'Shany Hildegard', 'customer'),
(20, 'brandy.adolph@example.com', '$2y$10$xMa3JJXQFU9fEhl85lNZreHC8BaBotr0ohzccuBFEzXv64P2uF/gW', 'https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c', 'Brandy Adolph', 'customer'),
(21, 'kelley.misty@example.com', '$2y$10$RnuuGPCquOC6WT0aYCPjCuMfWGMGAgYRlYKFXBneZjYN.8lTEUura', 'https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c', 'Kelley Misty', 'customer'),
(22, 'vallie.brannon@example.com', '$2y$10$fT9QQ.EtWh09RNT72WvjLOLi1mHOfMDKiCnuogxvYpOrbGkV9hNkq', 'https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c', 'Vallie Brannon', 'customer'),
(23, 'jillian.gay@example.com', '$2y$10$mlHoScVUfMamlxo31uSzSOX1BPWGvoKmCKK4hwF2egs2lyijURmku', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669776184/cuahangthoidai/biiw4rv3w2dhsz6nwzhs.png', 'Jillian Gay', 'customer'),
(24, 'son@gmail.com', '$2y$10$9.ZDgrQ9zXGQvqwx.DWBEucSOnl21Uo2VmebS4TsyPWoweCt7RVMy', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670159249/cuahangthoidai/zh2wcqxhdxj2pdgbff2s.png', 'Nguyen Chung Son', 'customer'),
(25, 'chow@gmail.com', '$2y$10$lwXU2fIFv7PGl9ts4oyrpOARcX6kaJ8DpzTNu5MOuJzOe85LI7KpO', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670159503/cuahangthoidai/i9j9f46qxnbym1zc9zoo.png', 'Nguyen Chow chow', 'customer'),
(26, 'hi@gmail.com', '$2y$10$ie9d6Bd98rF.su7b/tLdnONzTVOpPr9DUyyY9rb7PuIbXdGKMvhxm', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670174670/cuahangthoidai/ozhyonyq0ow099vaqx2y.jpg', 'hihihi', 'customer'),
(27, 'hello@gmail.com', '$2y$10$h1PCAwpuc6K7sy2Y6pIYle7BXMYF2c0mlxACFvFMxquR0EieKpT3y', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670175052/cuahangthoidai/qlin4zrgivyw62tfdxr2.jpg', 'hello', 'customer'),
(28, 'dsa@g.c', '$2y$10$rrc28.l0uaLvHgC.V/aVfuTEwcKPycWGmdcsS7QATiVdOZJNZUgpO', 'https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c', 'dsa', 'customer');

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
(21, 'NOTE BUỒN TRÊN CÁT', '280,000', 'https://product.hstatic.net/1000304920/product/khoi-note-buon-tren-cat-dia-cd_5a5b70e365fe44a0a37cebf02ad0d040_grande.jpg', 'cd', 410),
(22, 'ULTIMATE AALIYAH (VINYL 3LP)', '950,000', 'https://product.hstatic.net/1000304920/product/aaliyah-ultimate-aaliyah-vinyl-3lp-dia-than_6c071110ba944191ab5fffc201d2de4a_grande.jpg', 'vinyl', 406),
(23, 'ONE IN A MILLION (VINYL 2LP)', '850,000', 'https://product.hstatic.net/1000304920/product/aaliyah-one-in-a-million-vinyl-2lp-dia-than_85ff30d15d8b4481bc743c9772235bc9_grande.png', 'vinyl', 889),
(24, 'I CARE 4 U (VINYL 2LP)', '850,000', 'https://product.hstatic.net/1000304920/product/aaliyah-i-care-4-u-vinyl-2lp-dia-than_b6baaa308e754edab15ecc8b0f990810_grande.jpeg', 'vinyl', 910),
(25, 'MR. MORALE & THE BIG STEPPERS (VINYL 2LP)', '1,300,000', 'https://product.hstatic.net/1000304920/product/kendrick-lamar-mr-morale-the-big-steppers-vinyl-2lp-dia-than_fd769ad4e69e4b7ba33ab130fb5894ff_grande.png', 'vinyl', 164),
(26, 'Ted Steuber', '164', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775686/cuahangthoidai/qmhxabwh2pcsj4ulbydv.png', 'cd', 774),
(27, 'Edith Lemke', '862', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775692/cuahangthoidai/ettbl1itacqypep7vkmh.png', 'cd', 397),
(28, 'Melody Heathcote', '169', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775698/cuahangthoidai/woihqgyi6rbs0kyif3b9.png', 'cd', 415),
(29, 'Regina Stiedemann I', '299', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1669775721/cuahangthoidai/cn6wyickpscwhlmzrrmy.png', 'cassette', 446),
(30, 'Ms. Crystal Gutmann', '451', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670086223/cuahangthoidai/azqtrqrhftmokbfxxbqf.jpg', 'vinyl', 266),
(31, 'trivan', '20000', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670086288/cuahangthoidai/fm3pqzorbmuhinhvyd2b.jpg', 'vinyl', 4),
(32, 'Tuyet voi', '50000', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670086662/cuahangthoidai/rdjlptrb1xllzobm0n4b.jpg', 'cd', 200),
(33, 'Minh Phat', '60000', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670086797/cuahangthoidai/h6xlnutvo36gb3ky6biw.webp', 'vinyl', 96),
(34, 'hihihi', '123', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670176223/cuahangthoidai/udpb9rl8akdwvopm7uig.jpg', 'cassette', 7);

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
(18, 'Sherry Shields', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173847/AlbumTypeCHTD/cloud_jj1rjz.jpg'),
(19, 'Nicolas Goyette PhD', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173847/AlbumTypeCHTD/cloud_jj1rjz.jpg'),
(20, 'Melba Bogisich', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173847/AlbumTypeCHTD/cloud_jj1rjz.jpg'),
(21, 'Alejandro Lubowitz', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173847/AlbumTypeCHTD/cloud_jj1rjz.jpg'),
(22, 'Gwen Rodriguez', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173847/AlbumTypeCHTD/cloud_jj1rjz.jpg'),
(23, 'Steve Turner', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173847/AlbumTypeCHTD/cloud_jj1rjz.jpg'),
(24, 'Lynn Murazik', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173847/AlbumTypeCHTD/cloud_jj1rjz.jpg'),
(25, 'Shelly Dibbert', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173847/AlbumTypeCHTD/cloud_jj1rjz.jpg'),
(26, 'Billy Cummings', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173847/AlbumTypeCHTD/cloud_jj1rjz.jpg'),
(27, 'Jean Von', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173847/AlbumTypeCHTD/cloud_jj1rjz.jpg'),
(28, 'dasfasdfdasf', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173847/AlbumTypeCHTD/cloud_jj1rjz.jpg'),
(29, 'Chung Son', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173847/AlbumTypeCHTD/cloud_jj1rjz.jpg'),
(30, 'Tri van dep trai', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173847/AlbumTypeCHTD/cloud_jj1rjz.jpg'),
(31, 'HIhi', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670176222/cuahangthoidai/e0cf0xdbp6hupravlyg2.jpg');

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
(12, 'withdrawal', 'transform Account Fresh', 'Ut vero ut autem. Accusantium sint in ea dolorum minima et ut omnis alias. Nulla cupiditate dicta et possimus in. Nihil doloribus ut et laborum consectetur. Ea cumque iste corrupti error blanditiis. Quas est et placeat iure.', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173705/AlbumTypeCHTD/cay_gl2czy.jpg'),
(13, 'Barbados', 'payment index compelling compelling', 'Sequi delectus rem eius quod rem. Assumenda voluptatibus rerum molestias cumque et. Autem nemo ratione sint doloremque laboriosam.', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173705/AlbumTypeCHTD/cay_gl2czy.jpg'),
(14, 'compress', 'teal programming Function-based', 'Qui dolorum dicta velit quo. Ut quo aut quos porro officiis saepe sunt impedit dolor. Qui facere ipsam id eius. Dolorem velit aut aliquam aspernatur ullam laudantium et a. Voluptatum deserunt esse et.', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173705/AlbumTypeCHTD/cay_gl2czy.jpg'),
(15, '24', 'Intelligent Account Plastic Wall Mouse', 'Possimus at dignissimos libero et impedit deleniti ullam. Consequuntur eum quibusdam quas velit voluptas ut adipisci quis. Et ducimus et sapiente rem et.', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173705/AlbumTypeCHTD/cay_gl2czy.jpg'),
(16, 'redundant', 'Ergonomic Bedfordshire Spain Interactions', 'Optio voluptates aut omnis quos. Provident eos praesentium ut accusantium id. Aut ea voluptatem molestiae consequatur molestiae ipsam voluptas numquam. Eos est et et quidem consequuntur aut distinctio facilis. Id iste ea tenetur qui alias. Modi voluptatibus autem fuga totam in accusamus officiis quo.', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670173705/AlbumTypeCHTD/cay_gl2czy.jpg'),
(17, 'Hihihi', 'hohoho', 'huhuhu', 'https://res.cloudinary.com/dotr7u5kq/image/upload/v1670176256/cuahangthoidai/petsnfdfod5kicurmdtg.jpg');

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
(26, 29),
(27, 30),
(28, 31),
(29, 32),
(30, 33),
(31, 34);

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
(23, 'new'),
(24, 'new'),
(25, 'new'),
(26, 'new'),
(27, 'new'),
(28, 'new');

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
(15, 5, 'Nihil velit quaerat repellat deserunt. Odit et officiis corrupti beatae qui voluptas quas. Autem molestiae tempore est incidunt fuga quos expedita architecto. Autem porro beatae enim blanditiis quia nam et qui. Minus esse dolore quisquam. Nihil voluptatibus nulla natus qui.'),
(16, 5, 'Minus ex sed aut commodi ullam sunt est consequatur. Facere quia labore dolorem rerum non saepe non. Repellat minima quam odit. Et voluptatem aut aut.'),
(17, 5, 'Qui quidem facere et voluptatem. Veniam voluptatum quidem doloremque alias. Sapiente et ipsam quae asperiores magnam est sapiente.'),
(18, 5, 'Quasi ut soluta enim rerum quia similique. Explicabo harum dignissimos tempora rerum reprehenderit fugiat dolorem. Quo ut porro et maiores quas minima est porro consequatur. Similique non et ex quos dolorem doloribus quis. Est est exercitationem autem et quibusdam quo eos ex sunt.'),
(19, 4, 'San pham rat tot'),
(20, 5, 'San Pham rat tuyet voi'),
(21, 3, 'tuyet voi');

-- --------------------------------------------------------

--
-- Table structure for table `shipping`
--

CREATE TABLE `shipping` (
  `transaction_id` int(10) UNSIGNED NOT NULL,
  `date_arrive` date DEFAULT NULL,
  `time_arrive` time DEFAULT NULL,
  `state` varchar(15) DEFAULT NULL,
  `receiver_name` varchar(255) DEFAULT NULL,
  `receiver_phone` varchar(15) DEFAULT NULL,
  `receiver_address` varchar(255) DEFAULT NULL,
  `deliver_partner` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shipping`
--

INSERT INTO `shipping` (`transaction_id`, `date_arrive`, `time_arrive`, `state`, `receiver_name`, `receiver_phone`, `receiver_address`, `deliver_partner`) VALUES
(58, NULL, NULL, 'NEW', 'cloned.n-gage', '603-407-8128', '020 Berta Dale', 'Handmade'),
(59, NULL, NULL, 'NEW', 'scalable_compressing_strategic.imp', '302-253-0677', '0152 Altenwerth Bypass', 'International'),
(60, NULL, NULL, 'NEW', 'handmade.dwg', '289-927-5826', '5186 Mario Club', 'connecting'),
(61, NULL, NULL, 'NEW', 'Glen asd', '369-441-2240đá', '8705 Marquardt Burgádasd', NULL),
(62, NULL, NULL, 'NEW', 'Glen asd', '369-441-2240đá', '8705 Marquardt Burgádasd', NULL),
(63, NULL, NULL, 'NEW', 'america.vob', '248-650-1788', '7078 Treutel Turnpike', 'core'),
(64, NULL, NULL, 'NEW', 'Glen asd', '369-441-2240đá', '8705 Marquardt Burgádasd', NULL),
(65, NULL, NULL, 'NEW', 'Nguyen Chow chow', NULL, NULL, NULL),
(66, NULL, NULL, 'NEW', 'hello', 'asd', 'asd', NULL),
(67, NULL, NULL, 'NEW', 'hello', 'asd', 'asd', NULL),
(68, NULL, NULL, 'NEW', 'hello', 'asd', 'asd', NULL),
(69, NULL, NULL, 'NEW', 'hello', 'asd', 'asd', NULL),
(70, NULL, NULL, 'NEW', 'hello', 'asd', 'asd', NULL),
(71, NULL, NULL, 'NEW', 'hello', 'asd', 'asd', NULL),
(72, NULL, NULL, 'NEW', 'hello', 'asd', 'asd', NULL),
(73, NULL, NULL, 'NEW', 'Theo Keaton', '256-242-4281', '055 Gibson Green', NULL),
(74, NULL, NULL, 'NEW', 'Glen asd', '369-441-2240đá', '8705 Marquardt Burgádasd', NULL),
(75, NULL, NULL, 'NEW', 'Theo Keaton', '256-242-4281', '055 Gibson Green', NULL);

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
  `customer_id` int(10) UNSIGNED DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `type_of_transaction`, `date`, `time`, `type_of_shipping`, `customer_id`, `total_price`) VALUES
(58, 'invoice', '2022-11-30', '18:18:41', 'shipping', 17, '0.00'),
(59, 'payment', '2022-11-30', '18:18:41', 'shipping', 17, '0.00'),
(60, 'deposit', '2022-12-03', '16:02:51', 'shipping', 17, '0.00'),
(61, 'payment', '2022-12-03', '20:04:53', 'shipping', 17, '57796.00'),
(62, 'payment', '2022-12-03', '20:09:18', 'shipping', 17, '560000.00'),
(63, 'invoice', '2022-12-03', '20:12:34', 'shipping', 17, '0.00'),
(64, 'payment', '2022-12-03', '23:34:56', 'shipping', 17, '840000.00'),
(65, 'payment', '2022-12-04', '20:16:11', 'shipping', 25, '2850000.00'),
(66, 'payment', '2022-12-05', '00:34:38', 'shipping', 27, '4640000.00'),
(67, 'payment', '2022-12-05', '00:36:27', 'shipping', 27, '1900000.00'),
(68, 'payment', '2022-12-05', '00:39:09', 'shipping', 27, '850000.00'),
(69, 'payment', '2022-12-05', '00:41:01', 'shipping', 27, '4008000.00'),
(70, 'payment', '2022-12-05', '00:45:15', 'shipping', 27, '99999999.99'),
(71, 'payment', '2022-12-05', '00:46:39', 'shipping', 27, '5590000.00'),
(72, 'payment', '2022-12-05', '00:48:04', 'shipping', 27, '2550000.00'),
(73, 'payment', '2022-12-05', '00:54:04', 'shipping', 16, '369000.00'),
(74, 'payment', '2022-12-05', '16:37:39', 'shipping', 17, '20000000.00'),
(75, 'payment', '2022-12-05', '16:54:07', 'shipping', 16, '560.00');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_items`
--

CREATE TABLE `transaction_items` (
  `transaction_id` int(10) UNSIGNED NOT NULL,
  `album_id` int(10) UNSIGNED NOT NULL,
  `quanity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction_items`
--

INSERT INTO `transaction_items` (`transaction_id`, `album_id`, `quanity`) VALUES
(47, 21, 2),
(47, 22, 2),
(47, 23, 2),
(48, 21, 2),
(48, 22, 2),
(48, 23, 2),
(53, 21, 2),
(53, 22, 2),
(53, 23, 2),
(54, 21, 2),
(54, 22, 2),
(54, 23, 2),
(55, 21, 2),
(55, 22, 2),
(55, 23, 2),
(56, 21, 2),
(56, 22, 2),
(56, 23, 2),
(57, 21, 2),
(57, 22, 2),
(57, 23, 2),
(58, 21, 2),
(58, 22, 2),
(58, 23, 2),
(59, 21, 2),
(59, 22, 2),
(59, 23, 2),
(60, 21, 2),
(60, 22, 2),
(60, 23, 2),
(61, 23, 4),
(61, 22, 4),
(61, 21, 60),
(62, 21, 2),
(63, 21, 2),
(63, 22, 2),
(63, 23, 2),
(64, 21, 3),
(65, 22, 3),
(66, 21, 3),
(66, 22, 4),
(67, 22, 2),
(68, 23, 1),
(69, 21, 2),
(69, 27, 4),
(70, 21, 3),
(70, 33, 4),
(71, 21, 3),
(71, 22, 5),
(72, 23, 3),
(73, 34, 3),
(74, 31, 1),
(75, 21, 2);

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
(15, 'Female', '538-578-4527', '2291 Ulises Ford', '2002-10-30'),
(16, 'Female', '256-242-4281', '055 Gibson Green', '2002-10-30'),
(17, 'Female', '369-441-2240đá', '8705 Marquardt Burgádasd', '2002-10-30'),
(18, NULL, NULL, NULL, NULL),
(19, NULL, NULL, NULL, NULL),
(20, NULL, NULL, NULL, NULL),
(21, NULL, NULL, NULL, NULL),
(22, NULL, NULL, NULL, NULL),
(23, NULL, NULL, NULL, NULL),
(24, NULL, NULL, NULL, NULL),
(25, NULL, NULL, NULL, NULL),
(26, 'Female', '113', '123 p123 q123 tphcm', '0000-00-00'),
(27, 'Female', 'asd', 'asd', '0000-00-00'),
(28, NULL, NULL, NULL, NULL);

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
(16, 16, '2022-11-30', '09:37:16'),
(16, 17, '2022-12-05', '00:50:55');

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
(18, 21, 17, '2022-11-30', '09:37:50'),
(19, 21, 27, '2022-12-05', '00:35:06'),
(20, 21, 27, '2022-12-05', '00:45:36'),
(21, 21, 27, '2022-12-05', '00:47:16');

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
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `album`
--
ALTER TABLE `album`
  MODIFY `album_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `artist`
--
ALTER TABLE `artist`
  MODIFY `artist_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `blog_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `review_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transaction_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

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
