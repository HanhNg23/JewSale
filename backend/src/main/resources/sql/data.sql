INSERT INTO account (username, password, role, fullname, phonenumber, email)
VALUES
('admin', '$2a$10$77XXfR4n.8IQpFdoJuP0hODFeNEwv7TLD6FvN8tp9QM6X8Drft1q.', 'ADMIN', 'Admin User', '1122334455', 'admin@example.com'),
('manager', '$2a$10$77XXfR4n.8IQpFdoJuP0hODFeNEwv7TLD6FvN8tp9QM6X8Drft1q.', 'MANAGER', 'Manager User', '2233445566', 'manager@example.com'),
('staff', '$2a$10$77XXfR4n.8IQpFdoJuP0hODFeNEwv7TLD6FvN8tp9QM6X8Drft1q.', 'STAFF', 'Staff User', '3344556677', 'staff@example.com'),
('customer', '$2a$10$77XXfR4n.8IQpFdoJuP0hODFeNEwv7TLD6FvN8tp9QM6X8Drft1q.', 'CUSTOMER', 'Customer User', '4455667788', 'customer@example.com');

------ data gemstone
--INSERT INTO `gemstone` (carat_weight, gemstone_id, gemstone_price, gemstone_name, stone_clarity, stone_color, stone_cut) VALUES
--(NULL, 1, 2000, 'Diamond', 'VVS1', 'Colorless', 'Round'),
--(NULL, 2, 4000, 'Ruby', 'VS2', 'Red', 'Oval'),
--(NULL, 3, 28800, 'Emerald', 'SI1', 'Green', 'Square'),
--(NULL, 4, 45252, 'Sapphire', 'VS1', 'Blue', 'Cushion'),
--(2000, 255, 240000, 'Xoàn mỹ 02', 'FL', 'F', 'Facet'),
--(4000, 260, 3000000, 'Xoàn Mỹ 03', 'FL', 'F', 'Facet');

INSERT INTO `group_element`(element_id, is_type_group, parent_group_id, element_description, element_value ) VALUES
(1,_binary '',NULL,NULL,'trang sức')
,(2,_binary '\0',1,NULL,'nhẫn'),
(3,_binary '\0',1,NULL,'vòng'),
(4,_binary '\0',1,NULL,'bông tai'),
(5,_binary '\0',1,NULL,'dây chuyền'),
(6,_binary '',NULL,NULL,'sale status'),
(7,_binary '\0',6,NULL,'hết hàng'),
(8,_binary '\0',6,NULL,'ngừng kinh doanh'),
(9,_binary '\0',6,NULL,'sẵn bán'),
(17,_binary '\0',1,NULL,'lắc tay'),
(18,_binary '',NULL,NULL,'metal group'),
(19,_binary '\0',18,NULL,'vàng'),
(20,_binary '\0',18,NULL,'vàng trắng'),
(21,_binary '\0',18,NULL,'bạch kim'),
(22,_binary '\0',18,NULL,'bạc'),
(24,_binary '',NULL,NULL,'gemstone'),
(32,_binary '\0',24,NULL,'diamond'),
(33,_binary '\0',24,NULL,'ruby'),
(34,_binary '\0',24,NULL,'xoàn mỹ'),
(35,_binary '\0',24,NULL,'topaz'),
(37,_binary '',NULL,NULL,'gem-cert-type'),
(38,_binary '\0',37,NULL,'SJC'),(39,_binary '\0',37,NULL,'GIA'),(40,_binary '\0',37,NULL,'IGI'),(41,_binary '\0',37,NULL,'HRD'),(42,_binary '\0',37,NULL,'EGL'),(43,_binary '\0',37,NULL,'SSEF'),(44,_binary '\0',37,NULL,'PNJ'),(46,_binary '\0',37,NULL,'ABC');


--data metal type
INSERT INTO `metal_type` (is_auto_update_price, is_on_monitor, metal_purity, metal_type_id, metal_group_name, metal_type_name) VALUES
(0, 0, 0.9999, 1, 'vàng', 'Vàng 24k');
INSERT INTO `metal_type` (is_auto_update_price, is_on_monitor, metal_purity, metal_type_id, metal_group_name, metal_type_name) VALUES
(1, 1, 0.999, 2, 'vàng trắng', 'Vàng Trắng');
INSERT INTO `metal_type` (is_auto_update_price, is_on_monitor, metal_purity, metal_type_id, metal_group_name, metal_type_name) VALUES
(0, 0, 99.99, 5, 'bạc', 'Bạc Xi');
INSERT INTO `metal_type` (is_auto_update_price, is_on_monitor, metal_purity, metal_type_id, metal_group_name, metal_type_name) VALUES
(0, 0, 99.99, 6, 'bạch kim', 'Bạch kim');

--data metal price rate
INSERT INTO `metal_price_rate` (buying_price, exchange_rate, international_price, metal_price_rate_id, metal_price_spot, metal_type_id, profit_buy, profit_sell, selling_price, effective_date) VALUES
(1760, 1.2, 1800, 1, 1800, 1, 8, 10, 1980, '2023-01-01 00:00:00.000000'),
(24, 1.1, 25, 2, 25, 2, 4, 5, 30, '2023-01-01 00:00:00.000000'),
(440000, 25416.190524, 794065.3324460748, 3, 500000, 5, 1.5, 1.2, 1100000, '2024-07-06 12:32:02.772289'),
(84000, NULL, NULL, 4, 60000, 6, 1.5, 2.5, 210000, '2024-07-06 23:48:23.260180');


--INSERT INTO `gemstone` VALUES ('200.0',5,500000,1,NULL,'SJC','Trang sức nhẫn vàng kim cương','diamond','G001','WS1','F','Tròn'),('200.0',6,500000,1,NULL,'SJC','Trang sức nhẫn vàng kim cương','diamond','G002','WS1','F','Tròn');
--INSERT INTO `product` VALUES (1,1,NULL,'2024-07-17 04:48:17.284611','Nhẫn vàng','Nhẫn vàng - JW001','nhẫn','sẵn bán','chiếc'),(2,3,NULL,'2024-07-17 04:58:49.395828','Nhẫn vàng','Dây chuyền vàng - JW002','dây chuyền','sẵn bán','chiếc');
--INSERT INTO `product_images` VALUES (3,1,'1721166497276_1721166477640_1721166227431_441885549_726191309461041_6682892714166947930_n.jpg'),(4,2,'1721167129393_441885549_726191309461041_6682892714166947930_n.jpg');
--INSERT INTO `product_material` VALUES (_binary '\0',5,NULL,1,1,9),(_binary '\0',6,NULL,1,1,10),(_binary '',1,NULL,12,1,11),(_binary '',2,NULL,12,1,12),(_binary '',1,NULL,12,2,13),(_binary '',2,NULL,12,2,14);
--INSERT INTO `product_price` VALUES (10000,0.5,1,1,517060,1000000,24120),(10000,0.5,2,2,17060,0,24120);
--


